import { declareMeasurement } from "thunderjar";

// Did the skill run and find the bear stories? Claude Code doesn't load .agents/skills, so on the
// detective-generic code state it shouldn't.
export default declareMeasurement({
  instrument: "replyMatches",
  config: { pattern: "[Gg]oldilocks|[Hh]oney[- ][Bb]ear|bear-and-the-river", turn: 1 },
  aggregate: ["rate"],
});
