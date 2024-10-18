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
  // distance 배열 초기화
  const distances = new Array(graph.length).fill(Infinity);
  distances[source] = 0;

  for (let cnt = 0; cnt < graph.length - 1; cnt++) {
    for (let start = 0; start < graph.length; start++) {
      for (let end = 0; end < graph[start].length; end++) {
        const weight = graph[start][end][1];
        if (distances[graph[start][end][0]] > distances[start] + weight) {
          distances[graph[start][end][0]] = distances[start] + weight;
        }
      }
    }
  }

  for (let start = 0; start < graph.length; start++) {
    for (let end = 0; end < graph[start].length; end++) {
      const weight = graph[start][end][1];
      if (distances[graph[start][end][0]] > distances[start] + weight) {
        distances[graph[start][end][0]] = distances[start] + weight;
        return [-1];
      }
    }
  }

  return distances;
};

console.log(
  solution(
    [
      [
        [1, 4],
        [2, 3],
        [4, -6],
      ], // start node: 0
      [[3, 5]], // start node: 1, [end node, weight]
      [[1, 2]], // start node: 2
      [
        [0, 7],
        [2, 4],
      ], // start node: 3
      [[2, 2]], // start node: 4
    ],
    0
  )
);

console.log(
  solution(
    [
      [
        [1, 5],
        [2, -1],
      ],
      [[2, 2]],
      [[3, -2]],
      [
        [0, 2],
        [1, 6],
      ],
    ],
    0
  )
);
