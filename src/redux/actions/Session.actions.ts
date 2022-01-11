import { Routes } from '../reducers/Session.reducer';



export function RESET_ALL_REDUCERS() {
  return { type: 'USER_LOGOUT', payload: '' }
}


export function set_session(session: any) {
  /* CHIAMATA AJAX QUI */
  return { type: "SET_SESSION", payload: session };
}

export function Set_user(userProperties: any) {
  /* CHIAMATA AJAX QUI */
  return { type: "SET_USER", payload: userProperties };
}

export function SetRoutes(arrRoutes: Routes) {
  /* CHIAMATA AJAX QUI */
  return { type: "SET_ROUTES", payload: arrRoutes };
}
