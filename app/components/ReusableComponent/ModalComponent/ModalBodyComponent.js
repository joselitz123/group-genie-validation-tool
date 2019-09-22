// @flow
import * as React from "react";
import { ModalBody } from "reactstrap";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#0bab7d"
  }
});

type Props = {
  children: React.Node
};

const ModalBodyComponent = (props: Props) => {
  const classes = useStyles();

  const { children } = props;

  return <ModalBody className={classes.root}>{children}</ModalBody>;
};

export default ModalBodyComponent;
