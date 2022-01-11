import React, { lazy, Suspense } from "react";

/* REACT ASYNC BUNDLER LOADER */
export default (importCallback, loader) => {
  const TargetComponent = lazy(importCallback);
  return (props) => (
    <Suspense fallback={loader ? loader : "CARICAMENTO COMPONENTE"}>
      <TargetComponent {...props} />
    </Suspense>
  );
};

/*

Gli import dovrebbero essere cosi...
const ElencoDomande = loadable(() =>
  import("../components/ElencoDomande/ElencoDomande.jsx")
); */
