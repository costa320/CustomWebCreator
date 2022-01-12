/* MODELS */
import {
  Section_Autocertificazioni, Section_Messaggi,
} from '../models/Home';

const Site = (
  state: State = {

    /* 1 o 1 ; route <==> page */
    Routes: [
      {
        id: 'home',
        path: '/',
        label: 'Home',
        state: {
          /*   from: '/',
            fromLabel: 'Home' */
        },
        exact: true
      }
    ],

    /* you may have multiple pages that will go to one route */
    Pages: {
      home: {
        routeId: 'home',
        rows: [
          {
            hgutters: 8, /* [0, 2, 4, 8, 16, 24, 32, 40, 48] */
            vgutters: 16, /* [0, 2, 4, 8, 16, 24, 32, 40, 48] */
            colsCounts: 1, /* [1, 2, 3, 4, 6, 8, 12] */
            cols: [
              {
                componentName: 'table',
                componentProps: {},/* depend on choosen component */
                ApiEndpoint: ''
              }
            ]
          }
        ]
      }
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
    /* case "SET_SECTION_AUTOCERTIFICAZIONI":
      newOBJ = {
        ...state.Section_Autocertificazioni,
        ...action.payload,
      };
      state = {
        ...state,
        Section_Autocertificazioni: newOBJ,
      };
      break; */


  }
  return state;
};

export default Site;


/* INTERFACES */

interface State {
  Routes: any,
  Pages: any
}

interface Action {
  type: string,
  payload: any
}
