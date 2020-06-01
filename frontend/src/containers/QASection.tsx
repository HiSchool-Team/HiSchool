import React from "react";
import myData from "../data.json"
import {QAList} from "../components/QAList";
import {Question} from "../components/QA";


class QASection extends React.Component<{}, Question[]> {
    //FIX example
    state = [{id: 0, title: "Question1", body: "question1 body", answer: undefined}]

    componentDidMount() {
        //TODO
    }

    render() {
        //TODO ask roko if division in components and containers makes sense
        return (<QAList  data={this.state}/>)
    }
}

export default QASection;