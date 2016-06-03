import { COLLECTION_EMPTY, COLLECTION_UPDATE } from '../actions/collection';

export default function collection(state = [], action) {
    switch (action.type) {

        case COLLECTION_EMPTY:
            return [];

        case COLLECTION_UPDATE:
            const collection = action.collection;
            return Object.keys(collection).map(singleKey => collection[singleKey]);

        default:
            return state;
    }
}
