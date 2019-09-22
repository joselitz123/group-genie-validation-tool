// @flow

import * as React from "react";
import { ModalHeader } from "reactstrap";
import { makeStyles } from "@material-ui/styles";

type Props = {
  children: React.Node
};

const useStyles = makeStyles({
  root: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.1) !important",
    backgroundColor: "#0bab7d",
    "& .modal-title": {
      display: "flex",
      alignItems: "center",
      justifyContent: "left"
    }
  }
});

const ModalHeaderComponent = (props: Props) => {
  const classes = useStyles();

  const { children } = props;

  return <ModalHeader className={classes.root}>{children}</ModalHeader>;
};

export default ModalHeaderComponent;
