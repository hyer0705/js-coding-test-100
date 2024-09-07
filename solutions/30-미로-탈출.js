/**
 * 30. 미로 탈출
 * https://school.programmers.co.kr/learn/courses/30/lessons/159993
 */

/**
 * 1 x 1 크기의 칸들로 이루어진 직사각형 격자 형태의 미로에서 탈출하려고 합니다. 각 칸은 통로 또는 벽으로 구성되어 있으며, 벽으로 된 칸은 지나갈 수 없고 통로로 된 칸으로만 이동할 수 있습니다. 통로들 중 한 칸에는 미로를 빠져나가는 문이 있는데, 이 문은 레버를 당겨서만 열 수 있습니다. 레버 또한 통로들 중 한 칸에 있습니다. 따라서, 출발 지점에서 먼저 레버가 있는 칸으로 이동하여 레버를 당긴 후 미로를 빠져나가는 문이 있는 칸으로 이동하면 됩니다. 이때 아직 레버를 당기지 않았더라도 출구가 있는 칸을 지나갈 수 있습니다. 미로에서 한 칸을 이동하는데 1초가 걸린다고 할 때, 최대한 빠르게 미로를 빠져나가는데 걸리는 시간을 구하려 합니다.
 * 미로를 나타낸 문자열 배열 maps가 매개변수로 주어질 때, 미로를 탈출하는데 필요한 최소 시간을 return 하는 solution 함수를 완성해주세요. 만약, 탈출할 수 없다면 -1을 return 해주세요.
 *
 * 제한사항
 * 5 ≤ maps의 길이 ≤ 100
 * 5 ≤ maps[i]의 길이 ≤ 100
 * maps[i]는 다음 5개의 문자들로만 이루어져 있습니다.
 *  S : 시작 지점
 *  E : 출구
 *  L : 레버
 *  O : 통로
 *  X : 벽
 *
 * 시작 지점과 출구, 레버는 항상 다른 곳에 존재하며 한 개씩만 존재합니다.
 * 출구는 레버가 당겨지지 않아도 지나갈 수 있으며, 모든 통로, 출구, 레버, 시작점은 여러 번 지나갈 수 있습니다.
 */

// 모범 답안
class Queue {
  items = [];
  front = 0;
  rear = 0;

  push(item) {
    this.items.push(item);
    this.rear++;
  }

  pop() {
    return this.items[this.front++];
  }

  isEmpty() {
    return this.front === this.rear;
  }
}

// ➊ 이동 가능한 좌표인지 판단하는 함수
function isValidMove(ny, nx, n, m, maps) {
  return 0 <= ny && ny < n && 0 <= nx && nx < m && maps[ny][nx] !== "X";
}

// ➋ 방문한 적이 없으면 큐에 넣고 방문 여부 표시
function appendToQueue(ny, nx, k, time, visited, q) {
  if (!visited[ny][nx][k]) {
    visited[ny][nx][k] = true;
    q.push([ny, nx, k, time + 1]);
  }
}

function solution(maps) {
  const n = maps.length; // row
  const m = maps[0].length; // col
  const visited = Array.from(Array(n), () =>
    Array(m)
      .fill(false)
      .map(() => Array(2).fill(false))
  );
  // console.log(visited);

  // ➌ 위, 아래, 왼쪽, 오른쪽 이동 방향
  const dy = [-1, 1, 0, 0]; // row
  const dx = [0, 0, -1, 1]; // col
  const q = new Queue();
  let endY = -1; // row
  let endX = -1; // col

  // ➍ 시작점과 도착점을 찾아 큐에 넣고 방문 여부 표시
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (maps[i][j] === "S") {
        // 시작점
        q.push([i, j, 0, 0]);
        visited[i][j][0] = true;
      }
      if (maps[i][j] === "E") {
        // 도착점
        endY = i;
        endX = j;
      }
    }
  }

  while (!q.isEmpty()) {
    const [y, x, k, time] = q.pop(); // ➎ 큐에서 좌표와 이동 횟수를 꺼냄

    // ➏ 도착점에 도달하면 결과 반환
    if (y === endY && x === endX && k === 1) {
      return time;
    }

    // ➐ 네 방향으로 이동
    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      // ➑ 이동 가능한 좌표인 때에만 큐에 넣음
      if (!isValidMove(ny, nx, n, m, maps)) {
        continue;
      }

      // ➒ 다음 이동 지점이 물인 경우
      if (maps[ny][nx] === "L") {
        appendToQueue(ny, nx, 1, time, visited, q);
      } else {
        // ➓ 다음 이동 지점이 물이 아닌 경우
        appendToQueue(ny, nx, k, time, visited, q);
      }
    }
  }

  // ⓫ 도착점에 도달하지 못한 경우
  return -1;
}

console.log(solution(["SOOOL", "XXXXO", "OOOOO", "OXXXX", "OOOOE"]));
// console.log(solution(["LOOXS", "OOOOX", "OOOOO", "OOOOO", "EOOOO"]));
// console.log(solution(["SOOOO", "OOOOO", "OOOOO", "OOOOO", "OOOLE"]));
