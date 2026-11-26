import Tree from "./BinaryTrees.js"

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);

prettyPrint(tree.root);
// console.log(tree.includes(8));
// tree.insert(67);


console.log(tree.depth(8))
console.log(tree.height(8))

tree.insert(123456)
tree.insert(1234567)
prettyPrint(tree.root);

// tree.inOrderForEach(console.log);
// console.log("-----------------")
// tree.preOrderForEach(console.log);
// console.log("-----------------")
// tree.postOrderForEach(console.log);
