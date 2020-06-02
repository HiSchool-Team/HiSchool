import React from "react";
import {Answer, Question} from "../types";

interface AnswerProps {
    answer: Answer
}

const AnswerComponent = ({answer}: AnswerProps) => {
    return (
        <div>
            <h3>Answer</h3>
            <p>{answer.body}</p>
            <p>Rating: {answer.avg_rating}</p>
            {answer.teacher_name && <p>{answer.teacher_name}</p>}
        </div>
    )
}

interface Props {
    question: Question
}

export const QA = ({question}: Props) => {
    return (
        <div className={"qa"}>
            <h3>{question.title}</h3>
            <p>{question.body}</p>
            {question.answer && <AnswerComponent answer={question.answer}/>}
        </div>
    )
}
