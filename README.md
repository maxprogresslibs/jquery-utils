# JQuery Utils

This repository contains useful tools built for jQuery. To use just include _utils.js_ in your application.

## Functions
### $.bindings(state: _object_): _object_

Creates two way data binding between the state object and the DOM elements. You can use `data-bind="_property_"` to bind that element's value to the state object. Every time you change the state object through code the DOM element will update too.

#### Example:
```javascript
const state = $.bindings({
    testValue: "Test 123"
});

$("#test-btn").click(function() {
    state.testValue = state.testValue.split("").reverse().join("");
});
```

```html
<input type="text" id="test-input" placeholder="Input something" data-bind="testValue">
<button id="test-btn">Click me!</button>
<p id="test-value" data-bind="testValue"></p>
```

### $.fetch(url: _string_, method: _string_, payload: _object_): _object_

Sends an ajax request using `$.ajax` to `url` with `payload` as data.
Valid `method` values are:
..*
* "GET"
* "POST"
* "DELETE"
* "PUT"
* "PATCH"
* "OPTIONS"

### payload(...objects: _object[]_): _object_

Groups multiple objects into one. Useful for sending $.fetch requests.
