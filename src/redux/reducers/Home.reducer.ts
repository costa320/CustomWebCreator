/* MODELS */
import {
  Section_Autocertificazioni, Section_Messaggi,
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
  }
  return state;
};

export default Home;


/* INTERFACES */

interface State {
  Section_Autocertificazioni: Section_Autocertificazioni,
  Section_Messaggi: Section_Messaggi
}

interface Action {
  type: string,
  payload: any
}
