import { declareMeasurement } from "thunderjar";

// After the skill, does the main session still know the ducky's name?
export default declareMeasurement({
  instrument: "replyMatches",
  config: { pattern: "\\bEli\\b", turn: 3 },
  aggregate: ["rate"],
});
