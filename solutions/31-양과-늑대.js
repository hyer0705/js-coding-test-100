/**
 * 31. 양과 늑대
 * https://school.programmers.co.kr/learn/courses/30/lessons/92343
 */
function solution(info, edges) {
  var answer = 0;

  // build tree
  const tree = Array.from({ length: info.length }, (_) => new Array());
  // tree[0].push(0);

  for (const [parent, child] of edges) {
    tree[parent].push(child);
  }

  // bfs
  const q = [];
  q.push([0, 1, 0, new Set()]); // [현재 위치, 양의 수, 늑대의 수, 방문한 노드 집합]

  let max = 0;

  while (q.length > 0) {
    const [current, sheep, wolf, visited] = q.shift();

    max = Math.max(max, sheep);

    for (const next of tree[current]) {
      visited.add(next);
    }

    for (const next of visited) {
      if (info[next] === 1) {
        if (sheep !== wolf + 1) {
          const newVisited = new Set(visited);
          newVisited.delete(next);
          q.push([next, sheep, wolf + 1, newVisited]);
        }
      } else {
        const newVisited = new Set(visited);
        newVisited.delete(next);
        q.push([next, sheep + 1, wolf, newVisited]);
      }
    }
  }

  return max;
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
