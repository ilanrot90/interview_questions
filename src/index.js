import "./styles.css";

const isPrime = num => {
  const target = Math.sqrt(num);

  const calc = divisor => {
    if (divisor >= target) return true;
    return num % divisor === 0 ? false : calc(divisor + 2);
  };
  return num % 2 === 0 ? false : calc(3);
};

const getFibonacci = num =>
  num <= 1 ? num : getFibonacci(num - 1) + getFibonacci(num - 2);

const removeDuplicate = arr => [...new Set(arr)];

const getUniqValues = arr =>
  arr.filter(val => arr.indexOf(val) === arr.lastIndexOf(val));

const getDuplicateValues = arr => {
  const result = [];
  arr.reduce((acc, val) => {
    acc[val] === 1 && result.push(val);
    acc[val] = acc[val] ? ++acc[val] : 1;
    return acc;
  }, {});

  return result;
};

const maxSumArray = arr => {
  let currentSum = 0;
  let maxSum = 0;
  arr.forEach(num => {
    currentSum = Math.max(0, currentSum + num);
    maxSum = Math.max(maxSum, currentSum);
  });

  return maxSum;
};

const missingNumber = arr => {
  const n = arr.length + 1;
  const expectedSum = (n * (n + 1)) / 2;
  const sum = arr.reduce((sum = 0, num) => (sum += num));

  return expectedSum - sum;
};

const sumFinder = (arr, sum) => {
  const hashMap = new Set();

  for (let i = 0; i < arr.length; i++) {
    if (hashMap.has(sum - arr[i])) {
      return true;
    } else {
      hashMap.add(arr[i]);
    }
  }

  return false;
};

const cumulativeSum = arr =>
  arr.reduce((acc, num, i) => {
    if (i === 0) {
      return acc.push(num) && acc;
    }
    return acc.push(acc[i - 1] + num) && acc;
  }, []);

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  <b>check for prime numbers</b>
  is 127  prime? ${isPrime(127) ? "true" : "false"}
  <div><b>getFibonacci12</b> ${getFibonacci(12)}</div>
  </div>
