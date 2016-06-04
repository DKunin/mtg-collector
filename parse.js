'use strict';

var fs = require('fs');
var csvParsed = fs.readFileSync('./editions').toString().split('\n').map(singleLine => {
    const obj = singleLine.split(',');
    return { code: obj[0], name: obj[1] };
});
fs.writeFileSync('./editions.json', JSON.stringify(csvParsed, null, 4));
