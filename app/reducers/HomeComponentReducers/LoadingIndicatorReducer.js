import { SHOW_MODAL_LOADER, LOAD_TOTAL_USERS_TO_EXTRACT, CURRENT_EXTRACT_COUNT, RESET_LOADER_UI_STATE } from '../../actions/HomeComponentActions/TriggerValidate/actionTypes';

const initialState = {
    showModal: false,
    totalUsers: 0,
    currentExtractCount: 0
}

export default function loadingIndicatorReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_MODAL_LOADER:
            
            return {...state, showModal: action.payload}
        
        case LOAD_TOTAL_USERS_TO_EXTRACT:
            
            return {...state, totalUsers: action.payload}

        case CURRENT_EXTRACT_COUNT:
        
            return {...state, currentExtractCount: action.payload}
        
        case RESET_LOADER_UI_STATE:
        
            return {...state, totalUsers: 0, currentExtractCount: 0}
    
        default:
            
            return state;
    }
}