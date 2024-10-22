/**
 * 게임 맵 최단거리
 * url: https://school.programmers.co.kr/learn/courses/30/lessons/1844?language=javascript
 *
 */

/**
 * 1차 채점 결과
 *
 * 정확성: 34.6
 * 효율성: 22.6
 * 합계: 57.1 / 100.0
 */

class Queue {
  constructor() {
    this.queue = [];
    this.top = -1;
  }

  enqueue(data) {
    this.queue.push(data);
    this.top++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return;
    }

    const peek = this.queue.shift();
    this.top--;

    return peek;
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  peek() {
    if (this.isEmpty()) {
      return;
    }

    return this.queue[0];
  }
}

function solution(maps) {
  let answer = 0;

  // top, bottom, left, right
  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];

  const queue = new Queue();
  const visited = new Set();

  const N = maps.length;
  const M = maps[0].length;

  queue.enqueue([0, 0, 1]); // [y, x, 최단 거리?]
  visited.add("0,0");

  const isValid = (x, y) =>
    x >= 0 &&
    y >= 0 &&
    x < M &&
    y < N &&
    !visited.has(`${x},${y}`) &&
    maps[y][x] === 1;

  while (!queue.isEmpty()) {
    const [y, x, distance] = queue.dequeue();

    if (x == M - 1 && y == N - 1) {
      answer = distance;
      break;
    }
    // if (distance > answer) answer = distance;

    for (let i = 0; i < dx.length; i++) {
      const [adjY, adjX] = [y + dy[i], x + dx[i]];

      if (isValid(adjX, adjY)) {
        queue.enqueue([adjY, adjX, distance + 1]);
        visited.add(`${adjX},${adjY}`);
      }
    }
  }

  return answer === 0 ? -1 : answer;
}

console.log(
  solution([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1],
  ])
); // 11

console.log(
  solution([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 1],
  ])
); // -1

console.log(
  solution([
    [1, 1, 1, 1, 0],
    [1, 1, 1, 1, 0],
    [1, 1, 1, 1, 0],
    [1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1],
  ])
); // 9
