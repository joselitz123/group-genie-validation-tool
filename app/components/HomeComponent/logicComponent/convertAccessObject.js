// @flow
import type { accountAccess } from "../../../constants/flowInterfaces";

const convertAccessObject = (data: {
  user: string,
  access: string
}): accountAccess => {
  const parser = new DOMParser();

  const xmlDoc = parser.parseFromString(data.access, "text/xml");

  const groupElements = xmlDoc.getElementsByTagName("group");

  const errorCodeTag = xmlDoc.getElementsByTagName("message-code");

  if (errorCodeTag.length > 0) {
    const errorMsgTag = xmlDoc.getElementsByTagName("message-text");

    const errorMsg = errorMsgTag[0].childNodes[0].nodeValue;

    const errorCode = errorCodeTag[0].childNodes[0].nodeValue;

    return {
      user: data.user,
      access: {},
      error_code: errorCode,
      error_msg: errorMsg
    };
  } else {
    let groupList = {};

    for (let index = 0; index < groupElements.length; index++) {
      const groupName = groupElements[index].getElementsByTagName("name")[0]
        .childNodes[0].nodeValue;

      const groupDesc =
        typeof groupElements[index].getElementsByTagName("description")[0] !=
        "undefined"
          ? groupElements[index].getElementsByTagName("description")[0]
              .childNodes[0].nodeValue
          : "";

      groupList = {
        ...groupList,
        [groupName]: { name: groupName, description: groupDesc }
      };
    }

    return { user: data.user, access: groupList };
  }
};

export default convertAccessObject;
