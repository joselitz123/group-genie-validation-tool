/* eslint-disable no-plusplus */
/* eslint-disable no-new */
// @flow
import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";
import * as Fancy from "fancygrid";
import uuid from "uuid/v4";
import uniqBy from "lodash/uniqBy";
import ModalComponent from "../ReusableComponent/ModalComponent/ModalComponent";
import ModalHeaderComponent from "../ReusableComponent/ModalComponent/ModalHeaderComponent";
import ModalBodyComponent from "../ReusableComponent/ModalComponent/ModalBodyComponent";
import ModalFooterComponent from "../ReusableComponent/ModalComponent/ModalFooterComponent";
import ButtonComponent from "../ReusableComponent/ButtonComponent/ButtonComponent";
import FormFields from "./formFields";
import {
  toggleFormModal,
  resetFormModal,
  resetFormModalFields,
  triggerErrorOnGroupName,
  setIsValidatingStatus
} from "../../actions/validationSetupActions/actions";
import useCheckGroupNameAvailability from "./functionHooks/useCheckGroupNameAvailability";
import useValidateDuplicateData from "./functionHooks/useValidateDuplicateData";
import { selectedHubFilters } from "../../reducers/GroupFiltersReducer";
import {
  setGroupFilters,
  addGroupsToExistingCollectionGroup
} from "../../actions/groupFiltersActions/actions";

const useStyles = makeStyles({
  loaderUI: {
    position: "relative",
    left: "155px",
    top: "5px",
    marginTop: -12,
    marginLeft: -12
  }
});

type Props = {
  showModal: boolean,
  toggleFormModal: function,
  resetFormModal: function,
  groupType: number,
  resetFormModalFields: function,
  isLoading: boolean,
  filterType: number,
  groupName: string,
  existHubRegionFilters: Array<{
    id: string,
    hub_region: string,
    group_name: string
  }>,
  triggerErrorOnGroupName: function,
  setIsValidatingStatus: function,
  setGroupFilters: function,
  groupAlias: string,
  hubRegion: string,
  groupnames: string,
  accessType: string,
  necessityType: string,
  addGroupsToExistingCollectionGroup: function,
  existingCollectionOfGroupsField: string
};

