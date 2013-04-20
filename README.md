# jsegg

jsegg is a small jQuery plugin designed to capture sequences of keys typed. A callback function is called when a full sequence is matched. It is typically use to trigger easter eggs, or keyboard controls.

eggs are attached to dom nodes and therefore capture bubbling events, giving you the ability to have the same keyboard sequence do different things, depending on what's focused when the user types.


## Features

* eggs are attached to DOM nodes, including document
* multiple eggs can be attached to the same node


## Usage

jsegg is used as any jQuery plugin: by being called on a jQuery object. The initialization call requires 2 arguments:

* the keyboard sequence to capture
* the callback function to execute on match

the keyboard sequence is defined either as:

* an array of key codes (see http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes)
* a string (ONLY for alphanumeric)

### Examples

```javascript
$(document).jsegg('boo', function()
{
    console.log('got ya!')
});
```

jsegg contains 2 popular easter egg sequences, which can be accessed as such:

```javascript
$(document).jsegg($.jsegg.KONAMI, function()
{
    console.log('Konami code!')
});
$(document).jsegg($.jsegg.SFII, function()
{
    console.log('SNES Street Fighter II code!')
});
```