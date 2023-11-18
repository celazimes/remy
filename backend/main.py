# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import openai
import asyncio
from openai import AsyncOpenAI, OpenAI
from openai.types.chat import ChatCompletion
import time
import re

recipes_list_pattern = '''Provide names and ingredients of food recipes based on the users description 
Names of 5 recipes in the following format recipe name # food type (one of the following: Pizza, Hamburger, Pasta, Cake)
Examples:
case: Given user likes italian food, is not vegan Recommend:  Salami Pizza 
case: Given user likes spicy food, is vegan Recommend: spicy salad with tabasco sauce
case: User is likes sweets and is allergic to chocolate Recommend: 
'''
recipe_desc_pattern = '''Given a recipe name provide instructions on how to cook
User is allergic to chocolate
Recipe name: {}
Output: a numerated list of and ingredients 
and enumerated cooking steps without an introduction.'''

global_api_key = ''
rec_list_pattern = r'[0-9]+\. (.*) # (.*)'

def ask_gpt_recipe_list(client):

    start_time = time.time()
    chat_recom_text = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": recipes_list_pattern
            }
        ],
        model="gpt-3.5-turbo-1106",# gpt-3.5-turbo
    )
    print("--- %s seconds ---" % (time.time() - start_time))
    # Extract dishes names
    return re.findall(rec_list_pattern, chat_recom_text.choices[0].message.content)


def ask_gpt_recipe_desc(client, recipe_name, food_type=None):

    start_time = time.time()
    chat_recom_text = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": recipe_desc_pattern.format(recipe_name)
            }
        ],
        model="gpt-3.5-turbo-1106",# gpt-3.5-turbo
    )
    print("--- %s seconds ---" % (time.time() - start_time))
    return chat_recom_text.choices[0].message.content# re.findall(rec_list_pattern, chat_recom_text.choices[0].message.content)



# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    # import keys from the file
    f = open("keys.txt", "r")
    lines = f.readlines()
    global_api_key = lines[0]
    # create clients
    sync_client = OpenAI(api_key=global_api_key)
    # getting dishes list
    recommendation_list = ask_gpt_recipe_list(sync_client)
    print(recommendation_list)
    some_dish_name = 'Chocolate cake'
    recom_descr = ask_gpt_recipe_desc(sync_client, recommendation_list[0][0], recommendation_list[0][1])
    print(recom_descr)
