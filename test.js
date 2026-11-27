import Tree from "./BinaryTrees.js"

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

// const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67,324];
// const tree = new Tree(arr);

// prettyPrint(tree.root);
// console.log(tree.includes(8));
// tree.insert(67);


// console.log(tree.depth(8))
// console.log(tree.height(8))

// tree.insert(455)
// tree.insert(677)
// prettyPrint(tree.root);
// console.log(tree.isBalanced())
// tree.rebalance()
// prettyPrint(tree.root);
// console.log(tree.isBalanced())
// tree.inOrderForEach(console.log);
// console.log("-----------------")
// tree.preOrderForEach(console.log);
// console.log("-----------------")
// tree.postOrderForEach(console.log);
const t = new Tree([]);
   [50, 30, 70, 10, 60, 90, 5, 1, 80, 85].forEach(v => t.insert(v));
   // 根节点左/右高度 = 3/3，但节点 30 左/右高度 = 2/-1
   prettyPrint(t.root)
console.log(t.isBalanced())