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
const UserCreate = Loadable(lazy(() => import("../views/user/UserCreate")));
const UserEdit = Loadable(lazy(() => import("../views/user/UserEdit")));

/***** Permission Pages ****/
const Permission = Loadable(lazy(() => import("../views/permission/Permission")));
const PermissionCreate = Loadable(lazy(() => import("../views/permission/PermissionCreate")));
const PermissionEdit = Loadable(lazy(() => import("../views/permission/PermissionEdit")));

/***** Units Pages ****/
const Units = Loadable(lazy(() => import("../views/units/Units")))
const UnitsStates = Loadable(lazy(() => import("../views/units/UnitsStates")))
const UnitsCity = Loadable(lazy(() => import("../views/units/UnitsCity")))
const UnitsCreate = Loadable(lazy(() => import("../views/units/UnitsCreate")))
const UnitsEdit = Loadable(lazy(() => import("../views/units/UnitsEdit")))

/***** Institutions Pages ****/
const Institution = Loadable(lazy(() => import("../views/institution/Institution")));
const InstitutionCreate = Loadable(lazy(() => import("../views/institution/InstitutionCreate")));
const InstitutionEdit = Loadable(lazy(() => import("../views/institution/InstitutionEdit")));

/***** Events Pages ****/
const Events = Loadable(lazy(() => import("../views/events/Events")));

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
      { path: "/user", exact: true, element: <User /> },
      { path: "/user/create", exact: true, element: <UserCreate /> },
      { path: "/user/edit/:_id", exact: true, element: <UserEdit /> },

      /***** Permission Pages ****/
      { path: "/permission", exact: true, element: <Permission /> },
      { path: "/permission/create", exact: true, element: <PermissionCreate /> },
      { path: "/permission/edit/:_id", exact: true, element: <PermissionEdit /> },

      /***** Units Pages ****/
      { path: "/units", exact: true, element: <Units /> },
      { path: "/unitsStates", exact: true, element: <UnitsStates /> },
      { path: "/unitsCity", exact: true, element: <UnitsCity /> },
      { path: "/units/create", exact: true, element: <UnitsCreate /> },
      { path: "/units/edit/:_id", exact: true, element: <UnitsEdit /> },

      /***** Institutions Pages ****/
      { path: "/institution", exact: true, element: <Institution /> },
      { path: "/institution/create", exact: true, element: <InstitutionCreate /> },
      { path: "/institution/edit/:_id", exact: true, element: <InstitutionEdit /> },

      /***** Events Pages ****/
      { path: "/events", exact: true, element: <Events /> },

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
