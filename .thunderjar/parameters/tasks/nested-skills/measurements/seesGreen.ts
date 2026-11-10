import { declareMeasurement } from "thunderjar";

// Did the reply include 🟢, from a/'s skill?
export default declareMeasurement({
  instrument: "replyMatches",
  config: { pattern: "🟢" },
  aggregate: ["rate"],
});
