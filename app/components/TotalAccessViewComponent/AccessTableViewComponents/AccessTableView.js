import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
$.DataTable = require('datatables.net-bs4')();
$.DataTableScroll = require('datatables.net-scroller-bs4')();

const AccessTableView = () => {

    const accessViewTable = useRef(null);

    useEffect(() => {

        // $(accessViewTable).DataTable({
        //     da
        // })

    }, []);

    return <table ref={accessViewTable}></table>

}

export default AccessTableView;