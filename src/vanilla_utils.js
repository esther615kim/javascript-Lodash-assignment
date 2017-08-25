/* globals _, window */
(function() {
  'use strict';

  window._ = {};

  /**
   * COLLECTIONS
   * ===========
   *
   *  이 섹션에서는, collection을 argument로 받아 작업하는 function을 볼것입니다.
   * Javascript에서 `collection`은 array또는 object를 뜻합니다.
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * 아래 _.first function은 이미 완성이 되었습니다. 아래 _.first와 같이 다른 function들도
   * 작동이 되도록 코딩을 하시면 됩니다.
   * 아래 처럼 이미 완성된 function을 보실경우 그냥 넘어가지 마시고 꼭 읽고 어떠한 기능을 같고
   * 있는지 꼭 이해하세요. 만약 이해하지 않고 그냥 넘어가면 나중에나오는 function들을 구현할때
   * 구현 못하실 정도로 어렵게 느껴지실겁니다.
   *
   */

  _.identity = function (val) {
    return val;
  };

  //  `array`의 첫 `n` item들을 가지고 있는 array를 return 합니다.
  // 만약 `n`이 `undefined`이면 첫번째 item을 return 합니다.,
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  //  위 `_.first`와 거의 비슷합니다. 첫 `n` item이 아닌 뒤에서 부터 `n` item을 가지고 있는
  // array를 return합니다. 만약 `n`이 `undefined`이면 마지막 item을 return합니다.
  _.last = function(array, n) {
  };

  //  `iterator(value, key, collection)`를 collection의 item마다 invoke합니다.
  // collection은 array일수도 있고 object일수도 있다는거 기억하세요.
  //
  //  Note: `_.each` function은 `iterator` function을
  // collection의 item마다 invoke만 할뿐 value를 return하지 않습니다.
  _.each = function(collection, iterator) {
  };

  //  `array`에서 `target` item이 있는지 찾아 발견된 item의 위치(index)를 return합니다.
  // 만약 없다면  -1 을 return 합니다.
  _.indexOf = function(array, target) {
    //  TIP: `_.indexOf`는 iterate를 하는 function입니다. `_.indexOf`는 여러분들이
    // 참고 하시라고 완성하였습니다. 잘보면 `for` loop을 사용하지 않고 iteration을 해주는
    // `each` function을 사용합니다. 이 `each` function은 여러분이 구현한것입니다.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // `truth` test를 pass한 item들을 담은 array를 return합니다.
  _.filter = function(collection, test) {
  };

  // `truth` test를 pass 못한 item들을 담은 array를 return합니다.
  _.reject = function(collection, test) {
    //  TIP: `_.filter` function body 안의
    // 코드를 복붙하여 조금 변환하지 말고 `_.filter` function을 invoke하여 구현하세요.
  };

  // 같은_값이_없는(duplicate-free) array를 return합니다.
  _.uniq = function(array) {
  };


  // iterator를 item별로 invoke하여 return된 value를 array에 담아 return합니다.
  _.map = function(collection, iterator) {
 };


  // objecte들이 담긴 array를 첫번째 argument으로 받고,
  // 각 object의 특정 property value들을 array에 담아 return합니다.
  _.pluck = function(collection, key) {
  /*
   * TIP: `_.map`은 array안의 value를 변환한 value들을 가지고 있는 새로운 array를
   * return 하는 정말 쓸모 있는 function입니다. 아래 `_.pluck`은 `_.map`이 어떻게
   * 사용되는지를 보여주기 위해 완성되었습니다.
   */
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  //  `array`나 `object`에 iterator(accumulator, item)를 item마다 한번씩
  // 반영하여 한개의 값으로 만듭니다.
  // `accumulator`는 전에 call된 iterator에서 return한 value 입니다.

  //  `accumulator`의 첫번째 값을 3번째의 argument value를 주는것으로 정할수 있습니다.
  // 만약 3번째 argument를 주지 않을시에는 `array`나 `object`의 첫번째 item을 `accumulator`
  // 로 사용하게 됩니다. 그리고 이 첫번째 item은 iterator에 들어가지 않습니다.
  // 다시말해, iterator는 두번째 item부터 invoke이 되며 첫번째 item을 첫번째 argument로 받습니다.
  //
  // Example:
  //   var numbers = [1,2,3];

  //   `sum`은 6 입니다.
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0);
  //
  //   `identity`는 5여야 합니다. `_.reduce()`에 3번째 argument로 아무것도 받지 않았기 때문에
  //   `iterator`는 2번째 item부터 돌아갑니다. 그러나 array에는 2번째 item이 없습니다. 즉 iterator가
  //   돌아가지 않으며 어떠한 iterator를 주더라도 `identity`는 5가 됩니다.
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   });

  _.reduce = function(collection, iterator, accumulator) {
  };

  // `collection`이 `target` value를 가지고 있는지 `===`을 사용하여 있는지 check합니다.
  _.contains = function(collection, target) {
    // TIP: 많은 iteration이 필요한 문제들이 거의 대부분 `_.reduce()`를 사용하여 해결할수 있습니다.
    // 아래 코드는 `_.reudce()`를 사용하여 풀수 있다는것을 보여주기 위해 완성되었습니다.
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // `collection`의 element들이 전부 `truth` test를 pass하는지 측정합니다.
  _.every = function(collection, iterator) {
    // TIP: reduce()를 사용하여 풀어보세요.
  };

  // `collection`의 item중 하나라도 `truth` test를 pass하느지 측정합니다.
  // `iterator`가 `undefined`이면 기본 iterator를 사용합니다.
  _.some = function(collection, iterator) {
    // TIP: every()를 잘 사용하면 간단하게 끝납니다.
  };


  /**
   * OBJECTS
   * =======
   *
   * object를 하나로 합치는(merging)하는 function을 재구현 해보겠습니다.
   *
   */

  // 첫 argument로 받은 object에 그 다음 argument들로 받은 object들의 모든 property들을 더하세요.
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   });
  //
  //  obj1에는 이제 key1, key2, key3들이 있습니다.
  //
  _.extend = function(obj) {
  };

  // extend와 같지만, obj에 이미 있는 key들은 덮어쓰기(overwrite)하지 않음.
  _.defaults = function(obj) {
  };


  /**
   * FUNCTIONS
   * =========
   *
   *  function decorator를 사용하도록 하겠습니다. function decorator란 function을
   *  argument로 받아 행동하는것이 변경된 새로운 버전의 function을 return하는 function입니다.
   *
   */

  // 최대 1번만 invoke될수 있는 function을 return 합니다. 1번 이상 invoke을 하면 그전에
  // invoke하여 return된 value를 return합니다.
  _.once = function(func) {
    // TIP: 아래 variable들은 전부 "closure scope"입니다.
    // 즉, 아래 variable들은 return 된 새로운 function안에서 계속 보이는 것들입니다.
    var alreadyCalled = false;
    var result;

    // TIP: 만약 return된 function이 한번도 invoke되지 않았다면 `func` argument로 받은
    // function에게 일을_넘기도록(delegate) 합니다.
    return function() {
      if (!alreadyCalled) {
        // TIP: 한 function에서 받은 arguments를 다른 function으로 넘길때에는 .apply(this, arguments)를 많이 사용합니다.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }

      return result;
    };
  };

  //  많고/비싼 계산을 하는 function의 결괏값(result)를 저장하여 기억하는(Memorize) function을
  // 만드세요. `_.memoize()` function은 primitive들만 argument로 받습니다.
  // `memoize`라는 이름은 oncePerUniqueArgumentList(argument별로_한번씩만)라고 다시 이름을 지정할수 있습니다.
  // `memoize`는 `once`와 거의 같은 일을 합니다. 다른점은 unique argument들 별로  `_.once`가 지정됩니다.
  //
  // `_.memoize`는 새로운 function을 return해야 합니다. 그리고 이 새로운 function이 invoke되면
  // 먼저 받은 argument를 가지고 invoke이 예전에 됬는지 확인을 합니다. 막약 예전에 한번 같은 argument들을 가지고
  // invoke이 되어 result를 return했다면 예전에 return된 result를 다시 return합니다.
  _.memoize = function(func) {
  };

  //  `func` argument로 받은 function을 `wait` argument로 받은 millisecond 숫자만큼 delay하여
  // 3번째 부터 받은 argument들을 사용하여 invoke합니다.
  // Example: _.delay(someFunction, 500, 'a', 'b') 은 `someFunction('a', 'b')`를 500ms후에 invoke합니다.
  _.delay = function(func, wait) {
  };

}());
