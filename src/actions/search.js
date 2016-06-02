export const QUERY_SET = 'QUERY_SET';
export const CARDS_LOADED = 'CARDS_LOADED';
export const QUERY_CLEAR = 'QUERY_CLEAR';

export function querySet(text) {
    return {
        type: QUERY_SET,
        text
    };
}

export function cardsLoaded(cards) {
    return {
        type: CARDS_LOADED,
        cards
    };
}

export function queryClear() {
    return {
        type: QUERY_CLEAR
    };
}
