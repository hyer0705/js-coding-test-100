class MinHeap {
  constructor() {
    this.heap = [];
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  remove() {
    if (this.isEmpty()) {
      return null;
    }

    const minVal = this.heap[0];

    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();

    this.heapifyDown();

    return minVal;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  add(data) {
    this.heap.push(data);

    this.heapifyUp();
  }

  // remove 연산과 같이 사용
  heapifyUp() {
    let currIndex = this.heap.length - 1;

    while (currIndex > 0) {
      const parentIndex = Math.floor((currIndex - 1) / 2);

      // 최소 힙 상태
      if (this.heap[currIndex] >= this.heap[parentIndex]) {
        break;
      }
      this.swap(currIndex, parentIndex);
      currIndex = parentIndex;
    }
  }

  // add 연산과 같이 사용
  heapifyDown() {
    let currentIndex = 0;

    while (currentIndex * 2 + 1 < this.heap.length) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;

      let smallerChildIndex =
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex] < this.heap[leftChildIndex]
          ? rightChildIndex
          : leftChildIndex;

      // 이미 heap인 상태
      if (this.heap[currentIndex] <= this.heap[smallerChildIndex]) {
        break;
      }

      this.swap(currentIndex, smallerChildIndex);
      currentIndex = smallerChildIndex;
    }
  }
}

const main = () => {
  const minHeap = new MinHeap();

  minHeap.add(8);
  minHeap.add(9);
  minHeap.add(1);

  console.log(minHeap);

  const minVal = minHeap.remove();
  console.log(minVal);

  console.log(minHeap);
};

main();
