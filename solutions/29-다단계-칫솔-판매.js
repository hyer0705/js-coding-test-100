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
  var answer = [];

  const sellerMap = new Map();
  for (let i = 0; i < enroll.length; i++) {
    if (referral[i] === "-") {
      sellerMap.set(enroll[i], {
        earn: [],
        node: new Node(enroll[i], null),
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
      const [toParent, toMe] = [
        earn * (TEN_PERCENT / 100),
        earn * (1 - TEN_PERCENT / 100),
      ];

      //   sellerMap.get(s).earn.pop();
      sellerMap.get(s).earn.push(toMe);

      //   sellerMap.get(currNode.parent.name).earn.pop();
      sellerMap.get(currNode.parent.name).earn.push(toParent);

      earn = toParent;
      currNode = currNode.parent;
    }
  });

  console.log(sellerMap);

  return answer;
}

console.log(
  solution(
    ["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"],
    ["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"],
    ["sam", "emily", "jaimie", "edward"],
    [2, 3, 5, 4]
  )
);
