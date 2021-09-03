/* globals window, _ */

/*
 *
 * ⛔️이미 작성이 완료된 함수의 내용은 수정/삭제하지 마세요.
 * ⛔️이미 작성이 완료된 함수의 내용은 반드시 이해하셔야 합니다.
 *
 */
(function () {
  ("use strict");

  window._ = {};

  /*
   *
   * 🥇첫 번째 퀘스트 indentity입니다.
   *
   * 이 외에도 아래에 총 20개 가량의 함수 내용이 비어져 있습니다.
   * 빈 함수 내용들을 차근차근 채워나가세요.
   *
   */
  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function (value) {
    return value;
  };
  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; 
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // [DO NOT MODIFY]
  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function (array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function (array, n) {
    if (n === 0) {
      return array.slice(0, n);
    } else {
      return n === undefined
        ? array[array.length - 1]
        : array.slice(-n, array.length);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function (collection, iterator) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    }
    if (!Array.isArray(collection) && typeof collection === "object")
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
  };

  // [DO NOT MODIFY]
  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function (array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function (item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function (collection, test) {
    const result = [];
    for (const item of collection) {
      if (test(item)) {
        result.push(item);
      }
    }
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function (collection, test) {
    const result = [];
    for (const item of collection) {
      if (!test(item)) {
        result.push(item);
      }
    }
    return result;
  };

  // Return the results of applying an iterator to each element.
  _.map = function (collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    const result = [];
    for (const item of collection) {
      result.push(iterator(item));
    }
    return result;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  _.reduce = function (collection, iterator, accumulator) {
    if (accumulator === undefined) {
      accumulator = collection[0];
      for (let i = 1; i < collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]);
      }
    } else {
      for (let i = 0; i < collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]);
      }
    }
    return accumulator;
  };

  // [DO NOT MODIFY]
  // Determine if the array or object contains a given value (using `===`).
  _.contains = function (collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(
      collection,
      function (wasFound, item) {
        if (wasFound) {
          return true;
        }
        return item === target;
      },
      false
    );
  };

  // Determine whether all of the elements match a truth test.
  _.every = function (collection, iterator) {
    // TIP: Try re-using reduce() here.
    //#1 reduce 사용 => -.reduce로 바꾸고 싶었는데 잘 안되었어요.
    // if (!iterator) {
    //   for (const item of collection) {
    //     if (!Boolean(item)) return false;
    //   }
    //   return true;
    // } else {
    //   const result = collection.reduce((acc, item) => {
    //     if (!acc) return false;
    //     return iterator(item);
    //   }, true);
    //   return Boolean(result);
    // }
    if (!iterator) {
      for (const item in collection) {
        if (!collection[item]) {
          return false;
        }
      }
      return true;
    } else {
      for (const item in collection) {
        if (!iterator(collection[item])) {
          return false;
        }
      }
      return true;
    }
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function (collection, iterator) {
    if (!iterator) {
      for (const item of collection) {
        if (Boolean(item)) {
          return true;
        } else {
          return false;
        }
      }
    }
    const result = collection.reduce((acc, item) => {
      if (acc) return true;
      return iterator(item);
    }, false);
    return Boolean(result);
  };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function (...obj) {
    const result = Object.assign({}, ...obj);
    return result;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  //defaults=> extend 함수에 obj를 돌려봐서 key 값이 중복되면 push가 안되는 조건 걸어서 만들다가 native version 제약조건(reduce,indexof 때문에 막혔습니다.
  //아래는 구글링해서 참조했습니다.
  _.defaults = function (obj) {
    for (let i = 0; i < arguments.length; i++) {
      for (const key in arguments[i]) {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  };

  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // [DO NOT MODIFY]
  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function (func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function () {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function (func) {
    const addedMemo = {};
    return (...args) => {
      if (addedMemo[args]) {
        return addedMemo[args];
      }
      const result = func(...args);
      addedMemo[args] = result;
      console.log(addedMemo);
      return result;
    }
  };

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function (collection, functionOrKey) {
    let result = [];
    if (typeof functionOrKey === "string") {
      result = _.map(collection, function (item) {
        return String.prototype[functionOrKey].apply(item);
      });
    } else {
      for (const item of collection) {
        result.push(functionOrKey.apply(item));
      }
    }
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  // mdn Array.prototype.flat()참조
  _.flatten = function (nestedArray) {
    const givenData = [...nestedArray];
    const result = [];
    while (givenData.length) {
      const next = givenData.pop();
      if (Array.isArray(next)) {
        givenData.push(...next);
      } else {
        result.push(next);
      }
    }
    return result.reverse();
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the lodash doc for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function (func, wait) {
    let isDelayed = false;
    return () => {
      if (!isDelayed) {
        func();
        isDelayed = true;
        setTimeout(function () {
          isDelayed = false;
        }, wait);
      }
    }
  };
})();
