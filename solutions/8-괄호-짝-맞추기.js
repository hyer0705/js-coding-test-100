/**
 * 문제 8. 괄호 짝 맞추기
 *
 * 소괄호는 짝을 맞춘 열린 괄호 `(`와 닫힌 괄호 `)`로 구성합니다.
 * 문제에서는 열린 괄호나 닫힌 괄호가 마구 뒤섞인 문자열을 줍니다.
 * 이때 소괄호가 정상으로 열고 닫혔는지 판별하는 solution 함수를 구현하세요.
 * 만약 소괄호가 정상적으로 열고 닫혔다면 true를, 그렇지 않다면 false를 반환하면 됩니다.
 *
 *
 * 제한사항
 *  열린 괄호는 자신과 가장 가까운 닫힌 괄호를 만나면 상쇄됩니다.
 *  상쇄 조건은 열린 괄호가 먼저 와야 하고, 열린 괄호와 닫힌 괄호 사이에 아무것도 없어야 합니다.
 *  더 상쇄할 괄호가 없을 때까지 상쇄를 반복합니다.
 *
 * 입출력 예
 *  1.
 *      input => s: "(())()"
 *      output => true
 *  2.
 *      input => dirs: "((())()"
 *      output => false
 *
 */

class Stack {
  constructor() {
    this.stack = [];
    this.top = -1;
  }

  isEmpty() {
    return this.stack.length <= 0;
  }

  push(value) {
    this.stack[++this.top] = value;
  }

  pop() {
    if (this.isEmpty()) return;
    const topValue = this.stack.pop();
    this.top--;

    return topValue;
  }

  getTopValue() {
    if (this.isEmpty()) return "";
    return this.stack[this.top];
  }

  size() {
    return this.stack.length;
  }
}

const BRACKETS = Object.freeze({
  OPEN: "(",
  CLOSE: ")",
});

const isOpenBracket = (ch) => ch === BRACKETS.OPEN;
const isCloseBracket = (ch) => ch === BRACKETS.CLOSE;

function solution(s) {
  const stack = new Stack();

  [...s].forEach((bracket) => {
    if (isCloseBracket(bracket)) {
      if (isOpenBracket(stack.getTopValue())) {
        stack.pop();
      } else {
        stack.push(bracket);
      }
    } else if (isOpenBracket(bracket)) stack.push(bracket);
  });

  return stack.size() === 0;
}
console.log(solution("(())()"));
console.log(solution("((())()"));

// 내가 생각해 낸 반례
console.log(solution(")(())()"));
