// @flow
import * as React from "react";
import { Row, Col, Container } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GroupAliasField from "./groupAliasField";
import GroupTypeField from "./groupTypeField";
import GroupNameField from "./groupNameField";
import GroupNameTextArea from "./groupNameTextArea";

type Props = {
  groupType: string
};

const FormFields = (props: Props) => {
  const { groupType } = props;

  return (
    <Container>
      <Row>
        <Col xs="12">
          <GroupTypeField />
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <GroupAliasField />
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          {parseInt(groupType, 10) === 1 ? (
            <GroupNameField />
          ) : (
            <GroupNameTextArea />
          )}
        </Col>
      </Row>
    </Container>
  );
};

FormFields.propTypes = {
  groupType: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  groupType: state.inputFieldReducers.groupTypeField
});

export default connect<*, *, *, *, *, *>(mapStateToProps)(FormFields);
