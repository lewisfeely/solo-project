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

## hosted version

## project summary

**add link tp project**

**northcoders news project**

<p>
This news project uses an express server hosted on render and has an instance created on supabase, it uses api links to retrive or modify tables created by querying to an sql database in the seed file.<br>

These databases are cerated in a dotenv run time envinronment which diffrentiates between test data and developer data depending on the command run in the terminal.<br>

In this project you retrive and modify all the data found in the data reository found by following
**db -> data -> test-data or development-data**<br>

This project makes use of supertest which takes requests from an app file. This app file pools the data found in the database, created after the seed command has been run (_see in set up below_) ,the pooling method has been used to ensure the database can be accessed by multiple people simultaneously.<br></p>

## how to set up

<ol>
<li>Use command , ~npm i // npm install~ <br>This installs all dependencies from the package json</li>
<li>Create to files called .env.test and a .env.development
which can be done by using the touch command followed by the file name in the terminal</li>
<li>Inside the .env.development file, create a variable named </li>
<li>Run the command ~npm run setup-dbs~ <br>This will create the databases ready to be seeded</li>
<li>Run the ~npm seed~ <br>
his will seed the database with all the data in the seed file and create all of the data tables</li>

</ol>

**Must have node and postgres installed and ensure that postgres is on and running**

install postgres -->[postgres install link](https://www.postgresql.org/download/ "postinstall")<br>
install node -->[installing node link](https://nodejs.org/en/download/package-manager "install node")

run **node -v** to check the version of node <br>
ensure version is at **v22.9.0**

check the **endpoints.json** file to find the expected outputs wanted from certain endpoints

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
