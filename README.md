# Hustler

React-redux bootstrap webpack Hustler Pool League website, containing mock server & api.

## Running the app

The app uses webpack-dev-server to aid development. Technologies used include babel, immutable for data storage, and mocha and chai for unit testing.

To start the development server with hot reloading enabled, simply run

```
npm start
```

To run the set of unit tests, simply run

```
npm test
```

## Folder structure

### Api project
    
	+++ api
    +-- gameweek.js
    |   .get()
    |   .getByDate(date)
    |   .getByWeekNumber(weekNumber)
    +-- match.js
    |   .get()
    |   .getById(id)
    |   .getForPlayer(playerId, [isPlayed])
    |   .getForPair(playerIds)
    |   .getMatchesForGameWeek(gameWeekNumber, [isPlayed])
    |   .getMatchesForGameWeeks(gameWeekNumbers, [isPlayed])
    +-- player.js
    |   .get()
    |   .getById(id)

This folder contains the mock server calls for the api.

### Database project

	+++ db
    +-- object
    |   +-- gameWeek.js
    |   +-- match.js
    |   +-- player.js
    +-- gameWeeks.js
    +-- matches.js
    +-- players.js

This folder contains the database structure which is called by the functions in the api folder.

### Frontend project

    +++ web
    +-- actions
    |   +-- hustler.js
    +-- components
    |   +-- DisplayTitle.jsx
    |   +-- FixtureList.jsx
    |   +-- FixtureView.jsx
    |   +-- Menu.jsx
    +-- constants
    |   +-- actions.js
    +-- containers
    |   +-- AppContainer.jsx
    +-- reducers
    |   +-- hustler.js
    +-- index.jsx

This folder contains the frontend web files which call the functions in the api folder to get the required data; the data is then utilised by the react components to display the league data.

## Deploying the app

To deploy the app to gh-pages, there are a couple of steps to follow.

1. Run `webpack` command. This will create a `bundle.js` and `bundle.js.map` file in the dist folder.
2. Delete everything except dist folder.
3. Empty contents of dist folder to root directory.
4. Commit and push to gh-pages.
