/**
 * 1071. Greatest Common Divisor of Strings
 * https://leetcode.com/problems/greatest-common-divisor-of-strings/?envType=study-plan-v2&envId=leetcode-75
 */

/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function (str1, str2) {
  const shortStr = str1.length < str2.length ? str1 : str2;
  const isDivisor = (str, divisor) =>
    str.split(divisor).filter((s) => s !== "").length === 0;

  let divisor = "";
  let maxDivisor = "";
  for (let i = 0; i < shortStr.length; i++) {
    divisor += shortStr[i];

    if (isDivisor(str1, divisor) && isDivisor(str2, divisor)) {
      maxDivisor.length < divisor.length && (maxDivisor = divisor);
    }
  }

  return maxDivisor;
};

console.log(gcdOfStrings("ABCABC", "ABC"));
console.log(gcdOfStrings("ABABAB", "ABAB"));
console.log(gcdOfStrings("LEET", "CODE"));
