import React from 'react';
import { Tag } from '../types';
import { calculatePreferences } from '../logic/Search';
import { TagComponent } from './TagComponent';

const SortedTagsByRelevance =
  (props: {
  category: string,
  nonDroppedTags: Tag[],
  searchString: string,
}) => {
    const categoryTags = props.nonDroppedTags.filter(tag => tag.sub_type === props.category);
    const tagsPreferences = calculatePreferences(props.searchString, categoryTags);
    const maxNDisplayed = 20;

    return (<div>
      {tagsPreferences
        .slice(0, maxNDisplayed)
        .map(([tag, value]) => {
          return <TagComponent draggable={true} id={tag.id} name={tag.name}
          />;
        })
      }
    </div>);
  };

export default SortedTagsByRelevance;
