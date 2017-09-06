## 힌트

- [참고 문서](http://underscorejs.org/)에서 같은 이름의 함수를 찾아 구현해야할 함수의 특징을 살펴보세요.
- "collection"이라 함은 array 또는 object입니다. 그래서 array일때와 object일때를 모두 감안해서 코드를 짜주셔야 합니다.
    - `Array.isArray(collection)`을 사용하여 `collection`이 `array`인지 아니면 `object`인지 식별할수 있습니다.
- Javascript는 `Math` object를 가지고 있습니다. [MDN 참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math)
- function안에는 `arguments`라는 keyword가 있습니다. 이 keyword는 function에 전달된 모든 argument들을 가지고 올수 있습니다. argument들에 하나씩 이름을 선정 하지 않았어도 `arguments` keyword를 사용하여 가지고 올수 있습니다. 이 keyword를 사용하면 function에 어떠한 argument들이 전달될지 미리 알고 있지 않아도 전달된 argument들을 사용할수 있습니다.
    - `arguments.length`를 사용하여 argument들이 몇개인지 알수 있으며 `arguemnts[i]`를 사용하여 각각의 argument를 읽을 수 있습니다.
    - `arguments`는 `array`와는 다른 조금 특별한 object입니다. `array` 같기는 하지만 `slice`나 `push`같은 array method들을 사용할수 없습니다.
    - [MDN 참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/arguments)

## 과제 내용

- `src/vanilla_utils.js` 파일속에 비어있는 자바스크립트 함수들을 작성해주시면 됩니다.
- `SpecRunner.html`을 브라우저에 열면 모든 test를 확인할수 있습니다.

**Note:** 자바스크립트 Array.prototype에는 `forEach`, `map`, `reduce`, 그리고 `filter`와 같은 method들이 이미 존재합니다. 작업하실때 이미 존재하는 method들은 사용하지 마세요.
