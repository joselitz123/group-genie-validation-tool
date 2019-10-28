// @flow
import dashToUnderscoreConverter from "../../ReusableFunctions/dashToUnderscoreConverter";

type accountAccess = {
  user: string,
  access: {},
  error_code?: string,
  error_msg?: string
};

const checkAccessAvailability = (
  accessObjects: { [keys: string]: accountAccess },
  filterGroups: Array<{
    id: string,
    group_name: string,
    group_alias: string,
    access_type: string,
    child?: Array<{
      group_name: string,
      id: string,
      parentId: string,
      group_alias: string,
      access_type: string
    }>
  }>
) => {
  const arrAccessObjects: function = Object.values(accessObjects);

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
      const childData = [];
      const dataAccess = [];
      const applicationRequiredAccess = [];

      const access = filterGroups.reduce((pVal, cVal): {
        child: Array<{ [key: string]: string | boolean }>,
        [key: string]: string
      } => {
        if (typeof curAccessObject.access[cVal.group_name] !== "undefined") {
          if (cVal.access_type === "data_access_type") {
            dataAccess.push(cVal);
          } else if (
            cVal.access_type === "application_access_type" &&
            cVal.necessity_type === "mandatory"
          ) {
            applicationRequiredAccess.push(cVal);
          }
          return {
            ...pVal,
            [dashToUnderscoreConverter(cVal.id)]: `✔`
          };
        }

        if (typeof cVal.child !== "undefined") {
          const childResult = cVal.child.reduce((allResults, childFilter) => {
            if (
              typeof curAccessObject.access[childFilter.group_name] !==
              "undefined"
            ) {
              return [
                ...allResults,
                {
                  [dashToUnderscoreConverter(cVal.id)]: childFilter.group_alias,
                  leaf: true
                }
              ];
            }

            return allResults;
          }, []);

          childData.push(childResult);

          if (childResult.length !== 0) {
            if (cVal.access_type === "data_access_type") {
              dataAccess.push(cVal);
            } else if (
              cVal.access_type === "application_access_type" &&
              cVal.necessity_type === "mandatory"
            ) {
              applicationRequiredAccess.push(cVal);
            }
            return {
              ...pVal,
              [dashToUnderscoreConverter(cVal.id)]: `✔`
            };
          }

          return { ...pVal, [dashToUnderscoreConverter(cVal.id)]: "❌" };
        }

        return {
          ...pVal,
          [dashToUnderscoreConverter(cVal.id)]: "❌"
        };
      }, {});

      return {
        ...totalVal,
        [curAccessObject.user]: {
          user_accnt: curAccessObject.user,
          hasApplicationAccess:
            applicationRequiredAccess.length !== 0 ? `✔` : "❌",
          hasDataAccess: dataAccess.length !== 0 ? `✔` : "❌",
          error_code:
            typeof curAccessObject.error_code !== "undefined"
              ? curAccessObject.error_code
              : "",
          error_msg:
            typeof curAccessObject.error_msg !== "undefined"
              ? curAccessObject.error_msg
              : "",
          ...access,
          child: mergeArrayObjects(childData)
        }
      };
    },
    {}
  );

  console.log(result);

  return result;
};

const mergeArrayObjects = (
  arrObjects: Array<Array<{ [key: string]: string, leaf: boolean }>>
) => {
  const arrContainer = [];

  arrObjects.map(groups => {
    groups.map((group, iterations: number) => {
      if (
        groups.length > arrContainer.length &&
        iterations + 1 >= arrContainer.length
      ) {
        arrContainer.push(group);
      } else {
        arrContainer[iterations] = { ...arrContainer[iterations], ...group };
      }
      return null;
    });

    return null;
  });

  return arrContainer;
};

export default checkAccessAvailability;
