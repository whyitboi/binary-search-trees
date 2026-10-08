import { Node } from "./node.js";
export class Tree {
  constructor(someArray) {
    this.root = this.buildTree(someArray);
  }
  buildTree(array) {
    if (array.length <= 0) return null;
    //copy/deduplicate before sorting
    array = [...new Set(array)];
    array.sort((a, b) => a - b);

    let mid = Math.floor(array.length / 2);
    let leftArr = array.slice(0, mid);
    let rightArr = array.slice(mid + 1);
    let root = new Node(array[mid]);

    root.left = this.buildTree(leftArr);
    root.right = this.buildTree(rightArr);

    return root;
  }
  includes(value) {
    let currentNode = this.root;
    while (currentNode !== null) {
      if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else if (value === currentNode.data) {
        return true;
      }
    }
    return false;
  }
}
