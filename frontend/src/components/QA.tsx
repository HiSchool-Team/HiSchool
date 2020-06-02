import React from 'react'
import { Answer, Question } from '../types'
import { StarRating } from './Rating'
import { Col, Row } from 'antd'
import './QA.css'

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

type Props = {
  question: Question,
}

export const QA = ({ question }: Props) => {
  return (
    <div className={'qa'}>
      <h2>{question.title}</h2>
      <p>{question.body}</p>
      {question.answer && <AnswerComponent answer={question.answer}/>}
    </div>
  )
}
