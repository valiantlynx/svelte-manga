# Task: Write a program that allows the user to add items to a shopping list. The user can add as many items as they want and then print the entire list.14

# class withe add to list and get list function
class ShoppingList:
    def __init__(self):
        pass
    
    def add_item(self, item):
        print('Added item', item)
        
    def get_all_items(self):
        print('Got all items')
    
    
shopping_list = ShoppingList()
option = 1
if option == 1:
    while option == 1:
        shopping_list.add_item("thingy")
        option = int(input("What would you like to do?\n1. add item\n2. get all items\n")) 
elif option == 2:
    shopping_list.get_all_items()
    
