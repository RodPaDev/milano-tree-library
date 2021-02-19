'use strict'
import { v4 as uuid } from 'uuid'

class TreeNode {
    private _id: string
    value: any
    private _parent: TreeNode | null
    private _children: Array<TreeNode>

    constructor(value: any) {
        this._id = uuid()
        this.value = value
        this._children = []
        this._parent = null
    }

    private setParent(parent: TreeNode){
        this._parent = parent
    }

    getId(): string {
        return this._id
    }

    getParent(): TreeNode | null{
        return this._parent
    }

    getChildren(): Array<TreeNode> {
        return this._children
    }

    addChild(child: TreeNode) {
        child.setParent(this)
        this._children.push(child)
    }

    removeChild(child: TreeNode): TreeNode | null {
        let index = this._children.indexOf(child)
        if (index > -1) {
            let result = this._children[index]
            this._children.splice(index)
            return result
        }
        return null
    }

    removeSelf() {
        return this._parent.removeChild(this)
    }

    copySelf(): TreeNode {
        let treeNode = new TreeNode(this.value)
        treeNode._id = uuid()
        treeNode._children = this._children
        return treeNode
    }

    compareId(treeNode: TreeNode){
        return this._id === treeNode.getId()
    }

    compareShallow(treeNode: TreeNode){
    }

    //@TODO
    //Move child, to allow child to change parent
}

export default TreeNode