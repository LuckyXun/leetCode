function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
function ListNode(val) {
  this.val = val;
  this.next = null;
}
var flatten = function(root) {
    let rightNode = root.right,leftNode = root.left;
    if(leftNode){
        flatten(leftNode)
        maxRight = leftNode ;
        while(maxRight.right){
            maxRight = maxRight.right  
       }
       maxRight.right = rightNode;
       root.right = leftNode
    }
    if(rightNode){
        flatten(rightNode)
    }
   


    
};
console.log(buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3]));
