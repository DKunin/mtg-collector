export const PRICE_LOADING = 'PRICE_LOADING';
export const PRICE_LOADED = 'PRICE_LOADED';

export function priceLoading() {
    return {
        type: PRICE_LOADING
    };
}

export function priceLoaded(price) {
    return {
        type: PRICE_LOADED,
        price
    };
}

export function priceLoad(text) {
    return dispatch => {
        dispatch(priceLoading());
        fetch(`/api/possible-price?query=${text}`, {
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json()).then(data => {
                dispatch(priceLoaded(data));
            });
    };
}
