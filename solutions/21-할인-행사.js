/**
 * 21. 할인 행사
 *
 * want: 정현이가 원하는 제품을 나타내는 문자열 배열
 * number: 정현이가 원하는 제품의 수량을 나타내는 정수 배열
 * discount: XYZ 마트에서 할인하는 제품을 나타내는 문자열 배열
 *
 * 회원등록시 정현이가 원하는 제품을 모두 할인 받을 수 있는 회원등록 날짜의 총 일수를 return 하는 solution 함수를 완성하시오.
 * 가능한 날이 없으면 0을 return 합니다.
 *
 * 제한사항
 * - 1 <= want의 길이 = number의 길이 <= 10
 *      - 1 <= number의 원소 <= 10
 *      - number[i]는 want[i]의 수량을 의미하며, number의 원소의 합은 10입니다.
 * - 10 <= discount 의 길이 <= 100,000
 * - want와 discount의 원소들은 알파벳 소문자로 이루어진 문자열입니다.
 *      - 1 <= want의 원소의 길이, discount의 원소의 길이 <= 12
 *
 * 입출력 예
 * 1.
 *  input => want: ["banana", "apple", "rice", "pork", "pot"], number: [3, 2, 2, 2, 1], discount: ["chicken", "apple", "apple", "banana", "rice", "apple", "pork", "banana", "pork", "rice", "pot", "banana", "apple", "banana"]
 *  output => 3
 *
 * 2.
 *  input => want: ['apple], number: [10], discount: ["banana", "banana", "banana", "banana", "banana", "banana", "banana", "banana", "banana", "banana"]
 *  output => 0
 */

function solution(want, number, discount) {
  const MEMBERSHIP_DURATION = 10;

  var answer = 0;
  const discountedProducts = new Map();

  const isProductCountEqual = (membershipDiscounts, product, count) =>
    membershipDiscounts.filter((p) => p === product).length === count;
  const isProductsMatching = (count) => discountedProducts.size === count;

  for (let i = 0; i < want.length; i++) {
    const key = want[i],
      val = number[i];
    discountedProducts.set(key, val);
  }

  for (let i = 0; i + MEMBERSHIP_DURATION <= discount.length; i++) {
    const membershipDiscounts = discount.slice(i, i + MEMBERSHIP_DURATION);

    let matchedProducts = 0;
    for (const [product, count] of discountedProducts.entries()) {
      if (isProductCountEqual(membershipDiscounts, product, count))
        matchedProducts++;
    }

    if (isProductsMatching(matchedProducts)) answer++;
  }

  return answer;
}

console.log(
  solution(
    ["banana", "apple", "rice", "pork", "pot"],
    [3, 2, 2, 2, 1],
    [
      "chicken",
      "apple",
      "apple",
      "banana",
      "rice",
      "apple",
      "pork",
      "banana",
      "pork",
      "rice",
      "pot",
      "banana",
      "apple",
      "banana",
    ]
  )
);
