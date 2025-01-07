# Plant Tracker

A webapp to track when to water your house plants and other things related to plant health

# Goals

1. Create a web app where users can enter their house plants and track things like when it was last watered

# Technical

1. Back end will be an Nest JS server
2. Front end will be plain react
3. DB will be Supabase

# Plan of Action

1. Set up the Node JS server and handle basic authentication with Supabase.
2. Set up the data model for the web app and DB tables
3. Set up the front end

# APIs

## Authentication

| **Method** | **Endpoint**             |
| ---------- | ------------------------ |
| POST       | `authentication/signup`  |
| POST       | `authentication/signin`  |
| POST       | `authentication/signout` |
| POST       | `authentication/user`    |

## Database

| **Method** | **Endpoint**     |
| ---------- | ---------------- |
| GET        | `db/plant`       |
| DELETE     | `db/deleteplant` |
| PATCH      | `db/updateplant` |
| POST       | `db/addplant`    |
