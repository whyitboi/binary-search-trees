import { Tree } from "./tree.js";
const arr = [5, 6, 3, 9, 2, 0, 2];
console.log(arr);
const tree = new Tree(arr);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

prettyPrint(tree.root);

//callback test
tree.levelOrderForEachStarter((value) => console.log(value));
tree.preOrderForEach((value) => console.log(value));
