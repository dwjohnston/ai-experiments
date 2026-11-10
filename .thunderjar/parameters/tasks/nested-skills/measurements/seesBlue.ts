import { declareMeasurement } from "thunderjar";

// Did the reply include 🔵, from b/'s skill? A control: nothing here touches b/, so it should never appear.
export default declareMeasurement({
  instrument: "replyMatches",
  config: { pattern: "🔵" },
  aggregate: ["rate"],
});
