/**
 * 문제 7. 방문 길이
 *
 * 게임 캐릭터를 4가지 명령어를 통해 움직이려 합니다. 명령어는 다음과 같습니다.
 *      U: 위쪽으로 한 칸 가기
 *      D: 아래쪽으로 한 칸 가기
 *      R: 오른쪽으로 한 칸 가기
 *      L: 왼쪽으로 한 칸 가기
 *
 *  캐릭터는 좌표평면의 (0, 0) 위치에서 시작합니다. 좌표평면의 경계는
 *      왼쪽 위 (-5, 5), 왼쪽 아래(-5, 5), 오른쪽 위(5,5), 오른쪽 아래 (5, -5)로 이루어져 있습니다.
 *
 *  ...
 *
 *  이때, 우리는 게임 캐릭터가 지나간 길 중 `캐릭터가 처음 걸어본 길의 길이`를 구하려고 합니다.
 *  예를 들어 위의 예시에서 게임 캐릭터가 움직인 길이는 9이지만, 캐릭터가 처음 걸어본 길의 길이는 7이 됩니다.
 *
 *  단, 좌표평면의 경계를 넘어가는 명령어는 무시합니다.
 *
 *  명령어가 매개변수 dirs로 주어질 때, 게임 캐릭터가 처음 걸어본 길의 길이를 구하여
 *      return 하는 solution 함수를 완성해 주세요.
 *
 * 제한사항
 *  dirs는 string 형으로 주어지며, 'U', 'D', 'R', 'L' 이외에 문자는 주어지지 않습니다.
 *  dirs의 길이는 500 이하의 자연수입니다.
 *
 * 입출력 예
 *  1.
 *      input => dirs: "ULURRDLLU"
 *      output => 7
 *  2.
 *      input => dirs: "LULLLLLLU"
 *      output => 7
 *
 * url: https://school.programmers.co.kr/learn/courses/30/lessons/49994
 */

function solution(dirs) {
  const COMMANDS = Object.freeze({
    UP: "U",
    DOWN: "D",
    RIGHT: "R",
    LEFT: "L",
  });

  const coordinates = {
    x: 0,
    y: 0,
  };

  const lineCoordinates = new Set();

  for (let i = 0; i < dirs.length; i++) {
    const currCmd = dirs[i];
    let { x, y } = coordinates;

    switch (currCmd) {
      case COMMANDS.UP:
        if (y < 5) {
          lineCoordinates.add(`${x},${y + 0.5}`);
          coordinates.y++;
        }
        break;
      case COMMANDS.DOWN:
        if (y > -5) {
          lineCoordinates.add(`${x},${y - 0.5}`);
          coordinates.y--;
        }
        break;
      case COMMANDS.RIGHT:
        if (x < 5) {
          lineCoordinates.add(`${x + 0.5},${y}`);
          coordinates.x++;
        }
        break;
      case COMMANDS.LEFT:
        if (x > -5) {
          lineCoordinates.add(`${x - 0.5},${y}`);
          coordinates.x--;
        }
        break;
    }
  }

  return lineCoordinates.size;
}

console.log(solution("ULURRDLLU"));
console.log(solution("LULLLLLLU"));
console.log(solution("LLLLLLUURRRDDLURL"));
console.log(solution("RRRRRDLDRDLDRDLURULURULUR"));
