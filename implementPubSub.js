// A simple message logger that logs any topics and data received through our
// subscriber
var messageContainer = document.getElementById('messageContainer');
function addElement (content) {
  var newDiv = document.createElement("div");
  var newContent = document.createTextNode(content.toString());
  newDiv.appendChild(newContent); //add the text node to the newly created div.
  messageContainer.appendChild(newDiv);
}

var addMessageBtn =  document.getElementById('messageSender');
var messageBody =  document.getElementById('messageBody');

addMessageBtn.addEventListener('click', function(){
  var message = messageBody.value;
  pubsub.publish( "outbox/sentMessage", message);

});

var messageLogger = function ( topics, data ) {
    addElement( "Logging: " + topics + ": " + data );
    console.log( "Logging: " + topics + ": " + data );
};

var sentConfirmator = function(topics, data){
  addElement( "Sent Message: " + topics + ": " + data );
  console.log( "Sent Message: " + topics + ": " + data );
};

// Subscribers listen for topics they have subscribed to and
// invoke a callback function (e.g messageLogger) once a new
// notification is broadcast on that topic
var newMessageSubscription = pubsub.subscribe( "inbox/newMessage", messageLogger );
var sentMessageSubscription =  pubsub.subscribe("outbox/sentMessage", sentConfirmator);

// Publishers are in charge of publishing topics or notifications of
// interest to the application. e.g:

pubsub.publish( "inbox/newMessage", "hello world!" );

// or
pubsub.publish( "inbox/newMessage", ["test", "a", "b", "c"] );

// or
pubsub.publish( "inbox/newMessage", {
  sender: "hello@google.com",
  body: "Hey again!"
});

pubsub.publish("outbox/sentMessage", "A message containing information");

// We can also unsubscribe if we no longer wish for our subscribers
// to be notified
pubsub.unsubscribe( newMessageSubscription );

// Once unsubscribed, this for example won't result in our
// messageLogger being executed as the subscriber is
// no longer listening
pubsub.publish( "inbox/newMessage", "Hello! are you still there?" );
