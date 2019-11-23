const tableTourSteps = [
  {
    intro: `Great!, now that the validation has finished, I'll be talking about the <i>"Validation Result Table"</i> section.`
  },
  {
    element: ".fancy-panel-grid-inside",
    intro:
      "Let's get you familiar with the different information and features that are available on this table."
  },
  {
    element: ".fancy-grid-left",
    intro:
      "In this column will show all the accounts that you have entered earlier."
  },
  {
    element: ".fancy-grid-center",
    intro:
      "While the rest of these columns will be shown the result of the access validation."
  },
  {
    intro: `Now, with regards to access with data hub, as per system logic, 
        in order for a user to properly access the server, he/she will need to access to <b>BOTH</b> of these two access types that I'll be elaborating next.`
  },
  {
    element: ".app_access",
    intro: `First is <i>"Application access"</i> wherein you can view and create analysis of the data that you have access with.
      One of this access is Power BI which is required.`
  },
  {
    element: ".data_access",
    intro: `Second is <i>"Data access"</i> that defines which data that are available for you to view. To gain access with this, one will only need either of these accesses(Retail POS, Direct Shipments or RTDC).`
  },
  {
    element: ".fancy-grid-tree-expander:first-of-type",
    intro: `You can also toggle down this arrow to view the markets/access types that are under it.`
  },
  {
    element: ".combo_data div:first-of-type",
    intro: `Have you wondered what corresponding genie groups were used to identify an access?
      <br/> You can double click the cell to see more details.`
  }
];

export default tableTourSteps;
