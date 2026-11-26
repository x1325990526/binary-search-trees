class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left =left;
        this.right =right;
    }
}

function merge(arr, l, mid, h) {
    const left = arr.slice(l, mid + 1);
    const right = arr.slice(mid + 1, h + 1);
    let i = 0;
    let j = 0;
    let k = l;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            arr[k++] = left[i++];
        } else {
            arr[k++] = right[j++];
        }
    }

    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
}

function mergeSort(arr, l = 0, h = arr.length - 1) {
    if (l >= h) return arr;

    const mid = Math.floor((l + h) / 2);
    mergeSort(arr, l, mid);
    mergeSort(arr, mid + 1, h);
    merge(arr, l, mid, h);

    return arr;
}


export default class Tree {
    
    constructor(arr) {
        this.root = this.buildTree(arr);
    }

    #build(arr, start, end) {
        if (start > end) return null;

        let mid = Math.floor(start + (end - start) / 2);
        let root = new Node(arr[mid]);

        // Divide from middle element
        root.left = this.#build(arr, start, mid - 1);
        root.right = this.#build(arr, mid + 1, end);

        return root;

    }
    buildTree(arr) {
        const sorted = mergeSort(arr.slice());
        const unique = [...new Set(sorted)];
        return this.#build(unique, 0, unique.length-1)
    }

    includes(value) {
        let tmp = this.root;
        if(tmp === null) return false;
        while(tmp !== null) {
            if(value === tmp.data) return true;
            if(value < tmp.data) tmp = tmp.left;
            else tmp = tmp.right;
        }
        return false;
    }

    insert(value) {
        let tmp = new Node(value)
        if(this.root === null) {
            this.root = tmp;
            return this.root;
        }

        let cur = this.root;

        while(cur !== null) {
            if(cur.data === value) return this.root;
            else if(cur.data > value && cur.left !== null) cur = cur.left;
            else if(cur.data < value && cur.right !== null) cur = cur.right;
            else break;
        }
        if(cur.data > value) cur.left = tmp;
        else cur.right = tmp;

        return this.root;
    }
        getSuccessor(curr) {
        curr = curr.right;
        while (curr !== null && curr.left !== null)
            curr = curr.left;
        return curr;
        }


    #delete(value, root) {
        if (root === null)
            return root;

        if (root.data > value)
            root.left = this.#delete(value, root.left);
        else if (root.data < value)
            root.right = this.#delete(value, root.right);
        else {
            // Node with 0 or 1 child
            if (root.left === null)
                return root.right;
            if (root.right === null)
                return root.left;

            // Node with 2 children
            const succ = this.getSuccessor(root);
            root.data = succ.data;
            root.right = this.#delete(succ.data, root.right);
        }
        return root;
    }

    deleteItem(value) {
        this.root = this.#delete(value, this.root);
        return this.root;
    }

    levelOrderForEach(callback) {

        if(typeof callback !== 'function') throw new TypeError("need callback function");
        if(this.root === null) return;
        const queue = [];
        queue.push(this.root);
        let head = 0;
        while(head < queue.length) {
            const node = queue[head++];
            callback(node.data);
            if(node.left !== null) queue.push(node.left);
            if(node.right !== null) queue.push(node.right);
        }
    }

    inOrderForEach(callback, root = this.root) {
        if(typeof callback !== 'function') throw new TypeError("need callback function");
        if(root === null) return;
        this.inOrderForEach(callback, root.left);
        callback(root.data);
        this.inOrderForEach(callback, root.right);

    }
    preOrderForEach(callback, root = this.root) {
        if(typeof callback !== 'function') throw new TypeError("need callback function");
        if(root === null) return;
        callback(root.data);
        this.preOrderForEach(callback, root.left);
        this.preOrderForEach(callback, root.right);

    }
    postOrderForEach(callback, root = this.root) {
        if(typeof callback !== 'function') throw new TypeError("need callback function");
        if(root === null) return;
        this.postOrderForEach(callback, root.left);
        this.postOrderForEach(callback, root.right);
        callback(root.data);
    }

    height(value) {
        if(this.root === null) return;
        
        let cur = this.root;

        while(cur !== null) {
            if(cur.data === value) {
                return this.#nodeHeight(cur);
            }
            else if(cur.data > value && cur.left !== null) cur = cur.left;
            else if(cur.data < value && cur.right !== null) cur = cur.right;
            else break;
        }

        return;
    }

    #nodeHeight(node) {
        if(node === null) return -1;
        const left = this.#nodeHeight(node.left);
        const right = this.#nodeHeight(node.right);
        return 1 + Math.max(left, right);
    }

    depth(value) {
        if(this.root === null) return;
        
        let cur = this.root;
        let count = 0;
        while(cur !== null) {
            if(cur.data === value) {
                return count;
            }
            else if(cur.data > value && cur.left !== null) {cur = cur.left; count++;}
            else if(cur.data < value && cur.right !== null){ cur = cur.right; count++;}
            else break;
        }

        return;
    }


}