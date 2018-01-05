// $(document).ready(function(){
//   var $body = $('body');
//   // $body.html('');

//   var index = streams.home.length - 1;
//   while(index >= 0){
//     var tweet = streams.home[index];
//     var $tweet = $('<div></div>');
//     $tweet.text('@' + tweet.user + ': ' + tweet.message);
//     $tweet.appendTo($body);
//     index -= 1;
//   }
// });


var twittler = function() {

  var displayTweets = function(tweets) {
    var $tweetDisplay = $('.tweetDisplay');
    $tweetDisplay.html('');

    var index = tweets.length - 1;
    var numTweets = 0;
    while(index >= 0 && numTweets < 200){
      var tweet = tweets[index];
      var $tweet = $('<div class="tweet"><span class="user"></span><span class="message"></span></div>');

      $tweet.children('.user').text('@' + tweet.user);
      $tweet.children('.message').text(' : ' + tweet.message);
      $tweet.appendTo($tweetDisplay);

      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.text($.timeago(tweet.created_at));
      $timestamp.appendTo($tweetDisplay);

      index -= 1;
      numTweets++;
    }
  };

  var refreshFeed = function() {
    $('.refresh-tweet-button').text('Refresh tweets');
    displayTweets(streams.home);
  };

  var displayUserTweets = function(user) {
    $('.refresh-tweet-button').text('Show Feed');
    displayTweets(streams.users[user]);    
  };

  return {
    refreshFeed: refreshFeed,
    displayUserTweets: displayUserTweets
  }
}();

$(document).ready(function(){
  // Initialize display by showing home feed
  twittler.refreshFeed();
  $('.refresh-tweet-button').on('click', twittler.refreshFeed);
  $('.tweetDisplay').on('click', '.tweet .user', function(event) {
    var user = $(this).text().slice(1);
    console.log(user);
    twittler.displayUserTweets(user);
  });
});
