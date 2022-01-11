/* MODELS */
import { ElencoLogs, SingleLog } from '../models/Logs';

const Home = (
  state: State = {
    ElencoLogs: null,
    formattedElencoLogs: '',
    SelectedLog: null,

    ExistedLevels: []
  },
  action: Action
) => {
  let newOBJ: any = {}
  switch (action.type) {
    case "SET_DATI_REDUX":
      newOBJ = {
        ...state,
        ...action.payload,
      };
      state = {
        ...state,
        ...newOBJ,
      };
      break;

  }
  return state;
};

export default Home;


/* INTERFACES */

interface State {
  ElencoLogs: ElencoLogs,
  formattedElencoLogs: string
  SelectedLog: SingleLog
  ExistedLevels: Array<string>
}

interface Action {
  type: string,
  payload: any
}
