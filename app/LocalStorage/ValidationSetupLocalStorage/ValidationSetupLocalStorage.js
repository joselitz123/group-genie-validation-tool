// @flow
//  default data are stored at https://api.myjson.com/bins/cqn2f
import storage from "electron-json-storage";
import defaultData from "./defaultFilterData.json";
import axios from "axios";
import { object } from "prop-types";

export const getStorageData = (): Promise<{}> => {
  return new Promise((resolve, reject) => {
    storage.get("group_filters", async (error: Error, data: any) => {
      if (error) {
        reject(error);
      } else if (data == "" || Object.values(data).length == 0) {
        const defaultFilters = await fetchDefaultFilters();
        setStorageData(defaultFilters);
        resolve(defaultFilters);
      } else {
        resolve(data);
      }
    });
  });
};

export const setStorageData = (data: {}) => {
  storage.set("group_filters", data, error => {
    if (error) {
      console.error(error);
    }
  });
};

// Data is stored in https://jsonbin.io
export const fetchDefaultFilters = (): Promise<{}> => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await axios.get(
        "https://api.jsonbin.io/b/5d5f82ffa8432f425342dbb8/6",
        {
          headers: {
            "secret-key":
              "$2a$10$2O6JAOYDz43/GqC.940SEO0YIRTFb6VygXS8Lfwy.qJ4AaL.XZe2i"
          }
        }
      );
      // const reversedData = Object.values(data.data).reverse(); // a workaround on the issue in https://jsonbin.io wherein it reverses the correct order of the filter.
      // const resultData = reversedData.reduce((allData, curData: any) => {
      //   return { ...allData, [curData.id]: curData };
      // }, {});

      resolve(data.data);
    } catch (error) {
      reject(error);
    }
  });
};
