export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_LOADED = 'AUTH_LOADED';

export function authLoading() {
    return {
        type: AUTH_LOADING
    };
}

export function authLoaded(cards) {
    return {
        type: AUTH_LOADED,
        cards
    };
}

export function authLoad(credentials) {
    return dispatch => {
        dispatch(authLoading());
        fetch('/api/login', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                return new Promise(resolve => resolve({ error: response.statusText }));
            }
        }).then(data => {
            dispatch(authLoaded(data));
        });
    };
}
