var fs = require('fs');

var stream = fs.createReadStream('./sample.txt', { encoding :'utf8'});
/*
Events - open, data, end, close, error
*/
/*
var counter = 0;

stream.on('open', () => {
    console.log('File read initiated');
});

stream.on('data', chunk => {
    ++counter;
    console.log(chunk);
});

stream.on('end', () => {
    console.log('Thats all folks!');
    console.log(`read count = ${counter}`);
});

stream.on('error', (err) => {
    console.log(err);
});
*/

stream.pipe(process.stdout);