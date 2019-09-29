// @flow

const useValidateDuplicateData = (
  groupName: string,
  existingHubFilterGroups: Array<{
    id: string,
    hub_region: string,
    group_name: string
  }>
): { isDuplicateFound: boolean, errorMsg?: string } => {
  const filterResult = existingHubFilterGroups.filter(
    data => data.group_name === groupName
  );

  return {
    groupName,
    isDuplicateFound: filterResult.length > 0,
    errorMsg:
      filterResult.length > 0 ? "Filter already existed in the record." : ""
  };
};

export default useValidateDuplicateData;
