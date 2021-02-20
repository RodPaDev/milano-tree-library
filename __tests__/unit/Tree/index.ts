'use strict'
import TreeNode from '../../../src/Tree'


describe('TreeNode', () => {
    test('Constructor', () => {
        let value = 'value'
        let treeNode = new TreeNode(value)
        expect(treeNode.getValue()).toBe(value)
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
        // Child remove without mapping
        treeNode.addChild(child)
        let removedChildMap = treeNode.removeChild(child, false)
        expect(removedChildMap).toEqual(child)
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

    test('compareDeep', () => {
        let treeNode1 = new TreeNode('value')
        let treeNode2 = new TreeNode('value')

        expect(treeNode1.compareDeep(treeNode1)).toBe(true)
        expect(treeNode1.compareDeep(treeNode2)).toBe(false)

        let childrenToAdd = [
            new TreeNode(1),
            new TreeNode(2),
            new TreeNode(3),
        ]
        childrenToAdd.forEach(child => treeNode1.addChild(child))
        expect(treeNode2.compareDeep(treeNode2)).toBe(true)
        expect(treeNode2.compareDeep(treeNode1)).toBe(false)
    })

    test('compareDeep', () => {
        let treeNode1 = new TreeNode('value')
        let treeNode2 = new TreeNode('value')

        expect(treeNode1.compareDeep(treeNode1)).toBe(true)
        expect(treeNode1.compareDeep(treeNode2)).toBe(false)

        let childrenToAdd = [
            new TreeNode(1),
            new TreeNode(2),
            new TreeNode(3),
        ]
        childrenToAdd.forEach(child => treeNode1.addChild(child))
        expect(treeNode2.compareDeep(treeNode2)).toBe(true)
        expect(treeNode2.compareDeep(treeNode1)).toBe(false)
    })

    test('copySelf', () => {
        let treeNode = new TreeNode('value')
        let child = new TreeNode('child')
        treeNode.addChild(child)

        let copy = treeNode.copySelf()
        expect(copy.compareDeep(treeNode)).toBe(false)
        expect(copy.getChildren()).toEqual(treeNode.getChildren())
        expect(copy.getChild(0)).toEqual(treeNode.getChild(0))
    })

    test('moveChild', () => {
        let treeNode1 = new TreeNode('value')
        let treeNode2 = new TreeNode('value')

        let child = new TreeNode('child')
        treeNode1.addChild(child)

        treeNode1.moveChild(treeNode2, child)
        expect(treeNode1.getChildren()).toHaveLength(0)
        expect(treeNode2.getChildren()).toHaveLength(1)
        expect(child.getParent()).toEqual(treeNode2)
    })

    test('moveSelf', () => {
        let treeNode1 = new TreeNode('treeNode1')
        let treeNode2 = new TreeNode('treeNode2')

        let child = new TreeNode('child')
        treeNode1.addChild(child)

        child.moveSelf(treeNode2)
        expect(child.getParent().getId()).toEqual(treeNode2.getId())
        expect(treeNode1.getChildren()).toHaveLength(0)
    })

    test('GetChildIndex', () => {
        let treeNode = new TreeNode('treeNode1')
        let child0 = new TreeNode('child')
        let child1 = new TreeNode('child')

        treeNode.addChild(child0)
        treeNode.addChild(child1)

        expect(treeNode.getChildIndex(child0)).toBe(0)
        expect(treeNode.getChildIndex(child1)).toBe(1)

        expect(treeNode.getChildIndex(child0, false)).toBe(0)
        expect(treeNode.getChildIndex(child1, false)).toBe(1)

    })

})