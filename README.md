# chain-promise
Allow create sequence of dependent promises calls

## Usage
```javascript
var chain = require('promise-chain');

chain([
  loadingFunctionThatReturnPromise('url'),
  function (result) {
    return dependendOperation(result);
  },
  chain.toContext('depRes'),
  chain.all([
    parallelOp1(),
    parallelOp2(),
  ]),
  function(parallelResults) {
    return {dr: this.depRes, ops: parallelResults};
  }
])
.then(function (result) {
})
.catch(function (error) {
})
