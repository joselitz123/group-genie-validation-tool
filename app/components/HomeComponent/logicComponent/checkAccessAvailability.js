// @flow
import type { accountAccess } from "../../../constants/flowInterfaces";
import dashToUnderscoreConverter from "../../ReusableFunctions/dashToUnderscoreConverter";
import uniqBy from "lodash/uniqBy";

const checkAccessAvailability = (
  accessObjects: { [keys: string]: accountAccess },
  filterGroups: Array<{
    id: string,
    group_name: string,
    group_alias: string,
    child?: Array<{
      data: { group_name: string, id: string, parentId: string }
    }>
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
      const access = filterGroups.reduce((pVal, cVal): {
        child: Array<{}>
      } => {
        if (typeof cVal.child !== "undefined") {
          console.log(cVal.child);
          const childAccess = cVal.child.reduce((allData, curData, index) => {
            if (
              typeof accessObjects[curAccessObject.user].access[
                curData.data.group_name
              ] !== "undefined"
            ) {
              if (typeof pVal.child !== "undefined") {
                if (typeof pVal.child[index] !== "undefined") {
                  // const [index, restData] = pVal.child;

                  return [
                    ...allData,
                    {
                      ...pVal.child[index],
                      [dashToUnderscoreConverter(
                        curData.data.parentId
                      )]: curData.data.group_name,
                      leaf: true,
                      user_accnt: curAccessObject.user
                    }
                  ];
                }
              }

              return [
                ...allData,
                // colData
                {
                  [dashToUnderscoreConverter(curData.data.parentId)]: curData
                    .data.group_name,
                  leaf: true,
                  user_accnt: curAccessObject.user
                }
              ];
            }
            return allData;
          }, []);

          const childArray: function =
            Object.values(childAccess).length !== 0
              ? typeof pVal.child !== "undefined"
                ? [...pVal.child, ...childAccess]
                : childAccess
              : pVal.child;

          return {
            ...pVal,
            [dashToUnderscoreConverter(cVal.id)]:
              Object.values(childAccess).length !== 0 ? "✔" : "❌",
            child: childArray
          };
        }
        return typeof accessObjects[curAccessObject.user].access[
          cVal.group_name
        ] !== "undefined"
          ? {
              ...pVal,
              [dashToUnderscoreConverter(cVal.id)]: `✔`
            }
          : {
              ...pVal,
              [dashToUnderscoreConverter(cVal.id)]: "❌"
            };
      }, {});
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
