// @flow
import Fancy from "fancygrid";

const useFancyGridModal = (
  title: string,
  columns: Array<{}>,
  data: Array<{ leaf: boolean, child: Array<{}> }>,
  emptyText: string,
  selModelType: string,
  contextmenu: Array<{} | string>,
  fields: Array<string>
) => {
  const conditionalData =
    typeof data[0].child !== "undefined"
      ? [{ ...data[0], expanded: true }]
      : data;

  const modalGrid = new Fancy.Grid({
    window: true,
    modal: true,
    nativeScroller: true,
    selModel: { type: selModelType },
    draggable: true,
    contextmenu,
    title: {
      text: title,
      tools: [
        {
          text: "Close",
          handler: () => {
            modalGrid.hide();
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
      items: conditionalData,
      fields
    }
  });

  return modalGrid;
};

export default useFancyGridModal;
