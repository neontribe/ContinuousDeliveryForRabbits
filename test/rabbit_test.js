var expect = require('chai').expect;
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

    it('which loads a sound', function(){

    });

  });



});
