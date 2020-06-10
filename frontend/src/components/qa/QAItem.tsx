import React from 'react';
import { Answer, QA} from '../../types';
import { StarRating } from '../Rating';
import { Button, Col, Row, Input, Form } from 'antd';
import styles from './QA.module.css';
import { QuestionCircleTwoTone, StarOutlined } from '@ant-design/icons/lib';
import { Store } from 'antd/lib/form/interface';
import { putQA } from '../../api';

const { TextArea } = Input;

type AnswerProps = {
  answer: Answer,
  answerable: boolean,
  onEdit: () => void,
};

// FIXME remove duplication with equivalent in SchoolDetails
// TODO work out if the admin view should have this!
const savedIcon = () => {
  // TODO add retrieval of information based on user account
  // and add <StarFilled /> return
  return <StarOutlined style={{ fontSize: '1.9vw' }} onClick={e => changeSavedIcon()}/>;
};

const changeSavedIcon = () => {
  // TODO cause change of saved status for user account
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
        <Col span={24}>
          <h2>Answer</h2>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <p>{answer.body}</p>
        </Col>
        <Col span={6}>
          {answerRating}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {answer.author && <p>{answer.author}</p>}
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
      author: 'The name of a teacher',
      rating: Math.round(Math.random() * 5)
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
  qa: QA,
  answerable: boolean,
};

const QAItem = ({ qa, answerable }: Props) => {
  const [currentQA, setCurrentQA] = React.useState(qa);
  const [editing, setEditing] = React.useState(!currentQA.answer && answerable);
  const updateAnswer = (a: Answer) => {
    setCurrentQA(qa => {
      const updatedQA: QA = {
        ...qa,
        answer: a
      };
      putQA(updatedQA);

      return updatedQA;
    });
  };
  const toggleEditing = () => setEditing(e => !e);

  const green = '#01d71b';
  const red = 'red';
  const questionMarkIcon = currentQA.answer
    ? <QuestionCircleTwoTone twoToneColor={green} title="this question has been answered"/>
    : <QuestionCircleTwoTone twoToneColor={red} title="this question has not been answered yet"/>;

  const defaultValue = currentQA.answer ? currentQA.answer.body : '';
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
      <AnswerComponent answer={currentQA.answer as Answer} answerable={answerable} onEdit={toggleEditing}/>;
  }

  const question = currentQA.question;

  return (
    <div>
      <div className={styles.questionTitle}>
        <Row>
          <Col span={17}>
            <p><h2>{questionMarkIcon} {question.title}</h2></p>
          </Col>
          <Col span={1}/>
          <Col span={6}>
            {savedIcon()}
          </Col>
        </Row>
      </div>
      <p>{question.body}</p>
      <br/>
      {(currentQA.answer || editing) && answerComponent}
    </div>
  );
};

export default QAItem;
