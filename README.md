# cyclejs-csrfHTTPDriver
A HTTP driver built up to use CSRF tokens on the page &amp; subsequent requests

For now, just copy this over into your app.

Later i'll turn it into a package or something.

# Usage
```javascript
const drivers = {
  DOM: makeDOMDriver('body'),
  appHTTP: makeCsrfHTTPDriver()
}
```
