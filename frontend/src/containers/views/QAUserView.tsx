import React from 'react';
import myData from '../../data.json';
import { QAList } from '../../components/qa/QAList';
import { Question } from '../../types';
import AskBar from '../../components/qa/AskBar';
import { Card } from 'antd';

type State = {
  questions: Question[],
};

const exampleQuestions = [
  {
    id: 0,
    title: 'Question0',
    body: 'question0 body',
    answer: undefined
  },
  {
    id: 1,
    title: 'Question1',
    body: 'question1 body',
    answer: {
      id: 0,
      body: 'this is an answer',
      rating: {
        value: 4,
        num_raters: 2
      },
      teacher_name: 'A name'
    }
  }
];

class QAUserView extends React.Component<{}, State> {
  state = {
    questions: exampleQuestions
  };

  private fetchQuestions () {
    // TODO
  }

  componentDidMount () {
    this.fetchQuestions();
  }

  render () {
    const view = (
      <div>
        <Card>
          <AskBar />
          <QAList data={this.state.questions}/>
        </Card>
      </div>
    );
    return view;
  }
}

export default QAUserView;
