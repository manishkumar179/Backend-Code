import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import React, { useEffect } from "react";
import Public from "./ProtectedRoutes/Public";
import Login from "../pages/Login";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout";
import Protected from "./ProtectedRoutes/Protected";
import Home from "../pages/Home";
import { useDispatch } from "react-redux";
import { currentUser } from "../state/auth/authAction";

const AppRoutes = () => {

    let dispatch = useDispatch();

  useEffect(() => {
    (() => {
      dispatch(currentUser());
    })();
  }, []);


  let router = createBrowserRouter([

    {
      path: "/",
      element: <Public />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
          ],
        },
      ],
    },


    {
        path:"/home",
        element:<Protected/>,
        children:[
            {
                path:"",
                element:<MainLayout/>,
                children:[
                    {
                        path:"",
                        element:<Home/>
                    }
                ]
            }
        ]
    }

  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
