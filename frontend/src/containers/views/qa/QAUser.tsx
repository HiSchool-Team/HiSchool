import React from 'react';
import { QA } from '../../../types';
import AskBar from '../../../components/qa/AskBar';
import { Card } from 'antd';
import { QAList } from '../../../components/qa/QAList';
import NewLayout from '../../NewLayout';
import { RouteComponentProps } from 'react-router-dom';
import { fetchQAs } from '../../../api';

type State = {
  qas: QA[],
};

class QAUser extends React.Component<RouteComponentProps, State> {
  state = {
    qas: []
  };

  componentDidMount () {
    fetchQAs().then(qas => qas && this.setState({ qas: qas.reverse() }));
  }

  render () {
    console.log('Rerendering QAUser with state');
    console.log(this.state);
    const view = (

      <NewLayout>
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
