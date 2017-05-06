# Redux Saga Persistence example

This example shows how a persistence mechanism can be implemented by using Redux Sagas. 

Check the code for the persistence saga [here](https://github.com/jportela/redux-saga-persistence/blob/master/src/sagas/persistence.js). I've [written a blog post](http://engineering.invisionapp.com/post/persist-redux-state-by-using-sagas/) detailing the process on how to implement it.

Watch the example at work here: http://www.joaoportela.com/redux-saga-persistence

## Update Notes

At the time the blog post was created, the `redux-saga` project was running at version `0.9.5`. Over the past year the library changed quite a bit, with some breaking changes, so I updated the example code to work with the most recent version of the library (`15.0.3` at the moment). The blog post wasn't updated though, if you want to check the exact version of the example that was working on `0.9.5` check https://github.com/jportela/redux-saga-persistence/tree/0.9.5

The following changes were done:

* Changed from `fork` to `spawn`, because we want to keep the process detached
* Added the `sagaMiddleware.run(sagas);` to the store
* Simplified the `Lock` system by removing `isLocked` since the `<Task>.isRunning()` method provides similar functionality
* Removed the try/catch block in `debounceSave` because 
* Updated webpack from v1 to v2
* Added yarn as the dependency manager

All changes can be seen in this PR: https://github.com/jportela/redux-saga-persistence/pull/2

## Scope

This persistence mechanism uses the local storage as an example, but it's intended to be used with a server (for true asynchronous persistence). It assumes that you’ll save the whole state to the server (although you can easily select just a subset of it). The save operation follows these requirements:

* There must be a whitelist of actions (only actions on the whitelist will trigger a save)
* Some actions (such as dragging an image) should be debounced, in order to only trigger a save operation to the server after an amount of time
* Other actions (such as creating an image) should save immediately
* There should be an “unsaved changes” indicator on the UI, that is displayed when a change is first recorded and hidden when a successful save response is received from the server

## Running the example

This example was tested using Node 4 for the build/dev process.

1. Clone this repository
2. Run `yarn install` or `npm install`
3. Run `npm start`

The example should be available at http://localhost:8080

## Preparing this example for production

1. Run `npm run build` which will generate the required /static files
