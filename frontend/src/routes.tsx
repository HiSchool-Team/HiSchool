import React from "react";
import { Route } from "react-router-dom";

import Frontpage from "./containers/FrontpageView";
import SchoolList from "./containers/SchoolListView";
import SchoolDetail from "./containers/SchoolDetailView";

import NewLayout from "./containers/NewLayout";

const BaseRouter = () => (
    <div className={"base-router"}>
        <Route exact path={'/'} component={Frontpage} />
        <Route exact path={'/list'} component={SchoolListWithLayout} />
        <Route exact path={':schoolID'} component={SchoolDetailWithLayout} />
    </div>
);

const SchoolListWithLayout = () => (
    <NewLayout>
        <SchoolList>

        </SchoolList>
    </NewLayout>
)

const SchoolDetailWithLayout = () => (
    <NewLayout>
        <SchoolDetail>

        </SchoolDetail>
    </NewLayout>
)


export default BaseRouter;