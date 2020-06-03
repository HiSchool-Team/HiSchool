import React from "react";

import Frontpage from "./containers/FrontpageView";
import SchoolList from "./containers/SchoolListView";
import myData from "./data.json"

import {Route, RouteComponentProps} from "react-router-dom";
import NewLayout from "./containers/NewLayout";

const BaseRouter = () => {
    return (
        <div className={"base-router"}>
            <Route exact path={'/'} component={Frontpage}/>
            <Route exact path={'/list'} component={(props: RouteComponentProps) =>
                <NewLayout>
                    <SchoolList schools={myData} />
                </NewLayout>}/>
            {/*<Route exact path={':schoolID'} component={SchoolDetailWithLayout}/>*/}
        </div>
    );
}


export default BaseRouter;