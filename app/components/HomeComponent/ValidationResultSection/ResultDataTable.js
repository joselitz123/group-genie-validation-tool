// @flow
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from "react";
import { connect } from "react-redux";
import { FancyGridReact } from "fancygrid-react";
import PropTypes from "prop-types";
// import { withRouter } from "react-router-dom";
// import routes from "../../../constants/routes.json";z

type Props = {
  validationResult: function,
  filtersSelected: Array<string>,
  allFilters: function
};

const ResultDataTable = (props: Props) => {
  const { validationResult, filtersSelected, allFilters } = props;

  const [gridState, setGridState] = React.useState({});

  console.log(validationResult);

  React.useEffect(() => {
    // eslint-disable-next-line array-callback-return
    filtersSelected.map(filterSelectedID => {
      // eslint-disable-next-line no-unused-expressions
      const column = {
        title: allFilters[filterSelectedID].group_alias,
        index: filterSelectedID,
        type: "string",
        flex: 1
      };

      gridState.addColumn(column);
    });

    gridState.add();
  }, [filtersSelected]);

  const gridConfig = () => ({
    title: "Validation Result Table",
    height: 460,
    width: 1350,
    columns: [
      {
        index: "company",
        title: "User",
        type: "string",
        width: 80
      }
      // {
      //   index: "name",
      //   title: "Name",
      //   type: "string",
      //   flex: 1
      // },
      // {
      //   index: "surname",
      //   title: "Sur Name",
      //   type: "string",
      //   flex: 1
      // },
      // {
      //   index: "age",
      //   title: "Age",
      //   type: "number",
      //   flex: 1
      // }
    ]
  });

  const eventsHandler = () => [
    {
      init: setGridState
    }
  ];

  return <FancyGridReact events={eventsHandler()} config={gridConfig()} />;
};

ResultDataTable.propTypes = {
  validationResult: PropTypes.object.isRequired,
  filtersSelected: PropTypes.array.isRequired,
  allFilters: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  validationResult: state.validationReducer.validationResult,
  filtersSelected: state.groupFiltersSelectionBoxReducer.groupsSelected,
  allFilters: state.groupFiltersReducer.group_filters
});

export default connect(mapStateToProps)(ResultDataTable);
