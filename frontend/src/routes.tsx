import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

/* lazy loading for better performance, splits code into smaller chunks */
const Blocks = lazy(() => import("./pages/Blocks"));
const Block = lazy(() => import("./pages/Block"));

const Routes: React.FC = () => {
  return (
    <>
      <Header />
      <Switch>
        <Suspense fallback={<Loader />}>
          <Route path="/" exact component={Blocks} />
          <Route path="/block/:id" exact component={Block} />
        </Suspense>
      </Switch>
      <Footer />
    </>
  );
};

export default Routes;
