import { declareCodeState } from "thunderjar";
import { copyNestedSkills, NESTED_SKILLS } from "../../../lib/nestedSkills.ts";

// nested-skills/, with `disable-model-invocation: true` added to a/'s skill (both its .claude and
// .agents copies). In Claude Code that flag means only the user can run the skill, with /a: the
// model isn't told it exists. So 🟢 should disappear, while 🔴 from base is a control that should
// stay. Other harnesses may ignore the flag.
export default declareCodeState({
  config: NESTED_SKILLS,
  applyParameter: (config) =>
    copyNestedSkills(
      config,
      `sed -i 's/^description:/disable-model-invocation: true\\ndescription:/' a/.claude/skills/a/SKILL.md a/.agents/skills/a/SKILL.md`,
    ),
});
