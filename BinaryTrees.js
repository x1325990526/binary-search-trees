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
}