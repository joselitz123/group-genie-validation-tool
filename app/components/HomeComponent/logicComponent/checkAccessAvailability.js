// @flow
import type { accountAccess } from "../../../constants/flowInterfaces";

const checkAccessAvailability = (
  accessObjects: { [keys: string]: accountAccess },
  filterGroups: Array<{ id: string, group_name: string, group_alias: string }>
) => {
  const arrAccessObjects: any = Object.values(accessObjects);

  const result: {
    [keys: string]: {
      user: string,
      access: { [keys: string]: { val_result: boolean, group_alias: string } }
    }
  } = arrAccessObjects.reduce(
    (
      totalVal: { [key: string]: accountAccess },
      curAccessObject: accountAccess
    ) => {
      const access: {
        [keys: string]: { val_result: boolean, group_alias: string }
      } = filterGroups.reduce(
        (
          pVal: {
            [key: string]: {
              id: string,
              group_name: string,
              group_alias: string
            }
          },
          cVal: { id: string, group_name: string, group_alias: string }
        ) => {
          return typeof accessObjects[curAccessObject.user].access[
            cVal.group_name
          ] != "undefined"
            ? {
                ...pVal,
                [cVal.group_alias]: {
                  val_result: true,
                  group_alias: cVal.group_alias
                }
              }
            : {
                ...pVal,
                [cVal.group_alias]: {
                  val_result: false,
                  group_alias: cVal.group_alias
                }
              };
        },
        {}
      );

      return {
        ...totalVal,
        [curAccessObject.user]: { user: curAccessObject.user, access: access }
      };
    },
    {}
  );

  return result;
};

export default checkAccessAvailability;
