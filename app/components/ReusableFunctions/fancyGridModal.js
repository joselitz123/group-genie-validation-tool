// @flow
import Fancy from "fancygrid";

const useFancyGridModal = (
  title: string,
  columns: Array<{}>,
  data: Array<{}>,
  emptyText: string
) => {
  const modalGrid = new Fancy.Grid({
    window: true,
    modal: true,
    nativeScroller: true,
    selModel: { type: "rows" },
    contextmenu: [{ type: "copy+", text: "Copy" }],
    title: {
      text: title,
      tools: [
        {
          text: "Close",
          handler: () => {
            modalGrid.hide();
            modalGrid.destroy();
          }
        }
      ]
    },
    height: 460,
    width: 800,
    shadow: false,
    defaults: {
      resizable: true
    },
    tbar: [
      {
        type: "search",
        width: 400,
        emptyText: "Search"
      }
    ],
    columnTrackOver: true,
    emptyText,
    columns,
    data
  });

  return modalGrid;
};

export default useFancyGridModal;
