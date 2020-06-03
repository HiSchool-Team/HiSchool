import React from 'react'
import { QA } from './QA'
import { Card, List } from 'antd'
import { Question } from '../../types'

export const QAList =
  (props: {
    data: Question[],
    answerable: boolean,
    // FIXME figure it out
    saveAnswer?: any,
    editAnswer?: any,
  }) => {
    return (
      <List
        itemLayout="vertical"
        size="large"
        dataSource={props.data}
        renderItem={(item: Question) =>
          <Card>
            <QA question={item}
              answerable={props.answerable}
              saveAnswer={props.saveAnswer}
              editAnswer={props.editAnswer}/>
          </Card>}
      />
    )
  }
