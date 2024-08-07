/**
 * 문제 4. 모의고사
 *
 * 수포자는 수학을 포기한 사람의 준말입니다. 수포자 삼인방은 모의고사에서 수학 문제를 전부 찍으려 합니다.
 * 수포자는 1번 문제부터 마지막 문제까지 다음과 같이 찍습니다.
 *
 * 1번 수포자: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
 * 2번 수포자: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...
 * 3번 수포자: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...
 *
 * 1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때,
 *  가장 많은 문제를 맞힌 사람이 누구인지 배열에 담아 return 하도록 solution 함수를 작성해주세요.
 *
 * 제한사항
 *  시험은 최대 10,000 문제로 구성되어 있습니다.
 *  문제의 정답은 1, 2, 3, 4, 5 중 하나입니다.
 *  가장 높은 점수를 받은 사람이 여럿일 경우, return 하는 값을 오름차순 정렬해주세요.
 *
 * url: https://school.programmers.co.kr/learn/courses/30/lessons/42840
 */

function solution(answers) {
  const STU_ONE = [1, 2, 3, 4, 5];
  const STU_ONE_LEN = STU_ONE.length;

  const STU_TWO = [2, 1, 2, 3, 2, 4, 2, 5];
  const STU_TWO_LEN = STU_TWO.length;

  const STU_THREE = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  const STU_THREE_LEN = STU_THREE.length;

  var answer = [];

  const examRes = answers.reduce(
    (acc, curr, i) => {
      STU_ONE[i % STU_ONE_LEN] === curr && acc[0]++;
      STU_TWO[i % STU_TWO_LEN] === curr && acc[1]++;
      STU_THREE[i % STU_THREE_LEN] === curr && acc[2]++;

      return acc;
    },
    [0, 0, 0]
  );

  const maxScore = Math.max(...examRes);

  examRes.forEach((score, i) => score === maxScore && answer.push(i + 1));
  answer.sort((a, b) => a - b);

  return answer;
}

console.log(solution([1, 2, 3, 4, 5]));
console.log(solution([1, 3, 2, 4, 2]));
