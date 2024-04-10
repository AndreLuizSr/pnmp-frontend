import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/loader/Loadable";
/****Layouts*****/
const FullLayout = Loadable(lazy(() => import("../layouts/FullLayout")));
const BlankLayout = Loadable(lazy(() => import("../layouts/BlankLayout")));
/***** Pages ****/

const Dashboard = Loadable(lazy(() => import("../views/Dashboard")));

/***** User Pages ****/
const User = Loadable(lazy(() => import("../views/user/Users")));
const UserCreate  = Loadable(lazy(() => import("../views/user/UserCreate")));
const UserEdit  = Loadable(lazy(() => import("../views/user/UserEdit")));

/***** Permission Pages ****/
const Permission = Loadable(lazy(() => import("../views/permission/permission")));
const CreatePermission = Loadable(lazy(() => import("../views/permission/create/createPermission")));
const EditPermission = Loadable(lazy(() => import("../views/permission/edit/editPermission")));

/***** Auth Pages ****/
const Error = Loadable(lazy(() => import("../views/auth/Error")));
/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },

      /***** User Pages ****/
      { path: "/user", exact: true, element: <User/> },
      { path: "/user/create", exact: true, element: <UserCreate /> },    
      { path: "/user/edit/:_id", exact: true, element: <UserEdit /> },    

      /***** Permission Pages ****/
      { path: "/permission", exact: true, element: <Permission/> },
      { path: "/createPermission", exact: true, element: <CreatePermission/> },
      { path: "/editPermission/:name", exact: true, element: <EditPermission /> },
      
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default ThemeRoutes;
