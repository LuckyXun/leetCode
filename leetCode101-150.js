//101. Symmetric Tree
var isSymmetric = function(root) {
    if(!root){return true}
    if (!(root.left || root.right)) {
        return true
    }
    if (!root.left || !root.right) {
        return false
    }
   function isSymmetricNode(p, q) {
        if (!(p || q)) {
            return true
        }
        if(!(p&&q)){
            return false
        }
     
      return p.val=== q.val&&isSymmetricNode(p.left, q.right) && isSymmetricNode(p.right, q.left);
        
    }
   return isSymmetricNode(root.right,root.left)
};
//102. Binary Tree Level Order Traversal
var levelOrder = function(root) {
    if(!root){return []}
     let nums = [],nextLevel = [root];
    while(nextLevel.length){
        let levelNodes = [],levelNums=[];
        nextLevel.forEach(n=>{
            if(n){
                 levelNums.push(n.val);
            if(n.left){
                levelNodes.push(n.left)
            }
            if(n.right){
                levelNodes.push(n.right)
            }
            }
           

        })
        nums.push(levelNums)
        nextLevel = levelNodes
    }
    return nums
};
//103. Binary Tree Zigzag Level Order Traversal
var zigzagLevelOrder = function(root) {
    if(!root){return []}
    
     let nums = [],nextLevel = [root],flag=false;
    while(nextLevel.length){
        let levelNodes = [],levelNums=[];
        nextLevel.forEach(n=>{
            if(n){
                levelNums.push(n.val);
            if(n.left){
                levelNodes.push(n.left)
            }
            if(n.right){
                levelNodes.push(n.right)
            }
            }
           

        })
        if(flag){
            nums.push(levelNums.reverse());
            flag = false
        }else{
            nums.push(levelNums);
            flag = true
        }
       
        nextLevel = levelNodes
    }
    return nums
};
//104. Maximum Depth of Binary Tree
var maxDepth = function(root) {
    if(!root){
       return 0
   }
   return Math.max(maxDepth(root.left),maxDepth(root.right))+1
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
      let leftIndex = +map.get(preorder[0])-map.get(inorder[0]);
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