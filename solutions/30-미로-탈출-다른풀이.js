// bfs 를 이용하되 toLever, toEnd 해보기

const MAZE = {
  START: "S",
  EXIT: "E",
  LEVER: "L",
  PATH: "O",
  WALL: "X",
};

const isValid = (y, x, row, col, maps) => {
  return y >= 0 && y < row && x >= 0 && x < col && maps[y][x] !== MAZE.WALL;
};

const bfs = (findElCoordinates, maps, queue, visited) => {
  const row = maps.length;
  const col = maps[0].length;
  // up down left right
  const dy = [-1, 1, 0, 0];
  const dx = [0, 0, -1, 1];

  const [destY, destX] = findElCoordinates;

  while (queue.length > 0) {
    const [y, x, time] = queue.shift();
    if (y === destY && x === destX) {
      return time;
    }

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (!isValid(ny, nx, row, col, maps)) {
        continue;
      }

      //   if (maps[ny][nx] === MAZE.PATH) {
      if (!visited[ny][nx]) {
        visited[ny][nx] = true;
        queue.push([ny, nx, time + 1]);
      }
    }
    // }
  }

  return -1;
};

const getVisited = (row, col) =>
  Array.from({ length: row }, () => new Array(col).fill(false));

function solution(maps) {
  const row = maps.length;
  const col = maps[0].length;
  let visited = getVisited(row, col);
  const queue = [];

  let [leverX, leverY, endX, endY] = [-1, -1, -1, -1];
  // find lever coordintates, start coordinates
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (maps[i][j] === MAZE.START) {
        visited[i][j] = true;
        queue.push([i, j, 0]);
      } else if (maps[i][j] === MAZE.LEVER) {
        leverX = j;
        leverY = i;
      } else if (maps[i][j] === MAZE.EXIT) {
        endX = j;
        endY = i;
      }
    }
  }

  // to Lever
  const toLever = bfs([leverY, leverX], maps, queue, visited);

  // reset queue
  const queueSize = queue.length;
  for (let i = 0; i < queueSize; i++) {
    queue.pop();
  }
  // reset visited;
  visited = getVisited(row, col);

  queue.push([leverY, leverX, 0]);
  visited[leverY][leverX] = true;

  const toExit = bfs([endY, endX], maps, queue, visited);

  const totalTime = toLever + toExit;
  if (toLever > 0 && toExit > 0) return totalTime;
  return -1;
}

// console.log(solution(["SOOOL", "XXXXO", "OOOOO", "OXXXX", "OOOOE"]));
console.log(solution(["LOOXS", "OOOOX", "OOOOO", "OOOOO", "EOOOO"]));
