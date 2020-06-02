import React from "react";
import myData from "../data.json"
import {QAList} from "../components/QAList";
import {Question} from "../types";


class QASection extends React.Component<{}, Question[]> {
    //FIX example
    state = [
        {id: 0, title: "Question0", body: "question0 body", answer: undefined},
        {
            id: 1, title: "Question1", body: "question1 body", answer: {
                id: 0,
                body: "this is an answer",
                avg_rating: 4,
                teacher_name: "A name"
            }
        },
    ]

    componentDidMount() {
        //TODO
    }

    render() {
        //TODO ask roko if division in components and containers makes sense
        return (<QAList data={this.state}/>)
    }
}

export default QASection;