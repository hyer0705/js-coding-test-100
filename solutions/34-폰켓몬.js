/**
 * 34. 폰켓몬
 * https://school.programmers.co.kr/learn/courses/30/lessons/1845
 */

function solution(nums) {
  const maxMonsterCnt = nums.length / 2;
  const duplicateMonsterTypesCnt = new Set(nums).size;

  if (maxMonsterCnt >= duplicateMonsterTypesCnt)
    return duplicateMonsterTypesCnt;

  return maxMonsterCnt;
}

console.log(solution([3, 1, 2, 3]));
console.log(solution([3, 3, 3, 2, 2, 4]));
console.log(solution([3, 3, 3, 2, 2, 2]));
