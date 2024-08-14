/**
 * 문제 10. 괄호 회전하기
 *
 * 다음 규칙을 지키는 문자열을 올바른 괄호 문자열이라고 정의합니다.
 *
 * - (), [], {} 는 모두 올바른 괄호 문자열입니다.
 * - 만약 A가 올바른 괄호 문자열이라면, (A), [A], {A} 도 올바른 괄호 문자열입니다.
 *      예를 들어, []가 올바른 괄호문자열이므로, ([]) 도 올바른 괄호 문자열입니다.
 * - 만약 A, B가 올바른 괄호 문자열이라면, AB도 올바른 괄호 문자열입니다.
 *      예를 들어, {}와 ([]) 가 올바른 괄호 문자열이므로, {}([]) 도 올바른 괄호 문자열입니다.
 *
 * 대괄호, 중괄호, 그리고 소괄호로 이루어진 문자열 s가 매개변수로 주어집니다.
 *  이 s를 왼쪽으로 x(0 <= x < (s의 길이)) 칸만큼 회전시켰을 때
 *  s가 올바른 괄호 문자열이 되게 하는 x의 개수를 return 하도록 solution 함수를 완성해주세요.
 *
 * 제한사항
 *  s의 길이는 1 이상 1,000 이하입니다.
 *
 * 입출력 예
 *  1.
 *      input => s: "[](){}"
 *      output => 3
 *  2.
 *      input => s: "}]()[{"
 *      output => 2
 *  3.
 *      input => s: "[)(]"
 *      output => 0
 *
 *  4.
 *      input => s: "}}}"
 *      output => 0
 */

/**
 * 자료구조 stack을 표현한 class
 */
class Stack {
  constructor() {
    this.stack = [];
    this.top = -1;
  }

  push(val) {
    this.stack[++this.top] = val;
  }

  isEmpty() {
    return this.size() === 0;
  }

  pop() {
    if (this.isEmpty()) return "Empty...";

    const peekValue = this.stack.pop();
    this.top--;

    return peekValue;
  }

  peek() {
    if (this.isEmpty()) return "Empty...";

    return this.stack[this.top];
  }

  size() {
    return this.stack.length;
  }
}

const BRACKETS = Object.freeze({
  SMALL_OPEN: "(",
  MIDDLE_OPEN: "{",
  LARGE_OPEN: "[",
  SMALL_CLOSE: ")",
  MIDDLE_CLOSE: "}",
  LARGE_CLOSE: "]",
});

const isOpenBracket = (bracket) =>
  bracket === BRACKETS.SMALL_OPEN ||
  bracket === BRACKETS.MIDDLE_OPEN ||
  bracket === BRACKETS.LARGE_OPEN;
const isCloseBracket = (bracket) =>
  bracket === BRACKETS.SMALL_CLOSE ||
  bracket === BRACKETS.MIDDLE_CLOSE ||
  bracket === BRACKETS.LARGE_CLOSE;

const findMatchingBracket = (bracket) => {
  switch (bracket) {
    case BRACKETS.SMALL_OPEN:
      return BRACKETS.SMALL_CLOSE;
    case BRACKETS.MIDDLE_OPEN:
      return BRACKETS.MIDDLE_CLOSE;
    case BRACKETS.LARGE_OPEN:
      return BRACKETS.LARGE_CLOSE;
  }
};

function isRightBrackets(s) {
  const stack = new Stack();

  for (let i = 0; i < s.length; i++) {
    const currBracket = s[i];
    if (isOpenBracket(currBracket)) {
      stack.push(currBracket);
    } else if (isCloseBracket(currBracket)) {
      if (findMatchingBracket(stack.peek()) === currBracket) {
        stack.pop();
      } else stack.push(currBracket);
    }
  }

  return stack.size() === 0;
}

function solution(s) {
  var answer = 0;

  for (let i = 0; i < s.length; i++) {
    const newStr = s.slice(i) + s.slice(0, i);
    if (isRightBrackets(newStr)) answer++;
  }

  return answer;
}

console.log(solution("[](){}"));
console.log(solution("}]()[{"));
console.log(solution("[)(]"));
console.log(solution("}}}"));
