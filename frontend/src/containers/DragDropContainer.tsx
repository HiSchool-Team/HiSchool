import React, {useState} from "react";
import DragDropZone from "../components/DragDropZone";
import {TagDragType} from "../components/Tag";
import {Tag} from "../types";

interface DragDropState {
  droppedTags: number[],
  index: number,
}

const DragDropContainer = (props: {
  tags: Tag[],
  onDropAny: (id: number) => void,
  onRemoveAll: (id: number) => void
}) => {
  const [dragDrops, setDragDrops] = useState<DragDropState[]>([
    {
      droppedTags: [],
      index: 0,
    },
    {
      droppedTags: [],
      index: 1,
    },
    {
      droppedTags: [],
      index: 2,
    }
  ]);

  const getTagById = (id: number): Tag => {
    let tag = props.tags.find(tag => tag.id === id);
    if (tag) {
      return tag;
    }
    console.log("error in get tag by id");
    return props.tags[0];
  }

  // This function is called on a drop to any container
  const handleDrop = (index: number, item: TagDragType) => {
    setDragDrops(prevState => {
      return prevState.map((dragDrop, arrIndex) => {
        return arrIndex !== index
          ? {...dragDrop, droppedTags: dragDrop.droppedTags.filter(tag_id => tag_id !== item.id)}
          : {...dragDrop, droppedTags: [...dragDrop.droppedTags, item.id]};
      });
    });
    props.onDropAny(item.id);
  };

  // This function is called when item is dropped outside any containers
  const handlePullOut = (index: number, id: number) => {
    setDragDrops(prevState => {
      return prevState.map((dragDrop, arrIndex) => {
        return arrIndex !== index
          ? dragDrop
          : {...dragDrop, droppedTags: dragDrop.droppedTags.filter(tag_id => tag_id !== id)};
      });
    });
    props.onRemoveAll(id);
  }

  return (
    <div>
      {dragDrops.map((dragDrop, index) => {
        return <DragDropZone tags={dragDrop.droppedTags.map(getTagById)}
                             onPullOut={(id: number) => handlePullOut(index, id)}
                             onDrop={(item) => handleDrop(index, item)}/>
      })}
    </div>
  );
}

export default DragDropContainer;
