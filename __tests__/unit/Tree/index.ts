'use strict'
import TreeNode from '../../../src/Tree'

describe('TreeNode', () => {
    test('Constructor', () => {
        let value = 'value'
        let treeNode = new TreeNode(value)
        expect(treeNode.value).toBe(value)
    })


    test('addChild', () => {
        let treeNode = new TreeNode('value')
        expect(treeNode.getChildren().length).toBe(0)

        let child = new TreeNode('child')
        treeNode.addChild(child)

        let children = treeNode.getChildren()
        expect(children).toHaveLength(1)
        expect(children[0]).toEqual(child)
    })

    test('GetChildren', () => {
        let treeNode = new TreeNode('value')
        let childrenToAdd = [
            new TreeNode(1),
            new TreeNode(2),
            new TreeNode(3),
        ]
        childrenToAdd.forEach(child => treeNode.addChild(child))

        let children = treeNode.getChildren()
        expect(children).toEqual(children)
    })

    test('RemoveChild', () => {
        let treeNode = new TreeNode('value')
        let child = new TreeNode('child')
        expect(treeNode.getChildren()).toHaveLength(0)
        // Child not found
        let nullChild = treeNode.removeChild(child)
        expect(nullChild).toBe(null)
        // Child added
        treeNode.addChild(child)
        expect(treeNode.getChildren()).toHaveLength(1)
        // Child removed
        let removedChild = treeNode.removeChild(child)
        expect(treeNode.getChildren()).toHaveLength(0)
        expect(removedChild).toEqual(child)
    })

    test('RemoveSelf', () => {
        let treeNode = new TreeNode('value')
        let child = new TreeNode('child')
        // Child added
        treeNode.addChild(child)
        expect(treeNode.getChildren()).toHaveLength(1)
        // Self removed and returned added
        let self = child.removeSelf()
        expect(treeNode.getChildren()).toHaveLength(0)
        expect(child).toEqual(self)
    })

    test('GetParent', () => {
        let treeNode = new TreeNode('value')
        let child = new TreeNode('child')
        treeNode.addChild(child)

        expect(treeNode.getParent()).toBe(null)
        expect(child.getParent()).toBe(treeNode)
    })

    test('CopySelf', () => {
        let treeNode = new TreeNode('value')
        let copyTreeNode
    })
})