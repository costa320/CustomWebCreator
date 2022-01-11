import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

/* REDUCERS */
import SessionReducer from "./reducers/Session.reducer.ts";
import HomeReducer from "./reducers/Home.reducer.ts";
import LogsReducer from "./reducers/Logs.reducer.ts";
/* MANAGERS */
import MessageManagerReducer from "./reducers/managers/Message.manager.reducer";
import AutocertificazioniReducer from "./reducers/managers/Autocertificazioni.manager.reducer";
import TipologicheReducer from "./reducers/managers/Tipologiche.manager.reducer";

/* router => MUST be called "router in order to work with connectRouter" */

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    SessionREDUCER: SessionReducer,
    HomeREDUCER: HomeReducer,
    LogsReducerREDUCER: LogsReducer,
    MessageManagerREDUCER: MessageManagerReducer,
    AutocertificazioniManagerREDUCER: AutocertificazioniReducer,
    TipologicheManagerREDUCER: TipologicheReducer,
  });

export default createRootReducer;
