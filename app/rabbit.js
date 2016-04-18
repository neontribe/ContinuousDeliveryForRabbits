
// Wrap fetching the audio file and playing it
function loadAndPlay(url) {
  var request = new XMLHttpRequest();
  var context = new window.AudioContext();
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

function Rabbit () {
  this.pics = ['assets/r1.jpg', 'assets/r2.jpg', 'assets/r3.jpg'];
  this.sounds = ['assets/sfx1.mp3'];
};

Rabbit.prototype.pick = function(src) {
  return src[Math.floor(Math.random() * src.length)];
};
Rabbit.prototype.chooseImage = function() {
  return this.pick(this.pics);
};
Rabbit.prototype.play = function () {
  loadAndPlay(this.pick(this.sounds));
};

// Export node module.
if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
    module.exports = Rabbit;
}
