// @flow
import convertAccessObject from "./convertAccessObject";
import type { accountAccess } from "../../../constants/flowInterfaces";

const composeAccessObject = (
  accesses: Array<Array<{ user: string, access: string }>>
): Promise<{ [key: string]: accountAccess }> =>
  new Promise(async (resolve, reject) => {
    try {
      const composedAccessses: Array<{
        user: string,
        access: {}
      }> = await accesses.reduce(async (accumulator, curContainer) => {
        const totalAccess = await accumulator;

        const userAccessObject: Array<function> = await curContainer.reduce(
          (
            totalUserObject: Array<function>,
            curAccess: { user: string, access: string }
          ) => [...totalUserObject, convertAccessObject(curAccess)],
          []
        );

        const accessObject: Array<{
          user: string,
          access: {}
        }> = await Promise.all(userAccessObject);

        return [...totalAccess, ...accessObject];
      }, Promise.resolve([]));

      const composedAccessObject: {
        [key: string]: accountAccess
      } = await composedAccessses.reduce(
        (
          allAccess: {
            [key: string]: accountAccess
          },
          curObj: { user: string, access: {} }
        ) => ({ ...allAccess, [curObj.user]: curObj }),
        {}
      );

      resolve(composedAccessObject);
    } catch (error) {
      reject(error);
    }
  });

export default composeAccessObject;
