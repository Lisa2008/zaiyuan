const https = require('https');

https.get('https://code.jquery.com/jquery-3.5.1.slim.min.js', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
        data += chunk;
    });
    resp.on('end', () => {
        console.log(data);
    })
}).on('error', (err) => {
    console.log('Error: ' + err.message);
});