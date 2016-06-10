export default function logger({ getState }) {
    return next => action => {
        console.group();
        console.log('< dispatch', action);

        const result = next(action);

        console.log('> dispatch', getState());
        console.groupEnd();

        return result;
    };
}
