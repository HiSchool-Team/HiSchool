import React from 'react'
import { Answer, Question } from '../types'
import { StarRating } from './Rating'

type AnswerProps = {
    answer: Answer,
}

const AnswerComponent = ({ answer }: AnswerProps) => {
  return (
    <div>
      <h3>Answer</h3>
      <p>{answer.body}</p>
      <StarRating rating={answer.rating} />
      {answer.teacher_name && <p>{answer.teacher_name}</p>}
    </div>
  )
}

type Props = {
    question: Question,
}

export const QA = ({ question }: Props) => {
  return (
    <div className={'qa'}>
      <h3>{question.title}</h3>
      <p>{question.body}</p>
      {question.answer && <AnswerComponent answer={question.answer}/>}
    </div>
  )
}
