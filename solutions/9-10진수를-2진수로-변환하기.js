/**
 * 문제 9. 10진수를 2진수로 변환하기
 *
 * 10진수를 입력받아 2진수로 변환해 반환하는 solution() 함수를 구현하세요.
 *
 *
 * 제한사항
 *  decimal은 1이상 10억 미만의 자연수
 *
 * 입출력 예
 *  1.
 *      input => decimal: 10
 *      output => 1010
 *  2.
 *      input => decimal: 27
 *      output => 11011
 *  3.
 *      input => decimal: 12345
 *      output => 110000000111001
 */

// ㅎ.. 이렇게 풀지 말라고 출제하신 거겠죠?
// const solution = function (decimal) {
//   return decimal.toString(2);
// };

/**
 *
 * @param {*} decimal - 2진수로 변환할 10진수
 */
const solution = function (decimal) {
  const stack = [];

  let copiedDecimal = decimal;
  while (copiedDecimal > 0) {
    const mok = Math.floor(copiedDecimal / 2),
      remainder = copiedDecimal % 2;
    stack.push(remainder);

    copiedDecimal = mok;
  }

  return stack.reverse().join("");
};

console.log(solution(10));
console.log(solution(27));
console.log(solution(12345));
