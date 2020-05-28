import React from "react";

import {List, Space} from 'antd';
import {StarOutlined} from "@ant-design/icons";

const FiveIcons = ({label, icon}) => {
    return (
        <div style={{display: 'block', textAlign: 'right', transform: 'scale(1.3)'}}>
            <Space>
                <b>{ label }</b>
                {[...Array(5)].map(() => (
                    <div> {React.createElement(icon)}</div>
                ))}
            </Space>
        </div>
    );
};

const Schools = (props) => {
    return (
        <List
            itemLayout="vertical"
            size="large"
            dataSource={props.data}
            renderItem={item => (
                <List.Item
                    key={item.name}
                    extra={
                        <div>
                            <FiveIcons label={"Student satisfaction"} icon={StarOutlined} key="list-vertical-star-o"/>
                            <FiveIcons label={"Parent satisfaction"} icon={StarOutlined} key="list-vertical-star-o"/>
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