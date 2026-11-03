import { declareMeasurement } from "thunderjar";

// Did the skill also list boy-and-the-kite, the story about a boy named Eli? Only if it knew the
// ducky's name.
export default declareMeasurement({
  instrument: "replyMatches",
  config: { pattern: "boy-and-the-kite", turn: 2 },
  aggregate: ["rate"],
});
