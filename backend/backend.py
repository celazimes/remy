from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import time
import re
import random
from PIL import Image
import os
import httpx
from dotenv import load_dotenv


load_dotenv()

PEXELS_API_KEY = os.environ.get("PEXELS_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

recipes_list_pattern = '''
Names of 5 recipes in the following format: recipe name
Given {} Exclude dishes similar to disliked. Recommend similar to liked ones.
Provide only names of recipes
'''

recipe_desc_pattern = '''Given a recipe name provide instructions on how to cook
Recipe name: {}
Output: a numerated list of and ingredients 
and enumerated cooking steps without an introduction.'''

summarize_pattern = '''Users rates from 1 to 5 dishes, 5 being the best and 1 being the worst option. {}. 
Summarize user's taste profile in 1 sentence. Do not recommend dishes similar to the low score.
'''
# take out number eg 1. leave only dish name
rec_list_pattern = r'[0-9]+\. (.*)'

f = open("keys.txt", "r")
lines = f.readlines()
f.close()  # reading from file the api keys, because we don't keep keys in public repository
global_api_key = lines[0]
# create clients
sync_client = OpenAI(api_key=global_api_key)
# here could be a database
the_database = dict()

def generate_user_id():
    return random.randint(1000, 9999)

def ask_gpt_recipe_list(client, user_descr):
    start_time = time.time()
    chat_recom_text = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": recipes_list_pattern.format(user_descr)
            }
        ],
        model="gpt-3.5-turbo-1106"
    )
    print("--- %s seconds ---" % (time.time() - start_time))
    # Extract dishes names
    return re.findall(rec_list_pattern, chat_recom_text.choices[0].message.content)


def ask_gpt_recipe_desc(client, recipe_name, user_descr):
    start_time = time.time()
    chat_recom_text = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": recipe_desc_pattern.format(user_descr, recipe_name)
            }
        ],
        model="gpt-3.5-turbo-1106",  # gpt-3.5-turbo
    )
    print("--- %s seconds ---" % (time.time() - start_time))
    return chat_recom_text.choices[0].message.content


def read_images():
    # Path to the folder containing images
    folder_path = "C:\\random_projects\\remy\\backend\\img_db"
    # Dictionary to store images, because its an mvp
    images_dict = {}
    print(os.listdir(folder_path))
    for filename in os.listdir(folder_path):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            name_without_extension = os.path.splitext(filename)[0]  # Extracting name without extension
            image_path = os.path.join(folder_path, filename)
            img = Image.open(image_path)
            images_dict[name_without_extension] = img
    # Now image_dict contains images with filenames (without extensions) as keys
    return images_dict


###############################post and get requests################################
@app.get("/")
def get_recommendation(item_id: int, q: str = None):
    return {'some salutation': 'Hii'}


@app.post("/new_user}")
async def create_user(user_pref_data: dict):
    # Process the received user_data (it's a dictionary)
    # save it to a database and perform other operations
    # Generate a random user_id
    user_id = generate_user_id()
    # save to database user's preferences
    # likes chicken, has allergies tomatoes, omnivore
    '''user_descr = "likes {}, has allergies {}, {}".format(", ".join(user_pref_data['likes']),
                                                         ", ".join(user_pref_data['allergies']),
                                                         user_pref_data['preference'])    '''
    user_descr = f"likes {', '.join(user_pref_data['likes'])}, has allergies {', '.join(user_pref_data['allergies'])}, {user_pref_data['preference']}"
    the_database[user_id] = user_descr


@app.get("/recommendations/{user_id}")
def get_recommendation(user_id: int, q: str = None):
    recommendation_list = ask_gpt_recipe_list(sync_client, user_id) # if the function needs it
    return recommendation_list



@app.get("/recommendations/recipe_desc{recipe_name}")
def get_desription(recipe_name: str):
    recom_descr = ask_gpt_recipe_desc(sync_client, recipe_name)
    return {"dish name": recipe_name, "recipe": recom_descr}


@app.get("/image-search/{recipe_name}")
async def image_search(recipe_name: str):
    url = f"https://api.pexels.com/v1/search?query={recipe_name}&per_page=1"
    headers = {"Authorization": PEXELS_API_KEY}

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)

        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Error fetching image from Pexels")

        data = response.json()
        image_url = data["photos"][0]["src"]["medium"] if data["photos"] else None
        return {"image_url": image_url}


if __name__ == '__main__':
    pass
