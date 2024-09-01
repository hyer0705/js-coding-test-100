/**
 * 28. 예상 대진표
 * https://school.programmers.co.kr/learn/courses/30/lessons/12985
 */

function solution(n, a, b) {
  var answer = 1;

  const totalRound = Math.log2(n);
  let [currA, currB] = [a, b];
  for (let r = 0; r < totalRound; r++) {
    if (
      (currA % 2 === 0 && currB === currA - 1) ||
      (currA % 2 === 1 && currB === currA + 1)
    )
      break;

    currA = Math.ceil(currA / 2);
    currB = Math.ceil(currB / 2);

    answer++;
  }

  return answer;
}

console.log(solution(8, 4, 7));
console.log(solution(1048576, 12345, 12346));
console.log(solution(4, 2, 3));
