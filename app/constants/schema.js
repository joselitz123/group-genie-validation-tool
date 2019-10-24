// @flow
import { normalize, denormalize, schema } from "normalizr";

const groupFilterSchema = () => {
  const childFilter = new schema.Entity("childFilter");

  const groupFilter = new schema.Entity("groupFilter", {
    child: [childFilter]
  });

  const groupFilters = [groupFilter];

  return groupFilters;
};

export const useNormalizeData = (data: Array<{}>) => {
  const schema = groupFilterSchema();
  const result = normalize<*, *>(data, schema);
  return result;
};

export const useDenormalizeData = (input: Array<string>, data: Array<{}>) => {
  const schema = groupFilterSchema();
  const result = denormalize(input, schema, data);
  return result;
};
