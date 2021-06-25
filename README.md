# Class Survey Exercise

We're going to create an app to rank our understanding of the following topics:

* HTML
* CSS
* Javascript
* PostgreSQL
* Node
* Express

We'll rank our understanding of the topics using the following 5 point scale:

* Awesome
* Great
* Good
* Okay
* Poor
* Unranked

## Scaffold The Database

`rankings` table

* `rankings` table with columns
  * `id` (This is the PRIMARY KEY, it's REFERENCED by `topics.topic_score`)
  * `ranking_title` (This  is a `text` field that will contain a word like "GREAT" or "GOOD")

`topics` table

* `topics` table with columns
  * `id`
  * `topic_name` (this is a `text` field)
  * `topic_score` (this is a FOREIGN KEY value with a REFERENCE to the `rankings` PRIMARY KEY)

### Create a Schema

* Write a `schema.sql` file to create tables to match the requirements above.
* You'll want to create the `rankings` table first and _then_ the `topics` table (because the `topics` table contains a reference to the `rankings` table).

### Seed the Data

* Write a `seed.sql` file to add data to the tables, use the topics and rankings from above to populate the data.

## Project Setup

* Make a folder called `class_survey`
* Make a folder called `sql` to store the `schema.sql` and `seed.sql` files
* Run `npm init -y` in the `class_survey` folder.
* Edit `package.json` to add the necessary `npm` scripts to `init`, `seed` and/or `drop` and `reset` the database. (REMINDER: The sql files are in the `class_survey/sql` directory!)
* Create a `class_survey` database either locally, or on ElephantSQL.
