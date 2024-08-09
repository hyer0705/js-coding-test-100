/**
 * 문제 5. 행렬의 곱셈
 *
 * 2차원 행렬 arr1과 arr2를 입력받아, arr1에 arr2를 곱한 결과를 반환하는 함수, solution을 완성해주세요.
 *
 * 제한사항
 *  행렬 arr1, arr2의 행과 열의 길이는 2 이상 100 이하입니다.
 *  행렬 arr1, arr2의 원소는 -10 이상 20 이하인 자연수입니다.
 *  곱할 수 있는 배열만 주어집니다.
 *
 * url: https://school.programmers.co.kr/learn/courses/30/lessons/12949
 */

/**
 * 행렬의 곱셈
 *
 * 두 행렬 A의 열의 개수와 행렬 B의 행의 개수가 같을 때, 행렬 A의 제 i행의 각 성분과
 * 행렬 B의 제 j열의 각 성분을 그 순서대로 곱하여 더한 것을 (i, j)성분으로 하는 행렬을
 * 두 행렬 A와 B의 곱이라 하고 기호로 AB와 같이 나타내요.
 */

/**
 *
 * @param {*} arr1
 * @param {*} arr2
 * @returns
 */
function solution(arr1, arr2) {
  const ARR1_ROW_LEN = arr1.length;
  const ARR1_COL_LEN = arr1[0].length;
  const ARR2_COL_LEN = arr2[0].length;

  var answer = Array.from({ length: ARR1_ROW_LEN }, (_) =>
    new Array(ARR2_COL_LEN).fill(0)
  );

  /**
   * (m * k) * (k * n) = (m * n)
   *
   * a11  a12     b11 b12
   * a21  a22     b21 b22
   * a31  a32
   */

  /**
   * a11*b11+a12*b21    a11*b12+a12*b22
   * a21*b11+a22*b21    a21*b12+a22*b22
   * a31*b11+a32*b21    a31*b12+a32*b22
   */

  for (let i = 0; i < ARR1_ROW_LEN; i++) {
    for (let j = 0; j < ARR2_COL_LEN; j++) {
      let currValue = 0;
      for (let k = 0; k < ARR1_COL_LEN; k++) {
        currValue += arr1[i][k] * arr2[k][j];
      }
      answer[i][j] = currValue;
    }
  }

  return answer;
}

console.log(
  solution(
    [
      [1, 4],
      [3, 2],
      [4, 1],
    ],
    [
      [3, 3],
      [3, 3],
    ]
  )
);

console.log(
  solution(
    [
      [2, 3, 2],
      [4, 2, 4],
      [3, 1, 4],
    ],
    [
      [5, 4, 3],
      [2, 4, 1],
      [3, 1, 1],
    ]
  )
);
