# SkinResQ

## Prerequisites

You'll need a mongodb running. To run it from docker use:

`docker run --name SkinResque -p 27017-27019:27017-27019 -d mongo:latest`

You can use .env file to customise how the app operates. Possible choices are:

1. `PORT` - used for listening for requests
2. `DB_HOST` - Address for the DB instance
3. `DB_PORT` - Port for the DB instance

## Running the app

Currently to start app you need to build the app. You can do it by running this command: 

`npm run build`

To run the project as whole use:

`npm run start`

To run individual files use:

`npm run moduleRun -- file-name-here`