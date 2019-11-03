// @flow

const useValidateDuplicateData = (
  groupName: string,
  filterIndexes: {
    [key: string]: {
      id: string,
      hub_region: string,
      group_name: string
    }
  }
): { isDuplicateFound: boolean, errorMsg?: string } => {
  const isDuplicateFound = typeof filterIndexes[groupName] !== "undefined";

  return {
    groupName,
    isDuplicateFound,
    errorMsg: isDuplicateFound ? "Filter already existed in the record." : ""
  };
};

export default useValidateDuplicateData;
