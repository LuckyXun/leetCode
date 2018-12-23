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