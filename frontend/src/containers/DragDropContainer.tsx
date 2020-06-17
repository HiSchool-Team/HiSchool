import React, { CSSProperties, useState } from 'react';
import DragDropZone from '../components/DragDropZone';
import { TagDragType } from '../components/TagComponent';
import { Tag, PrioritizedTag, School } from '../types';
import { Redirect } from 'react-router-dom';
import { homePath, tagResultPath } from '../routes';
import userContext from '../context/User';
import prioritizedTagAPI from '../api/PrioritizedTag';

interface DragDropState {
  droppedTags: number[],
  index: number,
  priority: number,
  name: string,
  limit?: number,
}

interface TagSendData {
  tag_id: number,
  priority: number,
}

const DragDropContainer = (props: {
  tags: Tag[],
  send: boolean,
  onDropAny: (id: number) => void,
  onRemoveAll: (id: number) => void,
  style?: CSSProperties,
}) => {
  const [dragDrops, setDragDrops] = useState<DragDropState[]>([
    {
      droppedTags: [],
      index: 2,
      priority: 1,
      name: 'General focus points',
    },
    {
      droppedTags: [],
      index: 1,
      priority: 2,
      name: 'Emphasized focus points',
      limit: 5,
    },
    {
      droppedTags: [],
      index: 0,
      priority: 3,
      name: 'Core focus points',
      limit: 3,
    },
  ]);

  const getTagById = (id: number): Tag => {
    const tag = props.tags.find(tag => tag.id === id);
    if (tag) {
      return tag;
    }
    console.log('error in get tag by id');
    return props.tags[0];
  };

  // This function is called on a drop to any container
  const handleDrop = (index: number, item: TagDragType) => {
    let tooMany = true;
    setDragDrops(prevState => {
      return prevState.map((dragDrop, arrIndex) => {
        const tagsWithoutCurr = dragDrop.droppedTags.filter(tag_id => tag_id !== item.id);

        if (arrIndex !== index
            || (userContext.isSchoolAccount() && dragDrop.limit && dragDrop.droppedTags.length >= dragDrop.limit)) {
          return {...dragDrop, droppedTags: tagsWithoutCurr};
        } else {
          tooMany = false;
          return {...dragDrop, droppedTags: [...tagsWithoutCurr, item.id]}
        }
      });
    });
    if (!tooMany) {
      props.onDropAny(item.id);
    }
  };

  // This function is called when item is dropped outside any containers
  const handlePullOut = (index: number, id: number) => {
    setDragDrops(prevState => {
      return prevState.map((dragDrop, arrIndex) => {
        return arrIndex !== index
          ? dragDrop
          : { ...dragDrop, droppedTags: dragDrop.droppedTags.filter(tag_id => tag_id !== id) };
      });
    });
    props.onRemoveAll(id);
  };

  const createPrioritizedTags = (): PrioritizedTag[] => {
    const prioritizedTags: PrioritizedTag[] = [];

    for (const dragDrop of dragDrops) {
      prioritizedTags.push(...dragDrop.droppedTags.map(tag_id => {
        return { school: userContext.getSchoolId(), tag: tag_id, priority: dragDrop.priority };
      }));
    }

    return prioritizedTags;
  };

  if (props.send) {
    console.log('here');
    if (userContext.isSchoolAccount()) {
      prioritizedTagAPI.postTags(createPrioritizedTags()).then(r => console.log('I have registered'));
      return (<Redirect to={{
        pathname: homePath
      }}/>);
    } else {
      return (<Redirect to={{
        pathname: tagResultPath,
        state: createPrioritizedTags()
      }}/>
      );
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', ...props.style }}>
      {dragDrops.map((dragDrop, index) => {
        return <DragDropZone boxName={dragDrop.name
                                      + (userContext.isSchoolAccount() && dragDrop.limit
                                        ? `(${dragDrop.limit - dragDrop.droppedTags.length} choices left)`
                                        : '')}
          tags={dragDrop.droppedTags.map(getTagById)}
          onPullOut={(id: number) => handlePullOut(index, id)}
          onDrop={(item) => handleDrop(index, item)}/>;
      })}
    </div>
  );
};

export default DragDropContainer;
