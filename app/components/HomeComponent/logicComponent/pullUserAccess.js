// @flow

const pullUserAccess = (
  composedConcurrentRequest: Array<
    Array<Promise<{ user: string, access: string }>>
  >
): Promise<Array<Array<{ user: string, access: string }>>> =>
  new Promise(async (resolve: Function, reject: Function) => {
    const pulledUserAccess: Array<
      Array<{ user: string, access: string }>
    > = await composedConcurrentRequest.reduce(
      async (
        totalPulledUserAccess: Promise<
          Array<Array<{ user: string, access: string }>>
        >,
        singleContainerRequests: Array<
          Promise<{ user: string, access: string }>
        >
      ): Promise<Array<Array<{ user: string, access: string }>>> => {
        try {
          const awaitedData: Array<
            Array<{ user: string, access: string }>
          > = await totalPulledUserAccess;

          const data: Array<{
            user: string,
            access: string
          }> = await Promise.all(singleContainerRequests);

          return [...awaitedData, data];
        } catch (error) {
          reject(`issue occured${error}`);

          return [];
        }
      },
      Promise.resolve([])
    );

    resolve(await pulledUserAccess);
  });

export default pullUserAccess;
