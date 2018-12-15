function ListNode(val) {
  this.val = val;
  this.next = null;
}
//1 Two Sum
let twoSum = function(nums, target) {
  let len = nums.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
};

//2 Add Two Numbers
let addTwoNumbers = function(l1, l2) {
  let carryFlag = 0,
    preNode = l1,
    l3 = l1;
  while (l1 || l2 || carryFlag) {
    if (l1 && l2) {
      let temp = l1.val + l2.val + carryFlag;
      carryFlag = parselet(temp / 10);
      l1.val = temp % 10;
      preNode = l1;
      l1 = l1.next;
      l2 = l2.next;
    } else if (l1) {
      preNode.next = l1;
      let temp = l1.val + carryFlag;
      carryFlag = parselet(temp / 10);
      l1.val = temp % 10;
      preNode = l1;
      l1 = l1.next;
    } else if (l2) {
      preNode.next = l2;
      let temp = l2.val + carryFlag;
      carryFlag = parselet(temp / 10);
      preNode = l2;
      l2.val = temp % 10;
      l2 = l2.next;
    } else if (carryFlag) {
      preNode.next = new ListNode(1);
      carryFlag = 0;
    }
  }
  return l3;
};

//3 Longest Substring Without Repeating Characters
let lengthOfLongestSubstring = function(s) {
  let strLen = s.length,
    nowStrs = s[0],
    len = strLen ? 1 : 0;
  for (let j = 1; j < strLen; j++) {
    let index = Array.prototype.indexOf.call(nowStrs, s[j]);
    if (~index) {
      nowStrs = nowStrs.substr(index + 1);
    }
    nowStrs += s[j];
    len = Math.max(len, nowStrs.length);
  }
  return len;
};

//5 Longest Palindromic Substring
let longestPalindrome = function(s) {
  let start = 0,
    end = 0,
    len = s.length;
  for (let i = 0; i < len && end - start < len - i; i++) {
    let j = len - 1;
    while (j > i && end - start < j - i) {
      if (isPalindrome(s, i, j)) {
        [start, end] = [i, j];
      }
      j--;
    }
  }
  function isPalindrome(str, i, j) {
    while (i < j) {
      if (str[i] !== str[j]) {
        return false;
      }
      i++;
      j--;
    }
    return true;
  }
  return s.substring(start, end + 1);
};

