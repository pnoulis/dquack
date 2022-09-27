function DQuack() {
}

DQuack.prototype.pullAssetsDir = function mvAssetsFromSourceTreeToBuildTree() {

}


const Handlers = function DQuackWebpackEventHandlers() {
}

Handlers.prototype.onDone = function(stats) {
  console.log('handle done');
  console.log(stats);
}

Handlers.prototype.onFailed = function() {
  console.log('handle failed');
}

Handlers.prototype.onInvalid = function() {
  console.log('handle invalid');
}

Handlers.prototype.onWatchClose = function() {
  console.log('handle watch close');
}


let handlers;

if (!handlers) {
  handlers = new Handlers();
}

export {
  handlers
}


