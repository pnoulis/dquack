function WebpackEventHandlers() {
}

WebpackEventHandlers.prototype.onDone = function() {
  console.log('handle done');
}

WebpackEventHandlers.prototype.onFailed = function() {
  console.log('handle failed');
}

WebpackEventHandlers.prototype.onInvalid = function() {
  console.log('handle invalid');
}

WebpackEventHandlers.prototype.onWatchClose = function() {
  console.log('handle watch close');
}


function Build(config) {
  WebpackEventHandlers.call(this);
}

Build.prototype = Object.create(WebpackEventHandlers.prototype, {
  constructor: {
    value: Build,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

Build.prototype.makeDirHierarchy = function() {

}

export default Build;
