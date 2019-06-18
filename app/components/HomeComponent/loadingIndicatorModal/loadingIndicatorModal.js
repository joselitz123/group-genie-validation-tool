import React, {useState} from "react";
import { Modal, ModalHeader, ModalBody, } from "reactstrap";
import { connect } from 'react-redux';
import { useSpring, animated, config } from 'react-spring';
import { Spring } from 'react-spring/renderprops'
import { closeModal } from '../../../actions/HomeComponentActions/TriggerValidate/actions';
import PropTypes from 'prop-types';

const LoadingIndicatorModal = ({showModal, totalUsers, currentExtractCount, closeModal}) => {


    const currentPercent = Math.round((currentExtractCount/totalUsers) * 100 || 0);

    const [props, set, stop] = useSpring(() => ({
        config: config.default,
        width: '0%'
    }));

    set({width: `${currentPercent}%`});


    return (
        <Modal className="loading_indicator" centered={true} isOpen={showModal}>
            <ModalBody>
                <h5>Fetching { currentExtractCount } of { totalUsers }</h5>
                <div className="progress">
                    <animated.div className="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style={props} aria-valuenow={currentExtractCount} aria-valuemin="0" aria-valuemax="100">
                        <Spring config={config.molasses }
                            from={{ number: 0 }}
                            to={{ number: currentPercent }}
                            onRest={() => closeModal()}>
                            {props => { 
                                return <animated.div>{Math.round(props.number)}%</animated.div>
                                }}
                        </Spring>
                    </animated.div>
                </div>
            </ModalBody>
        </Modal>
    );

};

LoadingIndicatorModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    totalUsers: PropTypes.number.isRequired,
    currentExtractCount: PropTypes.number.isRequired,
    closeModal: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    showModal: state.loadingIndicatorReducer.showModal,
    totalUsers: state.loadingIndicatorReducer.totalUsers,
    currentExtractCount: state.loadingIndicatorReducer.currentExtractCount
})

export default connect(mapStateToProps, {closeModal})(LoadingIndicatorModal);
