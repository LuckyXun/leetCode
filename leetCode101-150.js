function TreeLinkNode(val) {
  this.val = val;
  this.left = this.right = this.next = null;
}
//101. Symmetric Tree
var isSymmetric = function(root) {
  if (!root) {
    return true;
  }
  if (!(root.left || root.right)) {
    return true;
  }
  if (!root.left || !root.right) {
    return false;
  }
  function isSymmetricNode(p, q) {
    if (!(p || q)) {
      return true;
    }
    if (!(p && q)) {
      return false;
    }

    return (
      p.val === q.val &&
      isSymmetricNode(p.left, q.right) &&
      isSymmetricNode(p.right, q.left)
    );
  }
  return isSymmetricNode(root.right, root.left);
};
//102. Binary Tree Level Order Traversal
var levelOrder = function(root) {
  if (!root) {
    return [];
  }
  let nums = [],
    nextLevel = [root];
  while (nextLevel.length) {
    let levelNodes = [],
      levelNums = [];
    nextLevel.forEach(n => {
      if (n) {
        levelNums.push(n.val);
        if (n.left) {
          levelNodes.push(n.left);
        }
        if (n.right) {
          levelNodes.push(n.right);
        }
      }
    });
    nums.push(levelNums);
    nextLevel = levelNodes;
  }
  return nums;
};
//103. Binary Tree Zigzag Level Order Traversal
var zigzagLevelOrder = function(root) {
  if (!root) {
    return [];
  }

  let nums = [],
    nextLevel = [root],
    flag = false;
  while (nextLevel.length) {
    let levelNodes = [],
      levelNums = [];
    nextLevel.forEach(n => {
      if (n) {
        levelNums.push(n.val);
        if (n.left) {
          levelNodes.push(n.left);
        }
        if (n.right) {
          levelNodes.push(n.right);
        }
      }
    });
    if (flag) {
      nums.push(levelNums.reverse());
      flag = false;
    } else {
      nums.push(levelNums);
      flag = true;
    }

    nextLevel = levelNodes;
  }
  return nums;
};
//104. Maximum Depth of Binary Tree
var maxDepth = function(root) {
  if (!root) {
    return 0;
  }
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
//105. Construct Binary Tree from Preorder and Inorder Traversal
var buildTree = function(preorder, inorder) {
  let map = new Map();
  for (let val in inorder) {
    map.set(inorder[val], val);
  }
  return myBuild(preorder, inorder);
  function myBuild(preorder, inorder) {
    let len = preorder.length,
      root = new TreeNode(preorder[0]);
    if (len === 0) {
      return null;
    }
    if (len === 1) {
      return root;
    }
    let leftIndex = +map.get(preorder[0]) - map.get(inorder[0]);
    if (!leftIndex) {
      root.left === null;
      root.right = myBuild(
        preorder.slice(leftIndex + 1),
        inorder.slice(leftIndex + 1)
      );
    } else if (leftIndex === len - 1) {
      root.right === null;
      root.left = myBuild(
        preorder.slice(1, leftIndex + 1),
        inorder.slice(0, leftIndex)
      );
    } else {
      root.right = myBuild(
        preorder.slice(leftIndex + 1),
        inorder.slice(leftIndex + 1)
      );
      root.left = myBuild(
        preorder.slice(1, leftIndex + 1),
        inorder.slice(0, leftIndex)
      );
    }

    return root;
  }
};
//106. Construct Binary Tree from Inorder and Postorder Traversal
var buildTree = function(inorder, postorder) {
  let map = new Map();
  for (let val in inorder) {
    map.set(inorder[val], val);
  }
  return myBuild(inorder, postorder);
  function myBuild(inorder, postorder) {
    let len = inorder.length,
      root = new TreeNode(postorder[len - 1]);
    if (len === 0) {
      return null;
    }
    if (len === 1) {
      return root;
    }
    let leftIndex = +map.get(postorder[len - 1]) - map.get(inorder[0]);
    if (!leftIndex) {
      root.left === null;
      root.right = myBuild(
        inorder.slice(leftIndex + 1, len),
        postorder.slice(leftIndex, len - 1)
      );
    } else if (leftIndex === len - 1) {
      root.right === null;
      root.left = myBuild(
        inorder.slice(0, leftIndex),
        postorder.slice(0, leftIndex)
      );
    } else {
      root.right = myBuild(
        inorder.slice(leftIndex + 1, len),
        postorder.slice(leftIndex, len - 1)
      );
      root.left = myBuild(
        inorder.slice(0, leftIndex),
        postorder.slice(0, leftIndex)
      );
    }

    return root;
  }
};
//107. Binary Tree Level Order Traversal II
var levelOrderBottom = function(root) {
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
//108 Convert Sorted Array to Binary Search Tree
var sortedArrayToBST = function(nums) {
  if (!nums) {
    return null;
  }
  return helper(nums, 0, nums.length - 1);
  function helper(nums, low, high) {
    if (low > high) {
      // Done
      return null;
    }
    var mid = (low + (high - low) / 2) >> 0;
    var node = new TreeNode(nums[mid]);
    node.left = helper(nums, low, mid - 1);
    node.right = helper(nums, mid + 1, high);
    return node;
  }
};
//109 Convert Sorted List to Binary Search Tree
var sortedListToBST = function(head) {
  let nums = [];
  while (head) {
    nums.push(head.val);
    head = head.next;
  }

  return helper(nums, 0, nums.length - 1);
  function helper(nums, low, high) {
    if (low > high) {
      // Done
      return null;
    }
    var mid = (low + (high - low) / 2) | 0;
    var node = new TreeNode(nums[mid]);
    node.left = helper(nums, low, mid - 1);
    node.right = helper(nums, mid + 1, high);
    return node;
  }
};
//110. Balanced Binary Tree
var isBalanced = function(root) {
  if (!root) {
    return true;
  }
  let leftLevel = maxDepth(root.left),
    rightLevel = maxDepth(root.right);
  if (leftLevel - rightLevel > 1 || leftLevel - rightLevel < -1) {
    return false;
  }
  return isBalanced(root.left) && isBalanced(root.right);
  function maxDepth(root) {
    if (!root) {
      return 0;
    }
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
  }
};

//111. Minimum Depth of Binary Tree
var minDepth = function(root) {
  if (!root) {
    return 0;
  }
  if (root.left && root.right) {
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
  } else if (root.left) {
    return minDepth(root.left) + 1;
  } else if (root.right) {
    return minDepth(root.right) + 1;
  }
  return 1;
};
//112. Path Sum
var hasPathSum = function(root, sum) {
  if (!root) {
    return false;
  }
  if (root.val === sum && !root.left && !root.right) {
    return true;
  }
  return (
    hasPathSum(root.left, sum - root.val) ||
    hasPathSum(root.right, sum - root.val)
  );
};
//113. Path Sum II
var pathSum = function(root, sum, nums = []) {
  if (!root) {
    return [];
  }
  if (sum === root.val && !root.left && !root.right) {
    nums.push(sum);
    return [nums];
  }
  nums.push(root.val);
  return pathSum(root.left, sum - root.val, nums.slice()).concat(
    pathSum(root.right, sum - root.val, nums.slice())
  );
};
//114.Flatten Binary Tree to Linked List
var flatten = function(root) {
  if (!root) {
    return [];
  }
  let rightNode = root.right,
    leftNode = root.left;
  if (leftNode) {
    flatten(leftNode);
    maxRight = leftNode;
    while (maxRight.right) {
      maxRight = maxRight.right;
    }

    maxRight.right = rightNode;
    root.right = leftNode;
    root.left = null;
  }
  if (rightNode) {
    flatten(rightNode);
  }
};
//116. Populating Next Right Pointers in Each Node
var connect = function(root) {
  if (!root) {
    return;
  }

  let levelNodes = [root];
  while (levelNodes[0]) {
    let nextNodes = [],
      len = levelNodes.length - 1;
    for (let i = 0; i < len; i++) {
      levelNodes[i].next = levelNodes[i + 1];
      nextNodes.push(levelNodes[i].left);
      nextNodes.push(levelNodes[i].right);
    }
    nextNodes.push(levelNodes[len].left);
    nextNodes.push(levelNodes[len].right);
    levelNodes = nextNodes;
  }
};
//117. Populating Next Right Pointers in Each Node II
var connect = function(root) {
  if (!root) {
    return;
  }
  let levelNodes = [root];
  while (levelNodes.length) {
    let nextNodes = [],
      len = levelNodes.length - 1;
    for (let i = 0; i < len; i++) {
      levelNodes[i].next = levelNodes[i + 1];
      if (levelNodes[i].left) {
        nextNodes.push(levelNodes[i].left);
      }
      if (levelNodes[i].right) {
        nextNodes.push(levelNodes[i].right);
      }
    }
    if (levelNodes[len].left) nextNodes.push(levelNodes[len].left);
    if (levelNodes[len].right) nextNodes.push(levelNodes[len].right);
    levelNodes = nextNodes;
  }
};
//118. Pascal's Triangle
var generate = function(numRows) {
  if (numRows == 0) return [];
  if (numRows === 1) {
    return [[1]];
  }
  var triangle = [[1]];
  for (let i = 1; i < numRows; i++) {
    var temp = [1],
      lastVal = triangle[i - 1];
    for (let j = 0, len = lastVal.length; j < len - 1; j++) {
      temp.push(lastVal[j] + lastVal[j + 1]);
    }
    temp.push(1);
    triangle.push(temp);
  }
  return triangle;
};
//119. Pascal's Triangle II
var getRow = function(rowIndex) {
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
//120. Triangle
var minimumTotal = function(triangle) {
  let len = triangle.length - 1;
  while (len > 0) {
    let rowLength = triangle[len].length;
    for (let i = 0; i < rowLength; i++) {
      triangle[len - 1][i] += Math.min(triangle[len][i], triangle[len][i + 1]);
    }
    len--;
  }
  return triangle[0][0];
};
//121. Best Time to Buy and Sell Stock
var maxProfit = function(prices) {
  let max = 0,
    begin = prices[0],
    end;
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
//122. Best Time to Buy and Sell Stock II
var maxProfit = function(prices) {
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
//125. Valid Palindrome
var isPalindrome = function(s) {
  let str = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  for (let j = 0, len = str.length - 1; j < len; j++, len--) {
    if (str[j] !== str[len]) {
      return false;
    }
  }
  return true;
};
//127. Word Ladder
var ladderLength = function(beginWord, endWord, wordList, shortest = 2) {
  let index = wordList.findIndex(n => n === endWord);
  if (index === -1) {
    return 0;
  }
  if (isLadder(beginWord, endWord)) {
    return shortest;
  }
  let nextBegins = [],
    existWords = [];
  for (let i = 0, len = wordList.length; i < len; ) {
    if (isLadder(beginWord, wordList[i]) && beginWord !== wordList[i]) {
      nextBegins.push(wordList[i]);
      existWords.push(wordList[i]);
      wordList.splice(i, 1);
      len--;
    } else {
      i++;
    }
  }
  while (nextBegins.length) {
    shortest++;
    let nextWordSet = [];
    for (let i = 0, len = nextBegins.length; i < len; i++) {
      if (isLadder(nextBegins[i], endWord)) {
        return shortest;
      }
      for (let j = 0, len1 = wordList.length; j < len1; ) {
        if (
          isLadder(nextBegins[i], wordList[j]) &&
          !existWords.includes(wordList[j])
        ) {
          nextWordSet.push(wordList[j]);
          existWords.push(wordList[j]);
          wordList.splice(j, 1);
          len1--;
        } else {
          j++;
        }
      }
    }
    nextBegins = nextWordSet;
  }
  return 0;
  function isLadder(word1, word2) {
    if (word1 === word2) {
      return false;
    }
    for (let i = 0, len = word1.length; i < len; i++) {
      if (word1[i] !== word2[i]) {
        if (word1.slice(i + 1) === word2.slice(i + 1)) {
          return true;
        } else {
          return false;
        }
      }
    }
    return true;
  }
};
//129. Sum Root to Leaf Numbers
var sumNumbers = function(root) {
  if (!root) {
    return 0;
  }
  return getAllPath(root).reduce((a, b) => +a + +b);
  function getAllPath(root) {
    if (root.left && root.right) {
      return [
        ...getAllPath(root.left).map(n => root.val + '' + n),
        ...getAllPath(root.right).map(n => root.val + '' + n)
      ];
    }
    if (root.left) {
      return getAllPath(root.left).map(n => root.val + '' + n);
    }
    if (root.right) {
      return getAllPath(root.right).map(n => root.val + '' + n);
    }
    return [root.val];
  }
};
//130. Surrounded Regions
var solve = function(board) {
  if (!board.length) {
    return;
  }

  let rowStart = 0,
    rowEnd = board.length - 1,
    columnStart = 0,
    columnEnd = board[0].length - 1;

  let saveSet = new Set();
  if (rowStart >= rowEnd || columnStart >= columnEnd) {
    return;
  }

  for (let i = 0; i <= columnEnd; i++) {
    if (board[rowStart][i] === 'O') {
      board[rowStart][i] = '#';
      saveSet.add(rowStart + '|' + i);
    }
  }
  for (let i = 0; i <= columnEnd; i++) {
    if (board[rowEnd][i] === 'O') {
      board[rowEnd][i] = '#';
      saveSet.add(rowEnd + '|' + i);
    }
  }
  for (let i = 1; i <= rowEnd; i++) {
    if (board[i][columnStart] === 'O') {
      board[i][columnStart] = '#';
      saveSet.add(i + '|' + columnStart);
    }
  }
  for (let i = 1; i <= rowEnd; i++) {
    if (board[i][columnEnd] === 'O') {
      board[i][columnEnd] = '#';
      saveSet.add(i + '|' + columnEnd);
    }
  }
  while (saveSet.size) {
    let nextSet = new Set();
    saveSet.forEach(n => {
      let pos = n.split('|'),
        row = pos[0],
        col = pos[1];

      if (board[row - 1] && board[row - 1][col] === 'O') {
        board[row - 1][col] = '#';
        nextSet.add(row - 1 + '|' + col);
      }
      if (board[+row + 1] && board[+row + 1][col] === 'O') {
        board[+row + 1][col] = '#';
        nextSet.add(+row + 1 + '|' + col);
      }
      if (board[+row][+col + 1] === 'O') {
        board[+row][+col + 1] = '#';
        nextSet.add(row + '|' + (+col + 1));
      }
      if (board[+row][col - 1] === 'O') {
        board[+row][col - 1] = '#';
        nextSet.add(row + '|' + (col - 1));
      }
    });
    saveSet = nextSet;
  }
  for (let i = 0; i <= rowEnd; i++) {
    for (let j = 0; j <= columnEnd; j++) {
      if (board[i][j] === 'O') {
        board[i][j] = 'X';
      }
      if (board[i][j] === '#') {
        board[i][j] = 'O';
      }
    }
  }
};
//131. Palindrome Partitioning
var partition = function(s) {
  let strLen = s.length;
  if (strLen === 0) {
    return [];
  }
  if (strLen === 1) {
    return [[s]];
  }
  let partitions = [];
  for (let i = 1; i < strLen; i++) {
    if (isPalindrome(s.slice(0, i))) {
      partitions.push(...partition(s.slice(i)).map(n => [s.slice(0, i), ...n]));
    }
  }
  return partitions;
  function isPalindrome(str) {
    for (let i = 0, len = str.length - 1; i <= len; i++, len--) {
      if (str[i] !== str[len]) {
        return false;
      }
    }
    return true;
  }
};
//133. Clone Graph
var cloneGraph = function(graph) {
  if (!graph) {
    return null;
  }
  let myEntry = new UndirectedGraphNode(graph.label),
    nodeSet = new Set([myEntry]),
    existMap = new Map();
  existMap.set(myEntry.label, myEntry);
  myEntry.neighbors = graph.neighbors;
  while (nodeSet.size) {
    let nextSet = new Set();
    nodeSet.forEach(n => {
      let oriNeighbor = n.neighbors;
      if (oriNeighbor) {
        let newNeibors = [];
        for (let i = 0, len = oriNeighbor.length; i < len; i++) {
          if (existMap.has(oriNeighbor[i].label)) {
            newNeibors.push(existMap.get(oriNeighbor[i].label));
          } else {
            let newNode = new UndirectedGraphNode(oriNeighbor[i].label);
            newNode.neighbors = oriNeighbor[i].neighbors;
            existMap.set(oriNeighbor[i].label, newNode);
            newNeibors.push(newNode);
            nextSet.add(newNode);
          }
        }
        n.neighbors = newNeibors;
      }
    });
    nodeSet = nextSet;
  }
  return myEntry;
};
//134. Gas Station
var canCompleteCircuit = function(gas, cost) {
  let tank = 0;
  for (let i = 0, len = gas.length; i < len; i++) {
    if (gas[i] >= cost[i]) {
      tank = gas[i];
      let startIndex = i,
        nowIndex = i + 1;
      while (tank > 0) {
        if (nowIndex >= len) {
          nowIndex -= len;
        }
        let costIndex = nowIndex - 1;
        if (nowIndex === 0) {
          costIndex = len - 1;
        }
        let existGas = tank - cost[costIndex];
        if (existGas < 0) {
          break;
        }
        if (nowIndex === startIndex) {
          return startIndex;
        }
        tank = existGas + gas[nowIndex];
        nowIndex++;
      }
    }
  }
  return -1;
};
//136. Single Number
var singleNumber = function(nums) {
  let t = nums[0];
  for (let j = 1, len = nums.length; j < len; j++) {
    t = t ^ nums[j];
  }
  return t;
};
//137. Single Number II
var singleNumber = function(nums) {
  let one = 0,
    two = 0,
    three = 0;
  for (let i = 0; i < nums.length; ++i) {
    two = two | (one & nums[i]);
    one ^= nums[i];
    three = one & two;
    one &= ~three;
    two &= ~three;
  }
  return one;
};
//138. Copy List with Random Pointer
var copyRandomList = function(head) {
  if (!head) {
    return null;
  }
  let existNode = new Map(),
    root = new RandomListNode(head.label),
    header = root;
  existNode.set(root.label, root);
  root.next = head.next;
  root.random = head.random;
  while (root) {
    if (root.random) {
      if (!existNode.has(root.random.label)) {
        let randomNode = new RandomListNode(root.random.label);
        existNode.set(randomNode.label, randomNode);
      }
      root.random = existNode.get(root.random.label);
    }
    let oriNextNode = root.next,
      nextNode = null;
    if (!oriNextNode) {
      return header;
    }
    if (existNode.has(oriNextNode.label)) {
      nextNode = existNode.get(oriNextNode.label);
    } else {
      nextNode = new RandomListNode(oriNextNode.label);
      existNode.set(nextNode.label, nextNode);
    }
    nextNode.next = oriNextNode.next;
    nextNode.random = oriNextNode.random;
    root.next = nextNode;
    root = root.next;
  }
  return header;
};
//139. Word Break
var wordBreak = function(s, wordDict) {
  if (!wordDict || wordDict.length == 0) return false
  var dp = new Array(s.length + 1);
  dp.fill(false)
  dp[0] = true
  
  for(var i = 1; i <= s.length; i++) {
      for(var j = 0; j < i; j++) {
          if(dp[j] && wordDict.indexOf(s.substring(j, i)) >= 0) {
              
              dp[i] = true
              break;
          }
      }
  }
  return dp[s.length]
};
var wordBreak = function(s, wordDict) {
  if (s === '') {
    return true;
  }
  if (!wordDict || wordDict.length == 0) return false
  for (let i = 0, len = wordDict.length; i < len; i++) {
    let str = wordDict[i];
    if (str === s) {
      return true;
    }
    let index = s.indexOf(str);
    while(~index) {
      let mys = s.split(str),myDic = wordDict.slice();
      myDic.splice(i,1);
      let j=0,len1 = mys.length
      for(;j<len1;j++){
        if(mys[j]&&!wordBreak(mys[j],myDic)){
          break;
        }
      }
      if(j===len1){
        return true
      }
      break
    }
  }
  return false;
};
//141. Linked List Cycle
var hasCycle = function(head) {
  if(!head){
       return false
   }
   var temp1 = head,temp2=head;
   while(temp2&&temp2.next){
       temp1=temp1.next;
       temp2=temp2.next.next;
       if(temp1==temp2){return true}
       
   }
   return false    
};
//142. Linked List Cycle II
var detectCycle = function(head) {
  while(head){
     if(head.cycle){
         return head
     }
     head.cycle = true;
      head = head.next
  }
  return null
};
//143. Reorder List
var reorderList = function(head) {
  if(!head||!head.next){
      return head
  }
  let nodes = [],header =head ;
  while(header.next){
      nodes.push(header);
      header = header.next
  }
  while(head.next&&head.next.next){
       let tailSec = nodes.pop();
  let tail = tailSec.next;
  tailSec.next = null
  tail.next = head.next
  head.next = tail;
  head = tail.next    
  }
};
//144. Binary Tree Preorder Traversal
var preorderTraversal = function(root) {
  if(!root){
      return []
  }
  let nodes=[root],nums=[];
  while(nodes.length){
      let node = nodes.pop();
      nums.push(node.val);
      if(node.right){
          nodes.push(node.right)
      }
      if(node.left){
           nodes.push(node.left)
      }
  }
  return nums
};
var preorderTraversal = function(root) {
  if(!root){
      return []
  }
  if(!root.right&&!root.left){
      return [root.val]
  }
  return [root.val,...preorderTraversal(root.left),...preorderTraversal(root.right)]
};