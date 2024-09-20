/**
 * 36. 전화번호 목록
 * https://school.programmers.co.kr/learn/courses/30/lessons/42577?language=javascript
 */

function solution(phone_book) {
  var answer = true;

  phone_book.sort();

  for (let i = 1; i < phone_book.length; i++) {
    const prev = phone_book[i - 1];
    const curr = phone_book[i];

    if (prev.startsWith(curr) || curr.startsWith(prev)) return false;
  }

  return answer;
}

console.log(solution(["119", "97674223", "1195524421"])); // false
console.log(solution(["123", "456", "789"])); // true
console.log(solution(["12", "123", "1235", "567", "88"])); // false
