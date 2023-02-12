import React from "react"

export default function StartScreen(props) {
    return (
        <div className="container">
            <div className="start-screen">
                <h1 className="start-screen--headline">Quizzical</h1>
                <button className="start-screen--btn" onClick={props.startGame}>Start quiz</button>
            </div>
        </div>
    )
}