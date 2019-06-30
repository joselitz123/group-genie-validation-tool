import { LOAD_ALL_USERS_ACCESS } from '../../actions/HomeComponentActions/TriggerValidate/actionTypes';

const intitialState = {
    allUsersAccess: [],
}

export default function totalAccessView(state = intitialState, action){

    if (action.type == LOAD_ALL_USERS_ACCESS) {
        
        return {...state, allUsersAccess: action.payload}

    } else {

        return state;

    }

}

