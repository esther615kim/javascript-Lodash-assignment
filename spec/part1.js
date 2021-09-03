/* globals expect, _ */
(function () {
  "use strict";

  const checkForNativeMethods = function (runVanillaUtilsFunction) {
    it("should not use the native version of any util methods in its implementation", function () {
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

  describe("Part I", function () {
    describe("identity", function () {
      checkForNativeMethods(function () {
        _.identity(1);
      });

      it("should return whatever value is passed into it", function () {
        const uniqueObject = {};
        expect(_.identity(1)).to.equal(1);
        expect(_.identity("string")).to.equal("string");
        /* jshint ignore:start */
        expect(_.identity(false)).to.be.false;
        /* jshint ignore:end */
        expect(_.identity(uniqueObject)).to.equal(uniqueObject);
      });
    });

    describe("first", function () {
      checkForNativeMethods(function () {
        _.first([1, 2, 3]);
      });

      it("should be able to pull out the first element of an array", function () {
        expect(_.first([1, 2, 3])).to.equal(1);
      });

      it("should accept an index argument", function () {
        expect(_.first([1, 2, 3], 2)).to.eql([1, 2]);
      });

      it("should return empty array if zero is passed in as the index", function () {
        expect(_.first([1, 2, 3], 0)).to.eql([]);
      });

      it("should return all the array's elements if the index argument is larger than the length of the array", function () {
        expect(_.first([1, 2, 3], 5)).to.eql([1, 2, 3]);
      });
    });

    describe("last", function () {
      checkForNativeMethods(function () {
        _.last([1, 2, 3]);
      });

      it("should pull the last element from an array", function () {
        expect(_.last([1, 2, 3])).to.equal(3);
      });

      it("should accept an index argument", function () {
        expect(_.last([1, 2, 3], 2)).to.eql([2, 3]);
      });

      it("should return empty array if zero is passed in as the index", function () {
        expect(_.last([1, 2, 3], 0)).to.eql([]);
      });

      it("should return all the array's elements if the index argument is larger than the length of the array", function () {
        expect(_.last([1, 2, 3], 5)).to.eql([1, 2, 3]);
      });
    });

    describe("each", function () {
      checkForNativeMethods(function () {
        /* jshint ignore:start */
        _.each([1, 2, 3, 4], function (number) { });
        /* jshint ignore:end */
      });

      it("should be a function", function () {
        expect(_.each).to.be.an.instanceOf(Function);
      });

      it("should not return anything", function () {
        /* jshint ignore:start */
        const returnValue = _.each([], function () { });
        expect(returnValue).to.not.exist;
        /* jshint ignore:end */
      });

      it("should not mutate the input array", function () {
        /* jshint ignore:start */
        const input = [1, 2, 3, 4, 5];
        const result = _.each(input, function (item) {
          /* noop */
        });

        /*
         * Mutation of inputs should be avoided without good justification otherwise
         * as it can often lead to hard to find bugs and confusing code!
         * Imagine we were reading the code above, and we added the following line:
         *
         * var lastElement = input[input.length - 1];
         *
         * Without knowing that mutation occured inside of each,
         * we would assume that `lastElement` is 5. But if inside of
         * each, we use the array method `pop`, we would permanently
         * change `input` and our assumption would not longer be true,
         * `lastElement` would be 4 instead!
         *
         * The tricky part is that we have no way of knowing about the mutation
         * just by looking at the code above. We'd have to dive into the
         * implementation of each to the exact line that uses `pop`.
         * If we write a lot of code with this assumption, it might be very hard
         * to trace back to the correct line in each.
         *
         * You can avoid an entire class of bugs by writing functions
         * that don't mutate their inputs!
         */

        expect(input).to.eql([1, 2, 3, 4, 5]);
        /* jshint ignore:end */
      });

      it(" should iterate over arrays and provide access to each value", function () {
        const letters = ["a", "b", "c"];
        const iterations = [];

        _.each(letters, function (letter) {
          iterations.push(letter);
        });

        expect(iterations).to.eql(["a", "b", "c"]);
      });

      it("should iterate over arrays and provide access to each index", function () {
        const letters = ["a", "b", "c"];
        const iterations = [];

        _.each(letters, function (letter, index) {
          iterations.push([letter, index]);
        });

        expect(iterations).to.eql([
          ["a", 0],
          ["b", 1],
          ["c", 2],
        ]);
      });

      it("should iterate over arrays and provide access to the original collection", function () {
        const letters = ["a", "b", "c"];
        const iterations = [];

        _.each(letters, function (letter, index, collection) {
          iterations.push([letter, index, collection]);
        });

        expect(iterations).to.eql([
          ["a", 0, letters],
          ["b", 1, letters],
          ["c", 2, letters],
        ]);
      });

      it("should only iterate over numeric keys of an array, not all properties", function () {
        /* jshint ignore:start */

        const iterations = [];
        const letters = ["a", "b", "c"];
        letters.someProperty = "Do not iterate over me!";

        _.each(letters, function (letter, index, collection) {
          iterations.push(letter);
        });

        expect(iterations).to.not.include("Do not iterate over me!");
        /* jshint ignore:end */
      });

      it("should iterate over objects and provide access to each value", function () {
        const letters = { d: "dog", e: "elephant", f: "flotsam" };
        const iterations = [];

        _.each(letters, function (value) {
          iterations.push(value);
        });

        expect(iterations).to.eql(["dog", "elephant", "flotsam"]);
      });

      it("should iterate over objects and provide access to each key", function () {
        const letters = { d: "dog", e: "elephant", f: "flotsam" };
        const iterations = [];

        _.each(letters, function (value, property) {
          iterations.push([value, property]);
        });

        expect(iterations).to.eql([
          ["dog", "d"],
          ["elephant", "e"],
          ["flotsam", "f"],
        ]);
      });

      it("should iterate over objects and provide access to the original object", function () {
        const letters = { d: "dog", e: "elephant", f: "flotsam" };
        const iterations = [];

        _.each(letters, function (value, property, object) {
          iterations.push([value, property, object]);
        });

        expect(iterations).to.eql([
          ["dog", "d", letters],
          ["elephant", "e", letters],
          ["flotsam", "f", letters],
        ]);
      });

      it("should not confuse an object with a `length` property for an array", function () {
        const dresser = { length: 39, width: 79, height: 127 };
        const iterations = [];

        _.each(dresser, function (value, property, object) {
          iterations.push([value, property, object]);
        });

        expect(iterations).to.eql([
          [39, "length", dresser],
          [79, "width", dresser],
          [127, "height", dresser],
        ]);
      });
    });

    describe("indexOf", function () {
      checkForNativeMethods(function () {
        _.indexOf([10, 20, 30, 40], 40);
      });

      it("should find 40 in the list", function () {
        const numbers = [10, 20, 30, 40, 50];

        expect(_.indexOf(numbers, 40)).to.equal(3);
      });

      it("should be able to compute indexOf even when the native function is undefined", function () {
        const numbers = [10, 20, 30];

        expect(_.indexOf(numbers, 20)).to.equal(1);
      });

      it("returns -1 when the target cannot be found not in the list", function () {
        const numbers = [10, 20, 30, 40, 50];

        expect(_.indexOf(numbers, 35)).to.equal(-1);
      });

      it("returns the first index that the target can be found at when there are multiple matches", function () {
        const numbers = [1, 40, 40, 40, 40, 40, 40, 40, 50, 60, 70];

        expect(_.indexOf(numbers, 40)).to.equal(1);
      });
    });

    describe("filter", function () {
      checkForNativeMethods(function () {
        const isEven = function (num) {
          return num % 2 === 0;
        };
        _.filter([1, 2, 3, 4], isEven);
      });

      it("should return all even numbers in an array", function () {
        const isEven = function (num) {
          return num % 2 === 0;
        };
        const evens = _.filter([1, 2, 3, 4, 5, 6], isEven);

        expect(evens).to.eql([2, 4, 6]);
      });

      it("should return all odd numbers in an array", function () {
        const isOdd = function (num) {
          return num % 2 !== 0;
        };
        const odds = _.filter([1, 2, 3, 4, 5, 6], isOdd);

        expect(odds).to.eql([1, 3, 5]);
      });

      it("should produce a brand new array instead of modifying the input array", function () {
        const isOdd = function (num) {
          return num % 2 !== 0;
        };
        const numbers = [1, 2, 3, 4, 5, 6];
        const evens = _.filter(numbers, isOdd);

        expect(evens).to.not.equal(numbers);
      });
    });

    describe("reject", function () {
      checkForNativeMethods(function () {
        const isEven = function (num) {
          return num % 2 === 0;
        };
        _.reject([1, 2, 3, 4, 5, 6], isEven);
      });

      it("should reject all even numbers", function () {
        const isEven = function (num) {
          return num % 2 === 0;
        };
        const odds = _.reject([1, 2, 3, 4, 5, 6], isEven);

        expect(odds).to.eql([1, 3, 5]);
      });

      it("should reject all odd numbers", function () {
        const isOdd = function (num) {
          return num % 2 !== 0;
        };
        const evens = _.reject([1, 2, 3, 4, 5, 6], isOdd);

        expect(evens).to.eql([2, 4, 6]);
      });

      it("should produce a brand new array instead of modifying the input array", function () {
        const isOdd = function (num) {
          return num % 2 !== 0;
        };
        const numbers = [1, 2, 3, 4, 5, 6];
        const evens = _.reject(numbers, isOdd);

        expect(evens).to.not.equal(numbers);
      });
    });

    describe("map", function () {
      checkForNativeMethods(function () {
        _.map([1, 2, 3, 4], function (num) {
          return num * 2;
        });
      });

      it("should not mutate the input array", function () {
        /* jshint ignore:start */

        const input = [1, 2, 3, 4, 5];
        const result = _.map(input, function (num) {
          /* noop */
        });

        /*
         * Mutation of inputs should be avoided without good justification otherwise
         * as it can often lead to hard to find bugs and confusing code!
         * Imagine we were reading the code above, and we added the following line:
         *
         * const lastElement = input[input.length - 1];
         *
         * Without knowing that mutation occured inside of map,
         * we would assume that `lastElement` is 5. But if inside of
         * map, we use the array method `pop`, we would permanently
         * change `input` and our assumption would not longer be true,
         * `lastElement` would be 4 instead!
         *
         * The tricky part is that we have no way of knowing about the mutation
         * just by looking at the code above. We'd have to dive into the
         * implementation of map to the exact line that uses `pop`.
         * If we write a lot of code with this assumption, it might be very hard
         * to trace back to the correct line in map.
         *
         * You can avoid an entire class of bugs by writing functions
         * that don't mutate their inputs!
         */

        expect(input).to.eql([1, 2, 3, 4, 5]);
        /* jshint ignore:end */
      });

      it("should apply a function to every value in an array", function () {
        const doubledNumbers = _.map([1, 2, 3], function (num) {
          return num * 2;
        });

        expect(doubledNumbers).to.eql([2, 4, 6]);
      });

      it("should produce a brand new array instead of modifying the input array", function () {
        const numbers = [1, 2, 3];
        const mappedNumbers = _.map(numbers, function (num) {
          return num;
        });

        expect(mappedNumbers).to.not.equal(numbers);
      });
    });

    describe("reduce", function () {
      checkForNativeMethods(function () {
        const add = function (tally, item) {
          return tally + item;
        };
        _.reduce([1, 2, 3, 4], add);
      });

      it("should be a function", function () {
        expect(_.reduce).to.be.an.instanceOf(Function);
      });

      it("should return a value", function () {
        /* jshint ignore:start */
        const result = _.reduce([3, 2, 1], function (memo, item) {
          return item;
        });
        expect(result).to.be.defined;
        /* jshint ignore:end */
      });

      it("should not mutate the input array", function () {
        /* jshint ignore:start */
        const input = [1, 2, 3, 4, 5];
        const result = _.reduce(input, function (memo, item) {
          return item;
        });

        /*
         * Mutation of inputs should be avoided without good justification otherwise
         * as it can often lead to hard to find bugs and confusing code!
         * Imagine we were reading the code above, and we added the following line:
         *
         * const lastElement = input[input.length - 1];
         *
         * Without knowing that mutation occured inside of _.reduce,
         * we would assume that `lastElement` is 5. But if inside of
         * _.reduce, we use the array method `pop`, we would permanently
         * change `input` and our assumption would not longer be true,
         * `lastElement` would be 4 instead!
         *
         * The tricky part is that we have no way of knowing about the mutation
         * just by looking at the code above. We'd have to dive into the
         * implementation of _.reduce to the exact line that uses `pop`.
         * If we write a lot of code with this assumption, it might be very hard
         * to trace back to the correct line in _.reduce.
         *
         * You can avoid an entire class of bugs by writing functions
         * that don't mutate their inputs!
         */

        expect(input).to.eql([1, 2, 3, 4, 5]);
        /* jshint ignore:end */
      });

      it("should invoke the iterator function with arguments (memo, item) in that order", function () {
        let memoInCallback;
        let itemInCallback;

        _.reduce(
          ["item"],
          function (memo, item) {
            memoInCallback = memo;
            itemInCallback = item;
          },
          "memo"
        );

        expect(memoInCallback).to.equal("memo");
        expect(itemInCallback).to.equal("item");
      });

      it("should pass items of the array into the iterator from left to right", function () {
        const orderTraversed = [];

        _.reduce(
          [1, 2, 3, 4],
          function (memo, item) {
            orderTraversed.push(item);
            return memo;
          },
          10
        );

        expect(orderTraversed).to.eql([1, 2, 3, 4]);
      });

      it("should continue to call iterator even if the iterator returns undefined", function () {
        let callCount = 0;
        const returnFalsy = function (total, item) {
          callCount++;
          if (callCount === 1) {
            return undefined;
          } else {
            return item + 1;
          }
        };

        const total = _.reduce([1, 1, 2], returnFalsy);
        expect(total).to.equal(3);
      });

      it("should pass every item of the array into the iterator if a memo is passed in", function () {
        const result = _.reduce(
          [1, 2, 3],
          function (memo, item) {
            return memo - item;
          },
          10
        );

        expect(result).to.equal(4);
      });

      it("should accept falsy values as a valid memo", function () {
        // Be careful how you check if a memo has been passed in
        const result = _.reduce(
          [1, 2, 3],
          function (memo, item) {
            return memo * item;
          },
          0
        );

        expect(result).to.equal(0);
      });

      it("should set memo to be the first item of the array if no memo is passed in", function () {
        const result = _.reduce([1, 2, 3], function (memo) {
          return memo;
        });

        expect(result).to.equal(1);
      });

      it("should pass the second item of the array into the iterator first if a memo is not passed in", function () {
        const result = _.reduce([3, 2, 1], function (memo, item) {
          return memo - item;
        });

        expect(result).to.equal(0);
      });
    });
  });
})();
