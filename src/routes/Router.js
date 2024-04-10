import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/loader/Loadable";
/****Layouts*****/
const FullLayout = Loadable(lazy(() => import("../layouts/FullLayout")));
const BlankLayout = Loadable(lazy(() => import("../layouts/BlankLayout")));
/***** Pages ****/

const Starter = Loadable(lazy(() => import("../views/Starter")));
const About = Loadable(lazy(() => import("../views/About")));
const Alerts = Loadable(lazy(() => import("../views/ui/Alerts")));
const Badges = Loadable(lazy(() => import("../views/ui/Badges")));
const Buttons = Loadable(lazy(() => import("../views/ui/Buttons")));
const Cards = Loadable(lazy(() => import("../views/ui/Cards")));
const Grid = Loadable(lazy(() => import("../views/ui/Grid")));
const Tables = Loadable(lazy(() => import("../views/ui/Tables")));
const Forms = Loadable(lazy(() => import("../views/ui/Forms")));
const Breadcrumbs = Loadable(lazy(() => import("../views/ui/Breadcrumbs")));

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
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/ui/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },

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
