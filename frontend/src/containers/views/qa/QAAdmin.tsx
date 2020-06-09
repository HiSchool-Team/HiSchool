import { QA } from '../../../types';
import React from 'react';
import { QAList } from '../../../components/qa/QAList';
import NewLayout from '../../NewLayout';
import { RouteComponentProps } from 'react-router-dom';
import { fetchQAs } from '../../../api';
import { doNothing } from '../../../utils/utils';

type State = {
  qas: QA[],
};

class QAAdmin extends React.Component<RouteComponentProps, State> {
  state = {
    qas: []
  };

  componentDidMount () {
    fetchQAs().then(qas => qas && this.setState({ qas: qas.reverse() }));
  }

  render () {
    return (
      <NewLayout>
        <QAList qas={this.state.qas} answerable/>
      </NewLayout>);
  }
}

export default QAAdmin;
