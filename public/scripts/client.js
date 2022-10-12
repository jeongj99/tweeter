/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
// Temporary tweetData
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
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
    "created_at": 1461113959088
  }
];

const renderTweets = tweets => {
  for (const tweet of tweets) {
    $('.container').append(createTweetElement(tweet));
  }
};

const createTweetElement = tweet => {
  const { user, content, created_at } = tweet;
  const dateCreated = Math.floor((Date.now() - created_at) / (1000 * 36000 * 24)); //change later

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
        <p>${dateCreated} days ago</p>
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
  renderTweets(data);
});