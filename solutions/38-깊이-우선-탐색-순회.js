/**
 * 38. 깊이 우선 탐색 순회
 *
 * 깊이 우선 탐색으로 모든 그래프의 노드를 순회하는 함수 solution()을 작성하세요.
 * 시작 노드는 start로 주어집니다. graph는 [출발 노드, 도착 노드] 쌍들이 들어 있는 배열입니다.
 * 반환값은 그래프의 시작 노드부터 모든 노드를 깊이 우선 탐색으로 진행한 순서대로 노드가 저장된 리스트입니다.
 *
 * 제약 조건
 * - 노드의 최대 개수는 100개를 넘지 않습니다.
 * - 시작 노드부터 시작해서 모든 노드를 방문할 수 있는 경로가 항상 있습니다.
 * - 그래프의 노드는 문자열입니다.
 */

// 참고 자료: https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/

const solution = (graph, start) => {
  const CODE_A = 65;
  const charToIndex = (ch) => ch.charCodeAt(0) - CODE_A;

  const adj = Array.from({ length: 100 }, () => []);
  const visited = new Array(adj.length).fill(false);

  for (let [s, e] of graph) {
    adj[charToIndex(s)].push(e);
    adj[charToIndex(e)].push(s);
  }

  const dfs = (source, res) => {
    visited[charToIndex(source)] = true;

    res.push(source);
    for (let i of adj[charToIndex(source)]) {
      if (!visited[charToIndex(i)]) {
        dfs(i, res);
      }
    }
    return res;
  };

  const res = dfs(start, []);
  return res;
};

console.log(
  solution(
    [
      ["A", "B"],
      ["B", "C"],
      ["C", "D"],
      ["D", "E"],
    ],
    "A"
  )
); // [A, B, C, D, E]

console.log(
  solution(
    [
      ["A", "B"],
      ["A", "C"],
      ["B", "D"],
      ["B", "E"],
      ["C", "F"],
      ["E", "F"],
    ],
    "A"
  )
); // [A, B, D, E, F, C]
