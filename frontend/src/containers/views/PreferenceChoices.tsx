import React, { SyntheticEvent, useState } from 'react';

import './PreferenceChoices.css';

import {AutoComplete, Layout, Tabs} from 'antd';
import SearchBar from '../../components/SearchBar';
import history from '../../utils/history';
import ActionButton from "antd/es/modal/ActionButton";
import NewLayout from "../NewLayout";
import Search from "antd/es/input/Search";

// TODO check if this import is needed

const { Header, Content, Sider} = Layout;
const { TabPane } = Tabs;

const PreferenceChoices = (props: {children: React.ReactNode,
    handleSearch(): any;
}) => {

    let options = [
                  {
                    value: 'Football Club',
                  },
                  {
                    value: 'Drama Club',
                  },
                  {
                    value: 'Breakfast Club',
                  },
                ];

    const onSelect = (value:string) => {

    };

    return(
        <NewLayout>
            <div className="grid-container">
                <div className={"head-search"}>
                    Search here for extracurricular/pastoral you would prefer the School contains<br/>
                    <AutoComplete
                        options = {options}
                        style={{
                            width: 200,
                        }}
                        onSelect={onSelect}
                        placeholder="input here"
                    />
                </div>

                <div>
                    <Tabs type="card">
                        <TabPane tab="Sports" key="1">
                            <button className="button">Football Club</button>
                            <button className="button">Cricket Club</button>
                            <button className="button">Chess Club</button>
                        </TabPane>
                      <TabPane tab="Science" key="2">
                          <button className="button">Astronomy Club</button>
                          <button className="button">Arduino Society</button>
                          <button className="button">SAT Preparation</button>
                      </TabPane>
                      <TabPane tab="Art" key="3">
                          <button className="button">Sculpt</button>
                      </TabPane>
                    </Tabs>
                </div>

                <div>
                    <div className={"preference-search"}>
                      <a href={`${window.parent.location}list`} className="btn btn-primary">Find me a School</a>
                    </div>
                </div>
            </div>
        </NewLayout>
    );
}

export default PreferenceChoices;