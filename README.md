## Get Started
First, follow the README file in backend. You will need a ChatGPT API Key to bring the backend up!
When it's up, cd to frontend, and them
npm install
npm start

A browser window should open up with Remy already in it!

## REMY
![Remy](frontend/public/remy.png)

## Inspiration
Our group was mainly inspired by the versatility offered from machine learning models, as well as the colourful variety that the culinary world offers. We wanted to do something different than just bringing the customer to a pre-defined recipe that is likely to be fitting. Therefore, we decided to bring the recipe to the user - not limiting us to a finite dataset of foods, but rather generating a set of recipes created just for the user.
## What it does
Essentially, REMY collects data from the user and creates a unique taste profile just for them. This data is collected directly from what the consumer tells us during registration (general preferences like vegetarianism or applicable allergens), as well as from the user's interactions with the platform - REMY remembers what foods the user has chosen in the past and queries the user after each week about how much they enjoyed their meals, in order to continuously update and improve the taste profile.

After collecting information about the user, this information is analyzed by an MLM in order to create an accurate user taste profile. This taste profile is then again fed into an MLM that then analyzes it and gives back a set of recipes that it deems the most fitting for the user. 
## How we built it
For the backend, we employ FastAPI as well as Python in order to communicate with the OpenAI API. Through this API, we interface with ChatGPT in order to process all of our queries, beginning with the taste profile and ending with the specific steps of the cooking recipe. 

For the frontend, we have chosen to use React and we program everything relating to the user interface in JavaScript.
## Challenges we ran into
Beginning with issues with the frontend not cooperating with us and ending with ChatGPT's often inexplicably weird and unexpected behaviour, the developmental proces made us face many difficulties. However, we were able to overcome almost all of our issues and came out the other more knowledgable of front-ends as well as of the nature of querying language models like ChatGPT.
## Accomplishments that we're proud of
Having the information we input be analyzed and receiving recipes on the fly that fit our inputs felt really impressive, especially given the fact that none of us had any real experience interfacing with OpenAI's API. Outside of that, getting the backed to cooperate 
## What we learned
Every single member of our team was forced to leave our comfort zones and face something challenging. However, the largest learning to be done was in the field of AI text generation as well as in creating an appealing user experience.
## What's next for Remy
Remy has tons of room for expansion. One of the biggest advantages of our approach is the generalist nature of MLM language models like ChatGPT. The way we programmed it, it is trivially easy to add additional criteria that has to be evaluated, like, for example, the sustainability of different meals or the kalorical intake of the user. It would also be possible for the component of the meal to be adjusted on the fly or for Remy to keep track of your meal diversity. Another interesting idea would be to use Stable Diffusion to generate images of the food from the newly-generated recipes on the fly; however, this is not yet realistically implementable due to the high computational complexity of such generation, although it is just a question of time when this sort of generation becomes feasable to be implemented in a use scenario like ours.
