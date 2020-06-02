import React from "react";
import {QA} from "./QA";
import {List} from "antd";
import {Question} from "../types";

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