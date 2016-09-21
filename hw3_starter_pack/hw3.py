#---------------------------------------------------------
# Edward Yip
# edward_yip@berkeley.edu
# Homework #3
# September 20, 2016
# hw3.py
# Main
#---------------------------------------------------------

from BST import *
import sys
import string

def read_file(filename):
    with open(filename, 'rU') as document:
        text = document.read()
    filter_punc = lambda t: ''.join([x.lower() for x in t if x.isalpha()])
    words = [x for x in map(filter_punc, text.split()) if x]
    return words


def main():
    while(True):
        print("Enter the file name to read:")
        filename = input('> ')
        try:
            words = read_file(filename)
        except IOError:
            print("Unable to find the file {}".format(filename))
            continue
        else:
            tree = BSTree()
            for word in words:
                tree.add(word)

    ######################
    # Begin Student Code #
    ######################
        exclude = set(string.punctuation)
        while True: 
            user_input = input("Query? ")
            user_input = ''.join(ch for ch in user_input if ch not in exclude).strip().lower() #get rid of punctuation, capital letters
            if user_input.isalpha() == False: #scan for anything that's not a legit word (e.g. spaces, numbers)
                print("\nInvalid query.  Please try again.\n")
                continue
            if user_input == "terminate":
                sys.exit(0)
            elif user_input != "stats" and user_input != "terminate":
                print("\nThe word {} appears {} times in the tree\n".format(user_input, tree.find(user_input)))
            elif user_input == "stats":
                print("\nNumber of nodes in tree: {}".format(tree.size()))
                print("Maximum depth of tree: {}\n".format(tree.height()))


if __name__ == "__main__":
    main()