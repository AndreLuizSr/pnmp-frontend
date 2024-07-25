import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/loader/Loadable';
import ProtectedRoute from '../views/auth/ProtectedRoute';

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

/***** Forms Steps ****/
const Steps = Loadable(lazy(() => import("../views/patientCase/Steps")))

/***** Events Pages ****/
const Events = Loadable(lazy(() => import("../views/events/Events")));

/***** Auth Pages ****/
const Error = Loadable(lazy(() => import("../views/auth/Error")));
const LoginFormik = Loadable(lazy(() => import('../views/auth/LoginFormik')));
/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <Navigate to="/auth/login" />,
  },
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/dashboard", exact: true, element: <ProtectedRoute element={<Dashboard />} /> },

      /***** User Pages ****/
      { path: "/user", exact: true, element: <ProtectedRoute element={<User />} /> },
      { path: "/user/create", exact: true, element: <ProtectedRoute element={<UserCreate />} /> },
      { path: "/user/edit/:_id", exact: true, element: <ProtectedRoute element={<UserEdit />} /> },

      /***** Permission Pages ****/
      { path: "/permission", exact: true, element: <ProtectedRoute element={<Permission />} /> },
      { path: "/permission/create", exact: true, element: <ProtectedRoute element={<PermissionCreate />} /> },
      { path: "/permission/edit/:_id", exact: true, element: <ProtectedRoute element={<PermissionEdit />} /> },

      /***** Units Pages ****/
      { path: "/units", exact: true, element: <ProtectedRoute element={<Units />} /> },
      { path: "/unitsStates", exact: true, element: <ProtectedRoute element={<UnitsStates />} /> },
      { path: "/unitsCity", exact: true, element: <ProtectedRoute element={<UnitsCity />} /> },
      { path: "/units/create", exact: true, element: <ProtectedRoute element={<UnitsCreate />} /> },
      { path: "/units/edit/:_id", exact: true, element: <ProtectedRoute element={<UnitsEdit />} /> },

      /***** Institutions Pages ****/
      { path: "/institution", exact: true, element: <ProtectedRoute element={<Institution />} /> },
      { path: "/institution/create", exact: true, element: <ProtectedRoute element={<InstitutionCreate />} /> },
      { path: "/institution/edit/:_id", exact: true, element: <ProtectedRoute element={<InstitutionEdit />} /> },

      /***** Forms Steps ****/
      { path: "/casos", exact: true, element: <ProtectedRoute element={<Steps />} /> },

      /***** Events Pages ****/
      { path: "/events", exact: true, element: <ProtectedRoute element={<Events />} /> },

      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
      { path: "login", element: <LoginFormik /> },
    ],
  },
];

export default ThemeRoutes;