import types from './types';

export const cosmeticsReducer = (state = [], action) => {
    switch(action.type){
        case types.GET_COSMETICS_LIST_SUCCESS:
            return [...action.payload];
        case types.GET_COSMETICS_LIST_FAILURE:
            return alert("error in getting cosmetics list")
        default:
            return state;
    }
}