`;

console.log("isPrime(113): ", isPrime(113));
console.log("getFibonacci(12): ", getFibonacci(12));
console.log("arr: ", [12, 12, 2, 3, 4, 4, 4, 2]);
console.log("maxSumArray: ", maxSumArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log("removeDuplicate: ", removeDuplicate([12, 12, 2, 3, 4, 4, 4, 2]));
console.log("getUniqValues: ", getUniqValues([12, 12, 2, 3, 4, 4, 4, 2]));
console.log(
  "getDuplicateValues: ",
  getDuplicateValues([12, 12, 2, 3, 4, 4, 4, 2])
);
console.log("arr: ", [5, 2, 6, 1, 3]);
console.log("missingNumber: ", missingNumber([5, 2, 6, 1, 3]));
console.log("sumFinder([6,4,3,2,1,7], 9)): ", sumFinder([6, 4, 3, 2, 1, 7], 9));
console.log("cumulativeSum: ", cumulativeSum([5, 2, 6, 1, 3]));

/* Binary tree */
class Node {
  constructor(data, right = null, left = null) {
    this.data = data;
    this.right = right;
    this.left = left;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  add(data) {
    const node = this.root;
    if (!node) {
      this.root = new Node(data);
      return;
    } else {
      const addMethod = node => {
        if (data > node.data) {
          if (node.right) {
            return addMethod(node.right);
          }
          node.right = new Node(data);
          return;
        } else {
          if (node.left) {
            return addMethod(node.left);
          }
          node.left = new Node(data);
          return;
        }
      };

      addMethod(node);
    }
  }

  findMin() {
    let current = this.root;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  findMax() {
    let current = this.root;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }

  findNode(data) {
    let current = this.root;
    while (current) {
      if (current.data === data) {
        return current;
      }

      if (data > current.data) {
        current = current.right;
      } else {
        current = current.left;
      }
    }
    /*  ---RECORSIVE---
    const findMethod = node => {
      if(node.data === data) {
        return node;
      }
      if(data > node.data) {
        return findMethod(node.right);
      } else {
        return findMethod(node.left);
      }
    }
    findMethod(current)
*/
    return null;
  }

  removeNode(data) {
    const removeMethod = (node, data) => {
      if (!node) {
        return null;
      }
      if (data === node.data) {
        if (!node.left && !node.right) {
          return null;
        }
        if (node.left && !node.right) {
          node = node.left;
          return node;
        } else if (!node.left && node.right) {
          node = node.right;
          return node;
        }
        // in case both nodes are exists
        let tempNode = node.right;
        while (tempNode.left) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeMethod(node.right, tempNode.data);
        return node;
      }
      if (data > node.data) {
        node.right = removeMethod(node.right, data);
        return node;
      }
      if (data < node.data) {
        node.left = removeMethod(node.left, data);
        return node;
      }
    };

    if (!this.root) {
      return null;
    }
    this.root = removeMethod(this.root, data);
  }

  getHeight() {
    if (!this.root) return -1;

    const calcHeight = nodesArr => {
      const step = nodesArr.slice(-1)[0];
      if (step.length > 0) {
        const nodes = step.reduce((acc, node) => {
          node.right && acc.push(node.right);
          node.left && acc.push(node.left);
          return acc;
        }, []);
        return calcHeight([...nodesArr, nodes]);
      } else return nodesArr.length - 1;
    };

    return calcHeight([[this.root]]);
  }

  getHeightV2(node = this.root, level = 1) {
    if (!node) {
      return 0;
    }
    if (node.right && node.left) {
      return Math.max(
        this.getHeightV2(node.right, level + 1),
        this.getHeightV2(node.left, level + 1)
      );
    } else if (!node.right && node.left) {
      return this.getHeightV2(node.left, level + 1);
    } else if (node.right && !node.left) {
      return this.getHeightV2(node.right, level + 1);
    }

    return level;
  }

  lca(nodeA, nodeB, current = this.root) {
    if (current.data > nodeA && current.data > nodeB) {
      return this.lca(nodeA, nodeB, current.left);
    } else if (current.data < nodeA && current.data < nodeB) {
      return this.lca(nodeA, nodeB, current.right);
    }

    return current;
  }
  // root will be first
  levelOrderArr() {
    if (!this.root) {
      return null;
    }

    const result = [];
    const getArray = node => {
      result.push(node.data);
      node.right && getArray(node.right);
      node.left && getArray(node.left);
    };

    getArray(this.root);
    return result;
  }

  orderByValue() {
    if (!this.root) {
      return null;
    }

    const result = [];
    const getArray = node => {
      node.left && getArray(node.left);
      result.push(node.data);
      node.right && getArray(node.right);
    };

    getArray(this.root);
    return result;
  }

  orderByValueRevarse() {
    if (!this.root) {
      return null;
    }

    const result = [];
    const getArray = node => {
      node.right && getArray(node.right);
      result.push(node.data);
      node.left && getArray(node.left);
    };

    getArray(this.root);
    return result;
  }
}

console.log("Binary search tree");
const bst = new BST();
bst.add(45);
console.log("getHeight: ", bst.getHeight());
bst.add(30);
bst.add(50);
bst.add(55);
bst.add(33);
bst.add(25);
bst.add(31);
console.log("findMax: ", bst.findMax());
console.log("findMin: ", bst.findMin());
console.log("findNode(33): ", bst.findNode(33));
console.log("removeNode(25): ", bst.removeNode(25));
console.log("findNode(25): ", bst.findNode(25));
console.log("findMin: ", bst.findMin());
console.log("getHeight: ", bst.getHeight());
console.log("getHeightV2: ", bst.getHeightV2());
bst.add(25);
console.log("lca(25, 31): ", bst.lca(25, 31));
console.log("findMin: ", bst.findMin());
console.log("levelOrderArr: ", bst.levelOrderArr());
console.log("orderByValue: ", bst.orderByValue());
console.log("orderByValueRevarse: ", bst.orderByValueRevarse());
/* wix interview */

const customInterval = (fn, time, ...args) => {
  let isActive = true;

  const Interval = () => {
    setTimeout(() => {
      fn(...args);
      isActive && Interval();
    }, time);
  };
  Interval();

  return { stop: () => (isActive = false) };
};

const customClearInterval = interval => {
  interval.stop();
};

const interval = customInterval(() => {
  console.log("hello");
}, 1000);
setTimeout(() => {
  customClearInterval(interval);
}, 5000);

function lsaNodes(nodeA, nodeB) {
  const parents = {};
  let current = nodeA;
  while (current) {
    if (current.name === nodeB.name) {
      return current;
    }
    parents[current.name] = current;
    current = current.parent;
  }

  current = nodeB;

  while (current) {
    if (parents[current.name]) {
      return current;
    }
    current = current.parent;
  }

  return null;
}

const debounce = (cb, time) => {
  let interval;
  return (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      cb(...args);
    }, time);
  };
};
const log = name => console.log("idx " + name);
const debouncedLog = debounce(log, 3000);

for (let i = 0; i < 10; i++) {
  debouncedLog(i);
}
// get browser type
const inBrowser = typeof window !== "undefined";
const inWeex = typeof WXEnvironment !== "undefined" && !!WXEnvironment.platform;
const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
const UA = inBrowser && window.navigator.userAgent.toLowerCase();
const isIE = UA && /msie|trident/.test(UA);
const isIE9 = UA && UA.indexOf("msie 9.0") > 0;
const isEdge = UA && UA.indexOf("edge/") > 0;
const isAndroid =
  (UA && UA.indexOf("android") > 0) || weexPlatform === "android";
const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === "ios";
const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
const isPhantomJS = UA && /phantomjs/.test(UA);
const isFF = UA && UA.match(/firefox\/(\d+)/);
//////////////////////////
