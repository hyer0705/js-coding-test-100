/**
 * 32. 길 찾기 게임
 * https://school.programmers.co.kr/learn/courses/30/lessons/42892
 */

class Node {
  constructor(data) {
    this.data = data; // {idx, x, y}
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  insert({ idx, x, y }) {
    const newNode = new Node({ idx, x, y });

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data.x < node.data.x) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  preorder(node, answer) {
    if (node !== null) {
      answer.push(node.data.idx);
      this.preorder(node.left, answer);
      this.preorder(node.right, answer);
    }
    return answer;
  }

  postorder(node, answer) {
    if (node !== null) {
      this.postorder(node.left, answer);
      this.postorder(node.right, answer);
      answer.push(node.data.idx);
    }
    return answer;
  }

  getRootNode() {
    return this.root;
  }
}

function solution(nodeinfo) {
  var answer = [];

  const tree = new Tree();

  const sorted = nodeinfo
    .map((val, i) => [i + 1, ...val])
    .sort((a, b) => b[2] - a[2]);

  sorted.forEach(([idx, x, y]) => tree.insert({ idx, x, y }));

  answer.push(tree.preorder(tree.getRootNode(), []));
  answer.push(tree.postorder(tree.getRootNode(), []));

  return answer;
}

console.log(
  solution([
    [5, 3],
    [11, 5],
    [13, 3],
    [3, 5],
    [6, 1],
    [1, 3],
    [8, 6],
    [7, 2],
    [2, 2],
  ])
);
