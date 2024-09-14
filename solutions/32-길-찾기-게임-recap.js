class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const newNode = new Node(data);

    if (!this.root) this.root = newNode;
    else this.insertNode(this.root, newNode);
  }
  insertNode(parent, node) {
    if (parent.data.x < node.data.x) {
      if (parent.right) {
        this.insertNode(parent.right, node);
      } else {
        parent.right = node;
      }
    } else {
      if (parent.left) {
        this.insertNode(parent.left, node);
      } else {
        parent.left = node;
      }
    }
  }

  getRootNode() {
    return this.root;
  }
  preorder(node, answer) {
    if (node) {
      answer.push(node.data.idx);
      this.preorder(node.left, answer);
      this.preorder(node.right, answer);
    }
    return answer;
  }
  inorder(node, answer) {
    if (node) {
      this.inorder(node.left, answer);
      answer.push(node.data.idx);
      this.inorder(node.right, answer);
    }
    return answer;
  }
  postorder(node, answer) {
    if (node) {
      this.postorder(node.left, answer);
      this.postorder(node.right, answer);
      answer.push(node.data.idx);
    }
    return answer;
  }
}

function solution(nodeinfo) {
  var answer = [];
  const tree = new BinaryTree();

  const sortedNodeInfo = nodeinfo
    .map((node, idx) => ({ idx: idx + 1, x: node[0], y: node[1] }))
    .sort((a, b) => b.y - a.y);

  sortedNodeInfo.forEach((node) => tree.insert(node));
  //   answer.push(tree.inorder(tree.getRootNode(), []));
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
