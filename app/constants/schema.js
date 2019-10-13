import { schema } from "normalizr";

export default (groupFilterSchema = () => {
  const deepChild = new schema.Entity("deepChild");

  return { child: deepChild };
});
