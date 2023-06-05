import { createAction } from "redux-api-middleware";
import types from './types';

export const getCosmeticsList = (currentPage, filterBy) => {
    let endpoint = `http://localhost:5000/cosmetics?size=4&page=${currentPage}`;

    if (filterBy !== '') {
        endpoint += `&type=${filterBy}`;
    }

    return createAction({
        endpoint,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            types.GET_COSMETICS_LIST_REQUEST,
            types.GET_COSMETICS_LIST_SUCCESS,
            types.GET_COSMETICS_LIST_FAILURE
        ]
    });
};
