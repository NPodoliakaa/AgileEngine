const uuid = require('uuid/v4');
const dbMessage = require('./message-db');
const request = require('request-promise');

module.exports = async ctx => {
    const { recipients, subject, message: messageBody } = ctx.request.body;
    const message = {
        id: uuid(),
        recipients,
        subject,
        body: messageBody
    };

    await dbMessage.save(message);

    request.post('https://some/external/notification/service', message)
        .then(() => dbMessage.update(message.id, 'is_sent', true))
        .catch(() => dbMessage.update(message.id, 'is_sent', false));

    ctx.response.status = 200;
    ctx.response.body = message.id;
};
