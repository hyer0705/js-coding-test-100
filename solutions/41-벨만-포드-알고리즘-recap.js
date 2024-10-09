/**
 * 41. 벨만 포드 알고리즘
 *
 * 벨만 포드 알고리즘을 구현한 solution() 함수를 구현하세요.
 * graph의 각 데이터는 배열입니다. 첫 번째 데이터는 0번 노드 기준으로 연결된 노드 정보, 두 번째 데이터는 1번 노드 기준으로 연결된 노드 정보입니다.
 * 노드 정보의 구성은(노드, 가중치)와 같습니다. source는 시작 노드입니다.
 * 반환값은 최단 거리를 담은 distance 배열과 최단 거리와 함께 관리할 직전 노드 predecessor를 배열에 차례대로 담아서 [distance, predecessor] 형식으로 반환하면 됩니다.
 * prdecessor에서 시작 노드는 null로 표현합니다. 만약 음의 가중치 순회가 있다면 [-1]을 반환하세요.
 * 음의 가중치 순회란 순환하면 할수록 가중치의 합이 적어지는 순회를 말합니다.
 *
 * 벨만 포드 알고리즘을 이해할 수 있게 해준 참고 자료: https://youtu.be/061eXyAFRuI?si=_2NCYVhu22AkNDVv
 */

const solution = (graph, source) => {
  const numVertices = graph.length;

  const distance = Array(numVertices).fill(Infinity);
  distance[source] = 0;

  const predecessor = Array(numVertices).fill(null);

  // 노드의 갯수 - 1 번 반복! 예를 들어, 노드가 5개면 시작 노드에서 종료 노드까지 최대 4개의 간선이 있을 수 있기 때문!
  for (let temp = 0; temp < numVertices - 1; temp++) {
    for (let u = 0; u < numVertices; u++) {
      // u: 시작 노드, v: 도착 노드, weight: u -> v 의 엣지(간선)
      for (const [v, weight] of graph[u]) {
        if (distance[u] + weight < distance[v]) {
          distance[v] = distance[u] + weight;
          predecessor[v] = u;
        }
      }
    }
  }

  for (let u = 0; u < numVertices; u++) {
    for (const [v, weight] of graph[u]) {
      if (distance[u] + weight < distance[v]) {
        return [-1];
      }
    }
  }

  return [distance, predecessor];
};

console.log(
  solution(
    [
      [
        [1, 4],
        [2, 3],
        [4, -6],
      ], // 0 -> 1(4), 0 -> 2(3), 0 -> 4(-6)
      [[3, 5]], // 1 -> 3(5)
      [[1, 2]], // 2 -> 1(2)
      [
        [0, 7],
        [2, 4],
      ], // 3 -> 0(7), 3 -> 2(4)
      [[2, 2]], // 4 -> 2(2)
    ],

    0
  )
);
/**
 * [
 * [0, -2, -4, 3, -6],
 * [null, 2, 4, 1, 0]
 * ]
 */
