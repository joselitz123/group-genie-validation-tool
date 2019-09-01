// @flow
import makeRequestToGroupService from "./makeRequestToGroupSerivce";
import { chunk } from "lodash";

/**
 *  Compose URL paramters for each users
 */
const composeConcurrentRequest = (
  users: Array<string>,
  numberOfConcurrent: number,
  currentExtractCount: function,
  promptError: function,
  source: {}
): Array<Array<Promise<{ user: string, access: string }>>> => {
  const singleContainerRequests = users.reduce(
    (allRequests: Array<Function>, curUser: string): Array<Function> => {
      const re = new RegExp(/((^([A-Z]{2})([0-9]{4})$))/, "gi");

      const URLParameter: string = re.exec(curUser)
        ? `memberdn=uid=${curUser},ou=people,ou=pg,o=world`
        : `accountshortname=${curUser}`;

      return [
        ...allRequests,
        makeRequestToGroupService(
          curUser,
          URLParameter,
          currentExtractCount,
          promptError,
          source
        )
      ];
    },
    []
  );

  const chunkedContainerRequests: Array<
    Array<Promise<{ user: string, access: string }>>
  > = chunk(singleContainerRequests, numberOfConcurrent);

  return chunkedContainerRequests;
};

export default composeConcurrentRequest;
