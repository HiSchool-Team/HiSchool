import React from 'react';
import { Answer, Question } from '../../types';
import { StarRating } from '../Rating';
import { Button, Col, Row, Input, Form } from 'antd';
import styles from './QA.module.css';
import { QuestionCircleTwoTone } from '@ant-design/icons/lib';
import { Store } from 'antd/lib/form/interface';

const { TextArea } = Input;

type AnswerProps = {
  answer: Answer,
  editable: boolean,
  // FIXME figure it out
  edit?: any,
  qid: number,
};

const AnswerComponent = ({ answer, editable, edit, qid }: AnswerProps) => {
  const eventHandler = () => {
    edit(qid);
  };

  const editButton =
    <Button type="primary"
      onClick={eventHandler}>
      Edit Answer
    </Button>;

  const answerRating =
    <div className={styles.answerRatingContainer}>
      <div className={styles.answerRating}>
        <StarRating rating={answer.rating}/>
      </div>
    </div>;

  return (
    <div className={styles.answerRating}>
      <Row>
        <Col span={18}>
          <h2>Answer</h2>
          <p>{answer.body}</p>
          {answer.teacher_name && <p>{answer.teacher_name}</p>}
        </Col>
        <Col span={6}>
          {answerRating}
        </Col>
      </Row>
      {editable &&
      <Row>
        {editButton}
      </Row>}
    </div>
  );
};

type AnswerInputProps = {
  defaultValue?: string,
  // FIXME figure it out
  save?: any,
  qid: number,
};

const AnswerInputComponent = ({ defaultValue, save, qid }: AnswerInputProps) => {
  const onFinish = ({ content }: Store) => {
    save(content, qid);
  };

  const textArea =
    <Form.Item name="content">
      <TextArea
        placeholder="Write answer here"
        autoSize={{ minRows: 3 }}
      />
    </Form.Item>;

  const saveButton =
    <Form.Item>
      <Button type="primary"
        htmlType="submit">
        Submit Answer
      </Button>
    </Form.Item>;

  return (
    <Form onFinish={onFinish}
      initialValues={{ content: (defaultValue || '') }}>
      <h2>Answer</h2>
      {textArea}
      {saveButton}
    </Form>
  );
};

type Props = {
  question: Question,
  answerable: boolean,
  saveAnswer?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void),
  editAnswer?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void),
};

export const QA =
  ({
    question,
    answerable,
    saveAnswer,
    editAnswer
  }: Props) => {
    const green = '#01d71b';
    const red = 'red';
    const questionMarkIcon = question.answer
      ? <QuestionCircleTwoTone twoToneColor={green} title="this question has been answered"/>
      : <QuestionCircleTwoTone twoToneColor={red} title="this question has not been answered yet"/>;

    let answer: React.ReactNode;
    let showAnswer = false;
    if (question.answer) {
      showAnswer = true;
      if (question.answer.being_edited) {
        answer = <AnswerInputComponent defaultValue={question.answer.body} save={saveAnswer} qid={question.id}/>;
      } else {
        answer = <AnswerComponent answer={question.answer} editable={answerable} edit={editAnswer} qid={question.id}/>;
      }
    } else if (answerable) {
      showAnswer = true;
      answer = <AnswerInputComponent save={saveAnswer} qid={question.id}/>;
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
