/**
 * 30. 미로 탈출
 * https://school.programmers.co.kr/learn/courses/30/lessons/159993
 */

/**
 * 채점 결과
 * 정확성: 39.1
 * 합계: 39.1 / 100.0
 *
 * BFS 개념은 알지만 코드로 표현하는 것을 못한다...
 **/
const dRow = [-1, 0, 1, 0];
const dCol = [0, 1, 0, -1];

const CMD = {
  START: "S",
  EXIT: "E",
  LEVER: "L",
  PATH: "O",
  WALL: "X",
};

const isValid = (grid, vis, row, col) => {
  const ROW = vis.length;
  const COL = vis[0].length;

  if (row < 0 || col < 0 || row >= ROW || col >= COL) {
    return false;
  }

  if (grid[row][col] === CMD.WALL || vis[row][col][0]) {
    return false;
  }

  return true;
};

const BFS = (grid, vis, startCoordinates, end) => {
  const q = [];
  const [startRow, startCol] = startCoordinates;

  q.push([startRow, startCol, 0]);
  vis[startRow][startCol] = [true, 0];

  while (q.length != 0) {
    const cell = q[0];
    const [x, y, time] = cell;

    // console.log(grid[x][y]);

    q.shift();

    for (let i = 0; i < 4; i++) {
      const adjX = x + dRow[i];
      const adjY = y + dCol[i];

      if (isValid(grid, vis, adjX, adjY)) {
        if (grid[adjX][adjY] === CMD.PATH) {
          q.push([adjX, adjY, time + 1]);
          vis[adjX][adjY] = [true, time + 1];
        }
        if (grid[adjX][adjY] === end) {
          vis[adjX][adjY] = [true, time + 1];

          return vis[adjX][adjY][1];
        }
      }
    }
  }
  return -1;
};

function solution(maps) {
  const maze = maps.map((m) => m.split(""));
  const vis = Array.from({ length: maze.length }, () =>
    new Array(maze[0].length).fill([false, 0])
  );

  // find S
  const findCoordinates = (findStr) => {
    const idx = [];
    for (let i = 0; i < maps.length; i++) {
      if (maps[i].includes(findStr)) {
        idx.push(i);
        idx.push(maps[i].indexOf(findStr));
        break;
      }
    }
    return idx;
  };

  const startCoordinates = findCoordinates(CMD.START);

  //find L
  const leverCoordinates = findCoordinates(CMD.LEVER);

  const toLeverTime = BFS(maze, vis, startCoordinates, CMD.LEVER);
  if (toLeverTime < 0) return -1;
  return toLeverTime + BFS(maze, vis, leverCoordinates, CMD.EXIT);
}

console.log(solution(["SOOOL", "XXXXO", "OOOOO", "OXXXX", "OOOOE"]));
console.log(solution(["LOOXS", "OOOOX", "OOOOO", "OOOOO", "EOOOO"]));
console.log(solution(["SOOOO", "OOOOO", "OOOOO", "OOOOO", "OOOLE"]));
