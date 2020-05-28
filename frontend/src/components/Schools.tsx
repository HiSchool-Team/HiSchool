import React from "react";
import {List, Space} from 'antd';
import {StarOutlined} from '@ant-design/icons';


// @ts-ignore
const RepeatIcon = ({label, icon, times}) => {
    let icons = [];
    for (let i = 0; i < times; i++) {
        // @ts-ignore
        icons.push(<div>{React.createElement(icon)}</div>);
    }

    return (
        <div style={{display: 'block', textAlign: 'right', transform: 'scale(1.3)'}}>
            <Space><b>{label}</b> {icons}</Space>
        </div>
    );
}

export type School = {
    id: number;
    name: string,
    description: string
    img_src: string
}

const Schools = (props: { data: School[]} ) => {
        return (
            <List
                itemLayout="vertical"
                size="large"
                dataSource={props.data}
                renderItem={(item: School) => (
                    <List.Item
                        key={item.name}
                        extra={
                        <div>
                            <RepeatIcon label={"Student satisfaction"} icon={StarOutlined} times={5} key="list-vertical-star-o"/>
                            <RepeatIcon label={"Parent satisfaction"} icon={StarOutlined} times={5} key="list-vertical-star-o"/>
                        </div>
                        }
                    >
                        <List.Item.Meta
                            title={<a href={`/${item.id}`}>{item.name}</a>}
                        />
                        <img
                            width={272}
                            alt="logo"
                            src={item.img_src}
                        />
                    </List.Item>
                )}
            />
        )
    }

    export default Schools;