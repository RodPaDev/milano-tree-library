const assert = require("assert");
const TreeNode = require('./dist').TreeNode


let value = 'value'
let treeNode = new TreeNode(value)
assert.deepStrictEqual(treeNode.getValue(), value)
