/**
 * 13. 크레인 인형뽑기 게임
 *
 * 게임개발자인 "죠르디"는 크레인 인형뽑기 기계를 모바일 게임으로 만들려고 합니다.
 * "죠르디"는 게임의 재미를 높이기 위해 화면 구성과 규칙을 다음과 같이 게임 로직에 반영하려고 합니다.
 *
 * 게임 화면은 "1 x 1" 크기의 칸들로 이루어진 "N x N" 크기의 정사각 격자이며 위쪽에는 크레인이 있고
 *  오른쪽에는 바구니가 있습니다. 각 격자 칸에는 다양한 인형들이 들어 있으며 인형이 없는 칸은 빈칸입니다.
 *  모든 인형은 "1 x 1" 크기의 격자 한 칸을 차지하며 격자의 가장 아래 칸부터 차곡차곡 쌓여 있습니다.
 *  게임 사용자는 크레인을 좌우로 움직여서 멈춘 위치에서 가장 위에 있는 인형을 집어 올릴 수 있습니다.
 *  집어 올린 인형은 바구니에 쌓이게 되는 데, 이때 바구니의 가장 아래 칸부터 인형이 순서대로 쌓이게 됩니다.
 *
 *  만약 같은 모양의 인형 두 개가 바구니에 연속해서 쌓이게 되면 두 인형은 터뜨려지면서 바구니에서 사라지게 됩니다.
 *
 * 크레인 작동 시 인형이 집어지지 않는 경우는 없으나 만약 인형이 없는 곳에서 크레인을 작동시키는 경우에는 아무런 일도 일어나지 않습니다.
 *  또한 바구니는 모든 인형이 들어갈 수 있을 만큼 충분히 크다고 가정합니다.
 *
 * 게임 화면의 격자의 상태가 담긴 2차원 배열 board와 인형을 집기 위해 크레인을 작동시킨 위치가 담긴 배열 moves가 매개변수로 주어질 때,
 *  크레인을 모두 작동시킨 후 터트려져 사라진 인형의 개수를 return 하도록 solution 함수를 완성해주세요.
 *
 * 제한사항
 *  - board 배열은 2차원 배열로 크기는 "5 x 5" 이상 "30 x 30" 이하입니다.
 *  - board의 각 칸에는 0 이상 100 이하인 정수가 담겨있습니다.
 *      - 0은 빈 칸을 나타냅니다.
 *      - 1 ~ 100의 각 숫자는 각기 다른 인형의 모양을 의미하며 같은 숫자는 같은 모양의 인형을 나타냅니다.
 *  - moves 배열의 크기는 1 이상 1,000 이하입니다.
 *  - moves 배열 각 원소들의 값은 1 이상이며 board 배열의 가로 크기 이하인 자연수입니다.
 *
 * 테스트 케이스
 *  1.
 *      input => board: [[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]], moves: [1,5,3,5,1,2,1,4]
 *      output => 4
 */

import { Stack } from "../collection/Stack.mjs";

const EMPTY = 0;

function findRowIdx(col, board) {
  let findIdx = -1;
  for (let row = 0; row < board.length; row++) {
    if (board[row][col] !== EMPTY) {
      findIdx = row;
      break;
    }
  }

  return findIdx;
}

function solution(board, moves) {
  const stack = new Stack();
  const isSameDoll = (peek, doll) => peek === doll;

  var answer = 0;

  for (const move of moves) {
    const col = move - 1;
    const row = findRowIdx(col, board);

    if (row === -1) continue;

    const doll = board[row][col];

    if (isSameDoll(stack.peek(), doll)) {
      stack.pop();
      answer += 2;
    } else {
      stack.push(doll);
    }

    board[row][col] = 0;
  }

  return answer;
}

console.log(
  solution(
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 3],
      [0, 2, 5, 0, 1],
      [4, 2, 4, 4, 2],
      [3, 5, 1, 3, 1],
    ],
    [1, 5, 3, 5, 1, 2, 1, 4]
  )
);

console.log(
  solution(
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [1, 2, 3, 4, 5]
  )
);
