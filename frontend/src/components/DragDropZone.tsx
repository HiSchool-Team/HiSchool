import React, {CSSProperties} from "react";
import { useDrop } from 'react-dnd';
import {ItemTypes, Tag as TagComponent} from "./Tag";
import {Tag} from "../types";

const style: CSSProperties = {
  borderRadius: "0.5rem",
  borderStyle: "dotted",
}

const DragDropZone = (props: { tags: Tag[] }) => {
  const [{canDrop, isOver}, drop] = useDrop({
    accept: ItemTypes.TAG,
    drop: item => {
      console.log(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  })
  const isActive = canDrop && isOver

  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {isActive ? 'Release to drop' : 'Drag a box here'}
      {props.tags.map(tag => {
        return <TagComponent id={tag.id} name={tag.name}/>
      })}
    </div>
  )
};

export default DragDropZone;
