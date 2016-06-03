export const CARDS_LOADING = 'CARDS_LOADING';
export const CARDS_LOADED = 'CARDS_LOADED';

export function cardsLoading() {
    return {
        type: CARDS_LOADING
    };
}

export function cardsLoaded(cards) {
    return {
        type: CARDS_LOADED,
        cards
    };
}

export function cardsLoad(text) {
    return dispatch => {
        dispatch(cardsLoading());
        fetch('/api/search/' + text)
            .then(response => response.json()).then(data => {
                dispatch(cardsLoaded(data));
            });
    };
}