const ModalFormField = (props: Props) => {
  const {
    showModal,
    toggleFormModal,
    resetFormModal,
    groupType,
    resetFormModalFields,
    isLoading,
    filterType,
    groupName,
    existHubRegionFilters,
    triggerErrorOnGroupName,
    setIsValidatingStatus,
    setGroupFilters,
    groupAlias,
    hubRegion,
    groupnames,
    accessType,
    necessityType,
    addGroupsToExistingCollectionGroup,
    existingCollectionOfGroupsField
  } = props;

  const [errorList, setErrorList] = React.useState([]);

  const [gridState, setGridState] = React.useState({});

  const gridContainer = React.useRef(null);

  const classes = useStyles();

  const modalComponentProps = {
    className: "validation-modal",
    isOpen: showModal,
    size: "md"
  };

  const addButtonComponentProps = {
    color: "primary",
    size: "small",
    type: "submit",
    variant: "contained",
    className: errorList.length !== 0 ? "display-not-visible" : ""
  };

  const backButtonComponentProps = {
    color: "primary",
    size: "small",
    type: "button",
    variant: "contained",
    className: errorList.length !== 0 ? "" : "display-not-visible"
  };

  const cancelButtonComponentProps = {
    color: "secondary",
    size: "small",
    type: "button",
    variant: "contained"
  };

  React.useEffect(
    () => {
      resetFormModalFields();
    },
    [groupType]
  );

  React.useEffect(
    () => {
      if (gridContainer.current !== null) {
        initiateGrid();
      }
    },
    [errorList]
  );

  const submitHandler = async e => {
    e.preventDefault();
    setIsValidatingStatus(true);
    if (filterType === 1) {
      const isDuplicate = useValidateDuplicateData(
        groupName.trim(),
        groupNameIndexer(existHubRegionFilters)
      );

      if (!isDuplicate.isDuplicateFound) {
        const checkGroup = await useCheckGroupNameAvailability(groupName);
        if (checkGroup.isSuccess && checkGroup.isGroupAvailable) {
          const id = uuid();

          setGroupFilters({
            id,
            hub_region: hubRegion,
            group_name: groupName,
            access_type: accessType,
            necessity_type: necessityType,
            group_alias: groupAlias,
            description: checkGroup.description,
            leaf: true
          });
          setIsValidatingStatus(false);
          resetFormModal();
          toggleFormModal(false);
        } else {
          setIsValidatingStatus(false);
          triggerErrorOnGroupName(checkGroup.errorMsg);
        }
      } else {
        setIsValidatingStatus(false);
        triggerErrorOnGroupName(isDuplicate.errorMsg);
      }
    } else if (filterType === 2) {
      const { valid, data } = await validationForCollectionOfGroups();

      if (valid) {
        const uniqData = uniqBy(data, "groupName");
        const dataGrid = uniqData.reduce((allData, curData) => {
          const id = uuid();
          return [
            {
              id,
              hub_region: hubRegion,
              group_name: curData.groupName,
              group_alias: groupAlias,
              description: curData.description,
              leaf: true
            },
            ...allData
          ];
        }, []);

        const groupID = uuid();

        const groupData = {
          id: groupID,
          hub_region: hubRegion,
          group_alias: groupAlias,
          access_type: accessType,
          necessity_type: necessityType,
          group_name: groupName,
          description: "",
          child: dataGrid
        };
        setGroupFilters(groupData);
        setIsValidatingStatus(false);
        resetFormHandler();
      }
    } else {
      const { valid, data } = await validationForCollectionOfGroups();

      if (valid) {
        const uniqData = uniqBy(data, "groupName");
        const dataGrid = uniqData.reduce((allData, curData) => {
          const id = uuid();
          return {
            [id]: {
              id,
              hub_region: hubRegion,
              group_name: curData.groupName,
              group_alias: "New Added Filter",
              description: curData.description,
              leaf: true
            },
            ...allData
          };
        }, {});

        addGroupsToExistingCollectionGroup({
          parentId: existingCollectionOfGroupsField,
          data: dataGrid
        });
        setIsValidatingStatus(false);
        resetFormHandler();
      }
    }
  };

  const validationForCollectionOfGroups = async () => {
    const splittedGroupNames = groupnames.split("\n");

    const indexedFilter = groupNameIndexer(existHubRegionFilters);

    const generatedDuplicateCheck = splittedGroupNames.reduce(
      (allData, curVal) => [
        ...allData,
        useValidateDuplicateData(curVal.trim(), indexedFilter)
      ],
      []
    );

    const duplicateCheckResult = await Promise.all(generatedDuplicateCheck);

    let duplicateFoundOrError = 0;

    // eslint-disable-next-line array-callback-return
    duplicateCheckResult.map(curData => {
      // eslint-disable-next-line no-unused-expressions
      curData.isDuplicateFound === true && curData.errorMsg !== ""
        ? // eslint-disable-next-line no-plusplus
          duplicateFoundOrError++
        : "";
    });

    if (duplicateFoundOrError === 0) {
      const generatedForCheckGroups = splittedGroupNames.reduce(
        (allData, curVal) => [
          ...allData,
          useCheckGroupNameAvailability(curVal.trim())
        ],
        []
      );

      const checkedResults = await Promise.all(generatedForCheckGroups);

      let notExistingOrErrorFound = 0;

      // eslint-disable-next-line array-callback-return
      checkedResults.map(curData => {
        // eslint-disable-next-line no-unused-expressions
        curData.isSuccess === false ? notExistingOrErrorFound++ : "";
      });

      if (notExistingOrErrorFound !== 0) {
        const errorResults = checkedResults.filter(
          curData => curData.isSuccess === false
        );
        setErrorList(errorResults);
        setIsValidatingStatus(false);
        return { valid: false };
      }

      return { valid: true, data: checkedResults };
    }
    const faultedResults = duplicateCheckResult.filter(
      curData => curData.isDuplicateFound === true
    );
    setErrorList(faultedResults);
    setIsValidatingStatus(false);

    return { valid: false };
  };

  const initiateGrid = (): void => {
    if (typeof gridState.destroy !== "undefined") {
      gridState.destroy();
    }
    new Fancy.Grid({
      renderTo: gridContainer.current,
      title: "Problems has been encountered",
      height: 250,
      width: 465,
      shadow: false,
      selModel: "cells",
      modal: true,
      columns: [
        {
          index: "groupName",
          title: "Genie Name",
          flex: 1
        },
        {
          index: "errorMsg",
          title: "Error Message",
          flex: 1
        }
      ],
      events: fancyGridEventsHandler,
      data: errorList
    });
  };

  const resetFormHandler = () => {
    resetFormModal();
    setErrorList([]);
    toggleFormModal(false);
  };

  const groupNameIndexer = filters => {
    const filterResult = filters.reduce((allData, curData) => {
      if (typeof curData.child !== "undefined") {
        const childFilters = curData.child.reduce(
          (aData, cData) => ({ ...aData, [cData.group_name]: cData }),
          {}
        );

        return { ...allData, ...childFilters };
      }
      return { ...allData, [curData.group_name]: curData };
    }, {});

    return filterResult;
  };

  const backButtonHandler = () => {
    setErrorList([]);
  };

  const fancyGridEventsHandler = () => [
    {
      init: setGridState
    }
  ];

  return (
    <ModalComponent {...modalComponentProps}>
      <ModalHeaderComponent>
        {errorList.length === 0
          ? `Add group for ${hubRegion.toUpperCase()} hub`
          : "An error has been found"}
      </ModalHeaderComponent>
      <form onSubmit={submitHandler}>
        <ModalBodyComponent>
          {errorList.length === 0 ? (
            <FormFields />
          ) : (
            <div ref={gridContainer} />
          )}
        </ModalBodyComponent>
        <ModalFooterComponent>
          {isLoading && (
            <CircularProgress size={24} className={classes.loaderUI} />
          )}
          <ButtonComponent
            onClick={resetFormHandler}
            {...cancelButtonComponentProps}
          >
            <i className="material-icons">clear</i>Cancel
          </ButtonComponent>
          <ButtonComponent disabled={isLoading} {...addButtonComponentProps}>
            <i className="material-icons">check</i>Add
          </ButtonComponent>
          <ButtonComponent
            onClick={backButtonHandler}
            {...backButtonComponentProps}
          >
            <i className="material-icons">keyboard_backspace</i>Back
          </ButtonComponent>
        </ModalFooterComponent>
      </form>
    </ModalComponent>
  );
};

