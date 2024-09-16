/**
 * 33. 간단한 유니온 파인드 알고리즘 구현하기(복습)
 *
 * 상호배타적 집합을 표현하고 관리하는 데 다음 두 연산이 필요합니다.
 * - union(x,y): x와 y가 속한 두 집합을 합칩니다.
 * - find(x): x가 속한 집합의 대표 원소를 찾습니다.
 *
 * operations 라는 배열은 수행할 연산을 의미합니다. 연산 종류는 2개입니다.
 * - [u, 1, 2]는 노드 1과 노드 2에 대해 union 연산 수행
 * - [f, 3] 노드 3의 루트 노드 찾기, find 연산 수행
 *
 * 초기의 노드는 부모 노드를 자신의 값으로 설정했다고 가정하며, 여기서는 각 집합의 루트 노드를 기준으로
 *  `루트 노드가 작은 노드를 더 큰 노드의 자식으로 연결하는 방법`을 사용합니다.
 *  `operations에 있는 연산을 모두 수행한 후 집합의 개수를 반환`하는 solution() 함수를 구현해주세요.
 *
 * 제약 조건
 *  - 0 <= k <- 1,000: 노드의 개수
 *  - 1 <= oprations.length <= 100,000
 *  - operations[i][0]은 문자열 u 또는 f 중 하나
 *  - u는 union 연산, union 연산 뒤로는 두 개의 정수 x, y가 나옴
 *  - f는 find 연산, find 연산 뒤로는 하나의 정수 x가 나옴
 *  - x와 y는 0 이상 k - 1 이하의 정수
 *  - 연산은 항상 유효함
 *      - 즉, union, find 연산의 인수는 상호배타적 집합 내에 있는 노드 번호
 *
 * 입출력의 예
 *  1.
 *      input => k: 3, operations: [['u', 0, 1], ['u', 1, 2], ['f', 2]]
 *      output => 1
 *  2.
 *      input => k: 4, operations: [['u', 0, 1], ['u', 2, 3], ['f', 0]]
 *      output => 2
 */

const union = (set, x, y) => {
  const xRoot = find(set, x);
  const yRoot = find(set, y);

  if (xRoot > yRoot) {
    set[y] = xRoot;
  } else {
    set[x] = yRoot;
  }
};
const find = (set, x) => {
  for (let i = 0; i < set.length; i++) {
    if (set[x] === x) return x;

    x = set[x];
  }
  return x;
};

const solution = (k, operations) => {
  const set = Array.from({ length: k }, (_, i) => i);

  operations.forEach(([operation, x, y]) => {
    switch (operation) {
      case "u":
        union(set, x, y);
        break;
      case "f":
        find(set, x);
        break;
    }
  });

  const roots = set.map((node, _, arr) => find(arr, node));
  const cntOfSet = new Set(roots).size;

  return cntOfSet;
};

console.log(
  solution(3, [
    ["u", 0, 1],
    ["u", 1, 2],
    ["f", 2],
  ])
);

console.log(
  solution(4, [
    ["u", 0, 1],
    ["u", 2, 3],
    ["f", 0],
  ])
);
