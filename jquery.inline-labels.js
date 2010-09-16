//= require <jquery>

/*!
* Cross-browser Inline Labels Plugin for jQuery
*
* Copyright (c) 2010 Mark Dodwell (@madeofcode)
* Licensed under the MIT license
*
* Version: 0.1.0
*/

(function($) {
  // define the plugin
  $.fn.inlineLabel = function(options) {
    // extend the default options with those provided
    // extending an empty object prevents overriding of our defaults object
    var opts = $.extend({}, $.fn.inlineLabel.defaults, options);

    // set as supported
    this.addClass('supported')

    // delegate mousedown to input
    .mousedown(function(e) {
      $.fn.inlineLabel.element.call($(this)).focus();
      e.preventDefault();
    })

    .each(function() {
      var label = $(this);
      var el = $.fn.inlineLabel.element.call($(this));

      // calc offset
      var leftOffset = el[0].tagName == "TEXTAREA" ? 0 : 2;

      // adopt styling of inputs
      label.css({
        fontSize: el.css('fontSize'),
        fontFamily: el.css('fontFamily'),
        fontWeight: el.css('fontWeight'),
        lineHeight: el.css('lineHeight'),
        letterSpacing: el.css('letterSpacing'),
        top: el.position().top + innerOffset(el).top,
        left: el.position().left + innerOffset(el).left + leftOffset,
        width: el.width() - leftOffset
      });

      // set input as having inline label
      el.addClass('field_with_inline_label').data('inline.label', label);

      // show input if empty
      if (isEmpty(el)) label.addClass("empty");
    });

    // elm behaviours
    $(".field_with_inline_label")

    // focus behaviours
    .focus(function() {
      var el = $(this);
      var label = el.data('inline.label');

      // focus label
      label.addClass("focus");

      // clear existing timer (maybe don't need this?)
      var timer = el.data('inline.timer');
      window.clearInterval(timer);
      el.data('inline.timer', null);

      // set timer
      el.data('inline.timer', window.setInterval(function() {
        if (isPresent(el)) label.removeClass('empty');
      }, 25));
    })

    // blur behaviours
    .blur(function() {
      var el = $(this);
      var label = el.data('inline.label');

      // unfocus label
      label.removeClass("focus");

      // cancel timer
      var timer = el.data('inline.timer');
      window.clearInterval(timer);
      el.data('inline.timer', null);

      // show label on blur if field empty
      if (isEmpty(el)) label.addClass("empty");
    });

    // ready! show labels
    // return this so that it can be chained
    return this.show();
  };

  // private function that can only be used within the plugin
  function innerOffset(obj) {
    var el = $(obj);

    // TODO check for nil?
    var topOffset =
      parseInt(el.css('marginTop')) +
      parseInt(el.css('paddingTop')) +
      parseInt(el.css('borderTopWidth'));

    // TODO check for nil?
    var leftOffset =
      parseInt(el.css('marginLeft')) +
      parseInt(el.css('paddingLeft')) +
      parseInt(el.css('borderLeftWidth'));

    return { top: topOffset, left: leftOffset };
  };

  function isEmpty(obj) {
    return $(obj)[0].value === '';
  };

  // is an input present
  function isPresent(obj) {
    return !isEmpty(obj);
  };

  // public helper function that can be overridden by the user
  $.fn.inlineLabel.element = function() {
    return $('#' + this.attr('for'));
  };

  // plugin defaults
  $.fn.inlineLabel.defaults = {
  }; // none yet
})(jQuery);

