/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const renderTweets = tweets => {
    for (const tweet of tweets) {
      $('.container').append(createTweetElement(tweet));
    }
  };

  const createTweetElement = tweet => {
    const { user, content, created_at } = tweet;
    // const dateCreated = Math.floor((Date.now() - created_at) / (1000 * 36000 * 24)); //change later

    const tweetContainer = `
    <article class="tweet">
      <header>
        <div>
          <img src="${user.avatars}">
          <p>${user.name}</p>
        </div>
        <div class="handler">
          ${user.handle}
        </div>
      </header>
      <div>
        <p class="tweet">${content.text}</p>
      </div>
      <footer>
        <p>${timeago.format(created_at)}</p>
        <div class="icons">
          <i class="fa-sharp fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-retweet"></i>
          <i class="fa-sharp fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `;
    return tweetContainer;
  };

  const loadTweets = () => {
    $.ajax({ url: '/tweets', method: 'GET' })
      .then((res) => renderTweets(res));
  };
  loadTweets();

  $('.tweet-form').submit(function(event) {
    event.preventDefault();
    const form = $(this);
    const text = form.find('#tweet-text');
    if (text.val().length > 140) {
      alert('Your tweet exceeds the character limit of 140!');
    } else if (text.val() === '' || text.val() === null) {
      alert('Your tweet is empty!');
    } else {
      const serialized = form.serialize();
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: serialized
      });
      text.val('');
    }
  });
});