import React from "react";
import {Tag} from "../types";
import {calculatePreferences} from "../logic/Search";
import {Tag as TagComponent} from '../components/Tag';

const SortedTagsByRelevance
  = (props: {
  category: string,
  nonDroppedTags: Tag[],
  searchString: string,
}) => {

  const categoryTags = props.nonDroppedTags.filter(tag => tag.sub_type === props.category);
  const tagsPreferences = calculatePreferences(props.searchString, categoryTags);

  return (<div>
    {tagsPreferences
      .map(([tag, value]) => {
        return <TagComponent draggable={true} id={tag.id} name={tag.name}
        />
      })
    }
  </div>);
}

export default SortedTagsByRelevance;
