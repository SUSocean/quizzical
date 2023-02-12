import React from "react";
import Answer from "./Answer";

export default function Question(props) {

    function decodeString(str) {
        const decodedString = document.createElement("textarea");
        decodedString.innerHTML = str;
        return decodedString.value;
    }


    const answersComponent = props.answers.map(ans => {
        return <Answer
            key={ans.answer}
            answer={decodeString(ans.answer)}
            uuid={ans.uuid}
            marckAnswer={(id) => props.marckAnswer(id)}
            game={props.game}
            isCorrectAnswer={ans.isCorrectAnswer}
            wasChosen={ans.wasChosen}
            questionID={props.questionID}
        />
    })

    return (
        <div className="question-container">
            <p className="question-container--question">
                {decodeString(props.question)}
            </p>
            <div className="question-container--answers-container">
                {answersComponent}
            </div>
        </div>
    )
}