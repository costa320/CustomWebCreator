/* MODELS */
import { Autocertificazione, Autocertificazione_Figlio } from '../../models/Autocertificazioni';

const Home = (
  state: State = {

    Elenco: null,
    loadingElenco: true,

    /* drawer */
    drawerVisible: false,
    drawerInEdit: false,
    drawerLoading: false,
    /* attualmente in uso solo per settare i valori di init non per l'update */
    managerAutocertificazione: {
      Id: null,
      Description: null,
      Required: null,
      IsEnabled: null,
      Type: null,
      Order: null,
      Group: null,
      TipoCausale: null,
      Children: []
    },

    /* drawerChild */
    drawerChildVisible: false,
    drawerChildInEdit: false,
    drawerChildLoading: false,
    managerChildAutocertificazione: {
      Id: null,
      Testo: null,
      Order: null,
      IsEnabled: null,
      Group: null,
      FK_Autocertificazione: null,
      IdTipoCausale: null,
      TipoCausale: null,
      InizioValidita: null,
      FineValidita: null
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
    case "SET_MANAGER_AUTOCERTIFICAZIONE":
      newOBJ = {
        ...state.managerAutocertificazione,
        ...action.payload,
      };
      state = {
        ...state,
        managerAutocertificazione: newOBJ,
      };
      break;
    case "SET_MANAGER_AUTOCERTIFICAZIONE_CHILD":
      newOBJ = {
        ...state.managerChildAutocertificazione,
        ...action.payload,
      };
      state = {
        ...state,
        managerChildAutocertificazione: newOBJ,
      };
      break;
  }
  return state;
};

export default Home;


/* INTERFACES */

interface State {
  Elenco: Array<Autocertificazione>,
  loadingElenco: boolean,

  drawerVisible: boolean,
  drawerInEdit: boolean,
  drawerLoading: boolean,
  managerAutocertificazione: Autocertificazione,  /* drawer */

  drawerChildVisible: boolean,
  drawerChildInEdit: boolean,
  drawerChildLoading: boolean,
  managerChildAutocertificazione: Autocertificazione_Figlio
}

interface Action {
  type: string,
  payload: any
}
