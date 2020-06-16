import React, {CSSProperties} from "react";
import { useDrop, DragObjectWithType } from 'react-dnd';
import {ItemTypes, Tag as TagComponent, TagDragType} from "./Tag";
import {Tag} from "../types";

const style: CSSProperties = {
  borderRadius: "0.5rem",
  borderStyle: "dotted",
}


// TODO onDrop type

const DragDropZone = (props: { tags: Tag[],
  onPullOut: (id: number) => void ,
  onDrop: (item: TagDragType) => void}
  ) => {
  const [{canDrop, isOver}, drop] = useDrop({
    accept: ItemTypes.TAG,
    drop: props.onDrop,
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
        return <TagComponent draggable={true} id={tag.id} name={tag.name} onDragOutsideArea={props.onPullOut}/>
      })}
    </div>
  )
};

export default DragDropZone;
