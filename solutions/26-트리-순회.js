/**
 * 26. 트리 순회
 *
 * 이진 트리를 표현한 배열 nodes를 인자로 받습니다.
 *
 * 예를 들어서 nodes가 [1, 2, 3, 4, 5, 6, 7]이면 다음과 같은 트리를 표현한 것입니다.
 *
 * 해당 이진 트리에 대하여 전위 순회, 중위 순회, 후위 순회 결과를 반환하는 solution() 함수를 구현하세요.
 *
 * 제약 조건
 *  - 입력 노드값의 개수는 1개 이상 1,000개 이하이다.
 *  - 노드값은 정수형이며, 중복되지 않는다.
 *
 * 입출력의 예
 * 1.
 *      input => nodes: [1, 2, 3, 4, 5, 6, 7]
 *      output => ["1 2 4 5 3 6 7", "4 2 5 1 6 3 7", "4 5 2 6 7 3 1"]
 */

const getChildsIdx = (parentIdx) => [parentIdx * 2 + 1, parentIdx * 2 + 2];

const preorderTraversal = (parentIdx, prefix, nodes) => {
  const [leftIdx, rightIdx] = getChildsIdx(parentIdx);

  if (nodes[parentIdx]) prefix.push(nodes[parentIdx]);
  if (nodes[leftIdx]) preorderTraversal(leftIdx, prefix, nodes);
  if (nodes[rightIdx]) preorderTraversal(rightIdx, prefix, nodes);

  return;
};

const inorderTraversal = (parentIdx, infix, nodes) => {
  const [leftIdx, rightIdx] = getChildsIdx(parentIdx);

  if (nodes[leftIdx]) inorderTraversal(leftIdx, infix, nodes);
  if (nodes[parentIdx]) infix.push(nodes[parentIdx]);
  if (nodes[rightIdx]) inorderTraversal(rightIdx, infix, nodes);

  return;
};

const postorderTraversal = (parentIdx, postfix, nodes) => {
  const [leftIdx, rightIdx] = getChildsIdx(parentIdx);

  if (nodes[leftIdx]) postorderTraversal(leftIdx, postfix, nodes);
  if (nodes[rightIdx]) postorderTraversal(rightIdx, postfix, nodes);
  if (nodes[parentIdx]) postfix.push(nodes[parentIdx]);

  return;
};

const solution = (nodes) => {
  const answer = [];

  const prefix = [];
  // prefix
  preorderTraversal(0, prefix, nodes);
  answer.push(prefix.join(" "));

  // infix
  const infix = [];
  inorderTraversal(0, infix, nodes);
  answer.push(infix.join(" "));

  // postfix
  const postfix = [];
  postorderTraversal(0, postfix, nodes);
  answer.push(postfix.join(" "));

  return answer;
};

console.log(solution([1, 2, 3, 4, 5, 6, 7]));
