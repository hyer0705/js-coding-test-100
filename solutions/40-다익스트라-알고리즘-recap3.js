/**
 * 다익스트라 알고리즘
 */

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.heap.length === 0;
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  enqueue(data) {
    this.heap.push(data);
    this.heapifyUp();
  }
  heapifyUp() {
    let index = this.size() - 1;
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (this.heap[parent][0] <= this.heap[index][0]) {
        break;
      }

      this.swap(index, parent);
      index = parent;
    }
  }

  dequeue() {
    if (this.isEmpty()) return null;

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
        this.heap[rightChild] < this.heap[leftChild] ? rightChild : leftChild;

      if (this.heap[smallerChild][0] >= this.heap[index][0]) {
        break;
      }

      this.swap(smallerChild, index);
      index = smallerChild;
    }
  }
}

const solution = (graph, start) => {
  const paths = {};
  const distances = {};
  for (const node in graph) {
    distances[node] = Infinity;
    paths[node] = [start];
  }
  distances[start] = 0;

  const queue = new MinHeap();
  queue.enqueue([distances[start], start]);

  while (queue.size() > 0) {
    const [distance, currNode] = queue.dequeue();

    for (const adjNode in graph[currNode]) {
      const weight = distance + graph[currNode][adjNode];
      const prevPaths = paths[currNode];

      if (distances[adjNode] > weight) {
        distances[adjNode] = weight;
        paths[adjNode] = [...prevPaths, adjNode];
        queue.enqueue([distances[adjNode], adjNode]);
      }
    }
  }

  return [distances, paths];
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

console.log(
  solution(
    {
      A: {
        B: 1,
      },
      B: {
        C: 5,
      },
      C: {
        D: 1,
      },
      D: {},
    },
    "A"
  )
);
// [
//   {
//     A: 0,
//     B: 1,
//     C: 6,
//     D: 7,
//   },
//   {
//     A: [A],
//     B: [A, B],
//     C: [A, B, C],
//     D: [A, B, C, D],
//   },
// ];
