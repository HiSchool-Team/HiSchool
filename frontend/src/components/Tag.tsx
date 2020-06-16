import React, {CSSProperties, FocusEvent, MouseEvent} from 'react';
import {DragObjectWithType, DragSourceMonitor, useDrag} from "react-dnd";

export const ItemTypes = {
  TAG: 'tag',
}

export interface TagDragType extends DragObjectWithType {
  id: number, name: string,
}

const pillStyle: CSSProperties = {
  border: 'none',
  padding: '10px 20px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '16px',
};

export const Tag = (props: {
  id: number,
  draggable: boolean,
  style?: CSSProperties,
  name: string, selected?: boolean,
  onMouseEnter?: (e: MouseEvent<HTMLDivElement>) => void,
  onMouseLeave?: (e: MouseEvent<HTMLDivElement>) => void,
  onClick?: (e: MouseEvent<HTMLDivElement>) => void,
  onFocus?: (e: FocusEvent<HTMLDivElement>) => void,
  onDragOutsideArea?: (id: number) => void,
}) => {

  const selected: CSSProperties = {
    backgroundColor: props.selected ? '#001529' : '#c7c6c6',
    color: props.selected ? '#ece9e9' : '#242424'
  };
  const [{ isDragging }, drag] = useDrag({
    item: { id: props.id, name: props.name, type: ItemTypes.TAG},
    end: (item: { id: number, name: string } | undefined, monitor: DragSourceMonitor) => {
      if (!monitor.getDropResult()) {
        props.onDragOutsideArea?.(props.id);
      }
    },
    canDrag: props.draggable,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0.4 : 1

  return (
    <div ref={drag}
         style={{...pillStyle, ...props.style, ...selected, opacity}}
         onMouseEnter={props.onMouseEnter}
         onMouseLeave={props.onMouseLeave}
         onClick={props.onClick}
         onFocus={props.onFocus}
    >
      {props.name}
    </div>);
};
