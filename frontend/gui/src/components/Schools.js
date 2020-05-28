import React from "react";

import {List, Avatar, Space} from 'antd';
import {MessageOutlined, LikeOutlined, StarOutlined} from '@ant-design/icons';

const IconText = ({icon, text}) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const Schools = (props) => {
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 3,
            }}
            dataSource={props.data}
            footer={
                <div>
                    This is the footer. We might want to use it.
                </div>
            }
            renderItem={item => (
                <List.Item
                    key={item.name}
                    actions={[
                        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o"/>,
                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
                    ]}
                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src={item.img_src}
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar}/>}
                        title={<a href={`/${item.id}`}>{item.name}</a>}
                        description={item.description}
                    />
                </List.Item>
            )}
        />
    )
}

export default Schools;