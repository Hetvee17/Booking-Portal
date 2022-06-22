import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/users/selectors";

// let user = JSON.parse(localStorage.getItem("user")) || null;

function UserPrivateRoute() {
  const { loggedInUser } = useSelector(selectUser);
  let user = loggedInUser
    ? loggedInUser
    : JSON.parse(localStorage.getItem("user")) || null;

  React.useEffect(() => {
    user = JSON.parse(localStorage.getItem("user")) || null;
    // console.log(redirect);
  }, []);
  return user ? <Outlet /> : <Navigate to="/auth/login" />;
}

export default UserPrivateRoute;
