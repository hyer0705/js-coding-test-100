/**
 * 문제 02. 배열 제어하기
 *
 * 정수 배열을 하나 받습니다. 배열의 중복 값을 제거하고 배열 데이터를 내림차순으로 정렬해서 반환하는 solution() 함수를 구현하세요.
 *
 * 제약 조건
 *  배열 길이는 2 이상 1,000 이하입니다.
 *  각 배열의 데이터 값은 -100,000 이상 100,000 이하입니다.
 *
 * Test Case
 *  1) input: [4, 2, 2, 1, 3, 4], output: [4, 3, 2, 1]
 *  2) input: [2, 1, 1, 3, 2, 5, 4], output: [5, 4, 3, 2, 1]
 *
 * Date
 *  2024.08.06(TUE)
 */

const solution = (nums) => {
  return [...new Set(nums)].sort((a, b) => b - a);
};

console.log(solution([4, 2, 2, 1, 3, 4]));
console.log(solution([2, 1, 1, 3, 2, 5, 4]));
