import React from 'react'
import { Answer, Question } from '../types'
import { StarRating } from './Rating'
import { Col, Row, Input, Button } from 'antd'
import './QA.css'

const { TextArea } = Input

type AnswerProps = {
  answer: Answer,
  editable: boolean,
  // FIXME figure it out
  edit?: any,
  qid: number,
}

const AnswerComponent = ({ answer, editable, edit, qid }: AnswerProps) => {
  const eventHandler = () => {
    edit(qid)
  }

  const editButton =
    <Row>
      <Button type="primary"
        onClick={eventHandler}>
        Edit Answer
      </Button>
    </Row>

  return (
    <div className={'answer'}>
      <Row>
        <Col span={18}>
          <h2>Answer</h2>
          <p>{answer.body}</p>
          {answer.teacher_name && <p>{answer.teacher_name}</p>}
        </Col>
        <Col span={6}>
          <div className={'answer-rating'}>
            <StarRating rating={answer.rating}/>
          </div>
        </Col>
      </Row>
      {editable && editButton}
    </div>
  )
}

type AnswerInputProps = {
  defaultValue?: string,
  // FIXME figure it out
  save?: any,
  qid: number,
}

type State = {
  value: string,
  props: AnswerInputProps,
}

class AnswerInputComponent extends React.Component<any, State> {
  constructor (props: AnswerInputProps) {
    super(props)
    this.state = {
      value: props.defaultValue ? props.defaultValue : '',
      props: props
    }
  }

  eventHandler = () => {
    this.state.props.save(this.state.value, this.state.props.qid)
  }

  // FIXME figure the proper type out
  registerChange = ({ target: { value } }: any) => {
    this.setState({ value: value })
  }

  render () {
    const { value } = this.state

    return (<div className={'answerInput'}>
      <Row>
        <h2>Answer</h2>
        <TextArea
          value={value}
          placeholder="Write answer here"
          autoSize={{ minRows: 3 }}
          onChange={this.registerChange}
        />
        <Button type="primary"
          onClick={this.eventHandler}>
          Submit Answer
        </Button>
      </Row>
    </div>)
  }
}

type Props = {
  question: Question,
  answerable: boolean,
  saveAnswer?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void),
  editAnswer?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void),
}

export const QA =
  ({
    question,
    answerable,
    saveAnswer,
    editAnswer
  }: Props) => {
    let answer
    let showAnswer = false
    if (question.answer) {
      showAnswer = true
      if (question.answer.being_edited) {
        answer = <AnswerInputComponent defaultValue={question.answer.body} save={saveAnswer} qid={question.id}/>
      } else {
        answer = <AnswerComponent answer={question.answer} editable={answerable} edit={editAnswer} qid={question.id}/>
      }
    } else if (answerable) {
      showAnswer = true
      answer = <AnswerInputComponent save={saveAnswer} qid={question.id}/>
    }

    return (
      <div className={'qa'}>
        <h2>{question.title}</h2>
        <p>{question.body}</p>
        {showAnswer && answer}
      </div>
    )
  }
