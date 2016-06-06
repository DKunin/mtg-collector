export const COLLECTION_EMPTY = 'COLLECTION_EMPTY';
export const COLLECTION_UPDATE = 'COLLECTION_UPDATE';
export const COLLECTION_ADD_CARD = 'COLLECTION_ADD_CARD';
export const COLLECTION_REMOVE_CARD = 'COLLECTION_REMOVE_CARD';
import serialize from 'form-serialize';
export function collectionLoading() {
    return {
        type: COLLECTION_EMPTY
    };
}

export function collectionLoaded(collection) {
    return {
        type: COLLECTION_UPDATE,
        collection
    };
}

export function collectionLoad() {
    return dispatch => {
        dispatch(collectionLoading());
        fetch('/api/collection')
            .then(response => response.json()).then(data => {
                dispatch(collectionLoaded(data));
            });
    };
}

export function collectionAddCard(id) {
    return dispatch => {
        dispatch(collectionLoading());
        fetch('/api/addCard?id=' + id, {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json()).then(data => {
            dispatch(collectionLoaded(data));
        });
    };
}

export function collectionRemoveCard(id) {
    return dispatch => {
        dispatch(collectionLoading());
        fetch('/api/removeCard?id=' + id, {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json()).then(data => {
            dispatch(collectionLoaded(data));
        });
    };
}

export function collectionUpdateCard(id, form) {
    return dispatch => {
        fetch('/api/updateCard?id=' + id, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(serialize(form, { hash: true }))
        })
        .then(response => response.json()).then(data => {
            dispatch(collectionLoaded(data));
        });
    };
}

export function collectionImportCards(list) {
    return dispatch => {
        dispatch(collectionLoading());
        fetch('/api/importCards', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(list)
        })
        .then(response => response.json()).then(data => {
            dispatch(collectionLoaded(data));
        });
    };
}
