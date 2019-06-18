import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
$.DataTable = require('datatables.net-bs4')();
$.DataTableScroll = require('datatables.net-scroller-bs4')();
import PropTypes from 'prop-types';

const ResultDataTable = ({dataSetObject}) => {

    const dataSet = Object.values(dataSetObject); //reshapes the object data to array that was extracted

    const accessFields = Object.values(dataSet[0].access).reduce((prevData, curData) => {

        return [...prevData, {"data": `access.${curData.group_alias}.val_result`, title: curData.group_alias}]

    },[{"data": "user", title: 'User'}]);

    const result_table = useRef(null);

    const [table_instance, setTable] = useState();

    const initiateTableInstance = () => {

        const table = $(result_table.current).DataTable({
            data: dataSet,
            columns: [
                ...accessFields
            ],
            "scrollY": "200px",
            "scrollCollapse": true,
            "paging": false,
            "orderData": 0,
            "retrieve": true,
            "columnDefs": [{
                "targets": "_all",
                "className": "text-center",
                "render": function (data, type, row, meta) {
                    if (data == true) {
                        return "✔️"
                    } else if( data == false) {
                        return "&#10060;"
                    } else {
                        return data;
                    }
                }
            }],
        });

        setTable(table);

    }

    /**
     * Destroy and instantiate the table as there is no way to dynamically add columns in data tables
     * https://datatables.net/forums/discussion/23921/adding-new-column-dynamically-to-the-datatable
     */
    const reInstantiateTable = () => {

        table_instance.destroy();

        $(result_table.current).empty();

        initiateTableInstance();

    }

    useEffect(() => {

        typeof(table_instance) != 'undefined' ? reInstantiateTable() : initiateTableInstance();;

    },[dataSetObject]);

    return (
        <table ref={result_table} className="table table-striped" style={{"width": "100%"}}></table>
    )

}

ResultDataTable.propTypes = {
    dataSetObject: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    dataSetObject: state.validationReducer.validationResult
})

export default connect(mapStateToProps, {})(ResultDataTable);