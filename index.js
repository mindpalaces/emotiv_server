const Cortex = require('./lib/cortex');
const numbers = require('./src/numbers.js');

//------- SET UP EMOTIVE
const verbose = process.env.LOG_LEVEL || 1;
const options = { verbose };
const avgWindow = 10;
const client = new Cortex(options);

//--------


//-------- SETUP OSC
const osc = require('osc');

const udpPort = new osc.UDPPort({
  localAddress: 'localhost',
  localPort: 57121
})

udpPort.on('ready', function() {
  console.log('udp ready');
});

udpPort.on('error', function(err) {
  console.log('udp error: ', err);
})

udpPort.open();

client.ready.then(() => client.init()).then(() =>
  numbers(client, avgWindow, averages => {
    const output = Object.keys(averages)
      .map(k => `${k}: ${averages[k].toFixed(2)}`)
      .join(", ");

    console.log(averages);
    // console.log('send');
    udpPort.send({
      timeTag: osc.timeTag(0),
      packets: [
        {
          address: '/eeg/theta',
          args: [
            {
              type: 'i',
              value: averages.theta
            }
          ]
        },
        {
          address: '/eeg/alpha',
          args: [
            {
              type: 'f',
              value: averages.alpha,
            }
          ]
        },
        {
          address: '/eeg/betaL',
          args: [
            {
              type: 'f',
              value: averages.betaL,
            }
          ]
        },
        {
          address: '/eeg/betaH',
          args: [
            {
              type: 'f',
              value: averages.betaH,
            }
          ]
        },
        {
          address: '/eeg/gamma',
          args: [
            {
              type: 'f',
              value: averages.gamma,
            }
          ]
        },
        {
          address: '/eeg/foc',
          args: [
            {
              type: 'f',
              value: averages.foc,
            }
          ]
        }
      ]
    });
  })
);

console.log('ok');