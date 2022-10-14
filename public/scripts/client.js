// Every function that occurs inside the document ready will run after the html of documents found in index.html are loaded
$(document).ready(() => {

  /*
  A function that goes through each tweet object from the tweets arrays from the database containing the tweets
  Uses the createTweetElement to create the html markups using jquery
  */
  const renderTweets = tweets => {
    for (const tweet of tweets) {
      $('.new-tweet').after(createTweetElement(tweet));
    }
  };

  // A function that receives a tweet object and creates an html markup using jquery
  const createTweetElement = tweet => {
    // Destructuring the tweet object
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
    $tweet.text(content.text); // Used .text to escape cross-site scripting

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

  // Function that gets the initial tweets from /tweets and uses the renderTweets function to create html markups and display it
  const loadInitialTweets = () => {
    $.ajax({ url: '/tweets', method: 'GET' })
      .then((res) => renderTweets(res));
  };

  // Calling the function to show in the page once the page is loaded
  loadInitialTweets();

  // Function that gets the most recent posted tweet from /tweets and uses the renderTweets function to create html markups and display it
  const loadNewTweet = () => {
    $.ajax({ url: '/tweets', method: 'GET' })
      .then((res) => renderTweets([res[res.length - 1]]));
  };

  // Event handler when a tweet is submitted
  $('.tweet-form').submit(function(event) {
    event.preventDefault();
    $('.error').slideUp(); // Error message is gone when pressed submit
    $('.error p').empty(); // Error message in the paragraph is erased

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
      // jquery AJAX for the POST route that sends the submitted tweet as a serialized data (query string) to /tweets
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: serialized
      })
        .then(() => {
          text.val(''); // Once submitted, the textarea empties
          form.find('.counter').val(140); // The counter resets
          loadNewTweet(); // The loadNewTweet function is called to load the new tweet without refreshing
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
    $('.new-tweet').slideToggle();
    $('.new-tweet').find('#tweet-text').focus();
  });

  $(document).scroll(function() {
    const navbar = $(document).find('.navbar-top');
    navbar.toggleClass('scrolled', $(this).scrollTop() > navbar.height());
  });
});
