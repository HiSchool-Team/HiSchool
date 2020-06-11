import React, {SyntheticEvent, useState} from 'react';

import './PreferenceChoices.css';

import {AutoComplete, Layout, Tabs} from 'antd';
import SearchBar from '../../components/SearchBar';
import history from '../../utils/history';
import ActionButton from "antd/es/modal/ActionButton";
import NewLayout from "../NewLayout";
import Search from "antd/es/input/Search";
import {Tag} from '../../components/Tag';

// TODO check if this import is needed

const {Header, Content, Sider} = Layout;
const {TabPane} = Tabs;

const PreferenceChoices = (props: {
  children: React.ReactNode,
  handleSearch(): any;
}) => {

  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set<string>());

  const toggleTagState = (selectedTag: string) => {
    const newSelected = new Set<string>(selectedTags);
    if (!newSelected.delete(selectedTag)) {
      newSelected.add(selectedTag);
    }
    setSelectedTags(newSelected);
  }

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

  const onSelect = (value: string) => {

  };

  return (
    <NewLayout>
      <div className="grid-container">
        <div className={"head-search"}>
          Search here for extracurricular/pastoral you would prefer the School contains<br/>
          <AutoComplete
            options={options}
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
              <Tag name={"Football club"} onClick={() => toggleTagState("Football club")}
                   selected={selectedTags.has("Football club")}/>
              <Tag name={"Chess club"} onClick={() => toggleTagState("Chess club")}
                   selected={selectedTags.has("Chess club")}/>
              <Tag name={"Cricket club"} onClick={() => toggleTagState("Cricket club")}
                   selected={selectedTags.has("Cricket club")}/>
            </TabPane>
            <TabPane tab="Science" key="2">
              <Tag name={"Astronomy Club"} onClick={() => toggleTagState("Astronomy Club")}
                   selected={selectedTags.has("Astronomy Club")}/>
              <Tag name={"Arduino Society"} onClick={() => toggleTagState("Arduino Society")}
                   selected={selectedTags.has("Arduino Society")}/>
              <Tag name={"SAT Preparation"} onClick={() => toggleTagState("SAT Preparation")}
                   selected={selectedTags.has("SAT Preparation")}/>
            </TabPane>
            <TabPane tab="Art" key="3">
              <Tag name={"Sculpt"} onClick={() => toggleTagState("Sculpt")}
                   selected={selectedTags.has("Sculpt")}/>
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
