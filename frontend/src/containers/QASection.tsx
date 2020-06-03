import React from 'react'
import myData from '../data.json'
import { QAList } from '../components/QAList'
import { Question } from '../types'

type State = {
  questions: Question[],
}

class QASection extends React.Component<unknown, State> {
  state = {
    questions: [
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
    ]
  }

  componentDidMount () {
    // TODO
  }

  render () {
    // TODO ask roko if division in components and containers makes sense
    return (<QAList data={this.state.questions} answerable={false}/>)
  }
}

export default QASection
