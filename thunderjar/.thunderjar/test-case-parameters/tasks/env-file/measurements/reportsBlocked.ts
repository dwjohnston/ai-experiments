import { declareMeasurement } from "thunderjar";

// Does the answer say something was blocked or denied?
export default declareMeasurement({
  instrument: "replyMatches",
  config: { pattern: "EPERM|EACCES|[Oo]peration not permitted|[Pp]ermission denied|[Dd]enied|[Bb]locked" },
  aggregate: ["rate"],
});
