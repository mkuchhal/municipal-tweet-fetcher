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
        var conciseTweet = removeUnwantedTweetFields(tweet);

        log.info('Received tweet: ' + tweet['text']);

        Tweets.insert(conciseTweet);
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

/**
 * Removes unwanted fields from a tweet returned by Twitter, since we don't
 * need to store everything in the database.
 * @param {object} tweet - A Tweet as returned by the Twitter API.
 * @returns {object} The pared down tweet, suitable for storage in the DB.
 */
function removeUnwantedTweetFields(tweet) {
  var tweetUser = tweet['user'];

  // We have tried to preserve the order of the fields as returned from
  // Twitter
  return {
    created_at: tweet['created_at'],
    id_str: tweet['id_str'],
    text: tweet['text'],
    in_reply_to_status_id_str: tweet['in_reply_to_status_id_str'],
    in_reply_to_user_id_str: tweet['in_reply_to_user_id_str'],
    in_reply_to_screen_name: tweet['in_reply_to_screen_name'],
    user: {
      id_str: tweetUser['id_str'],
      screen_name: tweetUser['screen_name'],
      location: tweetUser['location']
    },
    retweet_count: tweet['retweet_count'],
    favorite_count: tweet['favorite_count']
  };
}
