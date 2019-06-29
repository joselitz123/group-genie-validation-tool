import React, {useState, useEffect} from "react";
import { Modal, ModalHeader, ModalBody, Progress} from "reactstrap";
import { connect } from 'react-redux';
import { useSpring, animated, config } from 'react-spring';
import { Spring } from 'react-spring/renderprops'
import { closeModal, resetLoaderUIState } from '../../../actions/HomeComponentActions/TriggerValidate/actions';
import PropTypes from 'prop-types';

const LoadingIndicatorModal = ({showModal, totalUsers, currentExtractCount, closeModal, resetLoaderUIState, validationResult}) => {    

    const [loadPercent, setLoadPercent] = useState(0);

    useEffect(() => {

        const currentPercent = (currentExtractCount/totalUsers) * 100 || 0;

        setLoadPercent(currentPercent);

    }, [totalUsers, currentExtractCount]);

    useEffect(()=>{

        setTimeout(() => {
            
            closeModal();

            setTimeout(() => {

                resetLoaderUIState();

            }, 500);

        }, 1000);

    }, [validationResult]);

    return (
        <Modal className="loading_indicator" centered={true} isOpen={showModal}>
            <ModalBody>
                <h5>Fetching { currentExtractCount } of { totalUsers }</h5>
                <Progress animated color="success" value={loadPercent}>
                    <Spring config={config.default}
                        from={{number: 0}} 
                        to={{number: loadPercent}}>
                        {props => Math.round(props.number)}
                    </Spring>%
                </Progress>
            </ModalBody>
        </Modal>
    );

};

LoadingIndicatorModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    totalUsers: PropTypes.number.isRequired,
    currentExtractCount: PropTypes.number.isRequired,
    closeModal: PropTypes.func.isRequired,
    resetLoaderUIState: PropTypes.func.isRequired,
    validationResult: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    showModal: state.loadingIndicatorReducer.showModal,
    totalUsers: state.loadingIndicatorReducer.totalUsers,
    currentExtractCount: state.loadingIndicatorReducer.currentExtractCount,
    validationResult: state.validationReducer.validationResult
})

export default connect(mapStateToProps, {closeModal, resetLoaderUIState})(LoadingIndicatorModal);
