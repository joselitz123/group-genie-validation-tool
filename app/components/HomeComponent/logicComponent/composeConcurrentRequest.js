/* eslint-disable flowtype/generic-spacing */
// @flow
import { chunk } from "lodash";
import makeRequestToGroupService from "./makeRequestToGroupSerivce";

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

      const trimmedUser = curUser.trim();

      const URLParameter: string = re.exec(trimmedUser)
        ? `memberdn=uid=${trimmedUser},ou=people,ou=pg,o=world`
        : `accountshortname=${trimmedUser}`;

      if (trimmedUser === "") {
        return allRequests;
      }

      return [
        ...allRequests,
        makeRequestToGroupService(
          trimmedUser,
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
