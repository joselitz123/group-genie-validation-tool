import electron from "electron";

const tableTourSteps = [
  {
    element: ".fancy-panel-grid-inside",
    intro:
      "Let's get you familiar with the different information and features that are available in this table."
  },
  {
    element: ".fancy-grid-left",
    intro:
      "In this column is shown all the accounts that you have entered earlier."
  },
  {
    element: ".fancy-grid-center",
    intro:
      "While the rest of these columns is where the information of the result is shown after account access validation."
  },
  {
    intro: `Now, with regards to access with data hub, per system logic, for a user to properly access the server, he/she will need to have access with <b>BOTH</b> of these two access types that I'll be elaborating next.`
  },
  {
    element: ".app_access",
    intro: `First is <i>"Application access"</i> of which you can view and create an analysis of the data that you have access. One is required to request Power BI to get this access.`
  },
  {
    element: ".data_access",
    intro: `Second is <i>"Data access"</i> that defines which data that are available for you to view. To gain access, one will only need either of these accesses(Retail POS, Direct Shipments or RTDC).`
  },
  {
    intro: `More on data hub access is discussed further from our knowledge article which you can visit through this <b><a href="https://pgglobalenterprise.service-now.com/kb_view.do?sysparm_article=KB0542677">link</a></b>.`
  },
  {
    element: ".fancy-grid-tree-expander:first-of-type",
    intro: `You can also toggle down this arrow to view the markets/access types that are under the cell.`
  },
  {
    element: ".combo_data div:first-of-type",
    intro: `Have you wondered what corresponding genie groups were used to identify access?
      <br/> You can double click the cell to see more details.`
  },
  {
    element: ".export_file",
    intro: `You can even export the result of the account access validation in an Excel file.`
  }
];

export default tableTourSteps;
