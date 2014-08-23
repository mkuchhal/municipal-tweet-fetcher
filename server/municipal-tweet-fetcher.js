// Sets up the tweet fetching and storing mechanism using the Twitter stream
// API.

var log = new Logger('app');

// Create the Twitter API object
var Twit = new TwitMaker({
  consumer_key: 'H7KxTzrTAh41NT2OuF5LChYVK',
  consumer_secret: 'xIcrI497toRE7WVBS0MKpYnjYVhdvSpTR5TDeFbAiGnHVtl84x',
  access_token: '2731059560-izGpONMqZ0aVqoex8RIAPGy6TDAVLbtukcreBZm',
  access_token_secret: 'Qdehiila8IYLGuAZM2ScAQwxolvm53B4zdNNlZoCR7eI8'
});

Meteor.startup(function () {
  var stream = Twit.stream('statuses/filter', { track: '@bmcpl' });

  stream.on('tweet',
    Meteor.bindEnvironment(
      function (tweet) {
        log.info('Received tweet: ' + tweet['text']);

        Tweets.insert(tweet);
      }
    )
  );

  stream.on('connected', function (request) {
    log.info('Conntected to Twitter stream');
  });

  stream.on('discoonnect', function (disconnectMessage) {
    log.warn('Disconnected from Twitter stream: ' + disconnectMessage);
  });
});
