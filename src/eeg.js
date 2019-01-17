const raw = require('./utils/raw');
const Cortex = require('../lib/cortex');

console.log('eeg init');

const verbose = process.env.LOG_LEVEL || 3;
const options = { verbose };

const client = new Cortex(options);



const auth = {
  username: 'mindpalace',
  password: 'M1ndp4l4c3!',
  client_id: "PpcHRpFW3XfkbX8tlO7iAmIA0ohio6Yoat7KlZNA",
  client_secret: "drDzKXjDAZ3JvfhZXOHEwXMvGUR389WGlH7YEliFHtR4pnAQ5jkywnQ3WYRXVywHroVJPHhLhRM8z2DSKXUL6dq7m54xXgYzyLjwsmzFgCcLbQx5F56TkiKGUXwchoIv",
  debit: 1,
}

client.ready
  .then(() => client.init(auth))
  .then(() => {
    console.log('ok');
    raw(client);
  })

console.log('finished');