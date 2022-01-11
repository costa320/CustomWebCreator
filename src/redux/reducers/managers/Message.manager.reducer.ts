/* MODELS */
import { Messaggio } from '../../models/Messages';

const Home = (
  state: State = {

    ElencoMessaggi: null,
    loadingMessaggi: true,

    /* drawer */
    drawerVisible: false,
    drawerInEdit: false,
    /* attualmente in uso solo per settare i valori di init non per l'update */
    managerMessaggi: {
      KeyPage: null,
      Message: null,
      Title: null,
      IsDeletable: false, //non forzabile in update
      IsEnabled: false,
      Color: null
    }

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
    case "SET_MANAGER_MESSAGGI":
      newOBJ = {
        ...state.managerMessaggi,
        ...action.payload,
      };
      state = {
        ...state,
        managerMessaggi: newOBJ,
      };
      break;
  }
  return state;
};

export default Home;


/* INTERFACES */

interface State {
  ElencoMessaggi: Array<Messaggio>,
  loadingMessaggi: boolean,

  drawerVisible: boolean,
  drawerInEdit: boolean,
  managerMessaggi: Messaggio/* drawer */
}

interface Action {
  type: string,
  payload: any
}
