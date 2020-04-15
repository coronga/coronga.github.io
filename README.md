# [contraovirus.com.br](https://contraovirus.com.br)

## Deploy this bot in your language!

You are not only welcome, but also encouraged to deploy this bot in your own language. The bot is completely serverless, so you can host it for free on Github Pages, for example. You are welcome to style it as you wish, and all I ask for is that you keep the footer note stating that this was "Originally built in Portuguese by Yakko Majuri" and the disclaimer that states that the information by the bot cannot constitute medical advice. It goes without saying that if you use this code you can't then blame me for issues and problems that arise along the way - you can see this formally written in the LICENSE.

## About the code...

The code sucks. Yeah, I know. It was built quickly to be released quickly. I also didn't bother with the appropriate structure of files and all. Maybe now that it's been released I can clean it up a bit.

The matching algorithm (if you can even call it an algorithm) is quite primitive and relies on matching user input to some keywords. But hey, it works. So you're welcome to improve upon it, but as long as you set enough and appropriate keywords for the answers, it should do the job.

## How the matching mechanism works

The variable ```questions```is where most of your work will lie. 

Could it be an object? Yes. Could I have used classes to structure it better? Yes. Either way, this is what I have right now. It is structured as follows:

```questions = [List: QUESTION_0, List: QUESTION_1, List: QUESTION_2 ...]```

In turn, each question is composed of the following:

```[String: MAIN_KEYWORD, List: ALL_KEYWORDS, String: QUESTION, String: ANSWER, String: SOURCE, String: LINK_TO_SOURCE]```

The algorithm will:

1. Take the user input
2. Parse it to remove redundant words, punctuation, extra spaces, etc (get rid of noise, keep signal)
3. Check what percentage of the user input matches to the keywords (```questions[1]```) of each question
4. If there are matches of over 10% overlap between input and keywords of a question, these are then displayed as suggestions on the screen (maximum 5 suggestions, ordered by likelihood). This will also happen if one of the user's words matches exactly with the MAIN_KEYWORD.
5. If no matches are found, a mechanism to try and pick up typos is activated. It iterates over every word of the input and checks if it matches to a MAIN_KEYWORD by over 90%. If so, that question is displayed as a suggestion on the screen (e.g. 'symptms' matches to 'symptoms')

And that's it. It's the simple and nasty way I found to match input to data without NLP. 

As such, the way for you to add questions in your own language is to follow the structure above and add questions & answers manually or via web scraping. Most of the work is on ALL_KEYWORDS. Make sure you have enough keywords covering a wide variety of ways a user could ask the same question.

### Good luck!
