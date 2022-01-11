/* MODELS */
import {
  Section_Autocertificazioni, Section_Messaggi, Section_Prestazioni, Section_Causali, Section_Pagamenti, Section_Lavoratori, Section_Domande, Section_Fondi, Section_StatiDomanda,
} from '../models/Home';

const Home = (
  state: State = {
    Section_Autocertificazioni: {
      ElencoAutocertificazioni: null,
      loadingAutocertificazioni: true
    },
    Section_Messaggi: {
      ElencoMessaggi: null,
      loadingMessaggi: true
    },
    Section_Prestazioni: {
      ElencoPrestazioni: null,
      loadingPrestazioni: true
    },
    Section_Causali: {
      ElencoCausali: null,
      loadingCausali: true
    },
    Section_Pagamenti: {
      ElencoPagamenti: null,
      loadingPagamenti: true
    },
    Section_Lavoratori: {
      ElencoLavoratori: null,
      loadingLavoratori: true
    },
    Section_Fondi: {
      ElencoFondi: null,
      loadingFondi: true
    },
    Section_Domande: {
      ElencoDomande: null,
      loadingDomande: true
    },
    Section_StatiDomanda: {
      ElencoStatiDomanda: null,
      loadingStatiDomanda: true
    },
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
    case "SET_SECTION_AUTOCERTIFICAZIONI":
      newOBJ = {
        ...state.Section_Autocertificazioni,
        ...action.payload,
      };
      state = {
        ...state,
        Section_Autocertificazioni: newOBJ,
      };
      break;
    case "SET_SECTION_MESSAGGI":
      newOBJ = {
        ...state.Section_Messaggi,
        ...action.payload,
      };
      state = {
        ...state,
        Section_Messaggi: newOBJ,
      };
      break;
    case "SET_SECTION_PRESTAZIONI":
      newOBJ = {
        ...state.Section_Prestazioni,
        ...action.payload,
      };
      state = {
        ...state,
        Section_Prestazioni: newOBJ,
      };
      break;
    case "SET_SECTION_CAUSALI":
      newOBJ = {
        ...state.Section_Causali,
        ...action.payload,
      };
      state = {
        ...state,
        Section_Causali: newOBJ,
      };
      break;
    case "SET_SECTION_PAGAMENTI":
      newOBJ = {
        ...state.Section_Pagamenti,
        ...action.payload,
      };
      state = {
        ...state,
        Section_Pagamenti: newOBJ,
      };
      break;
    case "SET_SECTION_LAVORATORI":
      newOBJ = {
        ...state.Section_Lavoratori,
        ...action.payload,
      };
      state = {
        ...state,
        Section_Lavoratori: newOBJ,
      };
      break;
    case "SET_SECTION_FONDI":
      newOBJ = {
        ...state.Section_Fondi,
        ...action.payload,
      };
      state = {
        ...state,
        Section_Fondi: newOBJ,
      };
      break;
    case "SET_SECTION_DOMANDA":
      newOBJ = {
        ...state.Section_Domande,
        ...action.payload,
      };
      state = {
        ...state,
        Section_Domande: newOBJ,
      };
      break;
    case "SET_SECTION_STATI_DOMANDA":
      newOBJ = {
        ...state.Section_StatiDomanda,
        ...action.payload,
      };
      state = {
        ...state,
        Section_StatiDomanda: newOBJ,
      };
      break;
  }
  return state;
};

export default Home;


/* INTERFACES */

interface State {
  Section_Autocertificazioni: Section_Autocertificazioni,
  Section_Prestazioni: Section_Prestazioni,
  Section_Messaggi: Section_Messaggi
  Section_Causali: Section_Causali,
  Section_Pagamenti: Section_Pagamenti,
  Section_Lavoratori: Section_Lavoratori,
  Section_Fondi: Section_Fondi,
  Section_Domande: Section_Domande,
  Section_StatiDomanda: Section_StatiDomanda,
}

interface Action {
  type: string,
  payload: any
}
