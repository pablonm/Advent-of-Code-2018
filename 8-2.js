const { rawTree, testTree, sumMetadata } = require('./8-1.js')

const processNode = (tree, index) => {
    if (tree[index] === 0) {
        return {
            length: tree[index + 1] + 2,
            metadata: sumMetadata(tree, index + 2, tree[index + 1])
        }
    }
    let length = 0
    let metadata = []
    for (let i = 0; i < tree[index]; i++) {
        let node = processNode(tree, index + length + 2)
        length += node.length
        metadata.push(node.metadata)
    }
    let metadataSum = 0
    for (let i = 0; i < tree[index + 1]; i++) {
        if (tree[index + length + 2 + i] > 0 && tree[index + length + 2 + i] <= tree[index]) {
            metadataSum += metadata[tree[index + length + 2 + i] - 1]
        }
    }
    return {
        length: length + tree[index + 1] + 2,
        metadata: metadataSum
    }
}

console.log('8-2 solution: ', processNode(rawTree, 0).metadata)