//6 ZigZag Conversion
let convert = function(s, numRows) {
  let a = new Array(numRows).fill('');
  if (numRows === 1) {
    return s;
  }
  for (let i = 0, len = s.length; i < len; i++) {
    let flag = i % (2 * numRows - 2);
    if (flag < numRows) {
      a[flag] += s[i];
    } else {
      a[2 * (numRows - 1) - flag] += s[i];
    }
  }
  return a.join('');
};
//7 Reverse leteger
let reverse = function(x) {
  let numsArr = [],
    str = x + '',
    flag = 1;

  if (x >= Math.pow(2, 30) - 1 || x < -Math.pow(2, 31) + 1) {
    return 0;
  }

  for (let i = str.length - 1; i >= 0; i--) {
    numsArr.push(str.charAt(i));
  }
  if (str.charAt(0) === '-') {
    flag = -1;
  }
  return parselet(numsArr.join('')) * flag;
};
//8 String to leteger (atoi)
let myAtoi = function(str) {
  let num = parselet(str);
  if (num != num) {
    num = 0;
  }
  if (num < -2147483648) {
    num = -2147483648;
  }
  if (num >= 2147483647) {
    num = 2147483647;
  }
  return num;
};
//9 Palindrome Number
let isPalindrome = function(x) {
  if (x < 0) {
    return false;
  }
  if (x < 10) {
    return true;
  }
  let temp = x % 10,
    restNum = (x - temp) / 10;
  if (temp === 0) {
    return false;
  }
  while (temp <= restNum) {
    if (temp === restNum || temp * 10 + (restNum % 10) === restNum) {
      return true;
    }
    temp = temp * 10 + (restNum % 10);
    restNum = Math.floor(restNum / 10);
  }
  return false;
};
//11 Container With Most Water
//暴力解法
let maxArea = function(height) {
  let max = 0;
  for (let i = 0, len = height.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      let area = Math.min(height[i], height[j]) * (j - i);
      max = Math.max(max, area);
    }
  }
  return max;
};
let maxArea1 = function(height) {
  let leftIdx = 0,
    rightIdx = height.length - 1;
  let max = Math.min(height[rightIdx], height[leftIdx]) * (rightIdx - leftIdx);
  while (leftIdx < rightIdx) {
    max = Math.max(
      max,
      Math.min(height[leftIdx], height[rightIdx]) * (rightIdx - leftIdx)
    );
    if (height[leftIdx] < height[rightIdx]) leftIdx++;
    else rightIdx--;
  }
  return max;
};
//12 leteger to Roman
let letToRoman = function(num) {
  let pos = 0,
    roman = '';
  while (num) {
    let digit = num % 10,
      one = (five = ten = null);
    num = (num - digit) / 10;
    if (pos === 0) {
      one = 'I';
      five = 'V';
      ten = 'X';
    }
    if (pos === 1) {
      one = 'X';
      five = 'L';
      ten = 'C';
    }
    if (pos === 2) {
      one = 'C';
      five = 'D';
      ten = 'M';
    }
    if (pos === 3) {
      one = 'M';
    }
    switch (digit) {
      case 1:
        roman = one + roman;
        break;
      case 2:
        roman = one + one + roman;
        break;
      case 3:
        roman = one + one + one + roman;
        break;
      case 4:
        roman = one + five + roman;
        break;
      case 5:
        roman = five + roman;
        break;
      case 6:
        roman = five + one + roman;
        break;
      case 7:
        roman = five + one + one + roman;
        break;
      case 8:
        roman = five + one + one + one + roman;
        break;
      case 9:
        roman = one + ten + roman;
        break;
      default:
        break;
    }
    pos++;
  }
  return roman;
};
//13. Roman to leteger
let romanTolet = function(s) {
  let romanlet = 0;
  for (let pos = 0, len = s.length; pos < len; pos++) {
    switch (s[pos]) {
      case 'M':
        romanlet += 1000;
        break;
      case 'D':
        romanlet += 500;
        break;
      case 'C':
        if (s[pos + 1] === 'D' || s[pos + 1] === 'M') {
          romanlet -= 100;
        } else {
          romanlet += 100;
        }
        break;
      case 'L':
        romanlet += 50;
        break;
      case 'X':
        if (s[pos + 1] === 'L' || s[pos + 1] === 'C') {
          romanlet -= 10;
        } else {
          romanlet += 10;
        }
        break;
      case 'V':
        romanlet += 5;
        break;
      case 'I':
        if (s[pos + 1] === 'V' || s[pos + 1] === 'X') {
          romanlet -= 1;
        } else {
          romanlet += 1;
        }
        break;
    }
  }
  return romanlet;
};
//14. Longest Common Prefix
var longestCommonPrefix = function(strs) {
  if (strs.length === 0) {
    return '';
  }
  if (strs.length === 1) {
    return strs[0];
  }
  let prefix = strs[0];
  for (let j = 1; j < strs.length; j++) {
    prefix = getTwoStringPrefix(prefix, strs[j]);
    if (!prefix) {
      return '';
    }
  }
  return prefix;
  function getTwoStringPrefix(str1, str2) {
    if (str1 === str2) {
      return str1;
    }
    let len1 = str1.length,
      len2 = str2.length,
      prefix = '';
    for (let i = 0; i < len1 && i < len2; i++) {
      if (str1[i] != str2[i]) {
        return prefix;
      }
      prefix = prefix + str1[i];
    }
    return prefix;
  }
};
//15. 3Sum
var threeSum = function(nums) {
  nums = nums.sort((a, b) => a - b);
  let returnNums = [],
    set = new Set();
  for (let i = 0, len = nums.length; i < len - 2 && nums[i] <= 0; i++) {
    if ((nums[i - 1] || nums[i - 1] === 0) && nums[i - 1] === nums[i]) {
      continue;
    }
    let k = i + 1,
      j = nums.length - 1;
    while (k < j) {
      let sum = nums[k] + nums[j];
      if (sum === -nums[i]) {
        set.add([nums[i], nums[j], nums[k]].join());
        k++;
        j--;
      } else if (sum > -nums[i]) {
        j--;
      } else {
        k++;
      }
    }
  }
  return Array.from(set).map(n => n.split(','));
};
//16. 3Sum Closest
var threeSumClosest = function(nums, target) {
  nums = nums.sort((a, b) => a - b);
  let closeSum = nums[0] + nums[1] + nums[2];
  let flag = 99999;
  for (let i = 0, len = nums.length; i < len - 2; i++) {
    let pos = target - nums[i];
    let j = i + 1,
      k = len - 1;
    while (j < k) {
      let sum = nums[j] + nums[k];
      if (sum === pos) {
        return target;
      }
      if (Math.abs(-pos + sum) < flag) {
        flag = Math.abs(-pos + sum);
        closeSum = sum + nums[i];
      }
      if (sum < pos) {
        j++;
      } else {
        k--;
      }
    }
  }

  return closeSum;
};
//17. Letter Combinations of a Phone Number
var letterCombinations = function(digits) {
  if (digits === '') {
    return [];
  }

  var charsString = '';
  for (let i = 0, len = digits.length; i < len; i++) {
    let buttonChars = [];
    switch (digits[i]) {
      case '2':
        buttonChars = ['a', 'b', 'c'];
        break;
      case '3':
        buttonChars = ['d', 'e', 'f'];
        break;
      case '4':
        buttonChars = ['g', 'h', 'i'];
        break;
      case '5':
        buttonChars = ['j', 'k', 'l'];
        break;
      case '6':
        buttonChars = ['m', 'n', 'o'];
        break;
      case '7':
        buttonChars = ['p', 'q', 'r', 's'];
        break;
      case '8':
        buttonChars = ['t', 'u', 'v'];
        break;
      case '9':
        buttonChars = ['w', 'x', 'y', 'z'];
        break;
    }
    if (charsString.length === 0) {
      charsString = buttonChars.toString();
    } else {
      charsString = charsString.replace(/\w+/g, function($1) {
        let str = [];
        for (let j = 0, len1 = buttonChars.length; j < len1; j++) {
          str.push($1 + buttonChars[j]);
        }
        return str.toString();
      });
    }
  }
  return charsString.split(',');
};
//
//18. 4Sum
var fourSum = function(nums, target) {
  let solutions = [];
  nums = nums.sort((a, b) => a - b);
  for (let i = 0, len = nums.length; i < len - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let target1 = target - nums[i];
    for (let j = i + 1; j < len - 2; j++) {
      if ((j !== i + 1) & (nums[j] === nums[j - 1])) {
        continue;
      }
      let target2 = target1 - nums[j];
      let k = j + 1,
        l = len - 1;
      while (k < l) {
        if (k !== j + 1 && nums[k] === nums[k - 1]) {
          k++;
          continue;
        }
        if (nums[k] + nums[l] === target2) {
          solutions.push([nums[i], nums[j], nums[k], nums[l]]);
          k++;
          l--;
          continue;
        }
        if (nums[k] + nums[l] < target2) {
          k++;
        } else {
          l--;
        }
      }
    }
  }
  return solutions;
};
//19. Remove Nth Node From End of List
var removeNthFromEnd = function(head, n) {};
//20. Valid Parentheses
var isValid = function(s) {
  var brackets = [];
  for (let temp of s) {
    if (temp === '(' || temp === '{' || temp === '[') {
      brackets.push(temp);
    }
    if (temp === ')') {
      if (brackets.pop() != '(') {
        return false;
      }
    }
    if (temp === '}') {
      if (brackets.pop() != '{') {
        return false;
      }
    }
    if (temp === ']') {
      if (brackets.pop() != '[') {
        ``;
        return false;
      }
    }
  }
  if (brackets.length === 0) {
    return true;
  }
  return false;
};
//21. Merge Two Sorted Lists
var mergeTwoLists = function(l1, l2) {
  var returnList = new ListNode();
  function getLastNode(l) {
    while (l.next) {
      l = l.next;
    }
    return l;
  }
  while (l2 && l1) {
    if (l2.val >= l1.val) {
      getLastNode(returnList).next = new ListNode(l1.val);
      l1 = l1.next;
    } else {
      getLastNode(returnList).next = new ListNode(l2.val);
      l2 = l2.next;
    }
  }
  if (l1) {
    getLastNode(returnList).next = l1;
  }
  if (l2) {
    getLastNode(returnList).next = l2;
  }
  return returnList.next;
};
//22. Generate Parentheses
var generateParenthesis = function(n) {
  if (n === 0) {
    return [];
  }
  if (n === 1) {
    return ['()'];
  }
  return generate('((', 2, 2).concat(generate('()', 0, 1));

  function generate(strs, rightCount, nowCount) {
    if (strs.length === 2 * n) {
      return [strs];
    }
    if (nowCount === n) {
      return [(strs + ')))))))').substr(0, 2 * n)];
    }
    if (rightCount > 0 && rightCount < n) {
      return generate(strs + '(', rightCount + 1, nowCount + 1).concat(
        generate(strs + ')', rightCount - 1, nowCount)
      );
    } else if (rightCount === 0) {
      return generate(strs + '(', rightCount + 1, nowCount + 1);
    }
  }
};
//24. Swap Nodes in Pairs
var swapPairs = function(head) {
  if (!head || head.length === 0) {
    return [];
  }
  var node = head;
  if (head.next) {
    head = head.next;
  }
  let lastNode;
  while (node && node.next) {
    let temp = node.next;
    node.next = temp.next;
    temp.next = node;
    if (lastNode) {
      lastNode.next = temp;
    }
    lastNode = node;
    node = node.next;
  }
  return head;
};
//26. Remove Duplicates from Sorted Array
var removeDuplicates = function(nums) {
  var temp = nums[0],
    flag = 0;
  nums.forEach(function(n, index, nums) {
    if (index > 0) {
      if (n === temp) {
        flag++;
        delete nums[index];
      } else {
        temp = n;
      }
    }
  });
  nums.sort((x, y) => x - y);
  nums.splice(nums.length - flag);
  return nums.length;
};
//27. Remove Element
var removeElement = function(nums, val) {
  var flag = 0;
  nums.forEach(function(n, index, nums) {
    if (val !== n) {
      nums[flag++] = n;
    }
  });
  nums.splice(flag);
  return nums.length;
};
// 28. Implement strStr()
var strStr = function(haystack, needle) {
  if (haystack === needle) {
    return 0;
  }
  let len = needle.length;
  for (let i = 0; i < haystack.length - len + 1; i++) {
    if (haystack.substr(i, len) === needle) return i;
  }
  return -1;
};
//29. Divide Two letegers
var divide = function(dividend, divisor) {
  const MAX = 2147483647;
  let times = 0,
    initDividend = Math.abs(dividend),
    flag =
      (dividend > 0 && divisor < 0) || (dividend < 0 && divisor > 0) ? -1 : 1;
  dividend = Math.abs(dividend);
  divisor = Math.abs(divisor);
  if (divisor === 1) {
    times = dividend;
  } else
    while (initDividend >= divisor) {
      console.log(initDividend);
      let count = 1;
      while (dividend >> 1 >= divisor) {
        count = 2 * count;
        dividend = dividend >> 1;
      }
      times += count;
      initDividend = initDividend - divisor * count;
      dividend = initDividend;
    }
  if (flag < 0) {
    times = -times;
  }
  times = Math.min(MAX, times);
  return times;
};
//31. Next Permutation
var nextPermutation = function(nums) {
  for (let len = nums.length - 1; len > 0; len--) {
    if (nums[len] > nums[len - 1]) {
      for (let j = nums.length - 1; j >= len; j--) {
        if (nums[j] > nums[len - 1]) {
          [nums[j], nums[len - 1]] = [nums[len - 1], nums[j]];
          let temp = nums.splice(len);
          temp.reverse();
          nums.splice(len, 0, ...temp);
          return;
        }
      }
    }
  }
  return nums.reverse();
};
//33. Search in Rotated Sorted Array
var search = function(nums, target) {
  let mid = ((nums.length - 1) / 2) | 0,
    left = 0,
    right = nums.length - 1;
  while (left <= right) {
    if (nums[mid] === target) {
      return mid;
    }
    if (target > nums[mid]) {
      if (nums[right] > nums[mid]) {
        if (target > nums[right]) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      } else {
        left = mid + 1;
      }
    }
    if (target < nums[mid]) {
      if (nums[right] > nums[mid]) {
        right = mid - 1;
      } else {
        if (target > nums[right]) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }
    }
    mid = ((right + left) / 2) | 0;
  }
  return -1;
};
//34. Find First and Last Position of Element in Sorted Array
var searchRange = function(nums, target) {
  let left = 0,
    right = nums.length - 1;
  let mid = ((left + right) / 2) | 0;
  while (left < right) {
    if (nums[mid] === target) {
      if (nums[left] === target) {
      }
    }
    if (nums[mid] > target) {
      right = mid - 1;
    }
    if (nums[mid] < left) {
      left = mid + 1;
    }
    mid = ((left + right) / 2) | 0;
  }
  return [-1, -1];
};
//35. Search Insert Position
var searchInsert = function(nums, target) {
  let returnInd = nums.indexOf(target);
  if (returnInd >= 0) {
    return returnInd;
  }
  for (let j = 0, len = nums.length; j < len; j++) {
    if (nums[j] > target) {
      return j;
    }
  }
  return nums.length;
};
//36. Valid Sudoku
var isValidSudoku = function(board) {
  let rows = [],
    cols = [],
    areas = [];
  for (let i = 0; i < 9; i++) {
    if (i % 3 === 0) {
      areas = [];
    }
    let rowData = board[i];
    for (let j = 0; j < 9; j++) {
      let num = rowData[j];
      if (num === '.') {
        continue;
      }
      let areaFlag = (((i / 3) | 0) + j / 3) | 0;
      if (rows[i] && rows[i].includes(num)) {
        return false;
      }
      if (cols[j] && cols[j].includes(num)) {
        return false;
      }
      if (areas[areaFlag] && areas[areaFlag].includes(num)) {
        return false;
      }
      if (rows[i]) {
        rows[i].push(num);
      } else {
        rows[i] = [num];
      }
      if (cols[j]) {
        cols[j].push(num);
      } else {
        cols[j] = [num];
      }
      if (areas[areaFlag]) {
        areas[areaFlag].push(num);
      } else {
        areas[areaFlag] = [num];
      }
    }
  }
  return true;
};
//38. Count and Say
var countAndSay = function(n) {
  let returnStr = '1';
  for (let i = 2; i <= n; i++) {
    let tempStr = returnStr,
      temp = 1;
    returnStr = '';
    for (let j = 0, len = tempStr.length; j < len; j++) {
      if (tempStr[j] != tempStr[j + 1]) {
        returnStr = returnStr + temp + tempStr[j];
        temp = 1;
      } else {
        temp++;
      }
    }
  }
  return returnStr;
};
//39. Combination Sum
var combinationSum = function(candidates, target) {
  if (!arguments[2]) candidates = candidates.sort((a, b) => a - b);
  let result = [];
  for (
    let i = 0, len = candidates.length;
    i < len && candidates[i] <= target;
    i++
  ) {
    let val = target - candidates[i];
    if (val === 0) {
      result.push([candidates[i]]);
    }
    result.push(
      ...combinationSum(candidates.slice(i), val, true).map(n => {
        n.splice(0, 0, candidates[i]);
        return n;
      })
    );
  }
  return result;
};
//40. Combination Sum II
var combinationSum2 = function(candidates, target) {
  if (!arguments[2]) candidates = candidates.sort((a, b) => a - b);
  let result = [];
  for (
    let i = 0, len = candidates.length;
    i < len && candidates[i] <= target;
    i++
  ) {
    if (candidates[i] === candidates[i - 1]) {
      continue;
    }
    let val = target - candidates[i];
    if (val === 0) {
      result.push([candidates[i]]);
    }
    result.push(
      ...combinationSum2(candidates.slice(i + 1), val, true).map(n => {
        n.splice(0, 0, candidates[i]);
        return n;
      })
    );
  }
  return result;
};
//43. Multiply Strings
var multiply = function(num1, num2) {
  // console.log(num1,num2)
  if (num1 === '0' || num2 === '0') {
    return '0';
  }
  if (num1.length <= 7 && num2.length <= 7) {
    return +num1 * +num2 + '';
  }
  let sum = '0';
  for (let len = num1.length, i = 0; len > 0; ) {
    let countZero = new Array(i).fill(0).join('');
    sum = mutliAdd(
      sum,
      multiply(num2, num1.substring(len - 7, len)) + countZero
    );
    len = len - 7;
    i = i + 7;
  }
  while (sum[0] === '0') {
    sum = sum.substring(1);
  }
  return sum;
};
var mutliAdd = function(num1, num2) {
  if (num1 === '0') {
    return num2;
  }
  if (num2 === '0') {
    return num1;
  }
  let sum = '',
    count = 0,
    code = null;
  for (
    let len1 = num1.length, len2 = num2.length;
    len2 >= 0 || len1 >= 0;
    len1 = len1 - 7, len2 = len2 - 7
  ) {
    if (len1 >= 0 && len2 >= 0) {
      code =
        +num1.substring(len1 - 7, len1) +
        +num2.substring(len2 - 7, len2) +
        count;
    } else if (len1 >= 0) {
      code = +num1.substring(len1 - 7, len1) + count;
    } else {
      code = +num2.substring(len2 - 7, len2) + count;
    }
    if (code >= 10000000) {
      count = 1;
      code = code - 10000000;
    } else {
      count = 0;
    }
    code = '0000000' + code;
    code = code.substring(code.length - 7);
    sum = code + sum;
  }
  if (count) {
    return 1 + sum;
  }
  return sum;
};
//46. Permutations
var permute = function(nums) {
  let number = [];
  if (nums.length === 0) {
    return [];
  }
  if (nums.length === 1) return [nums];
  for (let i = 0, len = nums.length; i < len; i++) {
    let numsCopy = nums.slice();
    let temp = numsCopy.splice(i, 1);
    number.push(...permute(numsCopy).map(n => [temp, ...n]));
  }
  return number;
};
//47. Permutations II
var permuteUnique = function(nums) {
  if (nums.length === 0) {
    return [];
  }
  if (nums.length === 1) return [nums];
  let numbers = [],
    exists = [];
  for (let i = 0, len = nums.length; i < len; i++) {
    let data = nums[i];
    if (exists.includes(data)) {
      continue;
    }
    exists.push(data);
    let numsCopy = nums.slice();
    numsCopy.splice(i, 1);
    numbers.push(...permuteUnique(numsCopy).map(n => [data, ...n]));
  }
  return numbers;
};
//48. Rotate Image
var rotate = function(matrix) {
  let x = 0,
    y = 0,
    len = matrix.length,
    count = {};
  for (let i = 0; i < len / 2; i++) {
    for (let j = 0; j < len / 2; j++) {
      [x, y] = [j, len - i - 1];
      let temp = matrix[i][j];
      while (!count[x + '.' + y]) {
        count[x + '.' + y] = true;
        [matrix[x][y], temp] = [temp, matrix[x][y]];
        [x, y] = [y, len - x - 1];
      }
    }
  }
};
//49. Group Anagrams
var groupAnagrams = function(strs) {
  let strings = new Map();
  for (let i = 0, len = strs.length; i < len; i++) {
    let str = strs[i],
      key = str
        .split('')
        .sort()
        .toString();
    if (strings.get(key)) {
      strings.get(key).push(str);
    } else {
      strings.set(key, [str]);
    }
  }
  return [...strings.values()];
};
//50. Pow(x, n)
var myPow = function(x, n) {
  if (n === 1) {
    return x;
  }
  if (n === 0) {
    return 1;
  }
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  if (n % 2) {
    return myPow(x * x, (n - 1) / 2) * x;
  }
  return myPow(x * x, n / 2);
};
