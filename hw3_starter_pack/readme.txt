#---------------------------------------------------------
# Your Name
# your.email@ddress.edu
# Homework #3
# September 20, 2016
# README.txt
# README
#---------------------------------------------------------

(1)  For the file http://www.gutenberg.org/cache/epub/1342/pg1342.txt what is the depth of your tree?  What does that say about the number of operations to find a word?
Depth of the tree: 29
This means that at worst, the program will take 29 operations to find a word.

(2)  What would happen if the input to your program were sorted (as it was in HW 1)?
If the input was sorted, then this would kind of defeat the purpose of the BST since the tree becomes a giant linked list rather than a branched tree.  This presents the worst case scenario because searching through a linked list would be O(n) vs O(log n) for a branched tree since the non-binary search function would require going through the entire list of words to find the word.  

(3)  What are applications for binary search tree?  In what ways are they superior to lists?  In what ways are they inferior to lists?

Binary search trees would be best served to store items for the purpose of random accessing, inserting, and removing items quickly when processing through a lot of data.  BSTs are superior to lists when it comes to accessing and searching for data.

They are inferior to lists when it comes to inserting and removing elements at any location in the list.  In terms of O-notation, best/worst to add a value into binary search tree is O(log n) and O(n) respectively.  For an unsorted list or even a linked list, O-notation to insert/remove a value would be O(1) insert it right into the end or just pop off the value.

(4)  Did you implement the extra credit (listed below)?  If so please explain your testing strategy on the extra credit.
I did not implement it.  But if I were to implement it, I would check the size to make sure that the number of nodes is unchanged from the original, then I would have changed the height function to print out both the left and right heights instead of just the max and compare to see if left and right are even or close to even.