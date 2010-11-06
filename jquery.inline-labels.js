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
      opts.labelFieldLookupFunction.call($(this)).mousedown();
      e.preventDefault();
    })

    .addClass(opts.labelClass)

    .each(function() {
      var label = $(this);
      var input = opts.labelFieldLookupFunction.call($(this));

      // hook into the resize event so we can adjust the label position when the window resizes
      $(window).resize(function(){
        label.css({
          // adopt styling of inputs
          top:            input.position().top + innerOffset(input).top,
          left:           input.position().left + innerOffset(input).left + leftOffset,
          width:          input.width() - leftOffset
        });
      });

      // calc offset
      var leftOffset = input[0].tagName == 'TEXTAREA' ? 0 : 2;

      if(!opts.useExternalCSS)
        label.css({
          // reset some styles
          position:       'absolute',
          cursor:         'text',
          display:        'none',
          overflow:       'hidden',
          padding:        0,
          margin:         0,
          border:         0,
          //and some opacity
          opacity:        opts.opacity
        });
      label.css({
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
      input.addClass(opts.inputClass).data('inline.label', label);

      setTimeout(function(){
        changed(label, hasText(input), opts);
      }, 200);

      input
      // focus behaviours
      .focus(function() {
        var label = $(this).data('inline.label');

        // focus label
        label.addClass(opts.focusClass);

        changed(label, hasText($(this)), opts);
      }).blur(function() {
        var label = $(this).data('inline.label');

        // unfocus label
        label.removeClass(opts.focusClass);

        changed(label, hasText($(this)), opts);
      })

      // input is fired when typing, pasting, cutting
      .bind('keydown', function() {
        var element = $(this);
        var label = element.data('inline.label');
        setTimeout(function () {
          label.addClass(opts.focusClass);

          changed(label, hasText(element), opts);
			  }, 25);
      });
    });

  };

  function changed(label, hasText, opts) {
    if( hasText == true ){
      label.addClass(opts.hasTextClass);
      if(!opts.useExternalCSS)
        label.hide();
    } else {
      label.removeClass(opts.hasTextClass);
      if(!opts.useExternalCSS)
        showLabel(label, opts);
    }
  }

  function showLabel(label, opts) {
    if(label.is('.'+opts.focusClass))
      label.css({opacity:opts.focusOpacity});
    else
      label.css({opacity:opts.opacity});

    label[opts.showLabelEffect]();
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

  // is an input present
  function hasText(obj) {
    return !(obj.val() === '');
  };

  // default function to lookup the field for this label
  // can be overridden in the options
  var labelFieldLookupFunction = function() {
    return $('#' + this.attr('for'));
  };

  // plugin defaults
  $.fn.inlineLabel.defaults = {
    opacity: 0.75,
    focusOpacity: 0.25,
    labelClass: 'inline-label',
    inputClass: 'inline-label-field',
    focusClass: 'inline-label-focus',
    hasTextClass: 'inline-label-has-text',
    useExternalCSS: false,
    showLabelEffect: 'fadeIn',
    labelFieldLookupFunction: labelFieldLookupFunction
  }; // none yet
})(jQuery);