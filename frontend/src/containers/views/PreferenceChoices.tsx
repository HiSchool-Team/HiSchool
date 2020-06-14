import React, {useEffect, useState} from 'react';

import './PreferenceChoices.css';

import {AutoComplete, Layout, Tabs} from 'antd';
import NewLayout from "../NewLayout";
import {School, Tag} from '../../types';
import {Tag as TagComponent} from '../../components/Tag';
import axios, {AxiosResponse} from 'axios';
import {serverSearchEndpoint} from "./SchoolList";
import {calculatePreferences} from "../../logic/Search";

// TODO check if this import is needed

const {Header, Content, Sider} = Layout;
const {TabPane} = Tabs;

interface ServerResponse {
  schools: School[],
  tags: Tag[],
}

const PreferenceChoices = (props: {
  children: React.ReactNode,
  handleSearch(): any;
}) => {

  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set<string>());
  const [selectedTypeTags, setSelectedTypeTags] = useState<string[]>([]);

  useEffect(() => {
    axios.get<ServerResponse>(serverSearchEndpoint, {
      params: {tags: ""}
    }).then((resp: AxiosResponse<ServerResponse>) => {
      setAvailableTags(resp.data.tags);
      setAvailableCategories(
        resp.data.tags.filter(tag => tag.sub_type !== 'General')
                      .map(tag => tag.sub_type)
                      .filter((tag, i, self) => self.indexOf(tag) === i)
      );
    })
  }, [])

  const toggleTagState = (selectedTag: string) => {
    const newSelected = new Set<string>(selectedTags);
    if (!newSelected.delete(selectedTag)) {
      newSelected.add(selectedTag);
    }
    setSelectedTags(newSelected);
  }

  const addSelectedTypeTags = (selectedTags: number[]) => {
    const newTypeTags = [];
    for (const id of selectedTags) {
      const toAdd = availableTags.find(x => x.id === id);
      if (toAdd) {
        newTypeTags.push(toAdd.name);
      }
    }
    setSelectedTypeTags(newTypeTags);
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


  function getRelevantComponents(category: string) {
    const categoryTags = availableTags.filter(tag => tag.sub_type === category);
    const tagsPreferences = calculatePreferences("test", categoryTags);
    
    return <>
      {categoryTags
        .map(tag => {
          return <TagComponent name={tag.name} onClick={() => toggleTagState(tag.name)}
                               selected={selectedTags.has(tag.name)}/>
        })}
    </>;
  }

  const onSelect = () => {

  }

  return (
    <NewLayout tags={availableTags.filter(tag => tag.sub_type === 'General')}
               updateDisplayedSchool={addSelectedTypeTags}>
      <div className="grid-container">
          <div className={"tab-display"}>
          <Tabs type="card" className={"tabs"}>
            {availableCategories.map(category => {
              return <TabPane tab={category} key={category}>
                {getRelevantComponents(category)}
              </TabPane>
            })}
          </Tabs>
        </div>

        <div className={"head-search"}>
          Search here for your School extracurricular preference<br/>
          <AutoComplete
            options={options}
            style={{
              width: 300,
            }}
            onSelect={onSelect}
            placeholder="input here"
          /><br/><br/>
          Click on the tags which you wish to select on the left
          <br/>
          <img src="/static/help.png" alt={"help"}/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/>
          After selecting the tags you prefer search for a suitable school by clicking on the button bellow
          <div className={"preference-search"}>
            <a href={`/1`} className="button">Find me a School</a>
          </div>
        </div>
      </div>
    </NewLayout>
  );
}

export default PreferenceChoices;
