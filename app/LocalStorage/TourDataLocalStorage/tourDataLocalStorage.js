import storage from "electron-json-storage";

export const getTourData = () =>
  new Promise((resolve, reject) =>
    storage.get("tour_data", async (error: Error, data: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    })
  );


export const setTourData = (data: function) => {
    storage.set("tour_data", data, error => {
      if (error) {
        console.error(error);
      }
    });
  };
