# Utopia Search Service

This microservice will be used by our main APIs to handle searching.

## Setup

1.  Create a `.env` file in this project's root (copy `.env.default` into the `.env` and then
    add values after the `=` for each of the keys)

## Tests

Run `npm test`
**NOTE:** For debugging errors with SQL queries, please add this code `verbose: console.log` 
to the following object (`{memory: true}`) being passed in as a parameter for new 
sqliteDatabase() located in `searchDao.js`, AND all `Spec js` files in the test directory.

## Issues

-   You should not have to run `npm install --verbose`, but if you do you may run into this
    error with installing `better-sqlite3`. If so, you may need to run this command
    `npm i better-sqlite3 --save-dev` (I am not sure about the dev part)
-   **Warning**: If your project or this project is facing problems with dependencies, try 
    `npm audit fix` first please! The reason is because `npm audit` could have you running
    code that changes your npm config instead of the local `package.json`.