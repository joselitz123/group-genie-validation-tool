// @flow
import * as React from "react";
import Button from "@material-ui/core/Button";

export type buttonPropTypes = {
  variant: string,
  size: string,
  disabled?: boolean,
  color: string,
  type: string,
  children: React.Node,
  onClick?: function,
  className?: string
};

const ButtonComponent = (props: buttonPropTypes) => {
  const { children, ...restProps } = props;

  return <Button {...restProps}>{children}</Button>;
};

export default ButtonComponent;
