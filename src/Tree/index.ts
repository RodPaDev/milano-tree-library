'use strict'
import { v4 as uuid } from 'uuid'
import deepEqual from "deep-equal"

class TreeNode {
    private _id: string
    private _value: any
    private _parent: TreeNode | null
    private _children: Array<TreeNode>
    private _map: Object

    constructor(value: any) {
        this._id = uuid()
        this._value = value
        this._parent = null
        this._children = []
        this._map = {}
    }

    getId(): string { return this._id }
    getParent(): TreeNode | null { return this._parent }
    getChildren(): Array<TreeNode> { return this._children }
    getChild(index: number): TreeNode { return this._children[index] }
    getValue(): any { return this._value }

    getChildIndex(child: TreeNode, mapping = true){
        if(mapping){
            let index = this._map[child.getId()]
            return index || index === 0 ? index : -1
        } else{
            return this._children.indexOf(child)
        }
    }

    setValue(value: any): any { this._value = value }
    private setParent(parent: TreeNode) { this._parent = parent }

    addChild(child: TreeNode) {
        this._map[child.getId()] = this._children.length
        child.setParent(this)
        this._children.push(child)
    }

    removeChild(child: TreeNode, useMap = true): TreeNode | null {
        let index = this.getChildIndex(child, useMap)
        if (index > -1) {
            let removedChild = this._children[index]
            this._children.splice(index, 1)
            return removedChild
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
        return deepEqual(this, treeNode)
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

export = TreeNode