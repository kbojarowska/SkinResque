import { createAction } from "redux-api-middleware";
import types from './types';

export const getCosmeticsList = (currentPage, skintype) => {
    return createAction({
        endpoint: `http://localhost:5000/cosmetics?size=10&page=${currentPage}&type=${skintype}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            types.GET_COSMETICS_LIST_SUCCESS,
            types.GET_COSMETICS_LIST_FAILURE
        ]
    })
}
