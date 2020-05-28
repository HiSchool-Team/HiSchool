import React from "react";
import {List, Space} from 'antd';
import {StarOutlined} from '@ant-design/icons';


// @ts-ignore
const RepeatIcon = ({icon, times}) => {
    let icons = [];
    for (let i = 0; i < times; i++) {
        // @ts-ignore
        icons.push(React.createElement(icon));
    }

    return <Space>icons</Space>

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
            footer={
                <div>
                    This is the footer. We might want to use it.
                </div>
            }
            //FIXME Might wanna abstract in a different type the type of item
            renderItem={(item: School) => (
                <List.Item
                    key={item.name}
                    extra={
                        <RepeatIcon icon={StarOutlined} times={5} key="list-vertical-star-o"/>
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