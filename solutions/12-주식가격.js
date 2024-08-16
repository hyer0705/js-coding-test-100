/**
 * 12. 주식가격
 *
 * 초 단위로 기록된 주식가격이 담긴 배열 prices가 매개변수로 주어질 때,
 * 가격이 떨어지지 않은 기간은 몇 초 인지를 return 하도록 solution 함수를 완성하세요.
 *
 * 제한사항
 *  - prices의 각 가격은 1 이상 10,000 이하인 자연수입니다.
 *  - prices의 길이는 2 이상 100,000 이하입니다.
 *
 * 테스트 케이스
 *  1.
 *      input => prices: [1, 2, 3, 2, 3]
 *      output => [4, 3, 1, 1, 0]
 */

class Price {
  constructor(price, index) {
    this.price = price;
    this.index = index;
  }
}

function isEmpty(stack) {
  return stack.length === 0;
}

function greaterThanOrEqualPeek(stack, price) {
  const top = stack.length - 1;
  return stack[top].price <= price;
}

function lessThanPeek(stack, price) {
  const top = stack.length - 1;

  return stack[top].price > price;
}

function solution(prices) {
  var answer = new Array(prices.length).fill(0);

  const stack = [];

  prices.forEach((price, index) => {
    if (isEmpty(stack) || greaterThanOrEqualPeek(stack, price)) {
      stack.push(new Price(price, index));
    } else if (!isEmpty(stack) && lessThanPeek(stack, price)) {
      while (!isEmpty(stack) && lessThanPeek(stack, price)) {
        const peek = stack.pop();
        answer[peek.index] = index - peek.index;
      }
      stack.push(new Price(price, index));
    }
  });

  stack.forEach((priceObj) => {
    const lastIndexOfPrices = prices.length - 1;
    answer[priceObj.index] = lastIndexOfPrices - priceObj.index;
  });

  return answer;
}

console.log(solution([1, 2, 3, 2, 3]));
console.log(solution([4, 3, 2, 1])); // [ 1, 1, 1, 0 ]
console.log(solution([1, 2, 3, 4, 5, 6, 1, 1, 2, 3, 1, 2, 3])); // [12, 5, 4, 3, 2, 1, 6, 5, 2, 1, 2, 1, 0]
console.log(solution([1, 2, 3, 4, 1])); // [4, 3, 2, 1, 0]
console.log(solution([5, 4, 3, 2, 5])); // [1, 1, 1, 1, 0]
console.log(solution([1, 2, 3, 2, 3, 1])); // [5, 4, 1, 2, 1, 0]
