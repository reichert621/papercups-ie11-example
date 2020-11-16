# Papercups with IE11

### Install the IE11-supported version of Papercups

In `package.json`, install:
```
"@papercups-io/chat-widget": "^1.1.4-beta.1",
```

> See example: https://github.com/reichert621/papercups-ie11-example/blob/master/package.json#L21

### Set the following `.babelrc` configuration

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "> 0.25%, not dead, ie >= 11",
        "useBuiltIns": "entry",
        "corejs": "3.6.5"
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ]
}
```

> See example: https://github.com/reichert621/papercups-ie11-example/blob/master/.babelrc

### Add the polyfill for `CustomEvent` and import it at the top of your application

`polyfills.js`:
```js
(function () {
  function CustomEvent(event, params) {
    params = params || {bubbles: false, cancelable: false, detail: undefined};
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();
```

> See example: https://github.com/reichert621/papercups-ie11-example/blob/master/client/polyfills.js

`App.js`:
```js
import 'core-js/stable';
import './polyfills';
import React from 'react';
// etc.
import {ChatWidget} from '@papercups-io/chat-widget';
```

> See example: https://github.com/reichert621/papercups-ie11-example/blob/master/client/App.js#L1-L7

### Add the IE-supported `iframeUrlOverride`:

```jsx
<ChatWidget
  {...}
  iframeUrlOverride="https://chat-window-git-ie11.papercups.vercel.app"
  {...}
/>
```

See example: https://github.com/reichert621/papercups-ie11-example/blob/master/client/App.js#L43

### Add the `css-vars-ponyfill`

In `index.html`, between the `<head>` tags:
```html
<head>
  <!-- ... -->
  
  <script src="https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2"></script>
  <script>
    cssVars({
      onlyLegacy: false,
      preserveVars: true,
      watch: true
    });
  </script>
</head>
```

See example: https://github.com/reichert621/papercups-ie11-example/blob/master/client/index.html#L7-L14

### View in IE11

<img width="640" alt="Screen Shot 2020-11-16 at 5 19 37 PM" src="https://user-images.githubusercontent.com/5264279/99315875-5e90f980-2831-11eb-98a1-637b1ff379ca.png">

> Test at https://papercups-ie11-example.herokuapp.com/
