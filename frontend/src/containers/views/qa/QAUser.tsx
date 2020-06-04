import React from 'react';
import { QA, Question } from '../../../types';
import AskBar from '../../../components/qa/AskBar';
import { Card } from 'antd';
import { QAList } from '../../../components/qa/QAList';
import NewLayout from '../../NewLayout';
import { RouteComponentProps } from 'react-router-dom';
import { fetchQAs } from '../../../api';

const exampleQAs: QA[] = [
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

export type QAUpdater = (qa: QA) => void;

type State = {
  qas: QA[],
  qasUpdaters: QAUpdater[],
};

class QAUser extends React.Component<RouteComponentProps, State> {
  state = {
    qas: [],
    qasUpdaters: []
  };

  componentDidMount () {
    fetchQAs().then(qas => this.setState({ qas: qas }));
  }

  render () {
    console.log('Rerendering QAUser with state');
    console.log(this.state);
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
            <QAList qas={this.state.qas} answerable={false}/>
          </Card>
        </div>
      </NewLayout>
    );
    return view;
  }
}

export default QAUser;
