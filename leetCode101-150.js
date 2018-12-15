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
    if(!root){
        return 0
    }
    if(root.left&&root.right){
          return Math.min(minDepth(root.left), minDepth(root.right))+1
    }
    else if(root.left){
        return minDepth(root.left)+1
    }else if(root.right){
        return minDepth(root.right)+1
    }
    return 1
  
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
    if(!root){return []}
     let rightNode = root.right,leftNode = root.left;
    if(leftNode){
        flatten(leftNode)
        maxRight = leftNode ;
        while(maxRight.right){
            maxRight = maxRight.right  
       }
        
       maxRight.right = rightNode;
       root.right = leftNode;
       root.left = null
    }
    if(rightNode){
        flatten(rightNode)
    }
}

