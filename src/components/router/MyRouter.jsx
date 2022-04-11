import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import NewsItemPage from "../pages/NewsItemPage";

const MyRouter = () => {
  return (
        <BrowserRouter>
          <Switch>
            <Route path="/newspage" component={NewsItemPage} />
            <Route path="/" component={MainPage} />
          </Switch>
        </BrowserRouter>
  );
};

export default MyRouter;
