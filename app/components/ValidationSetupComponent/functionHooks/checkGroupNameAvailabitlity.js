// @flow
import * as React from "react";
import PropTypes from "prop-types";
import { selectedHubFilters } from "../../../reducers/GroupFiltersReducer";
import axios from "axios";

type Props = {
  hubRegionFilters: Array<{ group_name: string }>,
  groupName: string
};

const checkGroupNameAvailability = (
  props: Props
): Promise<{ isSuccess: boolean, errorMsg?: string }> => {
  return new Promise((resolve, reject) => {
    const { hubRegionFilters, groupName } = props;

    const validateDuplicateData = () =>
      hubRegionFilters.filter(data => data.group_name == groupName);

    const checkGroupFromServer = () =>
      new Promise((resolve, reject) => {
        // Create timer that timesout the request when it's over the time set
        const timeOutRequest = setTimeout(() => {
          reject("Checking group name validity has timed out.");
        }, 20000);

        axios
          .get(
            `http://groupservice.internal.pg.com/GDSGroupService.jrun?op=find&by=name&searchroot=ou=groups,o=world&value=${groupName}`
          )
          .then(data => {
            clearTimeout(timeOutRequest);
            const parser = new DOMParser();

            const xmlDoc = parser.parseFromString(data.data, "text/html");

            const resultsCount = xmlDoc
              .getElementsByTagName("results")[0]
              .getAttribute("count");

            if (parseInt(resultsCount) != 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(err => {
            clearTimeout(timeOutRequest);

            reject(err);
          });
      });

    if (validateDuplicateData.length != 0) {
      return {
        isSuccess: false,
        errorMsg: "This filter already existed for this hub."
      };
    } else {
      checkGroupFromServer()
        .then(data => {
          if (data) {
            resolve({ isSuccess: true });
          } else {
            resolve({
              isSuccess: false,
              errorMsg: "This group doesn't seem to exist"
            });
          }
        })
        .catch(err => {
          reject(err);
        });
    }
  });
};

checkGroupNameAvailability.propTypes = {
  triggerErrorOnGroupName: PropTypes.func.isRequired,
  groupName: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired
};

export default checkGroupNameAvailability;
