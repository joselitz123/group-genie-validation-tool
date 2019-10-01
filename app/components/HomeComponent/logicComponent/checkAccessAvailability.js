// @flow
import type { accountAccess } from "../../../constants/flowInterfaces";

const checkAccessAvailability = (
  accessObjects: { [keys: string]: accountAccess },
  filterGroups: Array<{
    id: string,
    group_name: string,
    group_alias: string,
    child?: Array<{ data: { group_name: string } }>
  }>
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
              group_alias: string,
              child?: Array<{}>
            }
          },
          cVal
        ) => {
          if (typeof cVal.child !== "undefined") {
            const childAccess = cVal.child.reduce((allData, curData) => {
              if (
                typeof accessObjects[curAccessObject.user].access[
                  curData.data.group_name
                ] !== "undefined"
              ) {
                return {
                  ...allData,
                  [curData.data.group_name]: {
                    ...curData
                  }
                };
              }
              return allData;
            }, {});

            return { ...pVal, [cVal.id]: { val_result: childAccess } };
          }
          return typeof accessObjects[curAccessObject.user].access[
            cVal.group_name
          ] !== "undefined"
            ? {
                ...pVal,
                [cVal.id]: {
                  val_result: true,
                  ...cVal
                }
              }
            : {
                ...pVal,
                [cVal.id]: {
                  val_result: false,
                  ...cVal
                }
              };
        },
        {}
      );

      return {
        ...totalVal,
        [curAccessObject.user]: { user_accnt: curAccessObject.user, ...access }
      };
    },
    {}
  );

  return result;
};

export default checkAccessAvailability;
