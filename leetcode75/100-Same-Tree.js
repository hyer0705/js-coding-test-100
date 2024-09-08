/**
 * 100. Same Tree
 * https://leetcode.com/problems/same-tree/
 *
 * topic: Tree, DFS, BFS, Binary Tree
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  const queue = [p];
  const res = [];

  let curr;
  while (queue.length) {
    curr = queue.shift();
    res.push(curr.val);

    if (curr.left) {
      queue.push(curr.left);
    }
    // else res.push(null);
    if (curr.right) {
      queue.push(curr.right);
    }
    // else res.push(null);
  }

  console.log(res);

  const qQueue = [q];
  const res2 = [];
  let currNode;
  while (qQueue.length) {
    currNode = qQueue.shift();
    res2.push(currNode.val);

    if (currNode.left) {
      qQueue.push(currNode.left);
    }
    // else res2.push(null);
    if (currNode.right) {
      qQueue.push(currNode.right);
    }
    // else res2.push(null);
  }

  console.log(res2);
};
