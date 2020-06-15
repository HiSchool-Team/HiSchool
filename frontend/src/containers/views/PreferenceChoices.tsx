import React, {useEffect, useState} from 'react';

import './PreferenceChoices.css';

import {AutoComplete, Layout, Tabs} from 'antd';
import NewLayout from "../NewLayout";
import {School, Tag} from '../../types';
import {Tag as TagComponent} from '../../components/Tag';
import axios, {AxiosResponse} from 'axios';
import {serverSearchEndpoint} from "./SchoolList";
import {calculatePreferences} from '../../logic/Search';
import DragDropZone from "../../components/DragDropZone";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Search from 'antd/lib/transfer/search';

// TODO check if this import is needed

const {Header, Content, Sider} = Layout;
const {TabPane} = Tabs;

interface ServerResponse {
  schools: School[],
  tags: Tag[],
}

type ReducerState = {
  dropDepth: number,
  inDropZone: boolean,
  tagsIn: Tag[],
}

type ReducerAction =
  | { type: 'SET_DROP_DEPTH', dropDepth: number }
  | { type: 'SET_IN_DROP_ZONE', inDropZone: boolean }
  | { type: 'ADD_TAG_TO_LIST', tagToAdd: Tag };

const PreferenceChoices = () => {

  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [insertedTags, setInsertedTags] = useState<number[]>([]);
  const [selectedTypeTags, setSelectedTypeTags] = useState<string[]>([]);

  // TODO types
  const reducer = (state: ReducerState, action: ReducerAction) => {
    switch (action.type) {
      case 'SET_DROP_DEPTH':
        return {...state, dropDepth: action.dropDepth}
      case 'SET_IN_DROP_ZONE':
        return {...state, inDropZone: action.inDropZone}
      case 'ADD_TAG_TO_LIST':
        return {...state, tagsIn: state.tagsIn.concat(action.tagToAdd)}
      default:
        return state;
    }
  }

  const [data, dispatch] = React.useReducer(reducer, {
    dropDepth: 0, inDropZone: false, tagsIn: []
  })

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

  const getComponentsByRelevance = (category: string, givenString: string) => {
    const categoryTags = nonDroppedTags.filter(tag => tag.sub_type === category);
    const tagsPreferences = calculatePreferences(givenString, categoryTags);

    return <>
      {tagsPreferences
        .map(([tag, value]) => {
          return <TagComponent id={tag.id} name={tag.name + "(" + value + ")"}
                               onDrop={(id: number) => setInsertedTags(prevState => [...prevState, id])}
                                />
        })}
    </>;
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

  const onSelect = () => {

  }

  const droppedTags = availableTags.filter(tag => insertedTags.includes(tag.id));
  const nonDroppedTags = availableTags.filter(tag => !insertedTags.includes(tag.id));

  return (
    <DndProvider backend={HTML5Backend}>
      <NewLayout tags={availableTags.filter(tag => tag.sub_type === 'General')}
                 updateDisplayedSchool={addSelectedTypeTags}>
        <div className="grid-container">
          <div className={"tab-display"}>
            <TagComponent id={0} name={"test"}
                               onDrop={(id: number) => {console.log(insertedTags); setInsertedTags(prevState => [...prevState, id]); console.log(id)}} />
            <Tabs type="card" className={"tabs"}>
              {availableCategories.map(category => {
                return <TabPane tab={category} key={category}>
                  {getComponentsByRelevance(category, searchValue)}
                </TabPane>
              })}
            </Tabs>
          </div>

          <div className={"head-search"}>
            Search here for your School extracurricular preference<br/>
            <DragDropZone tags={droppedTags}
                          onPullOut={id =>
                            setInsertedTags(prevState => prevState.filter(tag_id => tag_id !== id))
                          }/>
            <Search placeholder={'search tags'}
                    onChange={(e) => {
                      let elem: HTMLInputElement = e.currentTarget as HTMLInputElement;
                      setSearchValue(elem.value);
                    }}/>
            <br/><br/>
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
    </DndProvider>
  );
}

export default PreferenceChoices;
