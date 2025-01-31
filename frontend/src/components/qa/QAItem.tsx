import React, { useEffect } from 'react';
import { Answer, QA } from '../../types';
import { StarRating } from '../Rating';
import { Button, Col, Form, Input, Row } from 'antd';
import styles from './QA.module.css';
import { QuestionCircleTwoTone } from '@ant-design/icons/lib';
import { Store } from 'antd/lib/form/interface';
import qaAPI from '../../api/QA';
import applicantAccountAPI from '../../api/ApplicantAccount';
import { SavedIcon } from '../SavedIcon';
import userContext from '../../context/User';

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
        <Col span={24}>
          <h2>Answer</h2>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <p>{answer.body}</p>
        </Col>
        <Col span={6}>
          {/* {answerRating} */}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {answer.author && <p>{answer.author}</p>}
          {answer.created_at && <p><i>Answered at {answer.created_at}</i></p>}
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
  isAnswerable: boolean,
};

const QAItem = ({ qa, isAnswerable }: Props) => {
  const [currentQA, setCurrentQA] = React.useState(qa);
  const [editing, setEditing] = React.useState(!currentQA.answer && isAnswerable);
  const [saved, setSaved] = React.useState(false);

  // Configures initial value of saved state
  useEffect(() => {
    applicantAccountAPI.hasSavedQA(qa).then(isSaved => {
      console.log(`setting saved to ${isSaved}`);
      setSaved(isSaved);
    });
  }, [qa.id]);

  const updateAnswer = (a: Answer) => {
    setCurrentQA(qa => {
      const updatedQA: QA = {
        ...qa,
        answer: a
      };
      qaAPI.put(updatedQA);
      return updatedQA;
    });
  };

  const toggleEditing = () => setEditing(e => !e);

  const userSave = () => {
    applicantAccountAPI.saveQA(qa);
    setSaved(true);
  };

  const userUnsave = () => {
    applicantAccountAPI.unsaveQA(qa);
    setSaved(false);
  };

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
      <AnswerComponent answer={currentQA.answer as Answer} answerable={isAnswerable} onEdit={toggleEditing}/>;
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
          {userContext.isApplicantAccount() &&
          <Col span={6}>
            <div style={{ fontSize: '26px' }}><SavedIcon isSaved={saved} onSave={userSave} onUnsave={userUnsave}/></div>
          </Col>}
        </Row>
      </div>
      <p>{question.body}</p>
      {question.created_at && <p><i>Asked at {question.created_at}</i></p>}
      <br/>
      {(currentQA.answer || editing) && answerComponent}
    </div>
  );
};

export default QAItem;
