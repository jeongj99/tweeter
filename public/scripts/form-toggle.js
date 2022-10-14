// jQuery script for the navbar button at the top right
$(document).ready(function() {
  // Event handler (hovering)
  $('.navbar-menu').hover(
    function() {
      const icon = $(this).find('i');
      icon.addClass('hovering'); // when hovered, it adds a class (this class causes the animation of angle-down icons)
    }, function() {
      const icon = $(this).find('i');
      icon.removeClass('hovering'); // removes the class, when you stop hovering
    }
  );

  // Event handler (click)
  $('.navbar-menu').click(function() {
    $('.new-tweet').slideToggle(); // slideToggle show or hide the new-tweet form when clicked
    $('.new-tweet').find('#tweet-text').focus(); // when you click and the form is shown, it focuses on the textarea (ready to type)
  });
});