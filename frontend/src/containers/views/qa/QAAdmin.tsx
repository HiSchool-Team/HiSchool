import { QA, Question } from '../../../types';
import React from 'react';
import { QAList } from '../../../components/qa/QAList';
import NewLayout from '../../NewLayout';
import { RouteComponentProps } from 'react-router-dom';
import { fetchQAs } from '../../../api';

const exampleQuestions: QA[] = [
  {
    id: 0,
    question: {
      title: 'Question0',
      body: 'question0 body'
    },
    answer: undefined
  },
  {
    id: 1,
    question: {
      title: 'Question1',
      body: 'question1 body'
    },
    answer: {
      body: 'this is an answer',
      rating: 4,
      author: 'A name'
    }
  }
];

type State = {
  qas: QA[],
};

class QAAdmin extends React.Component<RouteComponentProps, State> {
  state = {
    qas: []
  };

  componentDidMount () {
    fetchQAs().then(qas => this.setState({ qas: qas }));
  }

  render () {
    return (
      <NewLayout route={{
        history: this.props.history,
        location: this.props.location,
        match: this.props.match,
        staticContext: this.props.staticContext
      }}>
        <QAList qas={this.state.qas} answerable/>
      </NewLayout>);
  }
}

export default QAAdmin;
