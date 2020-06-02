import React from "react";

import Frontpage from "./containers/FrontpageView";
import SchoolList from "./containers/SchoolListView";
import SchoolDetail from "./containers/SchoolDetailView";

import NewLayout from "./containers/NewLayout";
import {Route, RouteComponentProps} from "react-router-dom";

const BaseRouter = () => (
    <div className={"base-router"}>
        <Route exact path={'/'} component={Frontpage}/>
        <Route exact path={'/list'} component={(props: RouteComponentProps) =>
            <NewLayout>
                <SchoolList history={props.history} location={props.location}
                            match={props.match}/>
            </NewLayout>} />
        <Route exact path={':schoolID'} component={SchoolDetailWithLayout} />
    </div>
);


const SchoolDetailWithLayout = () => (
    <NewLayout>
        <SchoolDetail>

        </SchoolDetail>
    </NewLayout>
)


export default BaseRouter;