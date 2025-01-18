# Northcoders News API

---

## Hosted Version

You can access the hosted version of the API at the following link:  
[Render Host Link](https://solo-project-35gi.onrender.com "Render Hosting").

To run the file on Render, follow the link above and add the desired endpoint (e.g., `/api/articles`) to access the API.

---

## Project Summary

**Northcoders News Project**

This project utilizes an Express server hosted on Render, with an instance created on Supabase. It uses API endpoints to retrieve or modify tables created by querying an SQL database in the seed file.

The database is set up in a dotenv runtime environment, which differentiates between test data and development data depending on the command run in the terminal.

In this project, you can retrieve and modify data found in the data repository by following the structure:  
**`db -> data -> test-data`** or **`db -> data -> development-data`**.

This project makes use of **Supertest** to handle requests from the app file. The app file pools the data found in the database, which is created after the seed command is run (see setup below). The pooling method ensures that the database can be accessed by multiple users simultaneously.

---

## Setup Instructions

1.  Install all dependencies by running the following command:
    ```bash
    npm install
    ```
2.  create two new files in the terminal in the main scope of the repository you can do this by running the command

    ```bash
    touch .env.test .env.development
    ```

3.  Inside the .env.development file, create a variable named

    ```bash
    PGDATABASE=nc_news
    ```

4.  Run the command

    ```bash
    npm run setup-dbs
    ```

    This will create the databases ready to be seeded

5.  Run the

    ```bash
    npm seed
    ```

his will seed the database with all the data in the seed file and create all of the data tables</li>

**Must have node and postgres installed and ensure that postgres is on and running**

install postgres -->[postgres install link](https://www.postgresql.org/download/ "postinstall")<br>
install node -->[installing node link](https://nodejs.org/en/download/package-manager "install node")

run **node -v** to check the version of node <br>
ensure version is at **v22.9.0**

check the **endpoints.json** file to find the expected outputs wanted from certain endpoints

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
