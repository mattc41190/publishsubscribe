var pubsub = {}; // Create PubSub Obj

(function(emailService) {

    // Storage for topics that can be broadcast
    // or listened to
    var topics = {};

    // A topic identifier
    var subUid = -1;

    // Publish or broadcast events of interest
    // with a specific topic name and arguments
    // such as the data to pass along
    emailService.publish = function( topic, args ) {

        console.log(topics);
        if ( !topics[topic] ) {
            return false;
            // if the topic is NOT in the topics obj above, return false
        }

        var subscribers = topics[topic];
        // subscribers is equal to prop in the topic obj we passed in
        var len = subscribers ? subscribers.length : 0;
        // if subscribers is truthy then len is subscribers.length otherwise len is 0
        console.log(len);
        while (len--) {
            subscribers[len].func( topic, args );
        }

        return this;
        // return myObject
    };

    // Subscribe to events of interest
    // with a specific topic name and a
    // callback function, to be executed
    // when the topic/event is observed
    emailService.subscribe = function( topic, func ) {

        if (!topics[topic]) {
            topics[topic] = [];
        }

        var token = ( ++subUid ).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };

    // Unsubscribe from a specific
    // topic, based on a tokenized reference
    // to the subscription
    emailService.unsubscribe = function( token ) {
        for ( var m in topics ) {
            if ( topics[m] ) {
                for ( var i = 0, j = topics[m].length; i < j; i++ ) {
                    if ( topics[m][i].token === token ) {
                        topics[m].splice( i, 1 );
                        return token;
                    }
                }
            }
        }
        return this;
    };
}( pubsub ));
