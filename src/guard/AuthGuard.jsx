import {
  Outlet,
  Navigate
} from "react-router";

import Cookies from "universal-cookie";

const AuthGuard = ()=>{
  const cookie = new Cookies();
  let isLogged = false;
  const user = cookie.get("authToken");
  if(user)
  {
    isLogged = true;
  }
  else {
    isLogged = false;
  }
  return isLogged ? <Outlet /> : <Navigate to="/login" />
}

export default AuthGuard;
