import storage from "electron-json-storage";

export const getStorageData = () => {

  return new Promise((resolve, reject) => {

    storage.get("group_filters", (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });

  });

};

export const setStorageData = data => {

  storage.set("group_filters", data, error => {
    if (error) {
      console.error(error);
    }
  });
};
