# Redux Saga Persistence example

This example shows how a persistence mechanism can be implemented by using Redux Sagas. 

Check the code for the persistence saga [here](https://github.com/jportela/redux-saga-persistence/blob/master/src/sagas/persistence.js). I've [written a blog post](http://engineering.invisionapp.com/post/persist-redux-state-by-using-sagas/) detailing the process on how to implement it.

Watch the example at work here: http://www.joaoportela.com/redux-saga-persistence

## Scope

This persistence mechanism uses the local storage as an example, but it's intended to be used with a server (for true asynchronous persistence). It assumes that you’ll save the whole state to the server (although you can easily select just a subset of it). The save operation follows these requirements:

* There must be a whitelist of actions (only actions on the whitelist will trigger a save)
* Some actions (such as dragging an image) should be debounced, in order to only trigger a save operation to the server after an amount of time
* Other actions (such as creating an image) should save immediately
* There should be an “unsaved changes” indicator on the UI, that is displayed when a change is first recorded and hidden when a successful save response is received from the server

## Running the example

This example was tested using Node 4 for the build/dev process.

1. Clone this repository
2. Run `npm install`
3. Run `npm start`

The example should be available at http://localhost:8080

## Preparing this example for production

1. Run `npm run build` which will generate the required /static files
