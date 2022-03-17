const app = require('./index.js');
// const port = process.env.PORT || 8080;
const port = 8080;

app.listen(port, () => console.log('Listening on:', port));