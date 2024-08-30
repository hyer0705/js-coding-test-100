/**
 * 27. 이진 탐색 트리 구현
 *
 * 첫 번째 인수 lst를 이용하여 이진 탐색 트리를 생성하고, 두 번째 인수 serachList에 있는 각 노드를 이진 탐색 트리에서 찾을 수 있는지 확인하여
 *  true 또는 false를 담은 배열 result를 반환하는 함수 soution()을 작성하세요.
 *
 * 제약 조건
 *  - lst의 노드는 정수로 이루어져 있으며 1,000,000개를 초과하지 않습니다.
 *  - 이진 탐색 트리의 삽입과 탐색 기능을 구현해야 합니다.
 *  - searchList의 길이는 10이하입니다.
 *
 * 입출력의 예
 *  1.
 *      input => lst: [5, 3, 8, 4, 2, 1, 7, 10], searchList: [1, 2, 5, 6]
 *      output => [true, true, true, false]
 * 2.
 *      input => lst: [1, 3, 5, 7, 9], searchList: [2, 4, 6, 8, 10]
 *      output => [false, false, false, false]
 */

class Node {
  constructor(val) {
    this.left = null;
    this.val = val;
    this.right = null;
  }
}

const solution = (lst, serachList) => {
  const answer = [];

  const lstLen = lst.length;
  const bst = new Node(lst[0]);

  for (let i = 1; i < lstLen; i++) {
    const currNode = new Node(lst[i]);
    let node = bst;
    while (true) {
      if (currNode.val < node.val) {
        if (!node.left) {
          node.left = currNode;
          break;
        } else {
          node = node.left;
        }
      } else {
        if (!node.right) {
          node.right = currNode;
          break;
        } else {
          node = node.right;
        }
      }
    }
  }

  serachList.forEach((element, i) => {
    let node = bst;
    while (node) {
      if (element === node.val) {
        answer.push(true);
        break;
      }
      if (element < node.val) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    answer.length <= i && answer.push(false);
  });

  return answer;
};

console.log(solution([5, 3, 8, 4, 2, 1, 7, 10], [1, 2, 5, 6]));
console.log(solution([1, 3, 5, 7, 9], [2, 4, 6, 8, 10]));
