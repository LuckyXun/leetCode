//151. Reverse Words in a String
var reverseWords = function(str) {
    let strArray = str.trim().split(/\s+/);
    return strArray.reverse().join(' ')
};
//152. Maximum Product Subarray
var maxProduct = function(nums) {
    if(nums.length===1){
        return nums[0]
    }  
      
      
      
    let numsByZero = [],zeroIndex = nums.findIndex(n=>n===0);
    while(zeroIndex!==-1){
       let noZeroNums = nums.splice(0,zeroIndex);
       if(zeroIndex)
       numsByZero.push(noZeroNums)
       nums.shift();
       zeroIndex = nums.findIndex(n=>n===0)
    }
    let max = nums[0]
    if(numsByZero.length===0){
      numsByZero = [nums]
    }else{
      max = 0;
         if(nums.length)
      numsByZero.push(nums)
    }
    for(let i=0,len=numsByZero.length;i<len;i++){
      max = Math.max(max,noZeroMax(numsByZero[i]))
    }
    return max
    function noZeroMax(nums){
      if(nums.length===1){
        return nums[0]
      }
      let negativeIndex = [],count=0;
      nums.forEach((n,index)=>{
        if(n<0){
          negativeIndex.push(index);
          count++;
        }
      })
      if(negativeIndex.length%2===0){
        return nums.reduce((a,b)=>a*b)
      }else{
        let leftNums = nums.slice(0,negativeIndex[count-1]),rightNums=nums.slice(negativeIndex[0]+1)
         if(leftNums.length===0){
          return rightNums.reduce((a,b)=>a*b)
        }
        if(rightNums.length===0){
          return leftNums.reduce((a,b)=>a*b)
        }
        leftNums.push(1);
        rightNums.push(1) 
        return Math.max(leftNums.reduce((a,b)=>a*b), rightNums.reduce((a,b)=>a*b))
      }
    }
};
//153. Find Minimum in Rotated Sorted Array
var findMin = function(nums) {
    let 
      len = nums.length,
      mid = (len / 2) | 0,
      left = mid - 1,
      right = mid + 1;
    if (mid === 0) {
      return nums[0];
    }
    if(nums[len-1]>nums[0]){
      return nums[0]
    }
   if (left >= 0 && right < len) {
      if (nums[mid] < nums[left] && nums[mid] < nums[right]) {
        return nums[mid];
      }
    }
    if(right>=len&&nums[mid] < nums[left]){
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
    var min=nums[0];
        if(nums.length==1)
            return nums[0];
        for(var i=0;i<nums.length-1;i++){
            if(nums[i]<=nums[i+1])
                continue;
            min=nums[i+1];
            break;
        }
        
        return min;

  };