import * as React from 'react';
/* MODELS */
import {
  Section_Autocertificazioni, Section_Messaggi,
} from '../models/Home';

const Site = (
  state: State = {
    Routes: [
      {
        id: 'home',
        path: '/',
        label: 'Home',
        state: {},
        exact: true
      },
    ],

    /* you may have multiple pages that will go to one route */
    Pages: {
      home: {
        routeId: 'home',
        rows: []
      }
    },
    CurrentPage: {
      routeId: 'home',
      rows: []
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
    case "SET_CurrentPage":
      newOBJ = {
        ...state.CurrentPage,
        ...action.payload,
      };
      state = {
        ...state,
        CurrentPage: newOBJ,
      };
      break;


  }
  return state;
};

export default Site;


/* INTERFACES */

interface State {
  Routes: any,
  Pages: any,
  CurrentPage: any
}

interface Action {
  type: string,
  payload: any
}
