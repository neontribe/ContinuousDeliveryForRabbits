var expect = require('chai').expect;
var sinon = require('sinon');
var Rabbit = require('../app/rabbit.js');


describe('A Rabbit', function(){
  var rabbit;

  beforeEach('Make a Rabbit for testing', function(){
    rabbit = new Rabbit();
  });

  it('should be productive when invoked as a constructor', function(){
    var rabbit = new Rabbit();
    expect(rabbit).to.be.an.instanceOf(Rabbit);
  });

  it('should have a "pics" property containing an array', function(){
    expect(rabbit.pics).to.be.an.instanceOf(Array);
    expect(rabbit.pics).to.have.length.above(0);
  });

  it('should have a "sounds" property containing an array', function(){
    expect(rabbit.sounds).to.be.an.instanceOf(Array);
    expect(rabbit.sounds).to.have.length.above(0);
  });

  it('should have a "chooseImage" method which returns a url from "pics"', function(){
    expect(rabbit).to.respondTo('chooseImage');
    expect(rabbit.pics).to.include(rabbit.chooseImage());
  });

  describe('should have a "play" method', function(){

    it('which is a function', function(){
      expect(rabbit).to.respondTo('play');
    });

    it('which passes a url from "sounds" to the "_player"', function(){
      var stubbed_player = sinon.stub(rabbit, '_player');
      rabbit.play();
      expect(stubbed_player.calledOnce).to.equal(true);
      expect(stubbed_player.getCall(0).args[0]).to.be.oneOf(rabbit.sounds);
    });

    it('which causes an XMLHttpRequest to happen', function(){
      // Mock the XMLHttpRequest using sinon's helper
      var requests = [];
      var xhr = global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
      xhr.onCreate = function(req){
        requests.push(req);
      }
      var ac = global.AudioContext = FakeAudioContext;
      rabbit.play();
      expect(requests).to.have.length(1);
    });

    it('which supplies data and commands to the AudioContext', function(){
      var requests = [];
      var xhr = global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
      xhr.onCreate = function(req){
        requests.push(req);
      }

      // Mock the AudioContext
      var ac = global.AudioContext = FakeAudioContext;
      var dAd = sinon.spy(global.AudioContext.prototype, 'decodeAudioData');
      var cBs = sinon.spy(global.AudioContext.prototype, 'createBufferSource');
      var sourceConnect = sinon.spy(global.AudioContext.prototype, 'connect');
      var sourceStart = sinon.spy(global.AudioContext.prototype, 'start');

      rabbit.play();
      requests[0].respond(200);
      expect(dAd.calledOnce).to.equal(true);
      expect(cBs.calledOnce).to.equal(true);
      expect(sourceConnect.calledWith('speakers')).to.equal(true);
      expect(sourceStart.calledWith(0)).to.equal(true);

    })

  });

  function FakeAudioContext () {
    this.destination = 'speakers';
  }
  FakeAudioContext.prototype.decodeAudioData = function(response, callback) {
    callback();
  };
  FakeAudioContext.prototype.createBufferSource = function(response, callback) {
    return {
      connect: this.connect,
      start: this.start
    };
  };
  FakeAudioContext.prototype.connect = function() {};
  FakeAudioContext.prototype.start = function(response, callback) {};

});
