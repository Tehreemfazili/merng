import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';


import { AuthContext } from '../context/auth';

function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  console.log(user)
  return (
    <Routes>
        <Route
            {...rest}
            render={(props) =>
                user ? <Navigate to="/hello" /> : <Navigate to="/hello" />
            }
            />
    </Routes>
  );
}

//for avoide visiting register and login page

export default AuthRoute;