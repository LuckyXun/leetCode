//151. Reverse Words in a String
var reverseWords = function(str) {
  let strArray = str.trim().split(/\s+/);
  return strArray.reverse().join(' ');
};
//152. Maximum Product Subarray
var maxProduct = function(nums) {
  if (nums.length === 1) {
    return nums[0];
  }
  let numsByZero = [],
    zeroIndex = nums.findIndex(n => n === 0);
  while (zeroIndex !== -1) {
    let noZeroNums = nums.splice(0, zeroIndex);
    if (zeroIndex) numsByZero.push(noZeroNums);
    nums.shift();
    zeroIndex = nums.findIndex(n => n === 0);
  }
  let max = nums[0];
  if (numsByZero.length === 0) {
    numsByZero = [nums];
  } else {
    max = 0;
    if (nums.length) numsByZero.push(nums);
  }
  for (let i = 0, len = numsByZero.length; i < len; i++) {
    max = Math.max(max, noZeroMax(numsByZero[i]));
  }
  return max;
  function noZeroMax(nums) {
    if (nums.length === 1) {
      return nums[0];
    }
    let negativeIndex = [],
      count = 0;
    nums.forEach((n, index) => {
      if (n < 0) {
        negativeIndex.push(index);
        count++;
      }
    });
    if (negativeIndex.length % 2 === 0) {
      return nums.reduce((a, b) => a * b);
    } else {
      let leftNums = nums.slice(0, negativeIndex[count - 1]),
        rightNums = nums.slice(negativeIndex[0] + 1);
      if (leftNums.length === 0) {
        return rightNums.reduce((a, b) => a * b);
      }
      if (rightNums.length === 0) {
        return leftNums.reduce((a, b) => a * b);
      }
      leftNums.push(1);
      rightNums.push(1);
      return Math.max(
        leftNums.reduce((a, b) => a * b),
        rightNums.reduce((a, b) => a * b)
      );
    }
  }
};
//153. Find Minimum in Rotated Sorted Array
var findMin = function(nums) {
  let len = nums.length,
    mid = (len / 2) | 0,
    left = mid - 1,
    right = mid + 1;
  if (mid === 0) {
    return nums[0];
  }
  if (nums[len - 1] > nums[0]) {
    return nums[0];
  }
  if (left >= 0 && right < len) {
    if (nums[mid] < nums[left] && nums[mid] < nums[right]) {
      return nums[mid];
    }
  }
  if (right >= len && nums[mid] < nums[left]) {
    return nums[mid];
  }
  if (nums[mid] > nums[0]) {
    return findMin(nums.slice(mid + 1));
  }
  if (nums[mid] < nums[0]) {
    return findMin(nums.slice(0, mid));
  }
};
//154. Find Minimum in Rotated Sorted Array II
var findMin = function(nums) {
  var min = nums[0];
  if (nums.length == 1) return nums[0];
  for (var i = 0; i < nums.length - 1; i++) {
    if (nums[i] <= nums[i + 1]) continue;
    min = nums[i + 1];
    break;
  }

  return min;
};
//160. Intersection of Two Linked Lists
var getIntersectionNode = function(headA, headB) {
  let p1 = headA,
    p2 = headB;
  while (p1 !== p2) {
    p1 = p1 == null ? headB : p1.next;
    p2 = p2 == null ? headA : p2.next;
  }
  return p1;
};
//162. Find Peak Element
var findPeakElement = function(nums) {
  nums[-1] = Number.MIN_SAFE_INTEGER;
  for (var i = 0, len = nums.length; i < len; i++) {
    if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) {
      return i;
    }
  }
  return i - 1;
};
//165. Compare Version Numbers
var compareVersion = function(version1, version2) {
  let ver1 = version1.split('.'),
    ver2 = version2.split('.');
  while (ver1.length && ver2.length) {
    let num1 = +ver1.shift(),
      num2 = +ver2.shift();
    if (num1 > num2) {
      return 1;
    }
    if (num1 < num2) {
      return -1;
    }
  }
  while (ver1.length) {
    if (+ver1.shift() !== 0) {
      return 1;
    }
  }
  while (ver2.length) {
    if (+ver2.shift() !== 0) {
      return -1;
    }
  }
  return 0;
};
//167. Two Sum II - Input array is sorted
var twoSum = function(numbers, target) {
  let begin = 0,
    end = numbers.length - 1,
    val = numbers[0] + numbers[end];
  while (begin < end) {
    if (val === target) return [++begin, ++end];
    if (val > target) end--;
    if (val < target) begin++;
    val = numbers[begin] + numbers[end];
  }
  return [];
};
//168. Excel Sheet Column Title
var convertToTitle = function(n) {
  var sheet = '',
    temp = n;
  while (n > 26) {
    temp = n % 26;
    if (temp === 0) {
      sheet = 'Z' + sheet;
      n--;
    } else {
      sheet = String.fromCharCode(64 + temp) + sheet;
    }
    n = Math.floor(n / 26);
  }
  sheet = String.fromCharCode(64 + n) + sheet;
  return sheet;
};
//169. Majority Element
var majorityElement = function(nums) {
  let temp = [];
  for (let i = 0, len = nums.length; i < len; i++) {
    if (temp[nums[i]]) {
      temp[nums[i]]++;
    } else {
      temp[nums[i]] = 1;
    }
    if (temp[nums[i]] > Math.floor(len / 2)) {
      return nums[i];
    }
  }
};
//171. Excel Sheet Column Number
var titleToNumber = function(s) {
  var num = 0,
    t = s.length;
  for (let i = 0, len = s.length; i < len; i++) {
    t--;
    num += (s.charCodeAt(i) - 64) * Math.pow(26, t);
  }
  return num;
};
//172. Factorial Trailing Zeroes
var trailingZeroes = function(n) {
  if (n < 5) return 0;
  else return Math.floor(n / 5) + trailingZeroes(Math.floor(n / 5));
};
//173. Binary Search Tree Iterator
var BSTIterator = function(root) {
  if (root) {
    this.stack = [root];
    while (root && root.left) {
      root = root.left;
      this.stack.push(root);
    }
  } else {
    this.stack = [];
  }
};
BSTIterator.prototype.hasNext = function() {
  return this.stack.length > 0;
};
BSTIterator.prototype.next = function() {
  let curNode = this.stack.pop(),
    curVal = curNode.val;
  if (curNode.right) {
    this.stack.push(curNode.right);
    let node = curNode.right;
    while (node.left) {
      node = node.left;
      this.stack.push(node);
    }
  }
  return curVal;
};
//179. Largest Number
var largestNumber = function(nums) {
  nums.sort((m, n) => {
    return n + '' + m - (m + '' + n);
  });
  let result = nums.join('');
  if (result[0] === '0') {
    return '0';
  }
  return result;
};
//199. Binary Tree Right Side View
var rightSideView = function(root) {
  let nodes = [[root]],
    levelNodes = [root],
    nums = [];
  if (!root) {
    return nums;
  }
  while (levelNodes.length) {
    let nextNodes = [];
    levelNodes.forEach(n => {
      if (n.right) {
        nextNodes.push(n.right);
      }
      if (n.left) {
        nextNodes.push(n.left);
      }
    });
    levelNodes = nextNodes;
    nodes.push(nextNodes);
  }
  nodes.pop();
  nodes.forEach(n => {
    nums.push(n[0].val);
  });
  return nums;
};
//200. Number of Islands
var numIslands = function(grid) {
  if (grid.length === 0) {
    return 0;
  }

  let rowNum = grid.length,
    colNum = grid[0].length,
    count = 0;
  for (let i = 0; i < rowNum; i++)
    for (let j = 0; j < colNum; j++) {
      if (grid[i][j] === '1') {
        grid[i][j] = 2;
        if (
          (!grid[i - 1] || grid[i - 1][j] !== 2) &&
          (!grid[i + 1] || grid[i + 1][j] !== 2) &&
          grid[i][j - 1] !== 2 &&
          grid[i][j + 1] !== 2
        ) {
          count++;
          remarkIsland(i, j);
        }
      }
    }
  return count;

  function remarkIsland(i, j) {
    grid[i][j] = 2;
    if (grid[i - 1] && grid[i - 1][j] === '1') {
      remarkIsland(i - 1, j);
    }
    if (grid[i + 1] && grid[i + 1][j] === '1') {
      remarkIsland(i + 1, j);
    }
    if (grid[i][j + 1] === '1') {
      remarkIsland(i, j + 1);
    }
    if (grid[i][j - 1] === '1') {
      remarkIsland(i, j - 1);
    }
  }
};
