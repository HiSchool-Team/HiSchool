import React from 'react';
import { Answer, Question } from '../../types';
import { StarRating } from '../Rating';
import { Col, Row } from 'antd';
import styles from './QA.module.css';
import { QuestionCircleTwoTone } from '@ant-design/icons/lib';

type AnswerProps = {
  answer: Answer,
};

const AnswerComponent = ({ answer }: AnswerProps) => {
  return (

    <div className={styles.answerRating}>
      <Row>
        <Col span={18}>
          <h2>Answer</h2>
          <p>{answer.body}</p>
          {answer.teacher_name && <p>{answer.teacher_name}</p>}
        </Col>
        <Col span={6}>
          <div className={styles.answerRatingContainer}>
            <div className={styles.answerRating}>
              <StarRating rating={answer.rating}/>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

type Props = {
  question: Question,
};

export const QA = ({ question }: Props) => {
  const green = '#01d71b';
  const red = 'red';
  const questionMarkIcon = question.answer
    ? <QuestionCircleTwoTone twoToneColor={green} title="this question has been answered"/>
    : <QuestionCircleTwoTone twoToneColor={red} title="this question has not been answered yet"/>;

  return (
    <div>
      <div className={styles.questionTitle}>
        <p><h2>{questionMarkIcon} {question.title}</h2></p>
      </div>
      <p>{question.body}</p>
      <br />
      {question.answer && <AnswerComponent answer={question.answer}/>}
    </div>
  );
};
