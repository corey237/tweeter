/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */





$(document).ready(function() {
  const exampleTweet = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1675091713200
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1675178113200
    }
  ];
  const createTweetElement = function(tweetObj) {
    const tweetStructure = `
    <article class="tweet">
      <header class="header">
      <div class="avatarContainer">
      <img src="${tweetObj.user.avatars}" alt="User's profile picture"
        <p>${tweetObj.user.name}</p>
      </div>
      <p>${tweetObj.user.handle}</p>
      </header>
      <p class="tweetContent">${tweetObj.content.text}</p>
      <footer class="tweetFooter">
        <p class="days">${tweetObj.created_at}</p>
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
      $('.new-tweet').append(tweetHtml);
    }
  }

  renderTweets(exampleTweet);
})