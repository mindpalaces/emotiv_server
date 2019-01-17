const raw = require('./utils/raw');
const Cortex = require('../lib/cortex');

console.log('eeg init');

const verbose = process.env.LOG_LEVEL || 3;
const options = { verbose };

const client = new Cortex(options);


//check Emotiv website for headset/account creds
const auth = {
  username: '',
  password: '',
  client_id: '',
  client_secret: '',
  debit: 1,
}

client.ready
  .then(() => client.init(auth))
  .then(() => {
    console.log('ok');
    raw(client);
  })

console.log('finished');