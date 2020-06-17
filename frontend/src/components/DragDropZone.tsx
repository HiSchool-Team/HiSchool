import React, { CSSProperties } from 'react';
import { useDrop, DragObjectWithType } from 'react-dnd';
import { ItemTypes, TagComponent, TagDragType } from './TagComponent';
import { Tag } from '../types';

const dragDropBoxStyle: CSSProperties = {
  borderRadius: '2rem',
  borderStyle: 'dotted',
  height: '200px'
};

// TODO onDrop type

const DragDropZone = (props: { tags: Tag[],
  boxName: string,
  onPullOut: (id: number) => void,
  onDrop: (item: TagDragType) => void, }
) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.TAG,
    drop: props.onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const isActive = canDrop && isOver;

  let backgroundColor = '#ffffff';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }

  return (
    <div style={{ width: '20%' }}>
      <div style={{ textAlign: 'center', fontSize: 'large' }}>
        {isActive ? 'Release to drop' : props.boxName}
      </div>
      <div ref={drop} style={{ ...dragDropBoxStyle, backgroundColor }}>
        {props.tags.map(tag => {
          return <TagComponent draggable={true} id={tag.id} name={tag.name} onDragOutsideArea={props.onPullOut}/>;
        })}
      </div>
    </div>
  );
};

export default DragDropZone;
