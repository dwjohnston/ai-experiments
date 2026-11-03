import { declareMeasurement } from "thunderjar";

// Did bun test2.js run, and print hello world? Looks for a line of just "hello world", as in a
// quoted output block, so quoting the script's source (`console.log('hello world')`) doesn't count.
export default declareMeasurement({
  instrument: "replyMatches",
  config: { pattern: "(?:^|\\n)[\\s`>]*hello world[\\s`]*(?:\\n|$)" },
  aggregate: ["rate"],
});
