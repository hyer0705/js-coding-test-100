/**
 * 15. 요세푸스 문제
 *
 * N명의 사람이 원 형태로 서 있습니다. 각 사람은 1부터 N까지 번호표를 갖고 있습니다.
 * 그리고 임의의 숫자 K가 주어졌을 때 다음과 같이 사람을 없앱니다.
 *
 * - 1번 번호표를 가진 사람을 기준으로 K번째 사람을 없앱니다.
 * - 없앤 사람 다음 사람을 기준으로 하고 다시 K번째 사람을 없앱니다.
 *
 * N과 K가 주어질 때 마지막에 살아있는 사람의 번호를 반환하는 solution() 함수를 구현해주세요.
 *
 * 제약 조건
 * - N과 K는 1이상 1000이하의 자연수입니다.
 *
 * 입출력
 * 1.
 *  input => N: 5, K: 2
 *  output => 3
 */

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  pop() {
    if (!this.head) {
      return null;
    }

    const removeNode = this.head;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    this.size--;

    return removeNode;
  }

  isEmpty() {
    return this.size === 0;
  }
}

const solution = (N, K) => {
  const queue = new Queue();

  // queue 초기화
  for (let i = 0; i < N; i++) {
    queue.push(i + 1);
  }

  while (queue.size > 1) {
    for (let i = 0; i < K - 1; i++) {
      const removed = queue.pop();
      queue.push(removed.data);
    }
    queue.pop();
  }

  const answer = queue.pop();

  return answer.data;
};

console.log(solution(5, 2));
