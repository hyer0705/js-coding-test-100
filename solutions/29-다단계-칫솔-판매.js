/**
 * 29. 다단계 칫솔 판매
 * Lv.3
 * https://school.programmers.co.kr/learn/courses/30/lessons/77486
 */

class Node {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
  }
}

function solution(enroll, referral, seller, amount) {
  const MONEY = 100;
  const TEN_PERCENT = 10;
  var answer = new Array(enroll.length).fill(0);

  const sellerMap = new Map();
  sellerMap.set("-", { earn: [], node: new Node("-", null) });

  for (let i = 0; i < enroll.length; i++) {
    if (referral[i] === "-") {
      sellerMap.set(enroll[i], {
        earn: [],
        node: new Node(enroll[i], sellerMap.get("-").node),
      });
    } else {
      sellerMap.set(enroll[i], {
        earn: [],
        node: new Node(enroll[i], sellerMap.get(referral[i]).node),
      });
    }
  }

  seller.forEach((s, i) => {
    let earn = amount[i] * MONEY;

    // null 이거나 계산된 이익금이 1원보다 작을 때까지
    let currNode = sellerMap.get(s).node;
    while (currNode.parent !== null) {
      const toParent = Math.floor(earn * (TEN_PERCENT / 100));
      const toMe = earn - toParent;

      if (toParent < 1) break;

      s !== currNode.name && sellerMap.get(currNode.name).earn.pop();
      sellerMap.get(currNode.name).earn.push(toMe);

      sellerMap.get(currNode.parent.name).earn.push(toParent);

      earn = toParent;
      currNode = currNode.parent;
    }
  });

  for (const [k, v] of [...sellerMap.entries()].filter((v) => v[0] !== "-")) {
    const findIdx = enroll.findIndex((name) => name === k);
    const totalEarn = v.earn.reduce((acc, currVal) => acc + currVal, 0);
    answer[findIdx] = totalEarn;
  }

  return answer;
}

console.log(
  solution(
    ["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"],
    ["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"],
    ["young", "john", "tod", "emily", "mary"],
    [12, 4, 2, 5, 10]
  )
);
