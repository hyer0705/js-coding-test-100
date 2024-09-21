/**
 * 37. 섬 연결하기
 * https://school.programmers.co.kr/learn/courses/30/lessons/42861
 */

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }

  find(u) {
    if (this.parent[u] === u) return u;
    return (this.parent[u] = this.find(this.parent[u]));
  }

  union(u, v) {
    const rootU = this.find(u);
    const rootV = this.find(v);
    if (rootU !== rootV) {
      this.parent[rootV] = rootU;
      return true;
    }
    return false;
  }
}

function solution(n, costs) {
  // 간선을 가중치 순으로 정렬
  costs.sort((a, b) => a[2] - b[2]);

  const uf = new UnionFind(n);
  let totalCost = 0;
  let edgesUsed = 0;

  for (const [u, v, cost] of costs) {
    if (uf.union(u, v)) {
      totalCost += cost;
      edgesUsed += 1;
      // 모든 섬이 연결되면 종료
      if (edgesUsed === n - 1) break;
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
