/**
 * 20. 완주하지 못한 선수
 *
 * 2024.08.24(SAT)
 * https://school.programmers.co.kr/learn/courses/30/lessons/42576?language=javascript
 */

function solution(participant, completion) {
  var answer = "";

  const completionMap = new Map();
  for (const player of completion) {
    if (completionMap.has(player)) {
      completionMap.set(player, completionMap.get(player) + 1);
    } else {
      completionMap.set(player, 1);
    }
  }

  for (const player of participant) {
    if (!completionMap.has(player)) {
      return player;
    }
    if (completionMap.has(player) && completionMap.get(player) <= 0) {
      return player;
    }

    completionMap.set(player, completionMap.get(player) - 1);
  }

  return answer;
}

console.log(solution(["leo", "kiki", "eden"], ["eden", "kiki"])); // leo
console.log(
  solution(
    ["marina", "josipa", "nikola", "vinko", "filipa"],
    ["josipa", "filipa", "marina", "nikola"]
  )
); // vinko
console.log(
  solution(["mislav", "stanko", "mislav", "ana"], ["stanko", "ana", "mislav"])
); // mislav
