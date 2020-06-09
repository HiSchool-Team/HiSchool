import React from 'react';
import { QA } from '../../../types';
import AskBar from '../../../components/qa/AskBar';
import { Card } from 'antd';
import { QAList } from '../../../components/qa/QAList';
import NewLayout from '../../NewLayout';
import { RouteComponentProps } from 'react-router-dom';

type State = {
  qas: QA[],
};

const testQuestions: QA[] = [
  {
    id: 0,
    question: {
      title: 'qa title',
      body: 'qa body'
    },
    answer: undefined
  }
];

class SavedQuestions extends React.Component<RouteComponentProps, State> {
  state = {
    qas: testQuestions
  };

  componentDidMount () {
    // TODO later
  }

  render () {
    const view = (
      <NewLayout route={{
        history: this.props.history,
        location: this.props.location,
        match: this.props.match,
        staticContext: this.props.staticContext
      }}>
        <QAList qas={this.state.qas} answerable={false}/>
      </NewLayout>
    );
    return view;
  }
}

export default SavedQuestions;
