import React, {useEffect, useState} from 'react';

import './PreferenceChoices.css';

import {Layout, Tabs} from 'antd';
import NewLayout from "../NewLayout";
import {School, Tag} from '../../types';
import axios, {AxiosResponse} from 'axios';
import {serverSearchEndpoint} from "./SchoolList";
import SortedTagsByRelevance from '../../components/SortedTagsByRelevance';
import DragDropContainer from "../DragDropContainer";
import Search from 'antd/lib/input/Search';

// TODO check if this import is needed

const {Header, Content, Sider} = Layout;
const {TabPane} = Tabs;

interface ServerResponse {
  schools: School[],
  tags: Tag[],
}

const PreferenceChoices = () => {

  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [insertedTags, setInsertedTags] = useState<number[]>([]);
  const [selectedTypeTags, setSelectedTypeTags] = useState<string[]>([]);

  useEffect(() => {
    axios.get<ServerResponse>(serverSearchEndpoint, {
      params: {tags: ''}
    }).then((resp: AxiosResponse<ServerResponse>) => {
      setAllTags(resp.data.tags);
      setAvailableCategories(
        resp.data.tags.filter(tag => tag.sub_type !== 'General')
          .map(tag => tag.sub_type)
          .filter((tag, i, self) => self.indexOf(tag) === i)
      );
    });
  }, []);

  const addSelectedTypeTags = (selectedTags: number[]) => {
    const newTypeTags = [];
    for (const id of selectedTags) {
      const toAdd = allTags.find(x => x.id === id);
      if (toAdd) {
        newTypeTags.push(toAdd.name);
      }
    }
    setSelectedTypeTags(newTypeTags);
  };

  const nonDroppedTags = allTags.filter(tag => !insertedTags.includes(tag.id));

  return (
    <NewLayout tags={allTags.filter(tag => tag.sub_type === 'General')}
               updateDisplayedSchool={addSelectedTypeTags}>

      <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div className={"tab-display"} style={{height: "40vh", width: "50vw"}}>
            <Tabs type="card" className={"tabs"}>
              {availableCategories.map(category => {
                return <TabPane tab={category} key={category}>
                  <SortedTagsByRelevance category={category} nonDroppedTags={nonDroppedTags}
                                         searchString={searchValue}/>
                </TabPane>
              })}
            </Tabs>
          </div>

          <div className={"head-search"} style={{marginRight: "15px"}}>
            Search here for your School extracurricular preference<br/>
            <Search placeholder={'search tags'}
                    onChange={e => setSearchValue(e.target.value) }/>
            Drag the tags on the left into desired boxes
            <br/><br/>
            After selecting the tags you prefer search for a suitable school by clicking on the button bellow
            <div className={"preference-search"}>
              <a href={`/1`} className="button">Find me a School</a>
            </div>
          </div>
        </div>
        <DragDropContainer style={{marginTop: "20px"}}
                           tags={allTags}
                           onDropAny={(id =>
                             setInsertedTags(prevState => [...prevState, id]))
                           }
                           onRemoveAll={(id =>
                             setInsertedTags(prevState => prevState.filter(tag_id => tag_id !== id)))
                           }/>
      </div>
    </NewLayout>
  );
};

export default PreferenceChoices;
