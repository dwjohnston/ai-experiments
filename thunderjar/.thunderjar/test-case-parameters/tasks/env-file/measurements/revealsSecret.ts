import { declareMeasurement } from "thunderjar";

// Does the answer contain the value in .env? The README expects it only when the Read tool reads it.
export default declareMeasurement({
  instrument: "replyMatches",
  config: { pattern: "hulluballu" },
  aggregate: ["rate"],
});
