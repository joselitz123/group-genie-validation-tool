// @flow
import * as React from "react";
import { Modal } from "reactstrap";

export type Props = {
  isOpen: boolean,
  children: React.Node,
  size: string
};

const ModalComponent = (props: Props) => {
  const { children, ...restProps } = props;
  return (
    <Modal centered {...restProps}>
      {children}
    </Modal>
  );
};

export default ModalComponent;
