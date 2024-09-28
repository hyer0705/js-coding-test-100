/**
 * 39. 너비 우선 탐색 순회
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

  peek() {
    if (this.isEmpty()) {
      return;
    }

    return this.queue[0];
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

const solution = (graph, start) => {
  const queue = new Queue();
  const visited = new Set();

  const adj = new Map();
  for (const [start, end] of graph) {
    if (!adj.has(start)) adj.set(start, []);
    adj.get(start).push(end);
  }

  queue.enqueue([start, adj.get(start)]);
  visited.add(start);

  const result = [];
  result.push(start);
  while (!queue.isEmpty()) {
    const [node, adjs] = queue.dequeue();

    if (!adjs) continue;

    for (const next of adjs) {
      if (!visited.has(next)) {
        result.push(next);
        queue.enqueue([next, adj.get(next)]);
        visited.add(next);
      }
    }
  }

  return result;
};

console.log(
  solution(
    [
      [1, 2],
      [1, 3],
      [2, 4],
      [2, 5],
      [3, 6],
      [3, 7],
      [4, 8],
      [5, 8],
      [6, 9],
      [7, 9],
    ],
    1
  )
); // [1,2,3,4,5,6,7,8,9]

console.log(
  solution(
    [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
    ],
    1
  )
); // 1,2,3,4,5,0
