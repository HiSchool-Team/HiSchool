import React from 'react';
import { QA } from '../../../types';
import AskBar from '../../../components/qa/AskBar';
import { Button, Card } from 'antd'
import { QAList } from '../../../components/qa/QAList';
import NewLayout from '../../NewLayout';
import { RouteComponentProps } from 'react-router-dom';
import Schools from '../../../components/Schools'

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
      <NewLayout>
        <Card>
          <Button  href='savedSchools'>My Schools</Button>
          <QAList qas={this.state.qas} answerable={false}/>
        </Card>
      </NewLayout>
    );
    return view;
  }
}

export default SavedQuestions;
