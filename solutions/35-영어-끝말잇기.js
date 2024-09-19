/**
 * 35. 영어 끝말잇기
 * https://school.programmers.co.kr/learn/courses/30/lessons/12981
 */

function solution(n, words) {
  var answer = [0, 0];

  let i = 0;
  let time = 1;
  const wordSet = new Set();
  while (i < words.length) {
    const curr = words[i];
    const prev = words[i - 1] || "";

    if (curr.length < 2) {
      return [(i % n) + 1, time];
    }
    if (prev !== "" && prev[prev.length - 1] !== curr[0]) {
      return [(i % n) + 1, time];
    }
    if (wordSet.has(curr)) {
      return [(i % n) + 1, time];
    }
    if ((i + 1) % n === 0) time++;
    i++;

    wordSet.add(curr);
  }

  return answer;
}

console.log(solution(2, ["hello", "o"])); // [2, 1]
console.log(
  solution(3, [
    "tank",
    "kick",
    "know",
    "wheel",
    "land",
    "dream",
    "mother",
    "robot",
    "tank",
  ])
); // [3, 3]
console.log(
  solution(5, [
    "hello",
    "observe",
    "effect",
    "take",
    "either",
    "recognize",
    "encourage",
    "ensure",
    "establish",
    "hang",
    "gather",
    "refer",
    "reference",
    "estimate",
    "executive",
  ])
); // [0, 0]
console.log(
  solution(2, ["hello", "one", "even", "never", "now", "world", "draw"])
); // [1, 3]
