import { declareCodeState } from "thunderjar";
import { copyNestedSkills, NESTED_SKILLS } from "../../../lib/nestedSkills.ts";

// nested-skills/ as committed: base adds 🔴, a/ adds 🟢, b/ adds 🔵.
export default declareCodeState({
  config: NESTED_SKILLS,
  applyParameter: (config) => copyNestedSkills(config),
});
