import { Tree } from "./tree.js";
const arr = [5, 6, 3, 9, 2, 0, 2]; //Array.from({length:15}, ()=> Math.floor(Math.random()*100))
console.log(arr);

//1. Create binary search tree
const tree = new Tree(arr);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

//Pretty print tree
prettyPrint(tree.root);

//2. Confirm tree is balanced
console.log("The Tree is Balanced");
console.log(tree.isBalanced());

//3. Print values from Breadth and Depth (Pre, Post, In Order) Travesal
tree.levelOrderForEachStarter((value) => console.log(value));
tree.preOrderForEach((value) => console.log(value));
tree.postOrderForEach((value) => console.log(value));
tree.inOrderForEach((value) => console.log(value));

//4. Unbalance the tree by adding numbers greater than 100
tree.insert(101);
tree.insert(191);
tree.insert(121);
tree.insert(231);
tree.insert(274);
tree.insert(252);
tree.insert(361);
tree.insert(311);
tree.insert(321);

//5. Confirm tree is unbalanced
console.log("The Tree is Balanced");
console.log(tree.isBalanced());

//6. Balance the tree
tree.rebalance();

//7. Confirm tree is balanced
console.log("The Tree is Balanced");
console.log(tree.isBalanced());

//8. Print values from Breadth and Depth (Pre, Post, In Order) Travesal
tree.levelOrderForEachStarter((value) => console.log(value));
tree.preOrderForEach((value) => console.log(value));
tree.postOrderForEach((value) => console.log(value));
tree.inOrderForEach((value) => console.log(value));

//Pretty print new tree
prettyPrint(tree.root);
