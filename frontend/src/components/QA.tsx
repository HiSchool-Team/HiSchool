import React from "react";


type Answer = {
    id: number;
    body: string;
    avg_rating: number;
}

export type Question = {
    id: number;
    title: string;
    body: string;
    answer?: Answer;
}


export const QA = (props: { question: Question }) => {
    const q = props.question;
    return (
        <div className={"qa"}>
            <p><h3>q.title</h3></p>
            <p>q.body</p>
        </div>
    )
}
