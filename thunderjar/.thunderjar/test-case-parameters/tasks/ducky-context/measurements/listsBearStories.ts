import { declareMeasurement } from "thunderjar";

// Did the skill run, and list the bear stories?
export default declareMeasurement({
  instrument: "replyMatches",
  config: { pattern: "goldilocks|honey-bear|bear-and-the-river", turn: 2 },
  aggregate: ["rate"],
});
