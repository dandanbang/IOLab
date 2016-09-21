#---------------------------------------------------------
# Edward Yip
# edward_yip@berkeley.edu
# Homework #3
# September 20, 2016
# BST.py
# BST
# ---------------------------------------------------------

class Node:
    #Constructor Node() creates node
    def __init__(self,word):
        self.word = word
        self.right = None
        self.left = None
        self.count = 1

class BSTree:
    #Constructor BSTree() creates empty tree
    def __init__(self, root=None):
        self.root = root
    
    #These are "external functions" that will be called by your main program - I have given these to you
    
    #Find word in tree
    def find(self, word):
        return _find(self.root, word)
    
    #Add node to tree with word
    def add(self, word):
        if not self.root:
            self.root = Node(word)
            return
        _add(self.root, word)

    #Print in order entire tree
    def in_order_print(self):
        _in_order_print(self.root)

    def size(self):
        return _size(self.root)

    def height(self):
        return _height(self.root)


#These are "internal functions" in the BSTree class - You need to create these!!!

#Function to add node with word as word attribute
def _add(root, word):
    if root.word == word:
        root.count +=1
        return
    if root.word > word:
        if root.left == None:
            root.left = Node(word)
        else:
            _add(root.left, word)
    else:
        if root.right == None:
            root.right = Node(word)
        else:
            _add(root.right, word)
    
#Function to find word in tree
def _find(root, word):
    if root is None:
        return 0
    if root.word == word:
        return root.count
    if root.word > word:
        if root.left is None:
            return 0
        else:
            return _find(root.left, word)
    else:
        if root.right is None:
            return 0
        else:
            return _find(root.right, word)

#Get number of nodes in tree
def _size(root, count=0):
    #help from http://stackoverflow.com/questions/19187901/counting-number-of-nodes-in-a-binary-search-tree
    if root is None:
        return count
    else:
        return _size(root.left, _size(root.right, count + 1))

#Get height of tree
def _height(root):
    # Help from http://stackoverflow.com/questions/21011423/how-to-calculate-the-height-of-a-bst-in-python
    # A tree consisting only of one item (root) has a height of 1
    # An empty tree has a height of 0
    if root is None:
        return 0
    else:
        return 1 + max(_height(root.left), _height(root.right))
    self.placeholder = None #REMOVE
    
#Function to print tree in order
def _in_order_print(root):
    if not root:
        return
    _in_order_print(root.left)
    print("word added:", root.word)
    print("word count:", root.count)
    _in_order_print(root.right)
