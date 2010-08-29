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

  function elmFor(label) {
    return $('#' + $(label).attr('for'));
  };
  
  $(function() {
    $('label.inline')
    
    // wrap
    
    // supported
    .addClass('supported')
    
    // delegate mousedown to input
    .mousedown(function(e) {
      elmFor(this).focus();
      e.preventDefault();
    })
    
    // adopt styling of input
    .each(function() {
      var label = $(this);
      var el = elmFor(label);
      
      var topOffset = 
        parseInt(el.css('marginTop')) + 
        parseInt(el.css('paddingTop')) +
        parseInt(el.css('borderTopWidth'));
        
      var leftOffset = 
        parseInt(el.css('marginLeft')) + 
        parseInt(el.css('paddingLeft')) +
        parseInt(el.css('borderLeftWidth'));
      
      label.css({
        fontSize: el.css('fontSize'), 
        fontFamily: el.css('fontFamily'),
        fontWeight: el.css('fontWeight'),
        lineHeight: el.css('lineHeight'),
        letterSpacing: el.css('letterSpacing'),
        top: el.position().top + topOffset,
        left: el.position().left + leftOffset + 2,
        width: el.width() - 2
      });
      
      // label.css({
      //   fontSize: el.css('fontSize'), 
      //   fontFamily: el.css('fontFamily'),
      //   lineHeight: el.css('lineHeight'),
      //   letterSpacing: el.css('letterSpacing'),
      //   top: topOffset,
      //   left: leftOffset,
      //   width: el.width(),
      //   outline: '1px solid red'
      // });
    })
    
    // elm beahvours
    .each(function() {
      var label = $(this);
      var el = elmFor(label);
      
      //el.data('inline.label', label);
      
      // behaviour
      el.focus(function() {
        label.addClass("focus");
        
        // clear existing timer
        var timer = el.data('inline.timer');
        window.clearInterval(timer);
        el.data('inline.timer', null);
        
        // set timer
        el.data('inline.timer', window.setInterval(function() {
          if (el[0].value != '') label.removeClass('empty');
        }, 25));
      }).blur(function() {
        label.removeClass("focus");
        
        // cancel timer
        var timer = el.data('inline.timer');
        window.clearInterval(timer);
        el.data('inline.timer', null);
        
      if (el[0].value == "") label.addClass("empty");
      
      })
      
      if (el[0].value == "") label.addClass("empty");
      
      
    })
    
    // show em
    .css('display', 'block')
    
    
    
    
    
    //     enableSelection: function() {
    //  return this
    //    .attr( "unselectable", "off" )
    //    .css( "MozUserSelect", "" );
    // },
    // 
    // disableSelection: function() {
    //  return this
    //    .attr( "unselectable", "on" )
    //    .css( "MozUserSelect", "none" );
    // },
    
    // var input= $('input[type=text]');
    // $(document.body)
    // .append('Cursor: ' + input.css('cursor') + '<br />')
    // .append('Font-size: ' + input.css('font-size') + '<br />')
    // .append('Margin: ' + input.css('marginLeft') + '<br />')
    // .append('Padding: ' + input.css('padding') + '<br />')
    // .append('Border: ' + input.css('borderLeftWidth') + '<br />')
    // .append('Line-height: ' + input.css('line-height') + '<br />')
    // .append('Color: ' + input.css('color') + '<br />')
    // .append('Font-weight: ' + input.css('font-weight') + '<br />')
    

  });

  // var debug = false;
  // var placeholderColor = debug ? "red" : "#aaa";
  // var placeholderAttributeName = "placeholder"
  // var blurClass = "blur";
  // var autoload = true;
  //
  // $.fn.placeholders = function() {
  //   return $(this).each(function() {
  //     var el = $(this);
  //
  //     // save original color in cache
  //     el.data("placeholder.original_color", el.css("color"));
  //
  //     // show if blank
  //     var placeholder = el.attr(placeholderAttributeName);
  //     var val = el.val() || "";
  //     if (val == "") el.activatePlaceholder().val(placeholder);
  //
  //     // hide placeholders on focus
  //     el.focus(function() {
  //       if (el.data('placeholder.activated')) el.deactivatePlaceholder().val("");
  //     });
  //
  //     // toggle placeholders on change
  //     el.bind("change", function() {
  //       var val = el.val() || "";
  //       if (val == "") {
  //         el.activatePlaceholder().val(placeholder);
  //       } else {
  //         el.deactivatePlaceholder();
  //       }
  //     });
  //
  //     // show placeholders on blur if empty
  //     el.blur(function() {
  //       var val = el.val() || "";
  //       if (val == "") el.activatePlaceholder().val(placeholder);
  //     });
  //
  //     // remove form placeholders before submit -- only bind once per form
  //     var form = el.closest("form");
  //     if (form && !form.data('placeholder.clearer_set')) {
  //       el.closest("form").bind("submit", function() {
  //         form.find("*[" + placeholderAttributeName + "]").each(function() {
  //           var el = $(this);
  //           if (el.data('placeholder.activated')) el.val("");
  //         });
  //         return true;
  //       });
  //       form.data('placeholder.clearer_set', true)
  //     }
  //   });
  // };
  //
  // $.fn.activatePlaceholder = function() {
  //   var el = $(this);
  //   return el.data('placeholder.activated', true)
  //     .css("color", placeholderColor)
  //     .addClass(blurClass);
  // };
  //
  // $.fn.deactivatePlaceholder = function() {
  //   var el = $(this);
  //   return el.data('placeholder.activated', false)
  //     .css("color", el.data("placeholder.original_color"))
  //     .removeClass(blurClass);
  // };
  //
  // function clearAllPlaceholders(parent) {
  //   $("*[" + placeholderAttributeName + "]").each(function() {
  //     var el = $(this);
  //     if (el.data('placeholder.activated')) el.val("");
  //   });
  // };
  //
  // function arePlaceholdersSupported() {
  //   var i = document.createElement('input');
  //   return 'placeholder' in i;
  // };
  //
  // // load em up!
  // $(function() {
  //   if (autoload) $("*[" + placeholderAttributeName + "]").placeholders();
  //   $(window).unload(clearAllPlaceholders); // handles Firefox's autocomplete
  // });

})(jQuery);
