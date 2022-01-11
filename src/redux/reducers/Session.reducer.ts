const Session = (
  state: State = {
    session: null,
    routes: {
      /* real-routes */
      baseRoutes: [],
      /* user-menu-routes */
      routes: {}
    },
    user: {
      matricola: null,
      nominativo: null,
      ruoloidm: null
    }
  },
  action: Action
) => {
  switch (action.type) {
    case "SET_SESSION":
      state = {
        ...state,
        session: action.payload,
      };
      break;
    case "SET_USER":
      /* TODO: remake this part => it doesnt let componentDidUpdate to notice the change
      need to be done like SET_SESSION */
      state.user = action.payload;
      break;
    case "SET_ROUTES":
      state.routes = action.payload;
      break;
  }
  return state;
};

export default Session;


/* INTERFACES */

interface State {
  session: any,
  routes: {
    /* real-routes */
    baseRoutes: Array<Route>,
    /* user-menu-routes */
    routes: any
  },
  user: User
}

interface Action {
  type: string,
  payload: any
}

export interface Route {
  path?: string;
  component: any;
  key: any,
  exact?: boolean,
  label?: string
}
export interface User {
  matricola: string
  nominativo: string
  ruoloidm: string
}