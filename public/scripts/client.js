/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */





$(document).ready(function() {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetObj) {
    const tweetStructure = `
    <article class="tweet">
      <header class="header">
      <div class="avatarContainer">
      <img src="${escape(tweetObj.user.avatars)}" alt="User's profile picture"
        <p>${escape(tweetObj.user.name)}</p>
      </div>
      <p>${escape(tweetObj.user.handle)}</p>
      </header>
      <p class="tweetContent">${escape(tweetObj.content.text)}</p>
      <footer class="tweetFooter">
        <p class="days">${escape(timeago.format(tweetObj.created_at))}</p>
        <div class="icons">
           <i class="fa-solid fa-flag report"></i>
           <i class="fa-solid fa-retweet retweet"></i>
           <i class="fa-solid fa-heart favourite"></i>
        </div>
      </footer>
    </article>
    `
    return tweetStructure;
  }

  const renderTweets = function(tweetsArr) {
    for (const tweet of tweetsArr) {
      const tweetHtml = createTweetElement(tweet);
      $('#tweets-container').prepend(tweetHtml);
    }
  }

  const loadTweets = function() {
    $.get('/tweets')
    .then((data) => {
      $('#tweets-container').empty();
      renderTweets(data);
    })
  }

  $('#tweet-form').on('submit', function (event) {
    event.preventDefault();
    if ($('#tweet-text').val().length > 140) {
      $('#error-block').html('Error. Character count over 140');
      $('#error-block').addClass('error-block')
      return;
    } else if ($('#tweet-text').val().length === 0) {
      $('#error-block').html('Error: No text found.');
      $('#error-block').addClass('error-block')
      return;
    } else {
      $('#error-block').html('');
      $('#error-block').removeClass('error-block')
      const data = $(this).serialize();
      $.post('/tweets', data)
      .then(() => { 
        loadTweets();
      })
    }
  })
  loadTweets();
})