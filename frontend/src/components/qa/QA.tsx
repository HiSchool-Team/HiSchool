import React from 'react';
import { Answer, Question } from '../../types';
import { StarRating } from '../Rating';
import { Button, Col, Row, Input } from 'antd';
import styles from './QA.module.css';
import { QuestionCircleTwoTone } from '@ant-design/icons/lib';

const { TextArea } = Input;

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
  </div>);
};

type Props = {
  question: Question,
  answerable: boolean,
};

export const QA = ({ question, answerable }: Props) => {
  const green = '#01d71b';
  const red = 'red';
  const questionMarkIcon = question.answer
    ? <QuestionCircleTwoTone twoToneColor={green} title="this question has been answered"/>
    : <QuestionCircleTwoTone twoToneColor={red} title="this question has not been answered yet"/>;

  let answer: React.ReactNode;
  let showAnswer = false;
  if (question.answer) {
    showAnswer = true;
    answer = <AnswerComponent answer={question.answer}/>;
  } else if (answerable) {
    showAnswer = true;
    answer = <AnswerInputComponent/>;
  }

  return (
    <div>
      <div className={styles.questionTitle}>
        <p><h2>{questionMarkIcon} {question.title}</h2></p>
      </div>
      <p>{question.body}</p>
      <br/>
      {showAnswer && answer}
    </div>
  );
};
