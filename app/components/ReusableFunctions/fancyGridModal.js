// @flow
import Fancy from "fancygrid";

const useFancyGridModal = (
  title: string,
  columns: Array<{}>,
  data: Array<{}>,
  emptyText: string,
  selModelType: string,
  contextmenu: Array<{} | string>,
  fields: Array<string>
) => {
  const modalGrid = new Fancy.Grid({
    window: true,
    modal: true,
    nativeScroller: true,
    selModel: { type: selModelType },
    contextmenu,
    title: {
      text: title,
      tools: [
        {
          text: "Close",
          handler: () => {
            modalGrid.hide();
            // modalGrid.destroy();
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
    columnTrackOver: true,
    emptyText,
    columns,
    data: {
      items: data,
      fields
    }
  });

  return modalGrid;
};

export default useFancyGridModal;
