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
  let max=0,begin=prices[0],end;
  for(let j=1,len=prices.length;j<len;j++){
      let end = prices[j];
      if(end<begin){begin=end}
      else{
          let temp=end-begin;
          max=temp>max?temp:max
      }
  
  }
  return max
};
//122. Best Time to Buy and Sell Stock II
var maxProfit = function(prices) {
  let max=0,begin=prices[0];
  for(let j=1,len=prices.length;j<len;j++){
      let end = prices[j];
      if(begin<end){
          max = max+end-begin
      }
      begin=end
  }
  return max
};
//125. Valid Palindrome
var isPalindrome = function(s) {
  let str = s.replace(/[^a-zA-Z0-9]/g,"").toLowerCase();
  for(let j=0,len=str.length-1;j<len;j++,len--){
      if(str[j]!==str[len]){
          return false
      }
  }
  return true
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
   let nextBegins = [],existWords = [];
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
         if (isLadder(nextBegins[i], wordList[j]) && !existWords.includes(wordList[j])) {
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
 