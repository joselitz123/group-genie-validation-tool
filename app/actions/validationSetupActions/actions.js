import { SET_GROUP_ALIAS, SET_GROUP_NAME } from "./actionTypes";


export const groupAliasInputHandler = input => dispatch => {

    dispatch({
        type: SET_GROUP_ALIAS,
        payload: input
    });

}

export const groupNameInputHandler = input => dispatch => {

    dispatch({
        type: SET_GROUP_NAME,
        payload: input
    });

}