const Router = require('koa-router');
const messageService = require('./message-service');

const router = new Router();

router.post("/message-service", ctx => messageService(ctx));

module.exports = router;
