import React, {CSSProperties, MouseEvent, FocusEvent} from "react";

export const Tag = (props: {style?: CSSProperties,
                            name: string, selected?: boolean,
                            onMouseEnter?: (e: MouseEvent<HTMLDivElement>) => void,
                            onMouseLeave?: (e: MouseEvent<HTMLDivElement>) => void,
                            onClick?: (e: MouseEvent<HTMLDivElement>) => void,
                            onFocus?: (e: FocusEvent<HTMLDivElement>) => void,
                           }) => {
  const pillStyle: CSSProperties = {
    backgroundColor: "#ddd",
    border: "none",
    padding: "10px 20px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    margin: "4px 2px",
    cursor: "pointer",
    borderRadius: "16px",
  }

  return <div style={{...pillStyle, ...props.style}}
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
              onClick={props.onClick}
              onFocus={props.onFocus}
              >
    {props.name}
  </div>
}
