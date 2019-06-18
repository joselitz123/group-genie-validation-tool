import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
$.DataTable = require('datatables.net-bs4')();
$.DataTableScroll = require('datatables.net-scroller-bs4')();

import PropTypes from 'prop-types';




const ResultDataTable = ({dataSetObject}) => {

    const dataSet = Object.values(dataSetObject);

    const accessFields = Object.values(dataSet[0].access).reduce((prevData, curData) => {

        return [...prevData, {"data": `access.${curData.group_alias}.val_result`, title: curData.group_alias}]

    },[]);

    const result_table = useRef(null);

    

    useEffect(() => {

        const table_instance = $(result_table.current).DataTable({
            data: dataSet,
            columns: [
                {"data": "user", title: 'User'},
                ...accessFields
            ],
            "scrollY": "200px",
            "scrollCollapse": true,
            "paging": false,
            "orderData": 0,
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
            }]
        });

    },[]);

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