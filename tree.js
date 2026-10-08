import { Node } from "./node.js";
export class Tree {
  constructor(someArray) {
    this.root = this.buildTree(someArray);
  }
  buildTree(array) {
    array.sort((a, b) => a - b);

    let mid = Math.floor(array.length / 2);
    let root = new Node(array[mid]);

    root.left = this.buildTree(array);
    root.right = this.buildTree(array);
  }
}
