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
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else return true;
    }
    return false;
  }

  insert(value) {
    let currentNode = this.root;
    const node = new Node(value);
    if (currentNode === null) {
      //currentNode = node
      return node;
    }

    while (currentNode !== null) {
      if (currentNode.data === value) return currentNode.data;
      else if (currentNode.data > value) {
        if (currentNode.left === null) {
          currentNode.left = node;
        } else currentNode = currentNode.left.data;
      } else {
        if (currentNode.right === null) {
          currentNode.right = node;
        } else currentNode = currentNode.right.data;
      }
    }
  }
}
