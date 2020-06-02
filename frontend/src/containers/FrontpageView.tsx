import React from "react";
import  './FrontpageView.css';
import {Layout, Menu, Typography} from "antd";

import './NewLayout.css';
import Sider from "antd/lib/layout/Sider";


class Frontpage extends React.Component {



    render() {
        return (
            <div>
            <Layout style={{position: 'fixed', width: '100%', zIndex: 4}} >
                    <div style={{textAlign: 'right'}}>
                        <a style={{margin: '8px'}} href={"/"}>Home</a>
                        <a style={{margin: '8px'}} href={"#MySchools"}>MySchools</a>
                        <a style={{margin: '8px'}} href={"#MyProfile"}>MyProfile</a>
                    </div>
                </Layout>

            <body>

                <p className={"which-school"}>WhichSchool?</p>
                <p className={"search-title"}> Type the name of the school you wish to search</p>

            </body>
            </div>
        );
    }
}

export default Frontpage;