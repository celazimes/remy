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
Names of 10 recipes (ONLY recipe name)
Examples:
case: Given user likes italian food, is not vegan Recommend:  Salami Pizza 
case: Given user likes spicy food, is vegan Recommend: spicy salad with tabasco sauce
case: User is vegan, likes cheese and chicken Recommend: 
'''
recipe_desc_pattern = '''Given a recipe name provide instructions on how to cook'
Recipe name: {}
Output: ONLY a numerated list of cooking steps and ingredients without an introduction.'''

global_api_key = ''
rec_list_pattern = r'[0-9]+\. (.*)'

async def ask_gpt_async(client) -> None:
    client = AsyncOpenAI(
        # defaults to os.environ.get("OPENAI_API_KEY")
        api_key=global_api_key
    )
    '''chat_completion = await client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": task_description,
            }
        ],
        model="gpt-3.5-turbo-1106",
    )'''

    start_time = time.time()
    chat_completion = await client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": recipes_list_pattern,
            }
        ],
        model="gpt-3.5-turbo",
    )
    print("--- %s seconds ---" % (time.time() - start_time))
    print(chat_completion.choices[0].message.content)

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


def ask_gpt_recipe_desc(client, recipe_name):

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
    return chat_recom_text# re.findall(rec_list_pattern, chat_recom_text.choices[0].message.content)



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
    # async_client = AsyncOpenAI(api_key=global_api_key)
    some_dish_name = 'Chickpea and Quinoa Buddha Bowl'
    recom_descr = ask_gpt_recipe_desc(sync_client, some_dish_name)
    print(recom_descr)


    # tasks = [your_function(recommendations_list) for param in parameters]
    # Run the tasks concurrently
    # results = await asyncio.gather(*tasks)


    # print(recommendations_list)



    # asyncio.run(ask_gpt())
