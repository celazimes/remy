from openai import OpenAI
import time
import re
import random
from PIL import Image
import os

recipes_list_pattern = '''
Names of 5 recipes in the following format: recipe name
Given {} Exclude dishes similar to disliked. Recommend similar to liked ones.
Provide only names of recipes
'''
recipe_desc_pattern = '''Given a recipe name provide instructions on how to cook
User {}
Recipe name: {}
Output: a numerated list of and ingredients 
and enumerated cooking steps without an introduction.'''

global_api_key = ''


summarize_pattern = '''Users rates from 1 to 5 dishes, 5 being the best and 1 being the worst option. {}. 
Summarize user's taste profile in 1 sentence. Do not recommend dishes similar to the low score.
'''

the_database = dict()
image_db={}
preference_db = {}

rec_list_pattern = r'[0-9]+\. (.*)' # ignore numbers and dot, return only what is after separated by space
# '1. Pizza' -> returns 'Pizza'

def ask_gpt_to_summarize_user_pref(client, ratings_dict):
    pref = ', '.join([f'{key} {value}' for key, value in ratings_dict.items()])
    summary_message = summarize_pattern.format(pref)
    start_time = time.time()
    chat_recom_text = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": summary_message
            }
        ],
        model="gpt-3.5-turbo-1106",  # gpt-3.5-turbo
    )
    print("--- %s seconds ---" % (time.time() - start_time))
    # Extract dishes names
    print(chat_recom_text.choices[0].message.content)
    return re.findall(rec_list_pattern, chat_recom_text.choices[0].message.content)


def ask_gpt_recipe_list(client, user_descr):
    recipy_list_pattern = recipes_list_pattern.format(user_descr)
    start_time = time.time()
    chat_recom_text = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": recipy_list_pattern
            }
        ],
        model="gpt-3.5-turbo-1106",# gpt-3.5-turbo
    )
    print("--- %s seconds ---" % (time.time() - start_time))
    # Extract dishes names
    print(chat_recom_text.choices[0].message.content)
    output = re.findall(rec_list_pattern, chat_recom_text.choices[0].message.content)
    return


def ask_gpt_recipe_desc(client, recipe_name, user_descr):
    start_time = time.time()
    chat_recom_text = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": recipe_desc_pattern.format(user_descr, recipe_name)
            }
        ],
        model="gpt-3.5-turbo-1106",# gpt-3.5-turbo
    )
    print("--- %s seconds ---" % (time.time() - start_time))
    return chat_recom_text.choices[0].message.content


list_of_ingr_can_be_shipped = []

def check_constraints():
    # could chech if ingredients are available,
    # could double check the allergies and do a lot of useful staff,
    pass

def read_images():
    # Path to the folder containing images
    folder_path = "C:\\random_projects\\remy\\backend\\img_db"
    # Dictionary to store images, because its an mvp
    images_dict = {}
    for filename in os.listdir(folder_path):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            name_without_extension = os.path.splitext(filename)[0]  # Extracting name without extension
            image_path = os.path.join(folder_path, filename)
            img = Image.open(image_path)
            images_dict[name_without_extension] = img
    # Now image_dict contains images with filenames (without extensions) as keys
    return images_dict


def get_image(class_type):
    image_key = "{}_{}".format(class_type, str(random.randint(1, 5)))
    return image_db[image_key]
'''
def ask_gpt_classify(client, text_2_classify):
    start_time = time.time()
    chat_classified_text = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": classification_pattern.format(text_2_classify)
            }
        ],
        model="gpt-3.5-turbo-1106",  # gpt-3.5-turbo
    )
    print("--- %s seconds ---" % (time.time() - start_time))
    print(classification_pattern.format(text_2_classify))
    output = chat_classified_text.choices[0].message.content
    print(output)
    class_pattern = '[.*] # (.*)'
    return re.findall(class_pattern, output)
'''
# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    # init the db with images
    image_db = read_images()

    # import keys from the file
    f = open("keys.txt", "r")
    lines = f.readlines()
    global_api_key = lines[0]
    # create clients
    sync_client = OpenAI(api_key=global_api_key)
    # getting dishes list

    user_pref_data = {}
    user_pref_data['likes'] = 'sweets'
    user_pref_data['allergies'] = 'none'
    user_pref_data['preference'] = 'vegan'

    some_user_decr = "likes {}, has allergies {}, {}".format(", ".join(user_pref_data['likes']),
                                                             ", ".join(user_pref_data['allergies']),
                                                             user_pref_data['preference'])
    # recommendation_list = ask_gpt_recipe_list(sync_client, some_user_decr)
    # print(recommendation_list)
    some_dish_name = 'Chocolate cake'
    #recom_descr = ask_gpt_recipe_desc(sync_client, recommendation_list[0][0])
    #print(recom_descr)
    user_summ = ask_gpt_to_summarize_user_pref(sync_client, {'chicken': 5, 'ice cream': 1, 'sweet pancakes' : 1,
                                                             'chocolate cake': 1, 'Tiramisu':1})
    rec_list = ask_gpt_recipe_list(sync_client, user_summ)
    print(rec_list)