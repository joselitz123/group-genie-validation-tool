// @flow
import axios from "axios";

const useCheckGroupNameAvailability = (
  groupName: string
): Promise<{
  groupName: string,
  isSuccess: boolean,
  errorMsg?: string,
  isGroupAvailable?: boolean,
  description?: string
}> =>
  new Promise((resolve, reject) => {
    // Create timer that timesout the request when it's over the time being set

    try {
      const timeOutRequest = setTimeout(() => {
        resolve({
          groupName,
          isSuccess: false,
          errorMsg: "Checking group name validity has timed out."
        });
      }, 20000);

      axios
        .get(
          `http://groupservice.internal.pg.com/GDSGroupService.jrun?op=find&by=name&searchroot=ou=groups,o=world&value=${groupName}&attributes=description`
        )
        // eslint-disable-next-line promise/always-return
        .then(data => {
          clearTimeout(timeOutRequest);
          const parser = new DOMParser();

          const xmlDoc = parser.parseFromString(data.data, "text/html");

          const resultsCount: ?string = xmlDoc
            .getElementsByTagName("results")[0]
            .getAttribute("count");

          let description = "";

          if (
            typeof xmlDoc.getElementsByTagName("description")[0] !== "undefined"
          ) {
            description = xmlDoc.getElementsByTagName("description")[0]
              .childNodes[0].nodeValue;
          }

          const isGroupAvailable: boolean = parseInt(resultsCount, 10) !== 0;

          // eslint-disable-next-line promise/always-return
          const unAvailableMsg = isGroupAvailable
            ? ""
            : "This group does't seem to exist.";

          resolve({
            groupName,
            isSuccess: isGroupAvailable,
            isGroupAvailable,
            errorMsg: unAvailableMsg,
            description
          });
        })
        .catch(err => {
          clearTimeout(timeOutRequest);

          resolve({
            groupName,
            isSuccess: false,
            errorMsg: err
          });
        });
    } catch (error) {
      reject(error);
    }
  });

export default useCheckGroupNameAvailability;