ModalFormField.propTypes = {
  showModal: PropTypes.bool.isRequired,
  toggleFormModal: PropTypes.func.isRequired,
  resetFormModal: PropTypes.func.isRequired,
  groupType: PropTypes.number.isRequired,
  resetFormModalFields: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  filterType: PropTypes.number.isRequired,
  groupName: PropTypes.string.isRequired,
  existHubRegionFilters: PropTypes.array.isRequired,
  triggerErrorOnGroupName: PropTypes.func.isRequired,
  setIsValidatingStatus: PropTypes.func.isRequired,
  setGroupFilters: PropTypes.func.isRequired,
  groupAlias: PropTypes.string.isRequired,
  hubRegion: PropTypes.string.isRequired,
  groupnames: PropTypes.string.isRequired,
  accessType: PropTypes.string.isRequired,
  necessityType: PropTypes.string.isRequired,
  addGroupsToExistingCollectionGroup: PropTypes.func.isRequired,
  existingCollectionOfGroupsField: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  showModal: state.validationSetupReducer.showModal,
  groupType: state.inputFieldReducers.groupTypeField,
  isLoading: state.inputFieldReducers.isValidating,
  filterType: state.inputFieldReducers.groupTypeField,
  groupName: state.inputFieldReducers.groupNameField,
  groupAlias: state.inputFieldReducers.groupAliasField,
  existHubRegionFilters: selectedHubFilters(state),
  hubRegion: state.inputFieldReducers.hubRegionField,
  groupnames: state.inputFieldReducers.groupNameTextArea,
  accessType: state.inputFieldReducers.accessTypeField,
  necessityType: state.inputFieldReducers.necessityTypeField,
  existingCollectionOfGroupsField:
    state.inputFieldReducers.existingCollectionOfGroupsField
});

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  {
    toggleFormModal,
    resetFormModal,
    resetFormModalFields,
    triggerErrorOnGroupName,
    setIsValidatingStatus,
    setGroupFilters,
    addGroupsToExistingCollectionGroup
  }
)(ModalFormField);
