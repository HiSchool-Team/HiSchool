import React from "react";
import {QA, Question} from "./QA";
import {List} from "antd";

export const QAList = (props: {data: Question[]}) => {
    return (
        <List
            itemLayout="vertical"
            size="large"
            dataSource={props.data}
            renderItem={(item: Question) => <QA question={item}/>}
        />
    )
}