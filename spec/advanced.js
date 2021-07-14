/* globals expect, _, beforeEach, sinon, setTimeout, clock  */
(function () {
  "use strict";

  const checkForNativeMethods = function (runVanillaUtilsFunction) {
    it("should not use the native version of any utils methods in its implementation", function () {
      // These spies are set up in testSupport.js
      runVanillaUtilsFunction();
      expect(Array.prototype.map.called).to.equal(false);
      expect(Array.prototype.indexOf.called).to.equal(false);
      expect(Array.prototype.forEach.called).to.equal(false);
      expect(Array.prototype.filter.called).to.equal(false);
      expect(Array.prototype.reduce.called).to.equal(false);
      expect(Array.prototype.every.called).to.equal(false);
      expect(Array.prototype.some.called).to.equal(false);
      expect(Array.prototype.flat.called).to.equal(false);
      expect(Array.prototype.includes.called).to.equal(false);
      expect(Array.prototype.find.called).to.equal(false);
    });
  };

  describe("Advanced", function () {
    describe("once", function () {
      checkForNativeMethods(function () {
        let num = 0;
        const increment = _.once(function () {
          num += 1;
        });
      });

      it("should be a function", function () {
        expect(_.once).to.be.an.instanceOf(Function);
      });

      it("should return a function", function () {
        // noop is short for `no-operation` and is pronounced `no-op`
        const noop = _.once(function () {});

        expect(noop).to.be.an.instanceOf(Function);
      });

      it("should only run a user-defined function if it has not been run before", function () {
        let num = 0;
        const increment = _.once(function () {
          num++;
        });

        increment();
        increment();
        increment();

        expect(num).to.equal(1);
      });

      it("should apply arguments to the user-defined function", function () {
        const add = _.once(function (x, y, z) {
          return x + y + z;
        });

        expect(add(1, 2, 3)).to.equal(6);
      });

      it("should return the result of the first call for every subsequent call", function () {
        const add = _.once(function (x, y, z) {
          return x + y + z;
        });

        expect(add(1, 2, 3)).to.equal(6);
        expect(add(4, 5, 6)).to.equal(6);
        expect(add(7, 8, 9)).to.equal(6);
      });
    });

    describe("memoize", function () {
      let add;
      let memoAdd;

      beforeEach(function () {
        add = function (a, b) {
          return a + b;
        };

        memoAdd = _.memoize(add);
      });

      checkForNativeMethods(function () {
        _.memoize(function add(a, b) {
          return a + b;
        });
      });

      it("should produce the same result as the non-memoized version", function () {
        expect(add(1, 2)).to.equal(3);
        expect(memoAdd(1, 2)).to.equal(3);
      });

      it("should give different results for different arguments", function () {
        expect(memoAdd(1, 2)).to.equal(3);
        expect(memoAdd(3, 4)).to.equal(7);
        expect(memoAdd(1, 3)).to.equal(4);
      });

      it("should not run the memoized function twice when given a primitive type as an argument", function () {
        // Here, we wrap a dummy function in a spy. A spy is a wrapper function (much like _.memoize
        // or _.once) that keeps track of interesting information about the function it's spying on;
        // e.g. whether or not the function has been called.
        const spy = sinon.spy(function () {
          return "Dummy output";
        });
        const memoSpy = _.memoize(spy);

        memoSpy(10);
        expect(spy).to.have.been.calledOnce;
        memoSpy(10);
        expect(spy).to.have.been.calledOnce;
      });

      it("should not run the memoized function twice when given a reference type as an argument", function () {
        // Be careful how you are checking if a set of arguments has been passed in already
        const spy = sinon.spy(function () {
          return "Dummy output";
        });
        const memoSpy = _.memoize(spy);

        memoSpy([1, 2, 3]);
        expect(spy).to.have.been.calledOnce;
        memoSpy([1, 2, 3]);
        expect(spy).to.have.been.calledOnce;
      });

      it("should run the memoized function twice when given an array and then given a list of arguments", function () {
        // Be careful how you are checking if a set of arguments has been passed in already
        const spy = sinon.spy(function () {
          return "Dummy output";
        });
        const memoSpy = _.memoize(spy);

        memoSpy([1, 2, 3]);
        expect(spy).to.have.been.calledOnce;
        memoSpy(1, 2, 3);
        expect(spy).to.have.been.calledTwice;
      });
    });

    describe("invoke, when provided a function reference", function () {
      checkForNativeMethods(function () {
        _.invoke(["dog", "cat"], _.identity);
      });

      it("runs the input function on each item in the array, and returns a list of results", function () {
        const reverse = function () {
          return this.split("").reverse().join("");
        };

        const reversedStrings = _.invoke(["dog", "cat"], reverse);

        expect(reversedStrings).to.eql(["god", "tac"]);
      });
    });

    describe("invoke, when provided a method name", function () {
      checkForNativeMethods(function () {
        _.invoke(["dog", "cat"], "toUpperCase");
      });

      it("runs the specified method on each item in the array, and returns a list of results", function () {
        const upperCasedStrings = _.invoke(["dog", "cat"], "toUpperCase");

        expect(upperCasedStrings).to.eql(["DOG", "CAT"]);
      });
    });

    describe("flatten", function () {
      checkForNativeMethods(function () {
        _.flatten([1, [2], [3, [[[4]]]]]);
      });

      it("can flatten nested arrays", function () {
        const nestedArray = [1, [2], [3, [[[4]]]]];

        expect(_.flatten(nestedArray)).to.eql([1, 2, 3, 4]);
      });
    });

    describe("throttle, when given a wait of 100ms", function () {
      let callback;

      beforeEach(function () {
        callback = sinon.spy();
      });

      checkForNativeMethods(function () {
        _.throttle(callback, 100);
      });

      it("should return a function callable twice in the first 200ms", function () {
        const fn = _.throttle(callback, 100);
        fn(); // called
        setTimeout(fn, 50);
        setTimeout(fn, 100); // called
        setTimeout(fn, 150);
        setTimeout(fn, 199);
        clock.tick(200);
        /* jshint ignore:start */
        expect(callback).to.have.been.calledTwice;
        /* jshint ignore:end */
      });
    });
  });
})();
