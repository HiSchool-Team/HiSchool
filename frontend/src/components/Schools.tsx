import React from "react";
import {List, Space} from 'antd';
import {StarOutlined} from '@ant-design/icons';
import './Schools.css';


// @ts-ignore
const RepeatIcon = ({label, icon, times}) => {
    let icons = [];
    for (let i = 0; i < times; i++) {
        // @ts-ignore
        icons.push(<div>{React.createElement(icon)}</div>);
    }

    return (
        <div style={{display: 'block', textAlign: 'right', transform: 'scale(1)'}}>
            <Space><b>{label}</b>{icons}</Space>
        </div>
    );
}

export type School = {
    id: number;
    name: string,
    description: string
    img_src: string
}

const Schools = (props: { data: School[] }) => {
    return (
        <List
            itemLayout="vertical"
            size="large"
            dataSource={props.data}
            renderItem={(item: School) => (
                <List.Item key={item.name}>
                    <List.Item.Meta title={<a href={`/${item.id}`}><b>{item.name}</b></a>}/>

                    <div>
                        <div className={"school-picture"}><img alt="logo" src={item.img_src}/></div>
                        <div className={"school-description"}><p>{item.description}</p></div>
                        <div className={"satisfaction-levels"}>
                            <RepeatIcon label={"Student satisfaction"} icon={StarOutlined} times={5}/>
                            <RepeatIcon label={"Parent satisfaction"} icon={StarOutlined} times={5}/>
                        </div>
                    </div>
                </List.Item>
            )}
        />
    )
}

export default Schools;