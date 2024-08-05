/**
 * 문제 01. 배열 정렬하기
 *
 * 정수 배열을 정렬해서 반환하는 solution() 함수를 완성하세요.
 *
 * 제약 조건
 *  정수 배열의 길이는 2이상 10^5 이하입니다.
 *  정수 배열의 각 데이터 값은 -100,000 이상 100,000 이하입니다.
 *
 * Test Case
 *  1) input: [1, -5, 2, 4, 3], output: [-5, 1, 2, 3, 4]
 *  2) input: [2, 1, 1, 3, 2, 5, 4], output: [1, 1, 2, 2, 3, 4, 5]
 *  3) input: [6, 1, 7], output: [1, 6, 7]
 */

const solution = (nums) => {
  return nums.sort((a, b) => a - b);
};

console.log(solution([1, -5, 2, 4, 3]));
console.log(solution([2, 1, 1, 3, 2, 5, 4]));
console.log(solution([6, 1, 7]));
