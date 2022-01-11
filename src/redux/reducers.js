import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

/* REDUCERS */
import SessionReducer from "./reducers/Session.reducer.ts";
import HomeReducer from "./reducers/Home.reducer.ts";

/* router => MUST be called "router in order to work with connectRouter" */

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    SessionREDUCER: SessionReducer,
    HomeREDUCER: HomeReducer,
  });

export default createRootReducer;
