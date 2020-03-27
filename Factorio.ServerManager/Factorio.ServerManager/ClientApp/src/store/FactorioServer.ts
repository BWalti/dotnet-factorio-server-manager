import { Action, Reducer } from "redux";
import { AppThunkAction } from "./";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface FactorioServerState {
    isRunning: boolean;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestServerStateAction {
    type: "REQUEST_SERVER_STATE";
}

interface ReceiveServerStateAction {
    type: "RECEIVE_SERVER_STATE";
    isRunning: boolean;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestServerStateAction | ReceiveServerStateAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestServerState: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();

        fetch(`api/serverManager`)
            .then(response => response.json() as Promise<FactorioServerState>)
            .then(data => {
                dispatch({ type: "RECEIVE_SERVER_STATE", isRunning: data.isRunning });
            });

        return appState;
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<FactorioServerState> =
    (state: FactorioServerState | undefined, incomingAction: Action): FactorioServerState => {
        if (state === undefined) {
            return { isRunning: false };
        }

        const action = incomingAction as KnownAction;
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