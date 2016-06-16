export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_LOADED = 'AUTH_LOADED';
export const AUTH_CREATED = 'AUTH_CREATED';
export const AUTH_CLEARED = 'AUTH_CLEARED';

export function authLoading() {
    return {
        type: AUTH_LOADING
    };
}

export function authLoaded(user) {
    return {
        type: AUTH_LOADED,
        user
    };
}

export function userCreated(user) {
    return {
        type: AUTH_CREATED,
        user
    };
}

export function testAuth(user) {
    return {
        type: AUTH_LOADED,
        user
    };
}

export function authCleared() {
    return {
        type: AUTH_CLEARED
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
            if ([200, 304].includes(response.status)) {
                return response.json();
            } else {
                return new Promise(resolve => resolve({ error: response.statusText }));
            }
        }).then(data => {
            dispatch(authLoaded(data));
        });
    };
}

export function authLogout(credentials) {
    return dispatch => {
        dispatch(authLoading());
        fetch('/api/logout', {
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if ([200, 304].includes(response.status)) {
                return response.json();
            } else {
                return new Promise(resolve => resolve({ error: response.statusText }));
            }
        }).then(data => {
            dispatch(authCleared(data));
        });
    };
}

export function newUser(credentials) {
    return dispatch => {
        dispatch(authLoading());
        fetch('/api/newuser', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => {
            if ([200, 304].includes(response.status)) {
                return response.json();
            } else {
                return new Promise(resolve => resolve({ error: response.statusText }));
            }
        }).then(data => {
            dispatch(userCreated(data));
        });
    };
}

export function authRestore() {
    return dispatch => {
        fetch('/api/login', {
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if ([200, 304].includes(response.status)) {
                return response.json();
            } else {
                return new Promise(resolve => resolve({ error: response.statusText }));
            }
        }).then(data => {
            dispatch(authLoaded(data));
        });
    };
}
