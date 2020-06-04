import { QA, Question } from '../../../types';
import React from 'react';
import { QAList } from '../../../components/qa/QAList';
import NewLayout from '../../NewLayout';
import { RouteComponentProps } from 'react-router-dom';

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
  questions: QA[],
};

class QAAdmin extends React.Component<RouteComponentProps, State> {
  state = {
    questions: exampleQuestions
  };

  /*

  saveAnswer (newBody: string, qid: number): void {
    // FIXME this is terrible, but I am afraid of changing state directly
    // FIXME might be useful to get a better data structure for storing questions
    const newQuestions = this.state.questions.slice();
    for (let i = 0; i < newQuestions.length; i++) {
      if (newQuestions[i].id === qid) {
        let answer = newQuestions[i].answer;
        if (answer) {
          answer.being_edited = false;
          answer.body = newBody;
        } else {
          // FIXME figure out a way to give proper attributes
          answer = {
            id: 0,
            body: newBody,
            rating: {
              value: 5,
              num_raters: 0
            },
            teacher_name: 'NOBODY',
            being_edited: false
          };
          newQuestions[i].answer = answer;
        }
        break;
      }
    }
    this.setState({ questions: newQuestions });
  }

  editAnswer (qid: number): void {
    // FIXME this is terrible, but I am afraid of changing state directly
    // FIXME might be useful to get a better data structure for storing questions
    const newQuestions = this.state.questions.slice();
    for (let i = 0; i < newQuestions.length; i++) {
      if (newQuestions[i].id == qid) {
        const answer = newQuestions[i].answer;
        if (answer) {
          answer.being_edited = true;
        }
        break;
      }
    }
    this.setState({ questions: newQuestions });
  } */

  componentDidMount () {
    // TODO
  }

  render () {
    // TODO ask roko if division in components and containers makes sense
    return (
      <QAList qas={this.state.questions} answerable/>);
  }
}

export default QAAdmin;
