var cloneArray = function(array) {
    return array.slice(0);
};
var head = function(array) {
    return cloneArray(array)[0];
};
var prop = function(string) {
    return function(object) {
        return object && object[string] ? object[string] : '';
    };
};
var filterByColor = function(color) {
    return function(array) {
        return cloneArray(array).filter(singleItem => {
            return singleItem.colors && singleItem.colors.indexOf(color) !== -1;
        });
    };
};
module.exports = {
    cloneArray,
    head,
    prop,
    filterByColor
};
