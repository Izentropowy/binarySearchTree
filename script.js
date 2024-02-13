const Node = (data) => {
  return {
    data: data,
    left: null,
    right: null,
  };
};

const Tree = (treeArr) => {
  // sort and remove duplicates
  treeArr = treeArr.sort();
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
      if (currentNode.data > val) {
        previousNode = currentNode;
        currentNode = currentNode.left;
      } else {
        previousNode = currentNode;
        currentNode = currentNode.right;
      }
    }

    if (previousNode.data > val) previousNode.left = Node(val);
    else previousNode.right = Node(val);
  }

  return {
    prettyPrint,
    insert,
  };
};

let arr = [1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
let newTree = Tree(arr);
newTree.prettyPrint();
newTree.insert(9);
newTree.prettyPrint();
newTree.insert(8);
newTree.prettyPrint();
newTree.insert(7.5);
newTree.prettyPrint();
