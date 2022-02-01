/* MODELS */
import {
  Section_Autocertificazioni, Section_Messaggi,
} from '../models/Home';

const Manager = (
  state: State = {
    Drawer_CreateNewComponent: {
      dataSource: {},
      visible: false,
      currentStep: 0
    },
    RowConfig: {

    },
    ComponentConfig: {

    },
    ComponentCustomization: {

    },
    APIConfig: {

    },
    Summary: {},

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
    case "SET_DRAWER_CreateNewComponent":
      newOBJ = {
        ...state.Drawer_CreateNewComponent,
        ...action.payload,
      };
      state = {
        ...state,
        Drawer_CreateNewComponent: newOBJ,
      };
      break;
    case "SET_RowConfig":
      newOBJ = {
        ...state.RowConfig,
        ...action.payload,
      };
      state = {
        ...state,
        RowConfig: newOBJ,
      };
      break;
    case "SET_ComponentConfig":
      newOBJ = {
        ...state.ComponentConfig,
        ...action.payload,
      };
      state = {
        ...state,
        ComponentConfig: newOBJ,
      };
      break;
    case "SET_ComponentCustomization":
      newOBJ = {
        ...state.ComponentCustomization,
        ...action.payload,
      };
      state = {
        ...state,
        ComponentCustomization: newOBJ,
      };
      break;
    case "SET_APIConfig":
      newOBJ = {
        ...state.APIConfig,
        ...action.payload,
      };
      state = {
        ...state,
        APIConfig: newOBJ,
      };
      break;
    case "SET_Summary":
      newOBJ = {
        ...state.Summary,
        ...action.payload,
      };
      state = {
        ...state,
        Summary: newOBJ,
      };
      break;
  }
  return state;
};

export default Manager;


/* INTERFACES */

interface State {
  Drawer_CreateNewComponent: any,
  RowConfig: any,
  ComponentConfig: any,
  ComponentCustomization: any,
  APIConfig: any,
  Summary: any,
}

interface Action {
  type: string,
  payload: any
}
