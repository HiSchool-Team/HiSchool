import React from 'react';
import { QA, Question, School } from '../../types';
import AskBar from '../../components/qa/AskBar';
import { Card } from 'antd';
import { QAList } from '../../components/qa/QAList';
import NewLayout from '../NewLayout';
import { RouteComponentProps } from 'react-router-dom';
import { fetchAllQAs, fetchQAs } from '../../api';

type State = {
  qas: QA[],
};

type Props = {
  isAdmin: boolean,
};

type Params = {
  school_id: string,
};

class QAView extends React.Component<RouteComponentProps<Params> & Props, State> {
  state = {
    qas: []
  };

 school_id = parseInt(this.props.match.params.school_id);

 componentDidMount () {
   fetchQAs(this.school_id).then(qas => qas && this.setState({ qas: qas.reverse() }));
 }

 render () {
   console.log('Rerendering QAView with state');
   console.log(this.state);

   const view = (

     <NewLayout route={this.props}>
       <div>
         <Card>
           {!this.props.isAdmin && <AskBar />}
           <QAList qas={this.state.qas} answerable={this.props.isAdmin}/>
         </Card>
       </div>
     </NewLayout>
   );
   return view;
 }
}

export default QAView;
