const QUERY_SET = 'QUERY_SET';
const QUERY_CLEAR = 'QUERY_CLEAR';

export function querySetting(text) {
    return {
        type: QUERY_SET,
        text
    };
}

export function queryClear() {
    return {
        type: QUERY_CLEAR
    };
}

export function querySet(text) {
    // you can dispatch a ADDING_TODO action here
    return (dispatch, getState) => {
        dispatch(querySetting(text));
        // the following line is always an async ajax call, like:
        // return fetch().then().then(data => dispatch(addedTodo(data)))
        // here we use setTimeout to fake one
        fetch('https://api.deckbrew.com/mtg/cards?name=' + text).then(data=> {
            console.log(data);
        });
    };
}
