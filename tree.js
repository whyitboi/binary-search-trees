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
      this.root = node;
      return;
    }
    while (currentNode !== null) {
      if (currentNode.data === value) return;
      else if (currentNode.data > value) {
        if (currentNode.left === null) {
          currentNode.left = node;
          return;
        } else currentNode = currentNode.left;
      } else {
        if (currentNode.right === null) {
          currentNode.right = node;
          return;
        } else currentNode = currentNode.right;
      }
    }
  }
  deleteItem(value) {
    let currentNode = this.root;

    if (currentNode === null) return;

    while (currentNode !== null) {
      if (currentNode.data === value) {
        if (currentNode.left !== null && currentNode.right === null) {
          this.root = currentNode.left;
          return;
        } else if (currentNode.left === null && currentNode.right !== null) {
          this.root = currentNode.right;
          return;
        } else if (currentNode.left === null && currentNode.right === null) {
          this.root = null;
          return;
        } else {
          //2 children
          console.log("2 children");
        }
        //left subtree
      } else if (currentNode.data > value) {
        if (currentNode.left !== null && currentNode.left.data === value) {
          const target = currentNode.left;
          if (target.left !== null && target.right === null) {
            currentNode.left = target.left;
            return;
          } else if (target.left === null && target.right !== null) {
            currentNode.left = target.right;
            return;
          } else if (target.left === null && target.right === null) {
            currentNode.left = null;
            return;
          }
        } else currentNode = currentNode.left;
        //right subtree
      } else if (currentNode.data < value) {
        if (currentNode.right !== null && currentNode.right.data === value) {
          const target = currentNode.right;
          if (target.left !== null && target.right === null) {
            currentNode.right = target.left;
            return;
          } else if (target.left === null && target.right !== null) {
            currentNode.right = target.right;
            return;
          } else if (target.left === null && target.right === null) {
            currentNode.right = null;
            return;
          } else {
            //smallest value on the right is leftmost child
            let successor = target.right;
            while (successor.left !== null) {
              successor = successor.left;
            }
            const successorData = successor.data;
            successor = null;
            target.data = successorData;
            return;
          }
        } else currentNode = currentNode.right;
      }
    }
  }
}
