"""Score one Claude Code turn against a README claim.

Usage: python3 check.py <claude-code.txt> <rules.json> [--reward-file PATH]

<claude-code.txt> is the stream-json log Harbor's claude-code agent writes for
the turn. Only the main agent's tool calls count (subagent events are skipped),
and the answer is the last `result` event: when Claude launches a background
subagent it emits a first result, then a final one once the subagent is done.

rules.json:
  {
    "observational": false,      # true: pass whenever there is an answer
    "rules": [
      {"answer_matches": "<regex>"},
      {"answer_not_matches": "<regex>"},
      {"tool_calls": {"name": "<regex>", "input": "<regex>", "output": "<regex>",
                      "expect": "some" | "none" | "all"}}
    ]
  }

For tool_calls, `name` and `input` pick the calls (input is matched against
its JSON). "some": at least one picked call's output matches `output`.
"none": no picked call's output matches. "all": at least one call is picked
and every one's output matches. Omitted patterns match anything. Regexes are
case-insensitive.

A turn with no answer (missing or empty log) always scores 0.
"""

import argparse
import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path


@dataclass
class ToolCall:
    name: str
    input: dict
    output: str = ""


@dataclass
class Turn:
    answer: str | None = None
    tool_calls: list[ToolCall] = field(default_factory=list)


def _text(content) -> str:
    if isinstance(content, list):
        return "\n".join(part.get("text", "") for part in content if isinstance(part, dict))
    return "" if content is None else str(content)


def parse_log(path: Path) -> Turn:
    turn = Turn()
    try:
        lines = Path(path).read_text(errors="replace").splitlines()
    except OSError:
        return turn

    calls: dict[str, ToolCall] = {}
    for line in lines:
        try:
            event = json.loads(line)
        except ValueError:
            continue  # stderr is mixed into the log
        if not isinstance(event, dict):
            continue
        if event.get("type") == "result":
            turn.answer = event.get("result") or ""
            continue
        if event.get("parent_tool_use_id"):
            continue  # subagent activity
        content = (event.get("message") or {}).get("content")
        if not isinstance(content, list):
            continue
        for part in content:
            if part.get("type") == "tool_use":
                calls[part["id"]] = ToolCall(part.get("name", ""), part.get("input") or {})
            elif part.get("type") == "tool_result" and part.get("tool_use_id") in calls:
                calls[part["tool_use_id"]].output = _text(part.get("content"))
    turn.tool_calls = list(calls.values())
    return turn


def _search(pattern: str | None, text: str) -> bool:
    return pattern is None or re.search(pattern, text, re.IGNORECASE) is not None


def _check_tool_calls(turn: Turn, spec: dict) -> bool:
    picked = [
        c for c in turn.tool_calls
        if _search(spec.get("name"), c.name) and _search(spec.get("input"), json.dumps(c.input))
    ]
    matches = [c for c in picked if _search(spec.get("output"), c.output)]
    expect = spec.get("expect", "some")
    if expect == "some":
        return bool(matches)
    if expect == "none":
        return not matches
    if expect == "all":
        return bool(picked) and len(matches) == len(picked)
    raise ValueError(f"unknown expect: {expect}")


def evaluate(turn: Turn, spec: dict) -> tuple[bool, list[str]]:
    """Return (passed, report lines)."""
    if turn.answer is None:
        return False, ["FAIL no answer in the log (did the agent run?)"]

    report = []
    passed = True
    for rule in spec.get("rules", []):
        if "answer_matches" in rule:
            ok = _search(rule["answer_matches"], turn.answer)
        elif "answer_not_matches" in rule:
            ok = not _search(rule["answer_not_matches"], turn.answer)
        elif "tool_calls" in rule:
            ok = _check_tool_calls(turn, rule["tool_calls"])
        else:
            raise ValueError(f"unknown rule: {rule}")
        passed = passed and ok
        report.append(f"{'PASS' if ok else 'FAIL'} {rule.get('why', json.dumps(rule))}")

    if spec.get("observational"):
        report.append("observational: recorded only, passes whenever there is an answer")
        passed = True
    return passed, report


def main(argv=None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("log")
    parser.add_argument("rules")
    parser.add_argument("--reward-file", default="/logs/verifier/reward.txt")
    args = parser.parse_args(argv)

    turn = parse_log(Path(args.log))
    passed, report = evaluate(turn, json.loads(Path(args.rules).read_text()))

    print("=== answer ===")
    print(turn.answer)
    print("=== main-agent tool calls ===")
    for call in turn.tool_calls:
        print(f"[{call.name}] {json.dumps(call.input)[:300]}\n  -> {call.output[:300]!r}")
    print("=== checks ===")
    print("\n".join(report))

    Path(args.reward_file).parent.mkdir(parents=True, exist_ok=True)
    Path(args.reward_file).write_text("1\n" if passed else "0\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
