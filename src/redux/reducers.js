import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

/* REDUCERS */
import SessionReducer from "./reducers/Session.reducer.ts";
import HomeReducer from "./reducers/Home.reducer.ts";
import SiteReducer from "./reducers/Site.reducer.ts";
import ManagerReducer from "./reducers/Manager.reducer";

/* router => MUST be called "router in order to work with connectRouter" */

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    SessionREDUCER: SessionReducer,
    HomeREDUCER: HomeReducer,
    SiteREDUCER: SiteReducer,
    ManagerREDUCER: ManagerReducer,
  });

export default createRootReducer;
