/**
 * 다익스트라 알고리즘
 */

class MinHeap {
  constructor() {
    this.heap = [];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  add(data) {
    this.heap.push(data);
    this.heapifyUp();
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

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  heapifyUp() {
    let index = this.size() - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex][0] <= this.heap[index][0]) {
        break;
      }

      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }
  heapifyDown() {
    let index = 0;

    while (index * 2 + 1 < this.size()) {
      const leftChild = index * 2 + 1;
      const rightChild = index * 2 + 2;

      const smallerChild =
        this.heap[rightChild] < this.heap[leftChild] ? rightChild : leftChild;

      if (this.heap[smallerChild][0] >= this.heap[index][0]) {
        break;
      }

      this.swap(index, smallerChild);
      index = smallerChild;
    }
  }
}

const solution = (graph, start) => {
  const heap = new MinHeap();

  const distances = {};
  for (const key of Object.keys(graph)) {
    distances[key] = Infinity;
  }

  distances[start] = 0;
  heap.add([distances[start], start]);

  while (!heap.isEmpty()) {
    const [distance, node] = heap.remove();

    if (distances[node] < distance) {
      continue;
    }

    for (const adjNode in graph[node]) {
      const weight = graph[node][adjNode];
      const nextDistance = distance + weight;

      if (distance < distances[adjNode]) {
        distances[adjNode] = nextDistance;

        heap.add([nextDistance, adjNode]);
      }
    }
  }

  return distances;
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
