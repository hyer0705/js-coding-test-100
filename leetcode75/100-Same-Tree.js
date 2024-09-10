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
  const pQueue = [p];
  const qQueue = [q];

  let pCurr;
  let qCurr;

  while (pQueue.length > 0 || qQueue.length > 0) {
    pCurr = pQueue.shift();
    qCurr = qQueue.shift();

    if (pCurr !== null && qCurr !== null) {
      if (pCurr.val !== qCurr.val) return false;

      pQueue.push(pCurr.left);
      pQueue.push(pCurr.right);

      qQueue.push(qCurr.left);
      qQueue.push(qCurr.right);
    }
    if (pCurr !== null && qCurr === null) return false;
    if (qCurr !== null && pCurr === null) return false;
  }
  return true;
};
