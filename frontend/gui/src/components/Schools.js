import React from "react";

import {List, Space} from 'antd';
import {StarOutlined} from "@ant-design/icons";

const FiveIcons = ({icon}) => (
    <Space>
        {[...Array(5)].map(() => (
            React.createElement(icon)
        ))}
    </Space>
);

const Schools = (props) => {
    return (
        <List
            itemLayout="vertical"
            size="large"
            dataSource={props.data}
            footer={
                <div>
                    This is the footer. We might want to use it.
                </div>
            }
            renderItem={item => (
                <List.Item
                    key={item.name}
                    extra={
                        <FiveIcons icon={StarOutlined} key="list-vertical-star-o"/>
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