function ListNode(val) {
  this.val = val;
  this.next = null;
}
//53. Maximum Subarray
var maxSubArray = function(nums) {
  var max = nums[0],
    sum = [];
  sum[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    sum[i] = Math.max(nums[i], sum[i - 1] + nums[i]);
    max = Math.max(max, sum[i]);
  }
  return max;
};
//54. Spiral Matrix
var spiralOrder = function(matrix) {
  var spiralOrder = function(matrix) {
    if (matrix.length === 0) {
      return [];
    }
    let temp = matrix[0],
      rowNum = matrix.length - 1,
      colNum = temp.length - 1,
      right = [],
      left = [],
      nextMatrix = [];

    if (rowNum === 0) {
      return matrix[0];
    }
    if (colNum === 0) {
      let nums = [];
      for (let i = 0; i <= rowNum; i++) {
        nums.push(matrix[i][0]);
      }
      return nums;
    }
    for (let i = 1; i < rowNum; i++) {
      right.push(matrix[i][colNum]);
      left.unshift(matrix[i][0]);
      if (colNum > 1) nextMatrix.push(matrix[i].slice(1, colNum));
    }
    return [
      ...matrix[0],
      ...right,
      ...Array.from(matrix[rowNum]).reverse(),
      ...left,
      ...spiralOrder(nextMatrix)
    ];
  };
};
//55. Jump Game
var canJump = function(nums) {
  if (nums.length === 0) {
    return false;
  }
  if (nums.length === 1) {
    return true;
  }
  if (nums[0] === 0) {
    return false;
  }
  if (nums[0] > nums.length - 1) {
    return true;
  }
  while (nums[1] > nums[0] - 1) {
    nums.shift();
  }
  let maxLen = 0,
    i = 0,
    area = nums[0],
    flag = 0;
  while (i <= area) {
    if (i + nums[i] >= maxLen) {
      flag = i;
      maxLen = i + nums[i];
    }
    i++;
  }
  if (maxLen >= nums.length) {
    return true;
  }
  return canJump(nums.slice(flag));
};
//58. Length of Last Word
var lengthOfLastWord = function(s) {
  if (!s) {
    return 0;
  }
  var temp = s.split(/ +/),
    len = temp.length;
  return temp[len - 1].length || temp[len - 2].length;
};
//59.Spiral Matrix II
var generateMatrix = function(n) {
  let numbers = [],
    maxValue = Math.pow(n, 2),
    flag = 1,
    rowNum = 0,
    colNum = 0,
    type = 0,
    start = 0,
    end = n - 1;
  while (flag <= maxValue) {
    if (!numbers[rowNum]) {
      numbers[rowNum] = [];
    }
    numbers[rowNum][colNum] = flag;
    flag++;
    switch (type) {
      case 0:
        colNum++;
        if (colNum === end) {
          type = 1;
        }
        break;
      case 1:
        rowNum++;
        if (rowNum === end) {
          type = 2;
        }
        break;
      case 2:
        colNum--;
        if (colNum === start) {
          type = 3;
        }
        break;
      case 3:
        rowNum--;
        if (numbers[rowNum][colNum]) {
          rowNum++;
          colNum++;
          end--;
          start++;
          type = 0;
        }
        break;
    }
  }
  return numbers;
};
//60. Permutation Sequence
var getPermutation = function(n, k) {
  let max = factorial(n - 1),
    nums = [],
    string = '',
    count = ((k - 1) / max) | 0,
    next = k - max * count;
  let i = 1;
  while (i <= n) {
    nums.push(i);
    i++;
  }
  while (n) {
    string = string + nums.splice(count, 1);
    n--;
    max = factorial(n - 1);
    count = ((next - 1) / max) | 0;
    next = next - max * count;
    if (next === 0) {
      return string + nums.join('');
    }
  }
  return string;

  function factorial(n) {
    return n > 1 ? n * factorial(n - 1) : 1;
  }
};
//61. Rotate List
var rotateRight = function(head, k) {
  let point = head,
    nodes = [];
  while (point) {
    nodes.push(point);
    point = point.next;
  }
  let len = nodes.length;
  if (k % len) {
    let pos = len - (k % len);
    nodes[len - 1].next = nodes[0];
    nodes[pos - 1].next = null;
    return nodes[pos];
  }
  return head;
};
//62. Unique Paths
var uniquePaths = function(m, n, cache) {
  cache = cache || {};
  if (cache[m + ',' + n] || cache[n + ',' + m]) {
    return cache[m + ',' + n] || cache[n + ',' + m];
  }
  if (m === 1 || n === 1) {
    return 1;
  }
  cache[m + ',' + n] =
    uniquePaths(m - 1, n, cache) + uniquePaths(m, n - 1, cache);
  return cache[m + ',' + n];
};
//63. Unique Paths II
var uniquePathsWithObstacles = function(
  obstacleGrid,
  x = 0,
  y = 0,
  cache = new Map(),
  rowNum = obstacleGrid.length - 1,
  colNum = obstacleGrid[0].length - 1
) {
  if (obstacleGrid[x][y] === 1) {
    cache.set(x + ',' + y, 0);
    return 0;
  }
  if (x === rowNum && y === colNum) {
    cache.set(x + ',' + y, 1);
    return 1;
  }
  if (Number.isFinite(cache.get(x + ',' + y))) {
    return cache.get(x + ',' + y);
  }
  if (x === rowNum) {
    if (!Number.isFinite(cache.get(x + ',' + (y + 1)))) {
      cache.set(
        x + ',' + (y + 1),
        uniquePathsWithObstacles(obstacleGrid, x, y + 1, cache, rowNum, colNum)
      );
    }
    return cache.get(x + ',' + (y + 1));
  }
  if (y === colNum) {
    if (!Number.isFinite(cache.get(x + 1 + ',' + y))) {
      cache.set(
        x + 1 + ',' + y,
        uniquePathsWithObstacles(obstacleGrid, x + 1, y, cache, rowNum, colNum)
      );
    }
    return cache.get(x + 1 + ',' + y);
  }
  if (!Number.isFinite(cache.get(x + ',' + (y + 1)))) {
    cache.set(
      x + ',' + (y + 1),
      uniquePathsWithObstacles(obstacleGrid, x, y + 1, cache, rowNum, colNum)
    );
  }
  if (!Number.isFinite(cache.get(x + 1 + ',' + y))) {
    cache.set(
      x + 1 + ',' + y,
      uniquePathsWithObstacles(obstacleGrid, x + 1, y, cache, rowNum, colNum)
    );
  }

  return cache.get(x + 1 + ',' + y) + cache.get(x + ',' + (y + 1));
};
//64. Minimum Path Sum
var minPathSum = function(
  grid,
  x = 0,
  y = 0,
  cache = new Map(),
  rowNum = grid.length - 1,
  colNum = grid[0].length - 1
) {
  if (x === rowNum && y === colNum) {
    return grid[x][y];
  }
  if (cache.get(x + ',' + y)) {
    return cache.get(x + ',' + y);
  }
  if (x === rowNum) {
    if (!cache.get(x + ',' + (y + 1))) {
      cache.set(x + ',' + (y + 1), minPathSum(grid, x, y + 1, cache));
    }
    cache.set(x + ',' + y, grid[x][y] + cache.get(x + ',' + (y + 1)));
  } else if (y === colNum) {
    if (!cache.get(x + 1 + ',' + y)) {
      cache.set(x + 1 + ',' + y, minPathSum(grid, x + 1, y, cache));
    }
    cache.set(x + ',' + y, grid[x][y] + cache.get(x + 1 + ',' + y));
  } else {
    if (!cache.get(x + ',' + (y + 1))) {
      cache.set(x + ',' + (y + 1), minPathSum(grid, x, y + 1, cache));
    }
    if (!cache.get(x + 1 + ',' + y)) {
      cache.set(x + 1 + ',' + y, minPathSum(grid, x + 1, y, cache));
    }
    cache.set(
      x + ',' + y,
      grid[x][y] +
        Math.min(cache.get(x + ',' + (y + 1)), cache.get(x + 1 + ',' + y))
    );
  }
  return cache.get(x + ',' + y);
};
//66. Plus One
var plusOne = function(digits) {
  var initNum = digits.join('') - 0;
  if (initNum < 9007199254740991) {
    return (initNum + 1 + '').split('').map(n => n - 0);
  } else {
    for (let len = digits.length - 1; len >= 0; len--) {
      if (digits[len] + 1 < 10) {
        digits[len] = digits[len] + 1;
        return digits;
      } else {
        digits[len] = 0;
      }
    }
    if (digits[0] === 0) {
      digits.unshift(1);
      return digits;
    }
  }
};
//67. Add Binary
var addBinary = function(a, b) {
  var temp = [],
    flag = 0;
  for (
    let bLen = b.length - 1, aLen = a.length - 1;
    bLen >= 0 || aLen >= 0;
    bLen--, aLen--
  ) {
    if (bLen < 0) {
      temp.unshift(a[aLen]);
    } else if (aLen < 0) {
      temp.unshift(b[bLen]);
    } else {
      temp.unshift(b[bLen] - 0 + (a[aLen] - 0));
    }
  }

  for (let len = temp.length - 1; len >= 0; len--) {
    if (temp[len] - 0 + flag === 2) {
      temp[len] = 0;
      flag = 1;
    } else if (temp[len] - 0 + flag === 3) {
      temp[len] = 1;
      flag = 1;
    } else {
      temp[len] = temp[len] - 0 + flag;
      flag = 0;
    }
  }
  if (flag === 1) {
    temp.unshift(1);
  }
  return temp.join('');
};
//69. Sqrt(x)
var mySqrt = function(x) {
  let n = (x / 2) | 0,
    left = 0,
    right = x;

  while (true) {
    if (n * n === x) {
      return n;
    }

    if (n * n > x) {
      if ((n - 1) * (n - 1) <= x) {
        return n - 1;
      } else {
        right = n - 1;
      }
    } else {
      if ((n + 1) * (n + 1) > x) {
        return n;
      } else {
        left = n + 1;
      }
    }
    n = ((left + right) / 2) | 0;
  }
};
//70. Climbing Stairs
var climbStairs = function(n) {
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }
  var temp = [1, 2];
  for (let i = 0; i < n - 2; i++) {
    temp.push(temp[i] + temp[i + 1]);
  }
  return temp.pop();
};
//71. Simplify Path
var simplifyPath = function(path) {
  let paths = path
      .substring(1)
      .replace(/\/+/g, '/')
      .replace(/\/\.\//g, '/')
      .split('/'),
    nowPath = [];
  for (let i = 0, len = paths.length; i < len; i++) {
    if (paths[i] === '..') {
      nowPath.pop();
    } else if (paths[i] && paths[i] !== '.') {
      nowPath.push(paths[i]);
    }
  }
  return '/' + nowPath.join('/');
};

//73. Set Matrix Zeroes
var setZeroes = function(matrix) {
  let rowNums = new Set(),
    colNums = new Set();
  for (let i = 0, len1 = matrix.length; i < len1; i++)
    for (let j = 0, len2 = matrix[0].length; j < len2; j++) {
      if (matrix[i][j] === 0) {
        rowNums.add(i);
        colNums.add(j);
      }
    }
  for (let y of rowNums) {
    for (let j = 0, len2 = matrix[0].length; j < len2; j++) {
      matrix[y][j] = 0;
    }
  }
  for (let x of colNums) {
    for (let i = 0, len1 = matrix.length; i < len1; i++) {
      matrix[i][x] = 0;
    }
  }
};
//74. Search a 2D Matrix
var searchMatrix = function(matrix, target) {
  if (matrix.length === 0) {
    return false;
  }
  let startRow = 0,
    endRow = matrix.length - 1,
    midRow = (endRow / 2) | 0,
    colLength = matrix[0].length - 1;
  while (midRow !== startRow) {
    let temp = matrix[midRow][colLength];
    if (temp === target) {
      return true;
    }
    if (temp > target) {
      endRow = midRow;
      midRow = ((midRow + startRow) / 2) | 0;
    } else {
      startRow = midRow;
      midRow = ((midRow + endRow) / 2) | 0;
    }
  }
  if (matrix[0][colLength] >= target) {
    endRow = 0;
  }
  let searchNums = matrix[endRow],
    left = 0,
    right = colLength,
    mid = ((left + right) / 2) | 0;
  while (left <= right) {
    let temp = searchNums[mid];
    if (temp === target) {
      return true;
    }
    if (temp > target) {
      right = mid - 1;
      mid = ((left + right) / 2) | 0;
    } else {
      left = mid + 1;
      mid = ((left + right) / 2) | 0;
    }
  }
  return false;
};
//75. Sort Colors
var sortColors = function(nums) {
  for (let i = 0, len = nums.length; i < len; ) {
    if (nums[i] === 0) {
      nums.splice(i, 1);
      nums.unshift(0);
      i++;
    }
    if (nums[i] === 1) {
      i++;
    }
    while (nums[i] === 2 && i < len) {
      nums.splice(i, 1);
      nums.push(2);
      len--;
    }
  }
  console.log(nums);
};
//77. Combinations
var combine = function(n, k, start = 1, cache = new Map()) {
  if (cache.has(k + ',' + start)) {
    return cache.get(k + ',' + start);
  }
  if (n - start + 1 === k) {
    let temp = [],
      f = start;
    while (start <= n) {
      temp.push(start++);
    }
    cache.set(k + ',' + f, [temp]);
    return [temp];
  }
  if (k === 1) {
    let temp = [],
      f = start;
    while (start <= n) {
      temp.push([start++]);
    }
    cache.set(k + ',' + f, temp);
    return temp;
  }
  if (!cache.has(k - 1 + ',' + (start + 1))) {
    cache.set(k - 1 + ',' + (start + 1), combine(n, k - 1, start + 1, cache));
  }
  if (!cache.has(k + ',' + (start + 1))) {
    cache.set(k + ',' + (start + 1), combine(n, k, start + 1, cache));
  }

  cache.set(
    k + ',' + start,
    cache
      .get(k - 1 + ',' + (start + 1))
      .map(n => {
        return [start, ...n];
      })
      .concat(cache.get(k + ',' + (start + 1)))
  );

  return cache.get(k + ',' + start);
};
//80.Remove Duplicates from Sorted Array II
var removeDuplicates = function(nums) {
  if (nums.length === 1) {
    return 1;
  }
  for (let i = 0, len = nums.length; i < len; ) {
    if (nums[i - 1] === nums[i + 1]) {
      nums.splice(i, 1);
      len--;
    } else {
      i++;
    }
  }
  return nums.length;
};
//81. Search in Rotated Sorted Array II
var search = function(nums, target) {
  for (let i = 0, len = nums.length; i < len; i++) {
    if (nums[i] === target) {
      return true;
    }
  }
  return false;
};
//82. Remove Duplicates from Sorted List II
var deleteDuplicates = function(head) {
  let myHeader = new ListNode(9999999),
    point = myHeader;
  myHeader.next = head;
  while (point) {
    if (!point.next) {
      return myHeader.next;
    }
    let begin = point,
      flag = false;
    while (
      point &&
      point.next &&
      point.next.next &&
      point.next.val === point.next.next.val
    ) {
      flag = true;
      point = point.next;
    }
    if (flag) {
      begin.next = point.next.next;
      point = begin;
      flag = false;
    } else {
      point = point.next;
    }
  }
  return myHeader.next;
};
//83. Remove Duplicates from Sorted List
var deleteDuplicates = function(head) {
  if (!head) {
    return head;
  }
  var returnNode = new ListNode(head.val);
  var getLastNode = function() {
    var tempNode = returnNode;
    while (tempNode.next) {
      tempNode = tempNode.next;
    }
    return tempNode;
  };
  while (head) {
    if (getLastNode().val !== head.val) {
      getLastNode().next = new ListNode(head.val);
    }
    head = head.next;
  }
  return returnNode;
};

//86. Partition List
var partition = function(head, x) {
  if (!head) {
    return null;
  }
  let myHeader = new ListNode(-9999);
  myHeader.next = head;
  let leftPoint = new ListNode(-9999),
    left = leftPoint,
    point = myHeader;
  while (head && head.val < x) {
    head = head.next;
  }
  if (!head) {
    return myHeader.next;
  }

  while (point) {
    if (point.next && point.next.val < x) {
      leftPoint.next = point.next;
      leftPoint = leftPoint.next;
      point.next = point.next.next;
      leftPoint.next = null;
    } else {
      point = point.next;
    }
  }
  leftPoint.next = head;
  return left.next;
};
//88. Merge Sorted Array
var merge = function(nums1, m, nums2, n) {
  nums1.splice(m);
  nums2.splice(n);
  for (var i = 0, j = 0; nums1[i] || nums1[i] === 0; ) {
    if (nums1[i] > nums2[j]) {
      nums1.splice(i, 0, nums2[j]);
      j++;
    }
    i++;
  }
  if (j < nums2.length) {
    while (nums2[j] || nums2[j] === 0) {
      nums1.push(nums2[j]);
      j++;
    }
  }
};
//89. Gray Code
var grayCode = function(n) {
  if (n === 0) {
    return [0];
  }
  if (n === 1) {
    return [0, 1];
  }
  let len = Math.pow(2, n),
    number = ['0', '1'],
    flag = 1;
  while (flag++ < n) {
    number = number
      .map(n => '0' + n)
      .concat(
        number
          .slice()
          .reverse()
          .map(n => {
            return '1' + n;
          })
      );
  }
  return number.map(n => parseInt(n, 2));
};
//90. Subsets II
var subsetsWithDup = function(nums) {
  let arrayLen = nums.length,
    numbers = [''];
  nums.sort();
  for (let j = 0; j < arrayLen; j++) {
    numbers = numbers.concat(numbers.map(n => n + ',' + nums[j]));
  }
  let set = new Set(numbers);

  numbers = Array.from(set).map(n => (n ? n.substring(1).split(',') : []));
  return numbers;
};
//91. Decode Ways
var numDecodings = function(s) {
  if (s[0] === '0') {
    return 0;
  }
  let pre1 = 0,
    pre2 = 1;
  for (var i = 1, len = s.length; i <= len; i++) {
    if (s[i - 1] === '0') {
      pre2 = 0;
    }
    if (s[i - 2] === '1' || (s[i - 2] === '2' && s[i - 1] <= '6')) {
      [pre2, pre1] = [pre1 + pre2, pre2];
    } else {
      pre1 = pre2;
    }
  }
  return pre2;
};
//92. Reverse Linked List II
var reverseBetween = function(head, m, n) {
  let nodes = [];
  while (head) {
    nodes.push(head);
    head = head.next;
  }
  let reverseNodes = nodes.splice(m - 1, n - m + 1).reverse();
  nodes.splice(m - 1, 0, ...reverseNodes);
  let len = nodes.length;
  for (let i = 0; i < len - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }
  nodes[len - 1].next = null;
  return nodes[0];
};
//93. Restore IP Addresses
var restoreIpAddresses = function(s) {
  if (s[0] === '0') {
    return generateIP(3, s.substring(1), ['0']);
  }
  if (+s.slice(0, 3) > 255) {
    return [
      ...generateIP(3, s.substring(1), [s.slice(0, 1)]),
      ...generateIP(3, s.substring(2), [s.slice(0, 2)])
    ];
  } else {
    return [
      ...generateIP(3, s.substring(1), [s.slice(0, 1)]),
      ...generateIP(3, s.substring(2), [s.slice(0, 2)]),
      ...generateIP(3, s.substring(3), [s.slice(0, 3)])
    ];
  }

  function generateIP(count, left, strs) {
    if (left.length > 3 * count || left.length < count) {
      return [];
    }
    if (count === 1) {
      if (
        left.length > 3 ||
        left.length === 0 ||
        +left > 255 ||
        (left.length > 1 && left[0] === '0')
      ) {
        return [];
      }
      strs.push(left);
      return [strs.join('.')];
    }
    if (left[0] === '0') {
      return generateIP(count - 1, left.substring(1), [...strs, '0']);
    }
    if (+left.slice(0, 3) > 255) {
      return [
        ...generateIP(count - 1, left.substring(1), [
          ...strs,
          left.slice(0, 1)
        ]),
        ...generateIP(count - 1, left.substring(2), [...strs, left.slice(0, 2)])
      ];
    } else {
      return [
        ...generateIP(count - 1, left.substring(1), [
          ...strs,
          left.slice(0, 1)
        ]),
        ...generateIP(count - 1, left.substring(2), [
          ...strs,
          left.slice(0, 2)
        ]),
        ...generateIP(count - 1, left.substring(3), [...strs, left.slice(0, 3)])
      ];
    }
  }
};
//94. Binary Tree Inorder Traversal
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
var a = new TreeNode(1),
  b = new TreeNode(2),
  c = new TreeNode(3);
a.right = b;
c.left = a;
var inorderTraversal = function(root) {
  let numbers = [];
  while (root) {
    if (!root.left) {
      numbers.push(root.val);
      if (root.right) {
        root.right.parent = root.parent;
        root = root.right;
      } else {
        root = root.parent;
        if (root) {
          root.left = null;
        }
      }
      continue;
    }
    root.left.parent = root;
    root = root.left;
  }

  return numbers;
};
//95. Unique Binary Search Trees II
var generateTrees = function(n) {
  if (n === 0) {
    return [];
  }
  return mygenerateTrees(1, n);
  for (let i = 1; i <= n; i++) {
    treeNodes.push(...generateTree(i, n));
  }
  return treeNodes;
  function mygenerateTrees(start, end) {
    if (start > end) {
      return null;
    }
    if (start === end) {
      return [new TreeNode(start)];
    }
    let nodes = [];
    for (let pos = start; pos <= end; pos++) {
      let leftNodes = mygenerateTrees(start, pos - 1);
      let rightNodes = mygenerateTrees(pos + 1, end);
      if (!leftNodes) {
        rightNodes.forEach(n => {
          let tempNode = new TreeNode(pos);
          tempNode.right = n;
          nodes.push(tempNode);
        });
      }
      if (!rightNodes) {
        leftNodes.forEach(n => {
          let tempNode = new TreeNode(pos);
          tempNode.left = n;
          nodes.push(tempNode);
        });
      }
      if (rightNodes && leftNodes) {
        for (let i = 0, len = leftNodes.length; i < len; i++) {
          for (let j = 0, len1 = rightNodes.length; j < len1; j++) {
            let tempNode = new TreeNode(pos);
            tempNode.left = leftNodes[i];
            tempNode.right = rightNodes[j];
            nodes.push(tempNode);
          }
        }
      }
    }

    return nodes;
  }
};
//96. Unique Binary Search Trees
var numTrees = function(n) {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  let nums = [1, 1];
  for (let i = 2; i <= n; i++) {
    let left = i - 1,
      right = 0,
      count = 0;
    while (left >= 0) {
      count += nums[left] * nums[right];
      left--;
      right++;
    }
    nums[i] = count;
  }
  return nums[n];
};
//98. Validate Binary Search Tree
var isValidBST = function(root) {
  let numbers = [];
  while (root) {
    if (!root.left) {
      if (root.val <= numbers[numbers.length - 1]) {
        return false;
      }
      numbers.push(root.val);
      if (root.right) {
        root.right.parent = root.parent;
        root = root.right;
      } else {
        root = root.parent;
        if (root) {
          root.left = null;
        }
      }
      continue;
    }
    root.left.parent = root;
    root = root.left;
  }
  return true;
};
//100. Same Tree
var isSameTree = function(p, q) {
  if (p === null && q === null) {
    return true;
  }
  if (!(p && q) || p.val !== q.val) {
    return false;
  }
  var leftFlag = true,
    rightFlag = true;
  if (p.left || q.left) leftFlag = isSameTree(p.left, q.left);
  if (p.right || q.right) rightFlag = isSameTree(p.right, q.right);
  return leftFlag && rightFlag;
};
