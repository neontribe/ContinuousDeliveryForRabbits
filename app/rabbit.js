(function(window, undefined){

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

  window.rabbit = {
    pics: ['assets/r1.jpg', 'assets/r2.jpg', 'assets/r3.jpg'],
    sounds: ['assets/sfx1.mp3'],
    pick: function(src) {
      return src[Math.floor(Math.random() * src.length)];
    },
    chooseImage: function() {
      return this.pick(this.pics);
    },
    play: function () {
      loadAndPlay(this.pick(this.sounds));
    }
  };

})(window);
