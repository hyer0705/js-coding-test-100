/**
 * 31. 양과 늑대 (복습)
 * https://school.programmers.co.kr/learn/courses/30/lessons/92343
 */

function solution(info, edges) {
  const tree = Array.from({ length: info.length }, (_) => new Array());
  // build tree
  for (const [from, to] of edges) {
    tree[from].push(to);
  }

  const queue = [];
  queue.push([0, 1, 0, new Set()]);

  // bfs
  // queue 에 뭘 넣지? [curr, sheep, wolf, visited?]
  let maxSheep = 0;
  while (queue.length > 0) {
    const [node, sheep, wolf, visited] = queue.shift();

    maxSheep = Math.max(sheep, maxSheep);

    for (const next of tree[node]) {
      visited.add(next);
    }

    for (const next of visited) {
      if (info[next] === 1 && wolf + 1 !== sheep) {
        const newVisited = new Set(visited);
        newVisited.delete(next);

        queue.push([next, sheep, wolf + 1, newVisited]);
      } else if (info[next] === 0) {
        const newVisited = new Set(visited);
        newVisited.delete(next);

        queue.push([next, sheep + 1, wolf, newVisited]);
      }
    }
  }

  return maxSheep;
}

console.log(
  solution(
    [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [
      [0, 1],
      [1, 2],
      [1, 4],
      [0, 8],
      [8, 7],
      [9, 10],
      [9, 11],
      [4, 3],
      [6, 5],
      [4, 6],
      [8, 9],
    ]
  )
);

console.log(
  solution(
    [0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0],
    [
      [0, 1],
      [0, 2],
      [1, 3],
      [1, 4],
      [2, 5],
      [2, 6],
      [3, 7],
      [4, 8],
      [6, 9],
      [9, 10],
    ]
  )
);
