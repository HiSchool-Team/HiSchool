import React from 'react';
import { Answer, QA, Question } from '../../types';
import { StarRating } from '../Rating';
import { Button, Col, Row, Input, Form } from 'antd';
import styles from './QA.module.css';
import { QuestionCircleTwoTone } from '@ant-design/icons/lib';
import { Store } from 'antd/lib/form/interface';
import Paragraph from 'antd/es/typography/Paragraph';

const { TextArea } = Input;

const makeColumn = (flex: number, item?: JSX.Element) => {
  if (item) {
    return <Col flex={flex}>
      {item}
    </Col>;
  } else {
    return <Col flex={flex}/>;
  }
};

const responsiveGutter = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32
};

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
      <Row gutter={responsiveGutter} justify="start">
        {makeColumn(2, <h2>Answer</h2>)}
        {makeColumn(1)}
      </Row>
      <Row gutter={responsiveGutter} justify="start">
        {makeColumn(8, <Paragraph>{answer.body}</Paragraph>)}
        {makeColumn(1)}
        {makeColumn(3, answerRating)}
      </Row>
      <Row gutter={responsiveGutter} justify="start">
        {makeColumn(2, <Paragraph>{answer.author}</Paragraph>)}
        {makeColumn(1)}
      </Row>
      {answerable &&
      <Row gutter={responsiveGutter} justify="start">
        {makeColumn(2, editButton)}
        {makeColumn(1)}
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
      author: 'The name of a teacher',
      rating: Math.random() * 5
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
      <Row gutter={responsiveGutter} justify="start">
        {makeColumn(2, <h2>Answer</h2>)}
        {makeColumn(1)}
      </Row>
      <Row gutter={responsiveGutter} justify="start">
        {makeColumn(2, textArea)}
        {makeColumn(1)}
      </Row>
      <Row gutter={responsiveGutter} justify="start">
        {makeColumn(2, saveButton)}
        {makeColumn(1)}
      </Row>
    </Form>
  );
};

type Props = {
  qa: QA,
  answerable: boolean,
};

const QAItem = ({ qa, answerable }: Props) => {
  const [currentQA, setCurrentQA] = React.useState(qa);
  const [editing, setEditing] = React.useState(!currentQA.answer && answerable);
  const updateAnswer = (a: Answer) => setCurrentQA(qa => ({
    ...qa,
    answer: a
  }));
  const toggleEditing = () => setEditing(e => !e);

  const green = '#01d71b';
  const red = 'red';
  const questionMarkIcon = currentQA.answer
    ? <QuestionCircleTwoTone twoToneColor={green} title="this question has been answered"/>
    : <QuestionCircleTwoTone twoToneColor={red} title="this question has not been answered yet"/>;

  const defaultValue = currentQA.answer ? currentQA.answer.body : '';
  let answerDisplayComponent;

  if (editing) {
    answerDisplayComponent = <AnswerInputComponent
      defaultValue={defaultValue}
      onSubmit={(a: Answer) => {
        updateAnswer(a);
        toggleEditing();
      }}
    />;
  } else {
    answerDisplayComponent =
      <AnswerComponent answer={currentQA.answer as Answer} answerable={answerable} onEdit={toggleEditing}/>;
  }

  const question = currentQA.question;

  return (
    <div>
      <div className={styles.questionTitle}>
        <Row gutter={responsiveGutter} justify="start">
          {makeColumn(1, <Paragraph><h2>{questionMarkIcon}</h2></Paragraph>)}
          {makeColumn(15, <Paragraph><h2>{question.title}</h2></Paragraph>)}
          {makeColumn(8)}
        </Row>
      </div>
      <Row gutter={responsiveGutter} justify="start">
        {makeColumn(1, <Paragraph>{question.body}</Paragraph>)}
      </Row>
      <br/>
      {(currentQA.answer || editing) && answerDisplayComponent}
    </div>
  );
};

export default QAItem;
