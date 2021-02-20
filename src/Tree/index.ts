'use strict'
import { v4 as uuid } from 'uuid'
import { isDeepStrictEqual } from 'util'

class TreeNode {
    /* TODO: 
    Add mapping to remove children at 0(1), currently they it's O(n)
    */
    private _id: string
    private _value: any
    private _parent: TreeNode | null
    private _children: Array<TreeNode>

    constructor(value: any) {
        this._id = uuid()
        this._value = value
        this._parent = null
        this._children = []
    }

    getId(): string { return this._id }
    getParent(): TreeNode | null { return this._parent }
    getChildren(): Array<TreeNode> { return this._children }
    getChild(index: number): TreeNode { return this._children[index] }
    getValue(): any { return this._value }

    setValue(value: any): any { this._value = value }
    private setParent(parent: TreeNode) { this._parent = parent }

    addChild(child: TreeNode) {
        child.setParent(this)
        this._children.push(child)
    }

    removeChild(child: TreeNode): TreeNode | null {
        let index = this._children.indexOf(child)
        if (index > -1) {
            let result = this._children[index]
            this._children.splice(index, 1)
            return result
        }
        return null
    }

    removeSelf() {
        return this._parent.removeChild(this)
    }

    copySelf(): TreeNode {
        let treeNode = new TreeNode(this._value)
        treeNode._id = uuid()
        treeNode._children = this._children
        return treeNode
    }

    compareDeep(treeNode: TreeNode): boolean {
        return isDeepStrictEqual(this, treeNode)
    }

    moveChild(parent: TreeNode, child: TreeNode) {
        parent.addChild(child)
        this.removeChild(child)
    }

    moveSelf(parent: TreeNode) {
        let self = this
        this.removeSelf()
        parent.addChild(self)
    }
}

export default TreeNode