import { declareMeasurement } from "thunderjar";

// Does the last answer name the boy (Eli)? Only if the story leaked into the main session: the README
// expects yes for /detective, and no for /detective-v2.
export default declareMeasurement({
  instrument: "replyMatches",
  config: { pattern: "\\bEli\\b" },
  aggregate: ["rate"],
});
