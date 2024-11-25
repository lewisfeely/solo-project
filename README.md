# Northcoders News API

---

create two files in the global scope with the preifx .env
one called .env.test and another called .end.development

app.test.js file
the acceptaable queries for the /api is none.

the acceptable queries for the /api/topics are also none.
an example response for the /api topics api is:
"exampleResponse": {
"topics": [{ "slug": "football", "description": "Footie!" }]
}

the acceptable queries for the /api/articles are author, topic, sort_by, and order.
an example response for the articles api is:
"exampleResponse": {
"articles": [
{
"title": "Seafood substitutions are increasing",
"topic": "cooking",
"author": "weegembump",
"body": "Text from the article..",
"created_at": "2018-05-30T15:59:13.341Z",
"votes": 0,
"comment_count": 6
}
]
}

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
