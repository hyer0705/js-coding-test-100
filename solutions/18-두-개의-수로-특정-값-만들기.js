/**
 * 18. 두 개의 수로 특정 값 만들기
 *
 * n개의 양의 정수로 이루어진 리스트 arr와 정수 target이 주어졌을 때 이 중에서 합이 target인 두 수가 arr에 있는지 찾고,
 * 있으면 true, 없으면 false를 반환하는 solution() 함수를 작성하세요.
 *
 * 제약 조건
 * - n은 2 이상 10,000 이하의 자연수입니다.
 * - arr의 각 원소는 1 이상 10,000 이하의 자연수입니다.
 * - arr의 원소 중 중복되는 원소는 없습니다.
 * - target은 1이 상 20,000 이하의 자연수입니다.
 *
 * 입출력의 예
 * 1.
 *  input => arr: [1, 2, 3, 4, 8], target: 6
 *  output => true
 * 2.
 *  input => arr: [2, 3, 5, 9], target: 10
 *  output => false
 */

/**
 * 책에 있는 풀이, 계수 정렬을 활용한 방법
 * arr에서 임의의 원소 x에 대해 x + k = target이 되는 원소 k가 arr에 있는지 확인하기
 */
const countSort = (arr, k) => {
  const hashtable = new Array(k + 1).fill(0);

  for (const num of arr) {
    if (num <= k) {
      hashtable[num] = 1;
    }
  }

  return hashtable;
};

const solution = (arr, target) => {
  const hashtable = countSort(arr, target);

  for (const num of arr) {
    const complement = target - num;

    if (
      complement !== num &&
      complement >= 0 &&
      complement <= target &&
      hashtable[complement] === 1
    ) {
      return true;
    }
  }

  return false;
};

/**
 * for문을 사용한 풀이...내가 한 풀이..댐잇
 */
const solution1 = (arr, target) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (target === arr[i] + arr[j]) return true;
    }
  }

  return false;
};

console.log(solution([1, 2, 3, 4, 8], 6));
console.log(solution([2, 3, 5, 9], 10));
