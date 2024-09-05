/**
 * 30. 미로 탈출
 * https://school.programmers.co.kr/learn/courses/30/lessons/159993
 */

const dRow = [-1, 0, 1, 0];
const dCol = [0, 1, 0, -1];

const CMD = {
  START: "S",
  EXIT: "E",
  LEVER: "L",
  PATH: "O",
  WALL: "X",
};

const isValid = (vis, row, col) => {
  const ROW = vis.length;
  const COL = vis[0].length;

  if (row < 0 || col < 0 || row >= ROW || col >= COL) {
    return false;
  }

  if (vis[row][col]) {
    return false;
  }

  return true;
};

const BFS = (grid, vis, row, col) => {
  const q = [];
  let cnt = 0;

  q.push([row, col]);
  vis[row][col] = true;

  while (q.length != 0) {
    const cell = q[0];
    const [x, y] = cell;

    // console.log(grid[x][y]);

    q.shift();

    for (let i = 0; i < 4; i++) {
      const adjX = x + dRow[i];
      const adjY = y + dCol[i];

      if (isValid(vis, adjX, adjY)) {
        if (grid[adjX][adjY] === CMD.LEVER || grid[adjX][adjY] === CMD.PATH) {
          q.push([adjX, adjY]);
          vis[adjX][adjY] = true;
          cnt++;
        }
      }
    }
  }
  return cnt + 1;
};

function solution(maps) {
  const maze = maps.map((m) => m.split(""));
  const vis = Array.from({ length: maze.length }, () =>
    new Array(maze[0].length).fill(false)
  );

  // find S
  const findStartIndex = () => {
    const idx = [];
    for (let i = 0; i < maps.length; i++) {
      if (maps[i].includes("S")) {
        idx.push(i);
        idx.push(maps[i].indexOf("S"));
        break;
      }
    }
    return idx;
  };

  const [x, y] = findStartIndex();
  const cnt = BFS(maze, vis, x, y);
  if (cnt > 1) return cnt;

  return -1;
}

console.log(solution(["SOOOL", "XXXXO", "OOOOO", "OXXXX", "OOOOE"]));
console.log(solution(["LOOXS", "OOOOX", "OOOOO", "OOOOO", "EOOOO"]));
console.log(solution(["SOOOO", "OOOOO", "OOOOO", "OOOOO", "OOOLE"]));
