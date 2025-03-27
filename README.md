# Plant Tracker

A webapp to track when to water your house plants and other things related to plant health

# Goals

1. Create a web app where users can enter their house plants and track things like when it was last watered

# Technical

1. Back end will be an Nest JS server
2. Front end will be plain react
3. DB will be Supabase

# APIs

## Authentication

All APIs require the users id to be passed as a query param, ?id="1234"

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
| POST       | `db/waterplant`  |

## Utils

| **Method** | **Endpoint**       |
| ---------- | ------------------ |
| GET        | `utils/getweather` |

# Deployment

Both backend and frontend deployed on Raspberry PI 5 4gb
Idle at ~1.3GB RAM usage

## Build and deploy commands

## Backend

npm run build
node dist/main.js

## Frontend

npm run build
serve --single dist -p 5005
(Using npm serve to serve the files instead of NGINX)
(--single important for react-router to work)

Useful commands
htop - monitor RAM usage on raspberry pi
