import React from 'react';
import { Question } from '../../../types';
import AskBar from '../../../components/qa/AskBar';
import { Card } from 'antd';
import { QAList } from '../../../components/qa/QAList';
import NewLayout from '../../NewLayout';
import { RouteComponentProps } from 'react-router-dom';

type State = {
  questions: Question[],
};

const exampleQuestions: Question[] = [
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
      body: 'this is an answer',
      rating: 4,
      author: 'A name'
    }
  }
];

class QAUser extends React.Component<RouteComponentProps, State> {
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
    // FIXME figure out a better way to handle answerable
    const view = (
      <NewLayout route={{
        history: this.props.history,
        location: this.props.location,
        match: this.props.match,
        staticContext: this.props.staticContext
      }}>
        <div>
          <Card>
            <AskBar/>
            <QAList data={this.state.questions} answerable={false}/>
          </Card>
        </div>
      </NewLayout>
    );
    return view;
  }
}

export default QAUser;
