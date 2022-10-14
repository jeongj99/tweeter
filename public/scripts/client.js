/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  const renderTweets = tweets => {
    for (const tweet of tweets) {
      $('.new-tweet').after(createTweetElement(tweet));
    }
  };

  const createTweetElement = tweet => {
    const { user, content, created_at } = tweet;

    let $tweetContainer = $('<article class="tweet">');
    const $header = $(`
      <header>
        <div>
          <img src="${user.avatars}">
          <p>${user.name}</p>
        </div>
        <div class="handler">
          ${user.handle}
        </div>
      </header>`);
    const $middle = $('<div class="tweet">');
    const $tweet = $('<p>');
    $tweet.text(content.text);
    $middle.append($tweet);
    const $footer = $(`
      <footer>
        <p>${timeago.format(created_at)}</p>
          <div class="icons">
            <i class="fa-sharp fa-solid fa-flag"></i>
            <i class="fa-sharp fa-solid fa-retweet"></i>
            <i class="fa-sharp fa-solid fa-heart"></i>
          </div>
      </footer>
    `);
    $tweetContainer.append($header);
    $tweetContainer.append($middle);
    $tweetContainer.append($footer);

    return $tweetContainer;
  };

  const loadTweets = () => {
    $.ajax({ url: '/tweets', method: 'GET' })
      .then((res) => renderTweets(res));
  };
  loadTweets();

  const loadNewTweet = () => {
    $.ajax({ url: '/tweets', method: 'GET' })
      .then((res) => renderTweets([res[res.length - 1]]));
  };

  $('.tweet-form').submit(function(event) {
    event.preventDefault();
    $('.error').slideUp();
    $('.error p').empty();
    const form = $(this);
    const text = form.find('#tweet-text');
    if (text.val().length > 140) {
      $('.error p').append('Your tweet exceeds the character limit of 140!');
      $('.error').slideDown();
    } else if (text.val() === '' || text.val() === null) {
      $('.error p').append('Your tweet is empty!');
      $('.error').slideDown();
    } else {
      const serialized = form.serialize();
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: serialized
      })
        .then(() => {
          text.val('');
          form.find('.counter').val(140);
          loadNewTweet();
        });
    }
  });


  $('.navbar-menu').hover(
    function() {
      const icon = $(this).find('i');
      icon.addClass('hovering');
    }, function() {
      const icon = $(this).find('i');
      icon.removeClass('hovering');
    }
  );

  $('.navbar-menu').click(function() {
    $('html, body').animate({
      scrollTop: 400
    }, 2000);
  });

  $(document).scroll(function() {
    const navbar = $(document).find('.navbar-top');
    navbar.toggleClass('scrolled', $(this).scrollTop() > navbar.height());

  });

});
