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

    // delegate mousedown to input
    this.mousedown(function(e) {
      $.fn.inlineLabel.element.call($(this)).focus();
      e.preventDefault();
    })

    .each(function() {
      var label = $(this);
      var el = $.fn.inlineLabel.element.call($(this));

      // calc offset
      var leftOffset = el[0].tagName == "TEXTAREA" ? 0 : 2;

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
        fontSize:       el.css('fontSize'),
        fontFamily:     el.css('fontFamily'),
        fontWeight:     el.css('fontWeight'),
        lineHeight:     el.css('lineHeight'),
        letterSpacing:  el.css('letterSpacing'),
        top:            el.position().top + innerOffset(el).top,
        left:           el.position().left + innerOffset(el).left + leftOffset,
        width:          el.width() - leftOffset
      });

      // set input as having inline label
      el.addClass('field_with_inline_label').data('inline.label', label);

      if (isEmpty(el)) {
        if(label.is("inline-focus"))
          label.css({opacity:opts.focus_opacity});
        else
          label.css({opacity:opts.opacity});
        label.show();
      }
    });

    // elm behaviours
    $(".field_with_inline_label")

    // focus behaviours
    .focus(function() {
      var el = $(this);
      var label = el.data('inline.label');

      // focus label
      label.addClass("inline-focus");

      if(isEmpty($(this))){
        label.css({opacity:opts.focus_opacity});
        $(this).data('inline.label').show();
      } else {
        $(this).data('inline.label').hide();
      }
    }).blur(function() {
      var el = $(this);
      var label = el.data('inline.label');

      // unfocus label
      label.removeClass("inline-focus");

      if(isEmpty($(this))){
        label.css({opacity:opts.opacity});
        $(this).data('inline.label').show();
      } else {
        $(this).data('inline.label').hide();
      }

    })

    // input is fired when typing, pasting, cutting
    .bind('input', function() {
      if(isEmpty($(this))){
        label.css({opacity:opts.opacity});
        $(this).data('inline.label').show();
      } else {
        $(this).data('inline.label').hide();
      }
    });

    // ready! show labels
    // return this so that it can be chained
    return this;
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
    return obj[0].value === '';
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

