// @flow
import axios from "axios";
import Notifier from "../../ReusableFunctions/NotificationFunction";

const makeRequestToGroupService = (
  user: string,
  urlParameter: string,
  currentExtractCount: function,
  promptError: function,
  source: function
): Promise<Object> => {
  return new Promise((resolve: Function, reject: Function) => {
    try {
      axios
        .get(
          `http://groupservice.internal.pg.com/GDSGroupService.jrun?op=getmembergroups&${urlParameter}&attributes=name,description`,
          { cancelToken: source.token }
        )
        .then((data: Object) => {
          currentExtractCount();

          resolve({ user: user, access: data.data });
        })
        .catch(err => {
          if (axios.isCancel(err)) {
          } else {
            Notifier("Validation Failed", err.message);
            promptError(true, err.message);
          }

          reject(err);
        });
    } catch (error) {
      Notifier("Validation Failed", error.message);
      promptError(true, error.message);

      reject(error);
    }
  });
};

export default makeRequestToGroupService;
