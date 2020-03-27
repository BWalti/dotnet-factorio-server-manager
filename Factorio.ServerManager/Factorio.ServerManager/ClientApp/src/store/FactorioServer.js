"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
exports.actionCreators = {
    requestServerState: function () { return function (dispatch, getState) {
        // Only load data if it's something we don't already have (and are not already loading)
        var appState = getState();
        fetch("api/serverManager")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            dispatch({ type: "RECEIVE_SERVER_STATE", isRunning: data.isRunning });
        });
        return appState;
    }; }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return { isRunning: false };
    }
    var action = incomingAction;
    switch (action.type) {
        case "REQUEST_SERVER_STATE":
            return {
                isRunning: state.isRunning
            };
        case "RECEIVE_SERVER_STATE":
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                isRunning: action.isRunning
            };
        default:
            return state;
    }
};
//# sourceMappingURL=FactorioServer.js.map