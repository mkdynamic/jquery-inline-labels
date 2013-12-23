# jQuery Inline Labels

A jQuery plugin to add usable inline labels to form fields that don't disappear until you enter input. Unobtrusive and cross-browser with graceful degradation. Similar to those used on [Mobile Me](https://me.com) and [37signals](https://launchpad.37signals.com) sign in pages.

## Usage instructions

Add this to the HEAD of the document (after you include jQuery, of course):

    <script src="jquery.inline-labels.js" type="text/javascript" charset="utf-8"></script>
    <link rel="stylesheet" href="jquery.inline-labels.css" type="text/css" media="all" charset="utf-8" />

And add a class 'inline' to every label you wish to act inline:

    <label for="msg" class="inline">Enter your msg...</label>
    <textarea id="msg"></textarea>

See `demo.html` for an example.

## Customizing the appearance of the inline labels

In the stylesheet (`jquery.inline-labels.css`) you can change the color of the inline labels. By default, they are `#999` when blurred and `#ccc` when the field has focus.

## Why is this better than inline label plugin X?

These inline labels only disappearing once the user has inputted some data. This avoids the problem of the user focusing the field and forgetting what the label was because it disappeared. It also means you can auto-focus fields safely.

The plugin automatically detects the styling of the inputs, and then style and positions the inline labels accordingly. It positions the labels precisely so they look exactly like native placeholder text.

## Notes

* Doesn't work properly with text only browser resizing.

## Credits

Written by Mark Dodwell ([@madeofcode](http://twitter.com/madeofcode))



[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/mkdynamic/jquery-inline-labels/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

