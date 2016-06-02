// this is a reducer used in test.js
export default function search(counter = '', action) {
    switch (action.type) {
        case 'QUERY_SET':
            return action.text;
        case 'QUERY_CLEAR':
            return '';
        default:
            return counter;
    }
}
