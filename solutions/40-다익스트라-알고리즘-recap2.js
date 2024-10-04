/**
 * 다익스트라 알고리즘
 */

class MinHeap {
  constructor() {
    this.heap = [];
  }

  isEmpty() {
    return this.heap === 0;
  }

  size() {
    return this.heap.length;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  add(data) {
    this.heap.push(data);
    this.heapifyUp();
  }
  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (this.heap[parent][0] <= this.heap[index][0]) {
        break;
      }

      this.swap(index, parent);
      index = parent;
    }
  }

  remove() {
    if (this.isEmpty()) {
      return null;
    }

    const min = this.heap[0];
    this.heap[0] = this.heap[this.size() - 1];
    this.heap.pop();

    this.heapifyDown();

    return min;
  }
  heapifyDown() {
    let index = 0;

    while (index * 2 + 1 < this.size()) {
      const leftChild = index * 2 + 1;
      const rightChild = index * 2 + 2;

      const smallerChild =
        rightChild < this.size() && this.heap[rightChild] < this.heap[leftChild]
          ? rightChild
          : leftChild;

      if (this.heap[smallerChild][0] >= this.heap[index][0]) {
        break;
      }

      this.swap(index, smallerChild);
      index = smallerChild;
    }
  }
}

const solution = (graph, start) => {
  const distances = {};
  for (const node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;

  const heap = new MinHeap();
  heap.add([distances[start], start]);

  while (heap.size() > 0) {
    const [currDistance, currNode] = heap.remove();

    const adjNodes = graph[currNode];

    // heap에 들어간 정보가 즉 해당 노드까지의 계산된 거리가 최단 경로를 저장하고 있는 distances[currNode]값 보다 크다면 비교하지 않는다
    if (currDistance > distances[currNode]) {
      continue;
    }

    for (const adjNode in adjNodes) {
      const weight = graph[currNode][adjNode];
      const nextDistance = currDistance + weight;

      if (currDistance < distances[adjNode]) {
        distances[adjNode] = nextDistance;

        heap.add([distances[adjNode], adjNode]);
      }
    }
  }

  return [distances];
};

console.log(
  solution(
    {
      A: {
        B: 9,
        C: 3,
      },
      B: {
        A: 5,
      },
      C: {
        B: 1,
      },
    },
    "A"
  )
);
//     {
//         A: 0,
//         B: 4,
//         C: 3
//     }
