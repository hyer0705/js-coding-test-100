/**
 * 17. 카드 뭉치
 *
 * 코니는 영어 단어가 적힌 카드 뭉치 두 개를 선물로 받았습니다.
 * 코니는 다음과 같은 규칙으로 카드에 적힌 단어들을 사용해 원하는 순서의 단어 배열을 만들 수 있는지 알고 싶습니다.
 *
 * - 원하는 카드 뭉치에서 카드를 순서대로 한 장씩 사용합니다.
 * - 한 번 사용한 카드는 다시 사용할 수 없습니다.
 * - 카드를 사용하지 않고 다음 카드로 넘어갈 수 없습니다.
 * - 기존에 주어진 카드 뭉치의 단어 순서는 바꿀 수 없습니다.
 *
 * 문자열로 이루어진 'cards1', 'cards2'와 원하는 단어 배열 'goal'이 매개변수로 주어질 때,
 *  'cards1'과 'cards2'에 적힌 단어들로 'goal'를 만들 수 있다면 "Yes"를,
 *  만들 수 없다면 "No"를 return하는 solution 함수를 완성해주세요.
 *
 * 제한사항
 * - 1 <= cards1의 길이, cards2의 길이 <= 10
 *      - 1 <= cards1[i]의 길이, cards2[i]의 길이 <= 10
 *      - cards1과 cards2에는 서로 다른 단어만 존재합니다.
 *  - 2 <= goal의 길이 <= cards1 의 길이 + cards2 의 길이
 *      - 1 <= goal[i] 의 길이 <= 10
 *      - goal의 원소는 cards1과 cards2의 원소들로만 이루어져 있습니다.
 *  - cards1, cards2, goal의 문자열들은 모두 알파벳 소문자로만 이루어져 있습니다.
 *
 * 입출력 예
 * 1.
 *  input => cards1: ["i", "drink", "water"], cards2: ["want", "to"], goal: ["i", "want", "to", "drink", "water"]
 *  output => "Yes"
 * 2.
 *  input => cards1: ["i", "water", "drink"], cards2: ["want", "to"], goal: ["i", "want", "to", "drink", "water"]
 *  output => "No"
 */

const isGoalPointerValid = (goalPointer, goalLen) => goalPointer < goalLen;
const isSameWord = (word1, word2) => word1 === word2;
const canMakeGoal = (goalPointer, goalLen) => goalPointer === goalLen;

function solution(cards1, cards2, goal) {
  var answer = "";

  let c1Pointer = 0,
    c2Pointer = 0,
    goalPointer = 0;

  while (isGoalPointerValid(goalPointer, goal.length)) {
    if (isSameWord(cards1[c1Pointer], goal[goalPointer])) {
      c1Pointer++;
    } else if (isSameWord(cards2[c2Pointer], goal[goalPointer])) {
      c2Pointer++;
    } else {
      break;
    }

    goalPointer++;
  }

  return canMakeGoal(goalPointer, goal.length) ? "Yes" : "No";
}

console.log(
  solution(
    ["i", "drink", "water"],
    ["want", "to"],
    ["i", "want", "to", "drink", "water"]
  )
);

console.log(
  solution(
    ["i", "water", "drink"],
    ["want", "to"],
    ["i", "want", "to", "drink", "water"]
  )
);
