// eslint-disable-next-line no-unused-vars
import React, { Suspense } from "react";

// project imports
import Loader from "./Loader";

// ===========================|| LOADABLE - LAZY LOADING ||=========================== //

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
