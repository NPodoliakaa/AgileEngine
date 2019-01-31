const client = require('./db');

const message = {
    save: message => {
        client
            .query(`INSERT INTO message VALUES(
                    '${message.id}', '{${message.recipients}}' , '${message.subject}', '${message.body}')`)
            .then(() => console.log(`Message with id ${message.id} was saved into db`))
            .catch(err => console.error(err.stack));
    },
    update: (id, key, value) => {
        client
            .query(`UPDATE message SET ${key} = ${value} WHERE id = '${id}'`)
            .then(() => console.log('Is_sent field was set'))
            .catch(err => console.error(err.stack));
    }
};

module.exports = message;
