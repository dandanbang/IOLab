#---------------------------------------------------------
# Edward Yip
# edward_yip@berkeley.edu
# Homework #3
# September 20, 2016
# hw3test.py
# Test
#---------------------------------------------------------

from BST import *
from hw3 import *

T = BSTree()
#Test making linked list, size/height should be 6/6.
# T.add("1")
# T.add("2")
# T.add("3")
# T.add("4")
# T.add("5")
# T.add("6")

# print("Test Size:", T.size())
# print("Test Height:", T.height())

#Test making rotated list, size/height should be 6/4.
# T.add("4")
# T.add("3")
# T.add("5")
# T.add("1")
# T.add("2")
# T.add("6")

# print("Test Size:", T.size())
# print("Test Height:", T.height())


T.add("hello")
T.add("goodbye")
T.add("paul")
T.add("summer")
T.add("paul")
T.add("goodbye")

T.in_order_print()

print("\n")

print("Find 'goodbye': ", T.find("goodbye"))
print("Find 'hello': ",T.find("hello"))
print("Find 'booger': ",T.find("booger")) #test word that's not in there
print("Find '123ab': ",T.find("123ab")) #test numbers
print("Find 'hello goodbye': ",T.find("hello goodbye")) #test using two words

print("\n")

print("Test Size:", T.size())
print("Test Height:", T.height())

"""
Testing Queries:

1. Test invalid queries with numbers ('12', 'abc13', '@apple', '#a#a#a')
Expected: Reprompt user
Actual: Reprompt user

2. Test invalid queries with spaces ('how are', ' ')
Expected: Reprompt user
Actual: Reprompt user

3. Test blank text file ('empty.txt')
Expected: 0 height, 0 size, 0 times occurred
Actual: 0 height, 0 size, 0 times occurred

4. Test smaller text file with known nodes (10)
Expected: Stats for nodes were as expected: 10
Actual: Stats for nodes as expected: 10

5. Test invalid text file name
Expected: Reprompt
Actual: Reprompt
"""
