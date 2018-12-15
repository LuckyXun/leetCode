/**
 * Created by lx on 2018/1/3.
 * 做的一写letcode的练习
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}


//不使用字符串反转的条件下,判断回文数
let isPalindrome = function(x) {
  if (x < 0) {
    return false;
  }
  if (x < 10) {
    return true;
  }
  let temp = x % 10,
    restNum = (x - temp) / 10,
    flag = 1;
  if (temp === 0) {
    //尾数是0的不可能是回文数
    return false;
  }
  while (temp <= restNum) {
    if (temp === restNum || temp * 10 + (restNum % 10) === restNum) {
      return true;
    }
    temp = temp * 10 + (restNum % 10);
    flag++;
    restNum = Math.floor(restNum / 10);
  }
  return false;
};
//罗马数字转数字
let romanToInt = function(s) {
  let tempArray = [];
  for (let code of s) {
    switch (code) {
      case 'I':
        tempArray.push(1);
        break;
      case 'V':
        tempArray.push(5);
        break;
      case 'X':
        tempArray.push(10);
        break;
      case 'L':
        tempArray.push(50);
        break;
      case 'C':
        tempArray.push(100);
        break;
      case 'D':
        tempArray.push(500);
        break;
      case 'M':
        tempArray.push(1000);
        break;
    }
  }
  tempArray = tempArray.reverse();
  tempArray.forEach(function(n, index) {
    if (tempArray[index + 1]) {
      if (tempArray[index + 1] < n) {
        tempArray[index + 1] = -tempArray[index + 1];
      }
    }
  });
  return Math.abs(tempArray.reduce((a, b) => a + b));
};
//最长公共前缀
let longestCommonPrefix = function(strs) {
  if (strs.length === 0) {
    return '';
  }
  if (strs.length === 1) {
    return strs[0];
  }
  for (let j = 1; j < strs[0].length; j++) {
    let temp = strs[0].substring(0, j);
    for (let i = 1; i < strs.length; i++) {
      if (!strs[i][j - 1] || strs[i][j - 1] !== temp[j - 1]) {
        return temp.substring(0, j - 1);
      }
    }
  }
  return temp;
};
//判断字符串中括号是否匹配
let isValid = function(s) {
  let brackets = [];
  for (let temp of s) {
    if (temp === '(' || temp === '{' || temp === '[') {
      brackets.push(temp);
    }
    if (temp === ')') {
      if (brackets.pop() !== '(') {
        return false;
      }
    }
    if (temp === '}') {
      if (brackets.pop() !== '{') {
        return false;
      }
    }
    if (temp === ']') {
      if (brackets.pop() !== '[') {
        return false;
      }
    }
  }
  return brackets.length === 0;
};
//按顺序合并链表
//面向对象语言中,一个节点可以看做一个对象，但是js不能这样操作

let mergeTwoLists = function(l1, l2) {
  let returnList = new ListNode(0);
  let getLastNode = function(l) {
    while (l.next) {
      l = l.next;
    }
    return l;
  };
  while (l2 && l1.next) {
    if (l2 >= l1) {
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
//移除有序数组中相同的元素，返回新数组的长度，并改变原数组
let removeDuplicates = function(nums) {
  let i = 0;
  nums.forEach(function(elem) {
    if (elem !== nums[i]) {
      nums[++i] = elem;
    }
  });
  return nums.length && i + 1;
  /*let temp = nums[0],flag=1;
     while(nums[flag]||nums[flag]===0){
     if(nums[flag]===temp){
     nums.splice(flag,1)//多次使用splic，使运行速度更慢;
     nums[flag]=""
     }else {
     temp=nums[flag];
     flag++
     }

     }*/
  /*nums.map(function(n,index,nums){
     if(index>0){
     if(n===temp){
     flag++
     delete nums[index];
     }else {
     temp=n;
     }
     }
     });
     nums.sort((x,y)=>x-y);
     nums.splice(nums.length-flag)
     return nums.length*/
};
//删除数组中的指定元素
let removeElement = function(nums, val) {
  let flag = 0;
  nums.forEach(function(n, index, nums) {
    if (val !== n) {
      nums[flag++] = n; //flag肯定是大于等于index的，所以forEach循环中的元素不受影响
    }
  });
  nums.splice(flag);
  return nums.length;
};
//实际上完成indexOf()的功能
let strStr = function(haystack, needle) {
  /* return haystack.indexOf(needle)*/
  let len = needle.length;
  for (let i = 0; i < haystack.length + 1 - len; i++) {
    if (haystack.substr(i, len) === needle) {
      return i;
    }
  }
  return -1;
};
//查询目标的数字的位置，如果不存在，则返回应该存在的位置
let searchInsert = function(nums, target) {
  let returnInd = nums.indexOf(target);
  if (returnInd >= 0) {
    return returnInd;
  }
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] < target) {
      return j;
    }
  }
  return nums.length;
};
//数字的计数读法
let countAndSay = function(n) {
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
//数组最大的求和区间的和,动态规划
let maxSubArray = function(nums) {
  /* if(nums.every(n=>n<0)){
     return nums.sort()[0]
     }
     let sum=0,len=nums.length;
     nums.forEach(function(n,index){
     if(n>=0){
     let posSum = 0,posTemp=0   ;
     for(let i=index;i<len;i++){
     posTemp = posTemp + nums[i];
     if(posTemp>posSum){
     posSum = posTemp
     }
     }
     if(posSum>sum){
     sum = posSum
     }

     }
     });
     return sum*/
  let max = nums[0],
    sum = [];
  sum[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    sum[i] = Math.max(nums[i], sum[i - 1] + nums[i]); //sum[i]存的是在该索引时候，只计算前方数的最大值
    max = Math.max(max, sum[i]); //max始终是前面一组的最大值
  }
  return max;
};
//最后一个字符串的长度
let lengthOfLastWord = function(s) {
  if (!s) {
    return 0;
  }
  let temp = s.split(/ +/),
    len = temp.length;
  return temp[len - 1].length || temp[len - 2].length;
};
//给一个非负数组存储一个非负整数，对整数加1后输出一个非负数组(注意：超大整数越界)
let plusOne = function(digits) {
  let initNum = digits.join('') - 0;
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
//二进制加法,（注意直接数字的话，可能越界）
let addBinary = function(a, b) {
  let temp = [],
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
//开平方后的整数部分
let mySqrt = function(x) {
  /*   if(x==0){
     return 0
     }
     let radix=1;
     while(radix*radix<=x){
     radix++
     }
     return radix-1*/
  return Math.floor(Math.sqrt(x));
};
//传入的一个正整数，可以按照1,2规划为多少种
let climbStairs = function(n) {
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }
  let temp = [1, 2];
  for (let i = 0; i < n - 2; i++) {
    temp.push(temp[i] + temp[i + 1]);
  }
  return temp.pop();
};
//删除链表中的相同元素
let deleteDuplicates = function(head) {
  if (head === []) {
    return [];
  }
  let returnNode = new ListNode(head.val);
  let getLastNode = function() {
    let tempNode = returnNode;
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
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 * 有序数组合并
 */
let merge = function(nums1, m, nums2, n) {
  nums1.splice(m);
  nums2.splice(n);
  for (let i = 0, j = 0; nums1[i] || nums1[i] === 0; ) {
    if (nums1[i] > nums2[j]) {
      nums1.splice(i, 0, nums2[j]);
      j++;
    }
    i++;
  }
  if (j < nums2.length) {
    while (nums2[j]) {
      nums1.push(nums2[j]);
      j++;
    }
  }
};
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
//判断相同的树
let isSameTree = function(p, q) {
  if (p === null && q === null) {
    return true;
  }
  if (!(p && q) || p.val !== q.val) {
    return false;
  }
  let leftFlag = true,
    rightFlag = true;
  if (p.left || q.left) leftFlag = isSameTree(p.left, q.left);
  if (p.right || q.right) rightFlag = isSameTree(p.right, q.right);
  return leftFlag && rightFlag;
};
//判断树是否是对称二叉树
let isSymmetric = function(root) {
  if (!(root.left || root.right)) {
    return true;
  }
  if (!root.left || !root.right) {
    return false;
  }
  let flag = true;

  function isSymmetricNode(p, q) {
    if (!(p || q)) {
      return true;
    }
    if (!(p && q)) {
      return false;
    }
    if (p.val !== q.val) {
      return false;
    }
    flag = isSymmetricNode(p.left, q.right) && isSymmetricNode(p.right, q.left);
  }

  return isSymmetricNode(root.right, root.left);
};
//返回树的深度
let maxDepth = function(root) {
  if (!root) {
    return 0;
  }
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
//返回tree每级的值
let levelOrderBottom = function(root) {
  let returnArr = [];
  let getLevelValue = function(node, i, returnArr) {
    if (node) {
      if (returnArr[i]) {
        returnArr[i].push(node.val);
      } else {
        returnArr[i] = [node.val];
      }
      i++;
      if (node.left) {
        getLevelValue(node.left, i, returnArr);
      }
      if (node.right) {
        getLevelValue(node.right, i, returnArr);
      }
    }
  };
  getLevelValue(root, 0, returnArr);
  return returnArr.reverse();
};
//有序数组生成二叉搜索树(二叉排序树)（Binary Sort Tree）
let sortedArrayToBST = function(nums) {
  let numMidIdx = Math.floor(nums.length / 2),
    root = new TreeNode(nums[numMidIdx]),
    leftNumbers = nums.slice(0, numMidIdx),
    rightNumbers = nums.slice(numMidIdx + 1, nums.length);
  let spliceTree = function(node, lNum, rNum) {
    let temp;
    if (rNum.length > 0) {
      let numMidIdx = Math.floor(rNum.length / 2),
        leftNumbers = rNum.slice(0, numMidIdx),
        rightNumbers = rNum.slice(numMidIdx + 1, rNum.length);
      node.right = new TreeNode(rNum[numMidIdx]);
      temp = node.right;
      spliceTree(temp, leftNumbers, rightNumbers);
    }
    if (lNum.length > 0) {
      let numMidIdx = Math.floor(lNum.length / 2),
        leftNumbers = lNum.slice(0, numMidIdx),
        rightNumbers = lNum.slice(numMidIdx + 1, lNum.length);
      node.left = new TreeNode(lNum[numMidIdx]);
      temp = node.left;
      spliceTree(temp, leftNumbers, rightNumbers);
    }
  };
  spliceTree(root, leftNumbers, rightNumbers);
  return root;
};
//判断Tree是否是平衡二叉树（Self-balancing binary search tree）（AVL树）
let isBalanced = function(root) {
  if (!root) {
    return true;
  }
  let leftLevel = maxDepth(root.left),
    rightLevel = maxDepth(root.right);
  if (leftLevel - rightLevel > 1 || leftLevel - rightLevel < -1) {
    return false;
  }
  return isBalanced(root.left) && isBalanced(root.right);
};
let isBalanced2 = function(root) {
  return depth(root) >= 0;
};
function depth(root) {
  if (!root) return 0;
  let l = depth(root.left),
    r = depth(root.right);
  if (l < 0 || r < 0) {
    //如果l<0或者r<0,即左右子节点，不是平衡二叉树，则证明root不是平衡二叉树
    return -1;
  }
  if (Math.abs(l - r) > 1)
    //左右子树的层级差大于1，不是平衡二叉树
    return -1;
  return Math.max(l, r) + 1; //如果是平衡二叉树，则返回书的深度
}
//tree的最短路径
let minDepth = function(root) {
  if (!root) {
    return 0;
  }
  if (root.left && root.right) {
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
  } else if (root.left && !root.right) {
    return minDepth(root.left) + 1;
  } else if (!root.left && root.right) {
    return minDepth(root.right) + 1;
  }
  return 1;
};
//tree的路径和
let hasPathSum = function(root, sum) {
  if (!root) {
    return false;
  }
  function treeSum(root) {
    if (root.left && root.right) {
      return treeSum(root.left)
        .map(n => n + root.val)
        .concat(treeSum(root.right).map(n => n + root.val));
    }
    if (root.left) {
      return treeSum(root.left).map(n => n + root.val);
    }
    if (root.right) {
      return treeSum(root.right).map(n => n + root.val);
    }
    return [root.val];
  }

  return treeSum(root).includes(sum);
};
// Pascal's Triangle 生成杨辉三角
let generate = function(numRows) {
  if (numRows === 1) {
    return [1];
  }
  let triangle = [[1]];
  for (let i = 1; i < numRows; i++) {
    let temp = [1],
      lastVal = triangle[i - 1];
    for (let j = 0, len = lastVal.length; j < len - 1; j++) {
      temp.push(lastVal[j] + lastVal[j + 1]);
    }
    temp.push(1);
    triangle.push(temp);
  }
  return triangle;
};
//返回杨辉三角的指定行
let getRow = function(rowIndex) {
  if (rowIndex === 0) {
    return [1];
  }
  let triangle = [[1]];
  for (let i = 1; i <= rowIndex; i++) {
    let temp = [1],
      lastVal = triangle[i - 1];
    for (let j = 0, len = lastVal.length; j < len - 1; j++) {
      temp.push(lastVal[j] + lastVal[j + 1]);
    }
    temp.push(1);
    triangle.push(temp);
  }
  return triangle[rowIndex];
};
//递归实现
let getRow2 = function(rowIndex) {
  if (rowIndex === 0) {
    return [1];
  }
  return [1].concat(
    getRow(rowIndex - 1).map(function(n, index, arr) {
      if (index < arr.length - 1) return n + arr[index + 1];
      return 1;
    })
  );
};
//一次交易的最大买进卖出收益
let maxProfit = function(prices) {
  let max = 0,
    begin = prices[0];
  for (let j = 1, len = prices.length; j < len; j++) {
    let end = prices[j];
    if (end < begin) {
      begin = end;
    } else {
      let temp = end - begin;
      max = temp > max ? temp : max;
    }
  }
  return max;
};
//多次交易的最大买进卖出收益
let maxProfit2 = function(prices) {
  let max = 0,
    begin = prices[0];
  for (let j = 1, len = prices.length; j < len; j++) {
    let end = prices[j];
    if (begin < end) {
      max = max + end - begin;
    }
    begin = end;
  }
  return max;
};
//判断字符串是否是回文,忽略空格，标点符号
let isPalindromeString = function(s) {
  let str = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  for (let j = 0, len = str.length - 1; j < len; j++, len--) {
    if (str[j] !== str[len]) {
      return false;
    }
  }
  return true;
};
//找出数组中唯一成单出现的值(其他都为成对出现)
let singleNumber = function(nums) {
  let t = nums[0];
  for (let j = 1, len = nums.length; j < len; j++) {
    t = t ^ nums[j]; //利用异或运算符进行计算
  }
  return t;
};
//找出数组中唯一成单出现的值(其他都为成3次出现),按位进行判断，思路上不要有任何十进制的羁绊
let singleNumber2 = function(nums) {
  let one = 0,
    two = 0,
    three = 0;
  //one,two,three分别表示在该位出现1次2次3次的数
  for (let i = 0; i < nums.length; ++i) {
    two |= one & nums[i]; //one&nums[i]找出两者之间相同的位码，再和之前的相结合，更新two
    one ^= nums[i]; //one^nums[i]，异或运算，取出现过一次的
    three = one & two; //取出现过三次的
    one &= ~three; //三次后清空
    two &= ~three;
  }
  return one;
};
//判断链表中是否存在循环
let hasCycle = function(head) {
  if (!head) {
    return false;
  }
  let temp1 = head,
    temp2 = head;
  while (temp2.next) {
    temp1 = temp1.next;
    temp2 = temp2.next.next;
    if (temp1 === temp2) {
      return true;
    }
  }
  return false;
};
//判断两个链表的合并节点
let getIntersectionNode = function(headA, headB) {
  while (headA) {
    headA.flag = true;
    headA = headA.next;
  }
  while (headB) {
    if (headB.flag) {
      return headB;
    }
    headB = headB.next;
  }
  return null;
};
//有序数列
let twoSum2 = function(numbers, target) {
  let begin = 0,
    end = numbers.length - 1,
    val = numbers[0] + numbers[end];
  while (begin < end) {
    if (val === target) return [begin, end];
    if (val > target) end--;
    if (val < target) begin++;
    val = numbers[begin] + numbers[end];
  }
  return [];
};
//转化数字为excel Sheet
let convertToTitle = function(n) {
  let sheet = '',
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
//转化excel Sheet
let titleToNumber = function(s) {
  let num = 0,
    t = s.length;
  for (let i = 0, len = s.length; i < len; i++) {
    t--;
    num += (s.charCodeAt(i) - 64) * Math.pow(26, t);
  }
  return num;
};
//寻找数字数字中出现最多的元素
let majorityElement = function(nums) {
  let temp = {};
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
//n阶乘后尾数0的个数
let trailingZeroes = function(n) {
  if (n < 5) return 0;
  else return Math.floor(n / 5) + trailingZeroes(Math.floor(n / 5));
};
//反转部分数组，修改原数组
let rotate1 = function(nums, k) {
  let insertArr = nums.splice(nums.length - k, k),
    temp = insertArr.pop();
  while (temp || temp === 0) {
    nums.unshift(temp);
    temp = insertArr.pop();
  }
};
//反转n，以32位二进制
let reverseBits = function(n) {
  let temp = n
    .toString(2)
    .split('')
    .reverse()
    .join('');
  while (temp.length < 32) {
    temp += '0';
  }
  return parseInt(temp, 2);
};
//求二进制数中1的个数
let hammingWeight = function(n) {
  let count = 0;
  while (n > 0) {
    if ((n & 1) != 0) {
      count++;
    }
    n = n >>> 1;
    console.log(n);
  }
  return count;
};
//数组中非相邻数的最大和
let rob = function(nums) {
  let len = nums.length,
    mid = Math.floor(len / 2);
  if (len === 0) {
    return 0;
  }
  if (len <= 2) {
    return Math.max(...nums);
  }
  if (len === 3) {
    return Math.max(nums[0] + nums[2], nums[1]);
  }
  return Math.max(
    rob(nums.slice(0, mid)) + rob(nums.slice(mid + 1)),
    rob(nums.slice(0, mid - 1)) + rob(nums.slice(mid))
  );
};
//判断一个数是否满足条件各个数字之平方和收归于1
let isHappy = function(n) {
  let appearData = [];
  while (true) {
    if (n === 1) {
      return true;
    }
    if (appearData.includes(n)) {
      return false;
    }
    appearData.push(n);
    n = n + '';
    let sum = 0;
    for (let i = 0, len = n.length; i < len; i++) {
      sum += Math.pow(n[i] - 0, 2);
    }
    n = sum;
  }
};
//移除指定值的链表节点
let removeElements = function(head, val) {
  if (!head) {
    return null;
  }
  while (head && head.val === val) {
    if (head.next) {
      head = head.next;
    } else {
      head = null;
    }
  }
  let t = head;
  while (t) {
    if (t && t.next && t.next.val === val) {
      if (t.next.next) {
        t.next = t.next.next;
      } else t.next = null;
    } else {
      t = t.next;
    }
  }
  return head;
};
//统计小于n的质数个数
let countPrimes = function(n) {
  if (n <= 2) {
    return 0;
  }
  if (n === 3) {
    return 1;
  }
  let liPrimes = function(num) {
    if (num % 2 === 0) {
      return false;
    }
    let mid = Math.sqrt(num),
      i = 3;
    while (i <= mid) {
      if (num % i === 0) {
        return false;
      }
      i++;
    }
    return true;
  };
  let countPrimesIn = function(begin, end) {
    if (begin == end) {
      if (liPrimes(begin)) {
        return 1;
      } else {
        return 0;
      }
    }
    let mid = Math.floor((end + begin) / 2);
    return countPrimesIn(begin, mid) + countPrimesIn(mid + 1, end);
  };
  let count = 1;
  count += countPrimesIn(2, n - 1);
  return count;
};
//判断两个字符串的结构是否一致
let isIsomorphic = function(s, t) {
  let char1 = [],
    char2 = [],
    len = s.length,
    flag = 0;
  while (flag < len) {
    let temp1 = s[flag],
      temp2 = t[flag],
      pos1 = char1.indexOf(temp1);
    if (pos1 !== char2.indexOf(temp2)) {
      return false;
    }
    if (pos1 === -1) {
      char1.push(temp1);
      char2.push(temp2);
    }
    flag++;
  }
  return true;
};
//反转链表
let reverseList = function(head) {
  if (head == null || head.next == null) return head;
  let p = reverseList(head.next); //一次改变一个指针的指向如1->2->3,执行一次后变为1->2<-3
  head.next.next = head;
  head.next = null;
  return p;
};
//判断一个数组中是否存在相同的元素
let containsDuplicate1 = function(nums) {
  while (nums.length !== 0) {
    let temp = nums.shift();
    if (nums.indexOf(temp) > -1) {
      return true;
    }
  }
  return false;
};
let containsDuplicate2 = function(nums) {
  let len = nums.length,
    pos = 0,
    temp = {};
  for (; pos < len; pos++) {
    if (temp[nums[pos]]) {
      return true;
    }
    temp[nums[pos]] = true;
  }
  return false;
};
let containsNearbyDuplicate = function(nums, k) {
  let len = nums.length,
    pos = 0,
    temp = {};
  for (; pos < len; pos++) {
    if (temp[nums[pos]] && pos - temp[nums[pos]] < k) {
      return true;
    }
    temp[nums[pos]] = pos + 1;
  }
  return false;
};
//反转二叉树
let invertTree = function(root) {
  if (!root) {
    return null;
  }
  if (root.left || root.right) {
    let temp = root.left;
    root.left = root.right;
    root.right = temp;
  }
  invertTree(root.left);
  invertTree(root.right);
  return root;
};
//判断n是否是n的幂
let isPowerOfTwo = function(n) {
  while (n >= 1) {
    if (n === 1) return true;
    n = n / 2;
  }
  return false;
};
//判断两个树节点的最近父节点
let lowestCommonAncestor = function(root, p, q) {
  let rootLeft = root.left,
    rootRight = root.right;
  if (rootLeft) {
    if (isChildrenNode(rootLeft, p) && isChildrenNode(rootLeft, q)) {
      return lowestCommonAncestor(rootLeft, p, q);
    }
  }
  if (rootRight)
    if (isChildrenNode(rootRight, p) && isChildrenNode(rootRight, q)) {
      return lowestCommonAncestor(rootRight, p, q);
    }
  return root;
};
let isChildrenNode = function(parent, childern) {
  if (parent === childern) {
    return true;
  }
  if (parent.left && !parent.right) {
    return isChildrenNode(parent.left, childern);
  }
  if (parent.right && !parent.left) {
    return isChildrenNode(parent.right, childern);
  }
  if (parent.right && parent.left) {
    return (
      isChildrenNode(parent.right, childern) ||
      isChildrenNode(parent.left, childern)
    );
  }
  return false;
};
//删除链表一个节点，但是这里没有给起点
let deleteNode = function(node) {
  if (!node.next) {
    node.next = null;
    node.val = null;
  } else if (!node.next.next) {
    node.val = node.next.val;
    node.next = null;
  } else {
    node.val = node.next.val;
    node.next = node.next.next;
  }
};
//判断两个数组中的字符是否一致
function isAnagram(s, t) {
  let countChar = {};
  for (let i = 0, len = s.length; i < len; i++) {
    let char = countChar[s[i]];
    if (char) {
      countChar[s[i]]++;
    } else {
      countChar[s[i]] = 1;
    }
  }

  for (let i = 0, len = t.length; i < len; i++) {
    let char = countChar[s[i]];
    console.log(char);
    if (char) {
      countChar[s[i]]--;
      if (countChar[s[i]] < 0) {
        return false;
      }
    } else {
      return false;
    }
  }
  for (let n in countChar) {
    if (countChar[n] > 0) {
      return false;
    }
  }
  return true;
}
//返回树的所有路径
function binaryTreePaths(root) {
  if (!root) {
    return [];
  }
  if (root && !root.left && !root.right) {
    return [root.val + ''];
  }
  return binaryTreePaths(root.left)
    .concat(binaryTreePaths(root.right))
    .map(n => root.val + '->' + n);
}
//Given num = 38, the process is like: 3 + 8 = 11, 1 + 1 = 2. Since 2 has only one digit, return it
function addDigits(num) {
  if (num < 10) {
    return num;
  }
  num = num + '';
  let count = 0;
  for (let i = 0, len = num.length; i < len; i++) {
    count += num[i] - 0;
  }
  return addDigits(count);
}
//263. Ugly Number
function isUgly(num) {
  if (num < 0) {
    return false;
  }
  if (num <= 2) {
    return true;
  }
  if (num % 2 === 0) {
    return isUgly(num / 2);
  }
  if (num % 3 === 0) {
    return isUgly(num / 3);
  }
  if (num % 5 === 0) {
    return isUgly(num / 5);
  }
  return false;
}
