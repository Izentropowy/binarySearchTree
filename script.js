const Node = () => {
  return {
    data: null,
    left: null,
    right: null,
  };
};

const Tree = (arr) => {
  // sort and remove duplicates
  arr = arr.sort();
  arr = [...new Set(arr)];

  let start = arr[0];
  let end = arr[arr.length - 1];
  function buildTree(arr, start, end) {
    if (start > end) return null;
    let mid = (start + end) / 2;
    let root = Node();
    root.data = arr[mid];

    root.left = buildTree(arr, start, mid - 1);
    root.right = buildTree(arr, mid + 1, end);

    return root;
  }

  console.log(buildTree(arr, start, end));
};

let arr = [1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
let newTree = Tree(arr);
