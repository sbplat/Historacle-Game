# Historacle Game

Test your knowledge of world history with an interactive game! Challenge your friends and family to a battle of the minds - guess the historical event that happened on a given date right in your own browser!

## Inspiration
The immensely popular game Wordle has inspired our team to make a game with a similar aspect of guessing. Since many people play Wordle, we were inspired to create something similar for Wordle players to enjoy while learning about major historical events. Our game, Historacle, retains the basic Wordle style of correct letters, letters in the incorrect position, and completely incorrect letters.

## What it does
At Historacle, our goal is to entertain Wordle fans by changing the subject of the game from guessing English words to guessing famous events in history. To eliminate some possible wrong answers. Historacle gives the player a year. Additionally, the number of boxes shows the user how many characters the event has in its name. In addition to that, Historacle will show the user which letters they got right in the right position, which letters they got right but were not in the right position, and which letters were not in the word. We believe that implementing these features would help narrow the possibilities and make it easier for the player to guess the correct historical event.

## How we built it
Historacle is divided into two sections, the frontend and backend. These two parts form the basis for the Historacle game. The frontend consisted of HTML, CSS, and Javascript, while the backend consisted entirely of Python. When the user loads the website, the frontend sends a GET request to the backend, requesting the year, event length, and hashed answer. Then, the frontend renders the letter boxes onto the website. When the player guesses an event, the frontend sends a post request. The server takes the post request, unhashes the hash, and then responds with the correct words, words in an incorrect position, and whether or not the guess was correct. Finally, the frontend renders the colours for each character and plays an animation. A "you win" message box appears if the guess is correct.

## Challenges we ran into
Although there were many challenges, one that stood out was the addition of animation using CSS. We are extremely proud of being able to overcome this obstacle and have it successfully implemented in Historacle so that the movement of letters is smooth and not sudden.

## Accomplishments that we're proud of
Overall, our group is proud of Historacle. From the smooth animation to the colour coded answers, we believe that our biggest success was the final result and having Historacle running smoothly. We are also proud of being able to overcome all our obstacles.

## What we learned
During the time allotted by the Hackathon, our group learned many important skills. One thing we learned was the importance of effective time management, as we had to finish the project within twelve hours. We also learned that we were more effective when working in a team. Some coding skills we learned were using jQuery for modifying table cells and learning how to use CSS for the smooth Historacle animation.

## What's next for Historacle Game
Moving forward, we are incredibly excited to release this project to the internet. In the future, we wish and hope to make our project very accessible with varying difficulties, so that both newcomers and veterans of history can test their knowledge of historical events. We also wish to make a very versatile web scraper to scrape important historical events from the internet.
