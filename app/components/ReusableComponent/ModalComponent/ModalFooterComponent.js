// @flow

import * as React from "react";
import { ModalFooter } from "reactstrap";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    borderTop: "1px solid rgba(0, 0, 0, 0.1) !important",
    backgroundColor: "#0bab7d"
  }
});

type Props = {
  children: React.Node
};

const ModalFooterComponent = (props: Props) => {
  const classes = useStyles();

  const { children } = props;

  return <ModalFooter className={classes.root}>{children}</ModalFooter>;
};

export default ModalFooterComponent;
