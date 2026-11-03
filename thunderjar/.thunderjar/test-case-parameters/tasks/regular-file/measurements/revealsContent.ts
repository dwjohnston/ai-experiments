import { declareMeasurement } from "thunderjar";

// Does the answer contain regular-file.txt's content? The README expects not: it's denied.
export default declareMeasurement({
  instrument: "replyMatches",
  config: { pattern: "hello=world" },
  aggregate: ["rate"],
});
