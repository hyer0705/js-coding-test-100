/**
 * 25. 메뉴 리뉴얼
 * https://school.programmers.co.kr/learn/courses/30/lessons/72411
 */

// 출처: https://gist.github.com/axelpale/3118596
const k_combinations = (set, k) => {
  if (k > set.length || k <= 0) {
    return [];
  }

  if (k == set.length) {
    return [set];
  }

  if (k == 1) {
    return set.reduce((acc, cur) => [...acc, [cur]], []);
  }

  let combs = [],
    tail_combs = [];

  for (let i = 0; i <= set.length - k + 1; i++) {
    tail_combs = k_combinations(set.slice(i + 1), k - 1);
    for (let j = 0; j < tail_combs.length; j++) {
      combs.push([set[i], ...tail_combs[j]]);
    }
  }

  return combs;
};

const combinations = (set) => {
  return set.reduce(
    (acc, cur, idx) => [...acc, ...k_combinations(set, idx + 1)],
    []
  );
};

function solution(orders, course) {
  var answer = [];

  for (let j = 0; j < course.length; j++) {
    const countMap = new Map();
    for (let i = 0; i < orders.length; i++) {
      const combinations = k_combinations(
        orders[i].split("").sort(),
        course[j]
      );

      combinations
        .map((c) => c.join(""))
        .forEach((course) =>
          countMap.has(course)
            ? countMap.set(course, countMap.get(course) + 1)
            : countMap.set(course, 1)
        );
    }
    const res = Array.from(countMap, ([name, value]) => ({ name, value }));
    const max = Math.max(...Array.from(countMap, ([_, value]) => value));
    if (max > 1) {
      answer.push(
        ...res.filter(({ value }) => value === max).map(({ name }) => name)
      );
    }
  }

  return answer.sort();
}

// console.log(
//   solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2, 3, 4])
// );

// console.log(
//   solution(["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"], [2, 3, 5])
// );

console.log(solution(["XYZ", "XWY", "WXA"], [2, 3, 4]));
