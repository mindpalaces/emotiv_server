const raw = (client) => {
  console.log('raw');
  // console.log(client);
  client.createSession({
      status: 'active',
      title: 'session_01'
    })
    .then(res => {
      console.log('session: ', res);
      client.subscribe({
        streams: ['eeg']
      })
    })
};

module.exports = raw;