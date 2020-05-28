import React from "react";
import { Route } from "react-router-dom";

import SchoolList from "./containers/SchoolListView";
import SchoolDetail from "./containers/SchoolDetailView";

const BaseRouter = () => (
    <div>
        <Route exact path={'/'} component={SchoolList} />
        <Route exact path={'/:schoolID'} component={SchoolDetail} />
    </div>
);

export default BaseRouter;