const { Tree } = require("./tree");

function createRandomArray(size = 15) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    let randomInteger = Math.floor(Math.random() * 100);
    arr.push(randomInteger);
  }
  return arr;
}

let arr = createRandomArray();
let newTree = Tree(arr);

console.log("is balanced: ", newTree.isBalanced());
console.log(newTree.levelOrder());
console.log(newTree.preOrder());
console.log(newTree.inOrder());
console.log(newTree.postOrder());
newTree.insert(101);
newTree.insert(102);
newTree.insert(103);
newTree.insert(104);
newTree.insert(105);
console.log("is balanced: ", newTree.isBalanced());
newTree.rebalance();
console.log("is balanced: ", newTree.isBalanced());
console.log(newTree.levelOrder());
console.log(newTree.preOrder());
console.log(newTree.inOrder());
console.log(newTree.postOrder());
