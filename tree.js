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

  deleteWithTwoChildren(target) {
    let successor = target.right;
    while (successor.left !== null) {
      successor = successor.left;
    }
    const successorData = successor.data;
    //recursive call to remove succesor node
    this.deleteItem(successorData);
    target.data = successorData;
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
          this.deleteWithTwoChildren(this.root);
          return;
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
          } else {
            this.deleteWithTwoChildren(target);
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
            this.deleteWithTwoChildren(target);
            return;
          }
        } else currentNode = currentNode.right;
      }
    }
  }

  //Breadth-First Traversal
  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback is required");
    }
    if (this.root === null) return;
    let queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      let node = queue.shift();
      callback(node.data);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }
  levelOrderForEachRecursive(queue, callback) {
    if (queue.length === 0) return;
    let node = queue.shift();
    callback(node.data);
    if (node.left !== null) queue.push(node.left);
    if (node.right !== null) queue.push(node.right);
    this.levelOrderForEachRecursive(queue, callback);
  }
  levelOrderForEachStarter(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback is required");
    }
    if (this.root === null) return;
    let queue = [];
    queue.push(this.root);
    this.levelOrderForEachRecursive(queue, callback);
  }

  //Depth-First Traversal
  //Helper recursive functions
  preOrderForEachRecursive(node, callback) {
    if (node === null) return;
    callback(node.data);
    this.preOrderForEachRecursive(node.left, callback);
    this.preOrderForEachRecursive(node.right, callback);
  }
  inOrderForEachRecursive(node, callback) {
    if (node === null) return;
    this.inOrderForEachRecursive(node.left, callback);
    callback(node.data);
    this.inOrderForEachRecursive(node.right, callback);
  }
  postOrderForEachRecursive(node, callback) {
    if (node === null) return;
    this.postOrderForEachRecursive(node.left, callback);
    this.postOrderForEachRecursive(node.right, callback);
    callback(node.data);
  }

  //Travesal
  preOrderForEach(callback) {
    //preorder function
    if (typeof callback !== "function") {
      throw new Error("Callback is required");
    }
    let node = this.root;
    this.preOrderForEachRecursive(node, callback);
  }
  inOrderForEach(callback) {
    //inorder function
    if (typeof callback !== "function") {
      throw new Error("Callback is required");
    }
    let node = this.root;
    this.inOrderForEachRecursive(node, callback);
  }
  postOrderForEach(callback) {
    //postorder function
    if (typeof callback !== "function") {
      throw new Error("Callback is required");
    }
    let node = this.root;
    this.postOrderForEachRecursive(node, callback);
  }

  depth(value) {
    if (this.root === null) return;
    let currentNode = this.root;
    let count = 0;
    while (currentNode !== null) {
      if (value < currentNode.data) {
        currentNode = currentNode.left;
        count++;
      } else if (value > currentNode.data) {
        currentNode = currentNode.right;
        count++;
      } else return count;
    }
    return undefined;
  }

  //helper function for height
  heightRecursive(node) {
    if (node === null) return -1;
    return (
      1 +
      Math.max(
        heightRecursive(currentNode.left),
        heightRecursive(currentNode.right),
      )
    );
  }
  height(value) {
    if (this.root === null) return;
    let currentNode = this.root;

    while (currentNode !== null) {
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else return this.heightRecursive(currentNode);
    }
    return undefined;
  }
}
