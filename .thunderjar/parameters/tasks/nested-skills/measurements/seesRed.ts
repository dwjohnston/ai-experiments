import { declareMeasurement } from "thunderjar";

// Did the reply include 🔴, from base's skill, in /workspace?
export default declareMeasurement({
  instrument: "replyMatches",
  config: { pattern: "🔴" },
  aggregate: ["rate"],
});
