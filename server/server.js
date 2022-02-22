const app = require('./index.js');
const port = process.ENV || 3000;

app.listen(port => console.log('Listening on:', port));