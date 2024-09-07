// 모범 답안 풀이 보고 Queue 클래스 만들지 않고 풀이

function isValid(y, x, row, col, maps) {
  return y >= 0 && y < row && x >= 0 && x < col && maps[y][x] !== "X";
}

function enqueue(ny, nx, k, time, visited, q) {
  if (!visited[ny][nx][k]) {
    visited[ny][nx][k] = true;
    q.push([ny, nx, k, time + 1]);
  }
}

function solution(maps) {
  const row = maps.length;
  const col = maps[0].length;
  const visited = Array.from(Array(row), () =>
    Array(col)
      .fill(false)
      .map(() => Array(2).fill(false))
  );
  //   console.log(visited);

  // 이동 방향 정의
  // up down left right
  const dy = [-1, 1, 0, 0];
  const dx = [0, 0, -1, 1];
  let endY = -1;
  let endX = -1;
  const q = [];

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (maps[i][j] === "S") {
        q.push([i, j, 0, 0]); // [row, col, isPullLever, time]
        visited[i][j][0] = true;
      }
      if (maps[i][j] === "E") {
        endY = i;
        endX = j;
      }
    }
  }

  while (q.length > 0) {
    const [y, x, k, time] = q.shift();

    if (y === endY && x === endX && k === 1) {
      return time;
    }

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (!isValid(ny, nx, row, col, maps)) {
        continue;
      }

      if (maps[ny][nx] === "L") {
        enqueue(ny, nx, 1, time, visited, q);
      } else {
        enqueue(ny, nx, k, time, visited, q);
      }
    }
  }
  return -1;
}

console.log(solution(["SOOOL", "XXXXO", "OOOOO", "OXXXX", "OOOOE"]));
