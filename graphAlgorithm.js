//第四章练习
//4.1
function sum(list) {
  if (list.length === 0) {
    throw new Error('数组长度不能为空');
  }
  if (list.length === 1) {
    return list[0];
  }
  return list.shift() + sum(list);
}

//4.3
function findMax(list) {
  if (list.length === 0) {
    throw new Error('数组长度不能为空');
  }
  if (list.length === 2) {
    return list[0] > list[1] ? list[0] : list[1];
  }
  let data = list.shift();
  let temp = findMax(list);
  return data > temp ? data : temp;
}

function quickSort(list) {
  if (list.length < 2) {
    return list;
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
  return [...quickSort(left), data, ...quickSort(right)];
}
console.log(sum([2, 3, 4]));
console.log(findMax([1, 44, 32, 1]));
console.log(quickSort([1, 65, 5, 100, 1, 3, 4, 5]));
//选择排序
function binarySort(list) {
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      if (list[j] < list[i]) {
        [list[j], list[i]] = [list[i], list[j]];
      }
    }
  }
  return list;
}
console.log(binarySort([1, 3, 0, 2, 3, 1, 3, 1, 4, 2, 6, 7, 3, 2]));
//冒泡排序
function bubbleSort(list) {
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length - i; j++) {
      if (list[j] < list[j + 1]) {
        [list[j], list[j + 1]] = [list[j + 1], list[j]];
      }
    }
  }
  return list;
}
console.log(bubbleSort([1, 3, 0, 2, 3, 1, 3, 1, 4, 2, 6, 7, 3, 2]));
//手写curry函数
function add() {
  let _arg = [...arguments];
  if (_arg.length === 0) {
    return 0;
  }
  return _arg.reduce((a, b) => a + b);
}
function currying() {
  let [fn, ...args] = [...arguments];
  let _temp = fn.apply(this, args);
  let fun = function() {
    let _args = [...arguments];
    _args.unshift(_temp);
    _temp = fn.apply(this, _args);
    return fun;
  };
  fun.toString = () => _temp;
  return fun;
}

let curryAdd = currying(add);
curryAdd(222, 1)(2)(1, 3);
//阶乘尾调用
function factorial(n, total) {
  console.log("total",n,total)
  if (n === 1) {
    return total;
  }
  return factorial(n - 1, n * total);
}
console.log(factorial(5,1))
function Fibonacci(total, a1, a2) {
  if (total-- === 0) {
    return a1;
  }
  return Fibonacci(total, a1 + a2, a1);
}

//狄克斯特拉算法
let a = {
    a1: 2,
    a2: 5
  },
  a1 = {
    a2: 8,
    a3: 7
  },
  a2 = {
    a3: 2,
    a4: 4
  },
  a3 = {
    a5: 1
  },
  a4 = {
    a5: 3,
    a3: 6
  },
  list = { a, a1, a2, a3, a4 };
function dijkstra(list) {
  let cost = Object.assign(a),
    processed = [];
  while (processed.length < 5) {
    find_lowest_node(cost, processed);
  }
  return cost;
}
function find_lowest_node(cost, processed) {
  console.log(processed,cost)
  for (let key in cost) {
    if (processed.includes(key)) {
      continue;
    }
    processed.push(key);
    for (let key2 in list[key]) {
      let newCost = cost[key] + list[key][key2];
      if (!cost[key2] || newCost < cost[key2]) {
        cost[key2] = newCost;
      }
    }
  }
}

console.log(dijkstra(list));
//动态规划 最长公共子序列和最长子串
let str1 =
    '03424helloworldfdfcp043p92jflkf79hhedhey464w6hsry4648721fjbmcvszfq39wnf39804',
  str2 =
    '1234helloworld2j3293gdgdg6464642093jdklwjflwewt423412897491274uhrf12rfr12';
function longestSubStr(str1, str2) {
  var cell = new Array(str1.length > str2.length ? str2.length : str1.length),
    maxLen = 0,
    maxStr = '';
  for (let i = 0; i < str1.length; i++) {
    cell[i] = new Array(cell.length);
    for (let j = 0; j < str2.length; j++) {
      if (str1[i] === str2[j]) {
        if (i === 0 || j === 0) {
          cell[i][j] = 1;
        } else {
          cell[i][j] = cell[i - 1][j - 1] + 1;
          if (cell[i][j] > maxLen) {
            maxLen = cell[i][j];
            maxStr = str2.substr(j - maxLen +1, maxLen);
          }
        }
      } else {
        cell[i][j] = 0;
        //cell[i][j] = max(cell[i][j - 1],cell[i-1]&&cell[i-1][j]);
      }
    }
  }
  return maxStr;
}
function max(a, b) {
  if (!a && !b) {
    return 0;
  }
  if (!a) {
    return b;
  }
  if (!b) {
    return a;
  }
  return Math.max(a, b);
}

console.log(longestSubStr("blue", "clues"));
