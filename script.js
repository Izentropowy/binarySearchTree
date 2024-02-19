Array.prototype.sortIntegers = function () {
  return this.sort(function (a, b) {
    return a - b;
  });
};

const Node = (data) => {
  return {
    data: data,
    left: null,
    right: null,
  };
};

const Tree = (treeArr) => {
  // sort and remove duplicates
  treeArr = treeArr.sortIntegers();
  treeArr = [...new Set(treeArr)];

  let treeStart = 0;
  let treeEnd = treeArr.length - 1;

  let root = buildTree(treeArr, treeStart, treeEnd);

  function prettyPrint(node = root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  function buildTree(arr, start, end) {
    if (start > end) return null;
    let mid = parseInt((start + end) / 2);
    let root = Node(arr[mid]);

    root.left = buildTree(arr, start, mid - 1);
    root.right = buildTree(arr, mid + 1, end);

    return root;
  }

  function insert(val) {
    let currentNode = root;
    let previousNode = null;
    while (currentNode) {
      if (currentNode.data === val) return;

      previousNode = currentNode;
      if (currentNode.data > val) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    if (previousNode.data > val) previousNode.left = Node(val);
    else previousNode.right = Node(val);
  }

  function remove(val) {
    let currentNode = root;
    let previousNode = null;
    let branch = null;
    while (currentNode) {
      if (currentNode.data === val) {
        // remove a leaf
        if (currentNode.left === null && currentNode.right === null) {
          if (branch === "left") {
            previousNode.left = null;
            return;
          } else if (branch === "right") {
            previousNode.right = null;
            return;
          } else {
            root = null;
            return;
          }
        }
        // remove a node that has two children
        // find next biggest (most left on right subtree)
        // replace old node with the found one
        if (currentNode.left && currentNode.right) {
          let subNode = currentNode.right;
          while (subNode.left) {
            subNode = subNode.left;
          }
          subNode.left = currentNode.left;
          if (branch === "left") {
            previousNode.left = subNode;
            return true;
          }
          previousNode.right = subNode;
          return true;
        }
        // remove a node that has one child
        // replace it with its child
        if (currentNode.left) {
          if (branch === "left") {
            previousNode.left = currentNode.left;
            return true;
          }
          previousNode.right = currentNode.left;
          return true;
        }
        if (currentNode.right) {
          if (branch === "left") {
            previousNode.left = currentNode.right;
            return true;
          }
          previousNode.right = currentNode.right;
          return true;
        }
      }
      previousNode = currentNode;
      if (currentNode.data > val) {
        branch = "left";
        currentNode = currentNode.left;
      } else {
        branch = "right";
        currentNode = currentNode.right;
      }
    }
    return false;
  }

  function find(val) {
    let currentNode = root;
    while (currentNode) {
      if (currentNode.data === val) return currentNode;
      if (currentNode.data > val) currentNode = currentNode.left;
      if (currentNode.data < val) currentNode = currentNode.right;
    }
    return false;
  }

  function levelOrder(callback) {
    let order = [];
    let currentNode = root;
    let queue = [currentNode];
    while (queue.length !== 0) {
      currentNode = queue.shift();
      if (callback) callback(currentNode);
      order.push(currentNode.data);

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    if (!callback) return order;
  }

  function inOrder(callback, currentNode = root, order = []) {
    if (currentNode === null) return;
    inOrder(callback, currentNode.left, order);
    if (callback) callback(currentNode);
    order.push(currentNode.data);
    inOrder(callback, currentNode.right, order);

    if (!callback) return order;
  }

  function preOrder(callback, currentNode = root, order = []) {
    if (currentNode === null) return;
    if (callback) callback(currentNode);
    order.push(currentNode.data);
    preOrder(callback, currentNode.left, order);
    preOrder(callback, currentNode.right, order);

    if (!callback) return order;
  }

  function postOrder(callback, currentNode = root, order = []) {
    if (currentNode === null) return;
    postOrder(callback, currentNode.left, order);
    postOrder(callback, currentNode.right, order);
    if (callback) callback(currentNode);
    order.push(currentNode.data);

    if (!callback) return order;
  }

  function height(currentNode = root) {
    if (!currentNode) return 0;
    if (!currentNode.left && !currentNode.right) return 0;
    return Math.max(height(currentNode.left), height(currentNode.right)) + 1;
  }

  function depth(node) {
    let currentNode = root;
    let depth = 0;

    while (currentNode) {
      if (currentNode.data === node.data) return depth;
      if (currentNode.data > node.data) currentNode = currentNode.left;
      if (currentNode.data < node.data) currentNode = currentNode.right;
      depth++;
    }
    return false;
  }

  function isBalanced(currentNode = root) {
    let queue = [currentNode];
    while (queue.length !== 0) {
      currentNode = queue.shift();
      if (Math.abs(height(currentNode.left) - height(currentNode.right)) > 1)
        return false;
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    return true;
  }

  function rebalance() {
    if (isBalanced()) return;
    let arr = preOrder();
    arr = arr.sortIntegers();
    arr = [...new Set(arr)];

    let start = 0;
    let end = arr.length - 1;

    root = buildTree(arr, start, end);
    prettyPrint();
  }

  return {
    prettyPrint,
    insert,
    remove,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};

let arr = [1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
let newTree = Tree(arr);
newTree.insert(8);
newTree.insert(9);
newTree.insert(14);
newTree.prettyPrint();
