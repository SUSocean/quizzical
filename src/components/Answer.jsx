import React from 'react'

export default function Answer(props) {

    const styleAnswer = props.game && !props.isCorrectAnswer && props.wasChosen ? {
        backgroundColor: '#F8BCBC',
        border: '1px solid transparent',
        opacity: '0.5',
    } : props.game && !props.wasChosen && !props.isCorrectAnswer ? {
        opacity: '0.5'
    } : props.game && props.isCorrectAnswer ? {
        backgroundColor: '#94D7A2',
        border: '1px solid transparent'
    } : props.wasChosen ? {
        backgroundColor: '#D6DBF5',
        border: '1px solid transparent',
    }
        : {}

    return (
        <div id={props.questionID} style={styleAnswer} onClick={() => !props.game ? props.marckAnswer(props.uuid) : {}} className='question-container--answers-container--answer'>
            {props.answer}
        </div>
    )
}