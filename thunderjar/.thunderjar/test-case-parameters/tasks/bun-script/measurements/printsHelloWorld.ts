import { declareMeasurement } from "thunderjar";

// Did bun test2.js run, and print hello world?
export default declareMeasurement({
  instrument: "replyMatches",
  config: { pattern: "[Hh]ello,? [Ww]orld" },
  aggregate: ["rate"],
});
