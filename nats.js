var NATS = require('nats');
var nats = NATS.connect();

const publish = (message) => {
  nats.publish('foo', message);
}

// Simple Subscriber
nats.subscribe('foo', function (msg) {
  console.log('Received a message: ' + msg);
  return msg
});

let eventID


  nats.subscribe('eventID', function (msg) {
    console.log('Received eventID: ' + msg);
    eventID = msg
  })


module.exports = {
  publish: publish,
  // subscribeToEventID: subscribeToEventID,
  eventID: eventID
}