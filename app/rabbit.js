// Helper to pick a ramdom item from an array
function pick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * The Rabbit
 */
function Rabbit () {
  this.pics = ['assets/r1.jpg', 'assets/r2.jpg', 'assets/r3.jpg'];
  this.sounds = ['assets/sfx1.mp3'];
};

/**
 * Choose a random image
 */
Rabbit.prototype.chooseImage = function() {
  return pick(this.pics);
};

/**
 * Play a random sound
 */
Rabbit.prototype.play = function () {
  this._player(pick(this.sounds));
};

/**
 * Player implementation - a detail
 */
Rabbit.prototype._player = function(url){
  var request = new XMLHttpRequest();
  var context = new AudioContext();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      var source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(0);
    });
  }
  request.send();
}

// Export node module.
/* istanbul ignore next */
if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
    module.exports = Rabbit;
}
