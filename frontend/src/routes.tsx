import React from "react";

import SchoolList from "./containers/SchoolListView";
import SchoolDetail from "./containers/SchoolDetailView";
import { Route } from "react-router-dom";

const BaseRouter = () => (
    <div className={"base-router"}>
        <Route  />
        <Route exact path={'/'} component={SchoolList} />
        <Route exact path={'/:schoolID'} component={SchoolDetail} />
    </div>
);

export default BaseRouter;