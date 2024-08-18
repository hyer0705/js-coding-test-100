/**
 * 14. 표 편집
 *
 * https://school.programmers.co.kr/learn/courses/30/lessons/81303
 *
 * 업무용 소프트웨어를 개발하는 니니즈웍스의 인턴인 앙몬드는 명령어 기반으로
 *  표의 행을 선택, 삭제, 복구하는 프로그램을 작성하는 과제를 맡았습니다.
 * 세부 요구사항은 다음과 같습니다.
 *
 * 0 | 무지
 * 1 | 콘
 * 2 | 어피치 --- 선택된 행
 * 3 | 제이지
 * 4 | 프로도
 * 5 | 네오
 * 6 | 튜브
 * 7 | 라이언
 *
 * 위 그림에서 파란색으로 칠해진 칸은 현재 선택된 행을 나타냅니다.
 * 단, 한 번에 한 행만 선택할 수 있으며, 표의 범위(0행~마지막 행)를 벗어날 수 없습니다.
 * 이때, 다음과 같은 명령어를 이용하여 표를 편집합니다.
 * - "U X": 현재 선택된 행에서 X칸 위에 있는 행을 선택합니다.
 * - "D X": 현재 선택된 행에서 X칸 아래에 있는 행을 선택합니다.
 * - "C": 현재 선택된 행을 삭제한 후, 바로 아래 행을 선택합니다. 단, 삭제된 행이 가장 마지막 행인 경우 바로 윗 행을 선택합니다.
 * - "Z": 가장 최근에 삭제된 행을 원래대로 복구합니다. 단, 현재 선택된 행은 바뀌지 않습니다.
 *
 * 처음 표의 행 개수를 나타내는 정수 n, 처음에 선택된 행의 위치를 나타내는 정수 k, 수행한 명령어들이 담긴 문자열 배열 cmd가 매개변수로 주어질 때,
 *  모든 명령어를 수행한 후 표의 상태와 처음 주어진 표의 상태를 비교하여 삭제되지 않은 행은 O, 삭제된 행은 X로 표시하여 문자열 형태로 return 하도록 solution 함수를 완성해주세요.
 *
 * 제한사항
 * - 5 <= n <= 1,000,000
 * - 0 <= k < n
 * - 1 <= cmd의 원소 개수 <= 200,000
 *  - cmd의 각 원소는 "U X", "D X", "C", "Z" 중 하나입니다.
 *  - X는 1 이상 300,000 이하인 자연수이며 0으로 시작하지 않습니다.
 *  - X가 나타내는 자연수에 ','는 주어지지 않습니다. 예를 들어 123,456의 경우 123456으로 주어집니다.
 *  - cmd에 등장하는 모든 X들의 값을 합친 결과가 1,000,000 이하인 경우만 입력으로 주어집니다.
 *  - 표의 모든 행을 제거하며, 행이 하나도 남지 않는 경우는 입력으로 주어지지 않습니다.
 *  - 본문에서 각 행이 제거되고 복구되는 과정을 보다 자연스럽게 보이기 위해 "이름" 열을 사용하였으나,
 *      "이름"열의 내용이 실제 문제를 푸는 과정에 필요하지는 않습니다.
 *      "이름" 열에는 서로 다른 이름들이 중복없이 채워져 있다고 가정하고 문제를 해결해 주세요.
 * - 표의 범위를 벗어나는 이동은 입력으로 주어지지 않습니다.
 * - 원래대로 복구할 행이 없을 때(즉, 삭제된 행이 없을 때) "Z"가 명령어로 주어지는 경우는 없습니다.
 * - 정답은 표의 0행부터 n - 1행까지에 해당되는 O, X를 순서대로 이어붙인 문자열 형태로 return 해주세요.
 *
 * 정확성 테스트 케이스 제한 사항
 *  - 5 <= n <= 1,000
 *  - 1 <= cmd의 원소 개수 <= 1,000
 *
 * 효율성 테스트 케이스 제한 사항
 *  - 주어진 조건 외 추가 제한사항 없습니다.
 *
 * 테스트 케이스
 * 1.
 *  input => n: 8, k: 2, cmd: ["D 2","C","U 3","C","D 4","C","U 2","Z","Z"]
 *  output => "OOOOXOOO"
 *
 * 2.
 *  input => n: 8, k: 2, cmd: ["D 2","C","U 3","C","D 4","C","U 2","Z","Z","U 1","C"]
 *  output => "OOXOXOOO"
 */

/**
 * 첫번째 풀이...
 * 정확성은 모두 통과
 * But, 효율성에서 통과하지 못함
 * 30.0/100.0
 */
import { Stack } from "../collection/Stack.mjs";

const CMD = Object.freeze({
  UP: "U",
  DOWN: "D",
  CUT: "C",
  UNDO: "Z",
});

class Row {
  constructor(val, index) {
    this.val = val;
    this.index = index;
  }
}

function solution(n, k, cmd) {
  var answer = new Array(n).fill("O");

  const table = new Array(n).fill(0).map((_, i) => i);
  const stack = new Stack();

  for (let i = 0; i < cmd.length; i++) {
    const [command, x] = cmd[i].split(" ");

    switch (command) {
      case CMD.UP:
        k -= Number(x);
        break;
      case CMD.DOWN:
        k += Number(x);
        break;
      case CMD.CUT:
        const deleted = table.splice(k, 1)[0];
        stack.push(new Row(deleted, k));
        break;
      case CMD.UNDO:
        const peek = stack.pop();
        peek.index <= k && k++;
        table.splice(peek.index, 0, peek.val);
        break;
    }

    k > table.length - 1 && (k = table.length - 1);
  }

  while (!stack.isEmpty()) {
    answer[stack.pop().val] = "X";
  }

  return answer.join("");
}

console.log(
  solution(8, 2, ["D 2", "C", "U 3", "C", "D 4", "C", "U 2", "Z", "Z"])
);
console.log(
  solution(8, 2, [
    "D 2",
    "C",
    "U 3",
    "C",
    "D 4",
    "C",
    "U 2",
    "Z",
    "Z",
    "U 1",
    "C",
  ])
);
