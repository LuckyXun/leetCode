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
  if(!this.pre.has(word)){
    for(let i=0,len=word.length;i<=len;i++){
       this.pre.add(word.slice(0,i))
    }
  }
 
};
Trie.prototype.search = function(word) {
  return this.data.has(word)
};
Trie.prototype.startsWith = function(prefix) {
  return this.pre.has(prefix)
  
};
