/**
 * 33. 간단한 유니온 파인드 알고리즘 구현하기
 *
 * 초기의 노드는 부모 노드를 자신의 값으로 설정했다고 가정하며,
 * 여기서는 각 집합의 루트 노드를 기준으로 루트 노드가 작은 노드를 더 큰 노드의 자식으로 연결하는 방법을 사용합니다.
 * operations에 있는 연산을 모두 수행한 후 "집합의 개수"를 반환하는 solution() 함수를 구현해주세요.
 */

const OPERATIONS = {
  UNION: "u",
  FIND: "f",
};

const findRoot = (parents, x) => {
  if (parents[x] === x) return x;

  parents[x] = findRoot(parents, parents[x]);
  return parents[x];
};

const union = (parents, x, y) => {
  const root1 = findRoot(parents, x);
  const root2 = findRoot(parents, y);

  parents[root2] = root1;
};

const solution = (k, operations) => {
  const set = Array.from({ length: k }, (_, i) => i);
  let n = k;

  operations.forEach(([operation, x, y]) => {
    switch (operation) {
      case OPERATIONS.UNION:
        union(set, x, y);
        break;
      case OPERATIONS.FIND:
        // call find function
        findRoot(set, x);
        break;
    }

    // console.log(set);
    n = new Set(Array.from({ length: k }, (_, i) => findRoot(set, i))).size;
  });

  return n;
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
