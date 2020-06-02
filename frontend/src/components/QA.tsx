import React from 'react'
import { Answer, Question } from '../types'
import { StarRating } from './Rating'
import {Col, Row, Input, Button} from 'antd'
import './QA.css'

const { TextArea } = Input

type AnswerProps = {
  answer: Answer,
}

const AnswerComponent = ({ answer }: AnswerProps) => {
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
    </div>
  )
}

const AnswerInputComponent = () => {
  return (<div className={'answerInput'}>
    <Row>
      <h2>Answer</h2>
      <TextArea
        placeholder="Write answer here"
        autoSize={{ minRows: 3 }}
      />
      <Button type="primary">Submit Answer</Button>
    </Row>
  </div>)
}

type Props = {
  question: Question,
  answerable: boolean,
}

export const QA = ({ question, answerable }: Props) => {
  let answer
  let showAnswer = false
  if (question.answer) {
    showAnswer = true
    answer = <AnswerComponent answer={question.answer}/>
  } else if (answerable) {
    showAnswer = true
    answer = <AnswerInputComponent/>
  }
  return (
    <div className={'qa'}>
      <h2>{question.title}</h2>
      <p>{question.body}</p>
      {showAnswer && answer}
    </div>
  )
}
