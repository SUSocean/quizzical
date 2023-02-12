import React from "react"
import Question from "./components/Question"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'
import StartScreen from './components/StartScreen'
export default function App() {


  const [questions, setQuestions] = React.useState([{
    question: '',
    answers: [],
    uuid: '',
    isCorrectAnswer: false
  }])
  const [game, setGame] = React.useState(false)
  const [numOfCorrect, setNumOfCorrect] = React.useState(0)
  const [start, setStart] = React.useState({ screen: false, render: false })

  const fetchData = () => {
    return fetch('https://opentdb.com/api.php?amount=5')
      .then(res => res.json())
      .then(data => data.results.map(ques => {
        return {
          question: ques.question,
          answers: shuffle([{ answer: ques.correct_answer, isCorrectAnswer: true, wasChosen: false, uuid: uuidv4() },
          ...ques.incorrect_answers.map(ans => { return { answer: ans, isCorrectAnswer: false, wasChosen: false, uuid: uuidv4() } })]),
          questionID: uuidv4()
        }
      })
      )
      .then(data => setQuestions(data))
  }

  React.useEffect(() => {
    fetchData()
  }, [start.render])

  const QuestionComponent = questions.map(ques =>
    <Question
      question={ques.question}
      answers={ques.answers}
      key={ques.question}
      marckAnswer={(id) => marckAnswer(id)}
      game={game}
      questionID={ques.questionID}
    />)

  function shuffle(array) {
    let result = array
    for (let i = 0; i < result.length; i++) {
      let x = result[i];
      let y = Math.floor(Math.random() * (i + 1));
      result[i] = result[y];
      result[y] = x;
    }
    return result
  }

  const marckAnswer = (id) => {
    setQuestions(prevQuestions => prevQuestions.map(question => {
      return {
        ...question,
        answers: question.answers.map(answer => answer.uuid == id ? { ...answer, wasChosen: !answer.wasChosen }
          : question.questionID == event.target.id ? { ...answer, wasChosen: false }
            : { ...answer })
      }
    })
    )
  }

  const checkAnswers = () => {
    setGame(prevGame => !prevGame)
  }

  React.useEffect(() => {
    setNumOfCorrect(countCorrect())
  }, [game])

  function countCorrect() {
    let result = 0
    questions.forEach(question => {
      question.answers.forEach(answer => {
        if (answer.wasChosen && answer.isCorrectAnswer) {
          result++
        }
      }
      )
    })
    return result
  }

  function startOver() {
    setStart(prevStart => { return { ...prevStart, render: !prevStart.render } })
    setGame(prevGame => !prevGame)
  }

  return (
    <>

      {!start.screen && <StartScreen
        startGame={() => setStart(prevStart => { return { ...prevStart, screen: !prevStart.screen } })}
      />}

      {start.screen && <main className="main">
        {QuestionComponent}
        {!game && <button onClick={checkAnswers} className="main--checkAnswers-btn">Check answers</button>}
        {game && <div className="endGame-container">
          <p className="endGame-container--info">You scored {numOfCorrect}/5 correct answers</p>
          <button onClick={() => startOver()} className="endGame-container--btn">Play again</button>
        </div>}
      </main>}
    </>

  )
}