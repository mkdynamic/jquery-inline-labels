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

    // return this so that it can be chained
    // delegate mousedown to input
    return this.mousedown(function(e) {
      $.fn.inlineLabel.element.call($(this)).focus();
      e.preventDefault();
    })

    .each(function() {
      var label = $(this);
      var input = $.fn.inlineLabel.element.call($(this));

      // calc offset
      var leftOffset = input[0].tagName == "TEXTAREA" ? 0 : 2;

      label.css({
        // reset some styles
        position:       "absolute",
        cursor:         "text",
        display:        "none",
        overflow:       "hidden",
        padding:        0,
        margin:         0,
        border:         0,
        //and some opacity
        opacity:        0.75
      })
      .css({
        // adopt styling of inputs
        fontSize:       input.css('fontSize'),
        fontFamily:     input.css('fontFamily'),
        fontWeight:     input.css('fontWeight'),
        lineHeight:     input.css('lineHeight'),
        letterSpacing:  input.css('letterSpacing'),
        top:            input.position().top + innerOffset(input).top,
        left:           input.position().left + innerOffset(input).left + leftOffset,
        width:          input.width() - leftOffset
      });

      // set input as having inline label
      input.addClass('field_with_inline_label').data('inline.label', label);

      if (isEmpty(input))
        showLabel(label, opts);

      input
      // focus behaviours
      .focus(function() {
        var el = $(this);
        var label = el.data('inline.label');

        // focus label
        label.addClass("inline-focus");

        if(isEmpty($(this))){
          showLabel(label, opts);
        } else {
          label.hide();
        }
      }).blur(function() {
        var el = $(this);
        var label = el.data('inline.label');

        // unfocus label
        label.removeClass("inline-focus");

        if(isEmpty($(this))){
          showLabel(label, opts);;
        } else {
          label.hide();
        }

      })

      // input is fired when typing, pasting, cutting
      .bind('input', function() {
        var label = $(this).data('inline.label');
        label.addClass("inline-focus");

        if(isEmpty($(this))){
          showLabel(label, opts);
        } else {
          label.hide();
        }
      });
    });

  };

  function showLabel(label, opts) {
    if(label.is(".inline-focus"))
      label.css({opacity:opts.focus_opacity});
    else
      label.css({opacity:opts.opacity});

    label.show();
  }

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
    return obj.val() === '';
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
    opacity: 0.75,
    focus_opacity: 0.25
  }; // none yet
})(jQuery);

