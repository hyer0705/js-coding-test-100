/**
 * 37. 섬 연결하기
 * https://school.programmers.co.kr/learn/courses/30/lessons/42861
 */

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }

  find(island) {
    if (this.parent[island] === island) return island;

    this.parent[island] = this.find(this.parent[island]);
    return this.parent[island];
  }

  union(island1, island2) {
    const rootIsland1 = this.find(island1);
    const rootIsland2 = this.find(island2);

    if (rootIsland1 !== rootIsland2) {
      this.parent[rootIsland2] = rootIsland1;
      return true;
    }

    return false;
  }
}

function solution(n, costs) {
  // 가중치 순으로 정렬...
  costs.sort((a, b) => a[2] - b[2]);

  const uf = new UnionFind(n);

  let totalCost = 0;
  let edgeCnt = 0;
  for (const [island1, island2, cost] of costs) {
    if (uf.union(island1, island2)) {
      totalCost += cost;
      edgeCnt++;
      if (edgeCnt === n - 1) break;
    }
  }

  return totalCost;
}

console.log(
  solution(4, [
    [0, 1, 1],
    [0, 2, 2],
    [1, 2, 5],
    [1, 3, 1],
    [2, 3, 8],
  ])
); // 4
