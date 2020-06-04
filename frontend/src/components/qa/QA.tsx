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
  answerable: boolean,
  onEdit: () => void,
};

const AnswerComponent = ({ answer, answerable, onEdit }: AnswerProps) => {
  const editButton =
    <Button type="primary"
      onClick={e => onEdit()}>
      Edit Answer
    </Button>;

  const answerRating =
    <div className={styles.answerRatingContainer}>
      <div className={styles.answerRating}>
        <StarRating rating={{
          value: answer.rating,
          numRaters: 42
        }}/>
      </div>
    </div>;

  return (
    <div className={styles.answerRating}>
      <Row>
        <Col span={18}>
          <h2>Answer</h2>
          <p>{answer.body}</p>
          {answer.author && <p>{answer.author}</p>}
        </Col>
        <Col span={6}>
          {answerRating}
        </Col>
      </Row>
      {answerable &&
      <Row>
        {editButton}
      </Row>}
    </div>
  );
};

type AnswerInputProps = {
  defaultValue: string,
  onSubmit: (answer: Answer) => void,
};

const AnswerInputComponent = ({ defaultValue, onSubmit }: AnswerInputProps) => {
  const onFinish = ({ answerBody }: Store) => {
    onSubmit({
      body: answerBody,
      author: 'exampleName',
      rating: 0
    });
  };

  const textArea =
    <Form.Item name="answerBody">
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
      initialValues={{ answerBody: defaultValue }}>
      <h2>Answer</h2>
      {textArea}
      {saveButton}
    </Form>
  );
};

type Props = {
  question: Question,
  answerable: boolean,
};

export const QA = (props: Props) => {
  const [question, setQuestion] = React.useState(props.question);
  const [editing, setEditing] = React.useState(!question.answer);
  const updateAnswer = (a: Answer) => setQuestion(q => ({ ...q, answer: a }));
  const toggleEditing = () => setEditing(e => !e);

  const green = '#01d71b';
  const red = 'red';
  const questionMarkIcon = question.answer
    ? <QuestionCircleTwoTone twoToneColor={green} title="this question has been answered"/>
    : <QuestionCircleTwoTone twoToneColor={red} title="this question has not been answered yet"/>;

  const defaultValue = question.answer ? question.answer.body : '';
  let answerComponent;

  if (editing) {
    answerComponent = <AnswerInputComponent
      defaultValue={defaultValue}
      onSubmit={(a: Answer) => {
        updateAnswer(a);
        toggleEditing();
      }}
    />;
  } else {
    answerComponent =
      <AnswerComponent answer={question.answer as Answer} answerable={props.answerable} onEdit={toggleEditing}/>;
  }

  return (
    <div>
      <div className={styles.questionTitle}>
        <p><h2>{questionMarkIcon} {question.title}</h2></p>
      </div>
      <p>{question.body}</p>
      <br/>
      {(question.answer || editing) && answerComponent}
    </div>
  );
};
