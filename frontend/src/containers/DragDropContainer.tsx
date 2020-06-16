import React, {useState} from "react";
import DragDropZone from "../components/DragDropZone";
import {TagDragType} from "../components/Tag";
import {Tag} from "../types";

interface DragDropState {
  droppedTags: number[],
  index: number,
}

const DragDropContainer = (props: {tags: Tag[]}) => {
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

  // TODO duplication in type between tag this and dragdropzone
  const handleDrop = (index: number, item: TagDragType) => {
    setDragDrops(prevState => {
      return prevState.map((dragDrop, arrIndex) => {
        return arrIndex !== index
          ? dragDrop
          : {...dragDrop, droppedTags: [...dragDrop.droppedTags, item.id]};
      });
    });
  };

  console.log(dragDrops);

  return (
    <div>
      {dragDrops.map((dragDrop, index) => {
        return <DragDropZone tags={dragDrop.droppedTags.map(getTagById)}
                             onPullOut={() => console.log(dragDrop.index)}
                             onDrop={(item) => handleDrop(index, item)}/>
      })}
    </div>
  );
}

export default DragDropContainer;
