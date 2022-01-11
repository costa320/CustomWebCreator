import { Causale, Pagamento, Lavoratore, Fondo, Domanda, StatoDomanda } from './../../models/Tipologiche';
/* MODELS */
import { Prestazione } from '../../models/Tipologiche';

const PrestazioneReducer = (
  state: State = {

    /* Elenco Managers */
    Prestazioni: {
      Elenco: null,
      loadingElenco: true,

      /* drawer */
      drawerVisible: false,
      drawerInEdit: false,
      /* attualmente in uso solo per settare i valori di init non per l'update */
      managerDrawer: {
        Id: null,
        Name: '',
        TipoTicket: '',
        IsEnable: false,
        Codice: '',
        Titolario: ''
      }
    },
    Causali: {
      Elenco: null,
      loadingElenco: true,

      /* drawer */
      drawerVisible: false,
      drawerInEdit: false,
      /* attualmente in uso solo per settare i valori di init non per l'update */
      managerDrawer: {
        Id: null,
        Name: null,
        DataDal: null, /* "/Date(1594591200000)/" */
        DataAl: null, /* "/Date(1594591200000)/" */
        Anno: null,
        DataAssunzione: null, /* "/Date(1594591200000)/" */
        NumeroSettimane: null,
        TipoPrestazione: null,
        LimitePresentazioneInGiorni: null,
        ExternalRef: null
      }
    },
    Pagamenti: {
      Elenco: null,
      loadingElenco: true,

      /* drawer */
      drawerVisible: false,
      drawerInEdit: false,
      /* attualmente in uso solo per settare i valori di init non per l'update */
      managerDrawer: {
        Id: null,
        Name: null,
        Codifica: null,
        IsAnticipo: false
      }
    },
    Lavoratori: {
      Elenco: null,
      loadingElenco: true,

      /* drawer */
      drawerVisible: false,
      drawerInEdit: false,
      /* attualmente in uso solo per settare i valori di init non per l'update */
      managerDrawer: {
        IdTipoLavoratore: null,
        Descrizione: null
      }
    },
    Fondi: {
      Elenco: null,
      loadingElenco: true,

      /* drawer */
      drawerVisible: false,
      drawerInEdit: false,
      /* attualmente in uso solo per settare i valori di init non per l'update */
      managerDrawer: {
        Id: null,
        Name: null,
        Order: null,
        IdPrestazione: null,
        Prestazione: null,
        Codice: null,
        Sigla: null
      }
    },
    Domande: {
      Elenco: null,
      loadingElenco: true,

      /* drawer */
      drawerVisible: false,
      drawerInEdit: false,
      /* attualmente in uso solo per settare i valori di init non per l'update */
      managerDrawer: {
        Id: null,
        Name: null
      }
    },
    StatiDomanda: {
      Elenco: null,
      loadingElenco: true,

      /* drawer */
      drawerVisible: false,
      drawerInEdit: false,
      /* attualmente in uso solo per settare i valori di init non per l'update */
      managerDrawer: {
        Id: null,
        Codice: null,
        Descrizione: null
      }
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

    case "SET_GENERAL_PRESTAZIONI": state = generateGeneralNewStateObj('Prestazioni', state, action.payload); break;
    case "SET_MANAGER_PRESTAZIONI": state = generateManagerNewStateObj('Prestazioni', state, action.payload); break;

    case "SET_GENERAL_CAUSALI": state = generateGeneralNewStateObj('Causali', state, action.payload); break;
    case "SET_MANAGER_CAUSALI": state = generateManagerNewStateObj('Causali', state, action.payload); break;

    case "SET_GENERAL_PAGAMENTI": state = generateGeneralNewStateObj('Pagamenti', state, action.payload); break;
    case "SET_MANAGER_PAGAMENTI": state = generateManagerNewStateObj('Pagamenti', state, action.payload); break;

    case "SET_GENERAL_LAVORATORI": state = generateGeneralNewStateObj('Lavoratori', state, action.payload); break;
    case "SET_MANAGER_LAVORATORI": state = generateManagerNewStateObj('Lavoratori', state, action.payload); break;

    case "SET_GENERAL_FONDI": state = generateGeneralNewStateObj('Fondi', state, action.payload); break;
    case "SET_MANAGER_FONDI": state = generateManagerNewStateObj('Fondi', state, action.payload); break;

    case "SET_GENERAL_DOMANDE": state = generateGeneralNewStateObj('Domande', state, action.payload); break;
    case "SET_MANAGER_DOMANDE": state = generateManagerNewStateObj('Domande', state, action.payload); break;

    case "SET_GENERAL_STATI_DOMANDA": state = generateGeneralNewStateObj('StatiDomanda', state, action.payload); break;
    case "SET_MANAGER_STATI_DOMANDA": state = generateManagerNewStateObj('StatiDomanda', state, action.payload); break;

  }
  return state;
};


/* state name is name of first level obj inside state{} */
function generateGeneralNewStateObj(stateName: string, actualState: any, payload: any) {
  return {
    ...actualState,
    [stateName]: {
      ...actualState[stateName],
      ...payload,
    },
  };
}

function generateManagerNewStateObj(stateName: string, actualState: any, payload: any) {
  return {
    ...actualState,
    [stateName]: {
      ...actualState[stateName],
      managerDrawer: { ...payload },
    },
  };
}


export default PrestazioneReducer;


/* INTERFACES */

interface State {
  Prestazioni: {
    Elenco: Array<Prestazione>,
    loadingElenco: boolean,

    drawerVisible: boolean,
    drawerInEdit: boolean,
    managerDrawer: Prestazione/* drawer */
  },
  Causali: {
    Elenco: Array<Causale>,
    loadingElenco: boolean,

    drawerVisible: boolean,
    drawerInEdit: boolean,
    managerDrawer: Causale/* drawer */
  },
  Pagamenti: {
    Elenco: Array<Pagamento>,
    loadingElenco: boolean,

    drawerVisible: boolean,
    drawerInEdit: boolean,
    managerDrawer: Pagamento/* drawer */
  },
  Lavoratori: {
    Elenco: Array<Lavoratore>,
    loadingElenco: boolean,

    drawerVisible: boolean,
    drawerInEdit: boolean,
    managerDrawer: Lavoratore/* drawer */
  },
  Fondi: {
    Elenco: Array<Fondo>,
    loadingElenco: boolean,

    drawerVisible: boolean,
    drawerInEdit: boolean,
    managerDrawer: Fondo/* drawer */
  },
  Domande: {
    Elenco: Array<Domanda>,
    loadingElenco: boolean,

    drawerVisible: boolean,
    drawerInEdit: boolean,
    managerDrawer: Domanda/* drawer */
  },
  StatiDomanda: {
    Elenco: Array<StatoDomanda>,
    loadingElenco: boolean,

    drawerVisible: boolean,
    drawerInEdit: boolean,
    managerDrawer: StatoDomanda/* drawer */
  },
}




interface Action {
  type: string,
  payload: any
}
