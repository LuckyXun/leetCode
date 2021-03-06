//201. Bitwise AND of Numbers Range
var rangeBitwiseAnd = function(m, n) {
  while (n > m) {
    n = n & (n - 1);
  }
  return n;
};
//202. Happy Number
var isHappy = function(n) {
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
//203. Remove Linked List Elements
var removeElements = function(head, val) {
  if (!head) {
    return null;
  }
  while (head && head.val == val) {
    if (head.next) {
      head = head.next;
    } else {
      head = null;
    }
  }
  var t = head;
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
//204. Count Primes
var countPrimes = function(n) {
  if (n <= 1) return 0;
  var isPrime = [],
    count = 0;
  for (var i = 2; i < n; i++) {
    if (isPrime[i] == undefined) {
      isPrime[i] = true;
      count++;
      for (var j = 2; j * i < n; j++) {
        isPrime[i * j] = false;
      }
    }
  }
  return count;
};
//205. Isomorphic Strings
var isIsomorphic = function(s, t) {
  let char1 = [],
    char2 = [],
    len = s.length,
    flag = 0;
  while (flag < len) {
    var temp1 = s[flag],
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
//206. Reverse Linked List
var reverseList = function(head) {
  if (!head) {
    return null;
  }
  var list = head;
  var p = list;
  var q = null;
  while (p.next !== null) {
    q = p.next;
    p.next = q.next;
    q.next = list;
    list = q;
  }
  return list;
};
//207. Course Schedule
var canFinish = function(numCourses, prerequisites) {
  let graph = new Map();
  for (let i = 0, len1 = prerequisites.length; i < len1; i++) {
    for (let j = 0, len2 = prerequisites[i].length; j < len2 - 1; j++) {
      if (graph.has(prerequisites[i][j])) {
        graph.get(prerequisites[i][j]).push(prerequisites[i][j + 1]);
      } else {
        graph.set(prerequisites[i][j], [prerequisites[i][j + 1]]);
      }
    }
  }

  return isCycle(graph);
  function isCycle(graph) {
    let nodes = [...graph.keys()];
    if (nodes.length > numCourses) {
      return false;
    }
    while (nodes.length) {
      let tempNodes = nodes.slice();
      for (let i = 0, size = graph.size; i < size; i++) {
        let ends = graph.get(nodes[i]);
        for (let j = 0, len = ends.length; j < len; j++) {
          let idx = tempNodes.indexOf(ends[j]);
          if (idx > -1) {
            tempNodes.splice(idx, 1);
          }
          if (tempNodes.length === 0) {
            return false;
          }
        }
      }
      tempNodes.forEach(n => {
        graph.delete(n);
        nodes.splice(nodes.indexOf(n), 1);
      });
    }
    return true;
  }
};
//208. Implement Trie (Prefix Tree)
var Trie = function() {
  this.data = new Set();
  this.pre = new Set();
};
Trie.prototype.insert = function(word) {
  this.data.add(word);
  if (!this.pre.has(word)) {
    for (let i = 0, len = word.length; i <= len; i++) {
      this.pre.add(word.slice(0, i));
    }
  }
};
Trie.prototype.search = function(word) {
  return this.data.has(word);
};
Trie.prototype.startsWith = function(prefix) {
  return this.pre.has(prefix);
};
//209. Minimum Size Subarray Sum
var minSubArrayLen = function(s, nums) {
  let minLen = Number.MAX_SAFE_INTEGER,
    pos = 0,
    left = 0,
    len = nums.length,
    sum = 0;
  while (pos < len) {
    sum += nums[pos];
    while (sum >= s) {
      minLen = Math.min(minLen, pos - left + 1);
      sum -= nums[left];
      left++;
    }
    pos++;
  }
  return minLen === Number.MAX_SAFE_INTEGER ? 0 : minLen;
};
var minSubArrayLen = function(s, nums) {
  let step = 1,
    len = nums.length,
    numsCopy = nums.slice(),
    len2 = len;
  while (step <= len) {
    for (let i = 0; i < len2; i++) {
      if (numsCopy[i] >= s) {
        return step;
      }
      numsCopy[i] += nums[i + step];
    }
    step++;
    len2--;
  }
  return 0;
};
//210. Course Schedule II
var findOrder = function(numCourses, prerequisites) {
  let seq = [],
    n = numCourses,
    sidesCount = new Map();
  while (n > 0) {
    n--;
    sidesCount.set(n, {
      count: 0,
      nextNodes: []
    });
  }
  for (let i = 0, len = prerequisites.length; i < len; i++) {
    let startInfo = sidesCount.get(prerequisites[i][0]),
      endInfo = sidesCount.get(prerequisites[i][1]);
    startInfo.count++;
    endInfo.nextNodes.push(prerequisites[i][0]);
  }
  let mapIter = sidesCount.entries(),
    val = mapIter.next().value;
  while (seq.length < numCourses) {
    if (!val) {
      return [];
    }
    if (val[1].count === 0) {
      seq.push(val[0]);
      let nextNodes = val[1].nextNodes;
      nextNodes.forEach(n => {
        sidesCount.get(n).count--;
      });
      sidesCount.delete(val[0]);
      mapIter = sidesCount.entries();
    }
    val = mapIter.next().value;
  }
  return seq;
};
//211. Add and Search Word - Data structure design
var WordDictionary = function() {
  this.searchHelper = new Map();
};
WordDictionary.prototype.addWord = function(word) {
  let searchHeaper = this.searchHelper,
    len = word.length;
  if (searchHeaper.has(len)) {
    searchHeaper.get(len).push(word);
  } else {
    searchHeaper.set(len, [word]);
  }
};
WordDictionary.prototype.search = function(word) {
  let reg = new RegExp('^' + word + '$'),
    words = this.searchHelper.get(word.length) || [];
  for (let i = 0, len = words.length; i < len; i++) {
    if (words[i].match(reg)) {
      return true;
    }
  }
  return false;
};
//213. House Robber II
var rob = function(nums) {
  let len = nums.length;
  if (len === 1) {
    return nums[0];
  }
  return Math.max(myRob(nums.slice(1)), myRob(nums.slice(0, len - 1)));
  function myRob(nums) {
    var len = nums.length,
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
      myRob(nums.slice(0, mid)) + myRob(nums.slice(mid + 1)),
      myRob(nums.slice(0, mid - 1)) + myRob(nums.slice(mid))
    );
  }
};
//215. Kth Largest Element in an Array
var findKthLargest = function(nums, k) {
  let rightCount = 0;
  return quickSort(nums);
  function quickSort(list) {
    if (list.length < 2) {
      return list[0];
    }
    let data = list[0];
    let left = [],
      right = [];
    for (let i = 1; i < list.length; i++) {
      if (list[i] <= data) {
        left.push(list[i]);
      } else {
        right.push(list[i]);
      }
    }
    rightCount = rightCount + right.length;
    if (k === rightCount + 1) {
      return data;
    }
    if (k > rightCount + 1) {
      rightCount++;
      return quickSort(left);
    }
    if (k < rightCount + 1) {
      rightCount -= right.length;
      return quickSort(right);
    }
  }
};
var findKthLargest = function(nums, k) {
  return nums.sort((a,b)=>b-a)[k-1]
};
//216. Combination Sum III
var combinationSum3 = function(k, n,nums=[1,2,3,4,5,6,7,8,9]) {
  let maxValue = 0,count = k,combines=[];
  if(k===2){
    return combinationSum(nums,n)
  }
  let i=0,len=nums.length;
  while(i<len){
    let diff = n-nums[i];
    if(diff<=nums[i+1]){
      break
    }
    combines = combines.concat(combinationSum3(k-1,diff,nums.slice(i+1)).map(n=>[nums[i],...n]));
    i++
  }
  return combines
  function combinationSum(nums,n){
    let left = 0,right = nums.length-1,combines=[];
    while(left<right){
      let sum = nums[left]+nums[right];
      if(sum===n){
        combines.push([nums[left],nums[right]]);
        left++;
        right--
      }
      if(sum>n){
        right--
      }
      if(sum<n){
        left++
      }
    }  
    return combines
  }
};
//217. Contains Duplicate
var containsDuplicate = function(nums) { 
  return Array.from(new Set(nums)).length!==nums.length
}
var containsDuplicate = function(nums) { 
  var len = nums.length,pos=0,temp={};
  for(;pos<len;pos++){
      if(temp[nums[pos]]){
          return true
      }
      temp[nums[pos]]=true;
  }
  return false
}
//219. Contains Duplicate II
var containsNearbyDuplicate = function(nums, k) {
  var len = nums.length,pos=0,temp={};
  for(;pos<len;pos++){
      if(temp[nums[pos]]&&pos-temp[nums[pos]]<k){
          return true
      }
      temp[nums[pos]]=pos+1;
  }
  return false
};