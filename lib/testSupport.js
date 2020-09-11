(function() {
  'use strict';

  mocha.setup({ ui: 'bdd' });
  window.expect = chai.expect;

  window.onload = function() {
    window.mochaPhantomJS ? mochaPhantomJS.run() : mocha.run();
  };

  // Disabling native methods is dangerous, we should spy on them instead
  before(function() {
    sinon.spy(Array.prototype,'map');
    sinon.spy(Array.prototype,'indexOf');
    sinon.spy(Array.prototype,'forEach');
    sinon.spy(Array.prototype,'filter');
    sinon.spy(Array.prototype,'reduce');
    sinon.spy(Array.prototype,'every');
    sinon.spy(Array.prototype,'some');
    sinon.spy(Array.prototype,'flat');
    sinon.spy(Array.prototype,'includes');
    sinon.spy(Array.prototype,'find');
  });

  afterEach(function() {
    Array.prototype.map.reset();
    Array.prototype.indexOf.reset();
    Array.prototype.forEach.reset();
    Array.prototype.filter.reset();
    Array.prototype.reduce.reset();
    Array.prototype.every.reset();
    Array.prototype.some.reset();
    Array.prototype.flat.reset();
    Array.prototype.includes.reset();
    Array.prototype.find.reset();
  });

  after(function() {
    Array.prototype.map.restore();
    Array.prototype.indexOf.restore();
    Array.prototype.forEach.restore();
    Array.prototype.filter.restore();
    Array.prototype.reduce.restore();
    Array.prototype.every.restore();
    Array.prototype.some.restore();
    Array.prototype.flat.restore();
    Array.prototype.includes.restore();
    Array.prototype.find.restore();
  });

}());
