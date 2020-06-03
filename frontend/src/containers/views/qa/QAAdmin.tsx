import { Question } from '../../../types';
import React from 'react';
import { QAList } from '../../../components/qa/QAList';

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
      teacher_name: 'A name',
      being_edited: false
    }
  }
];

class QAAdmin extends React.Component<unknown, State> {
  state = {
    questions: exampleQuestions
  };

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
  }

  componentDidMount () {
    // TODO
  }

  render () {
    // TODO ask roko if division in components and containers makes sense
    return (<QAList
      data={this.state.questions}
      // FIXME find a better way to handle answerable
      answerable={true}
      saveAnswer={this.saveAnswer.bind(this)}
      editAnswer={this.editAnswer.bind(this)}
    />);
  }
}

export default QAAdmin;
