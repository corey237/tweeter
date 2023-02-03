$(document).ready(function() {
  
  //FUNCTION FOR DATA CLEANING/CROSS SITE SCRIPTING PREVENTION
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //FUNCTION FOR CREATING HTML ELEMENT CONTAINING TWEET DATA FROM DATABASE
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

  //FUNCTION FOR LOOPING THROUGH DATABASE AND CREATING TWEET ELEMENTS
  const renderTweets = function(tweetsArr) {
    for (const tweet of tweetsArr) {
      const tweetHtml = createTweetElement(tweet);
      $('#tweets-container').prepend(tweetHtml);
    }
  }

  //FUNCTION FOR CLEARING DOM OF OLD TWEET DATA AND LOADING NEW CONTENT
  const loadTweets = function() {
    $.get('/tweets')
    .then((data) => {
      $('#tweets-container').empty();
      renderTweets(data);
    })
  }

  //CHECK NEW TWEET FOR ERRORS, POST DATA IF OK AND RUN LOAD TWEETS FUNCTION
  $('#tweet-form').on('submit', function (event) {
    event.preventDefault();
    if ($('#tweet-text').val().length > 140) {
      $('.error-block').html('Error. Character count over 140');
      $('.error-block').show()
      return;
    } else if ($('#tweet-text').val().length === 0) {
      $('.error-block').html('Error: No text found.');
      $('.error-block').show()
      return;
    } else {
      $('#error-block').html('');
      $('.error-block').hide()
      const data = $(this).serialize();
      $.post('/tweets', data)
      .then(() => { 
        loadTweets();
      })
    }
  })

  //TOGGLE FOR WRITE A TWEET SECTION (HIDE ON INITIAL LOAD, SHOW IF THE WRITE A NEW TWEET BUTTON IS CLICKED)
  $('.new-tweet').hide();

  $('.newTweetArrow').click(function () {
    if ($('.new-tweet').is(':hidden')) {
      $('.new-tweet').show();
    } else {
      $('.new-tweet').hide();
    }
  })
  loadTweets();
})