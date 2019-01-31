const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routes');
const db = require('./db');
const port = 8080;
const app = new Koa();

app.use(bodyParser());
app.use(router.routes());

app.listen(port, () => console.log(`Listening on port ${port}`));
