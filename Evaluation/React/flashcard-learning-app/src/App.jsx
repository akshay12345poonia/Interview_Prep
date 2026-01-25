import { useState, useEffect } from 'react'
import Flashcard from "./components/Flashcard";
import Timer from "./components/Timer";
import Summary from "./components/Summary";
import {flashcards} from "./data/flashcards";
import {localStorageKeys} from "./utils/localStorageKeys";

const TOTAL_TIME = 600;
import './App.css'

function App() {
  const [currentIndex, setCurrentIndex] = useState(Number(localStorage.getItem(localStorageKeys.CURRENT_CARD_INDEX)) || 0);
  const [correct, setCorrect] = useState(Number(localStorage.getItem(localStorageKeys.CORRECT_ANSWERS)) || 0);
  const [incorrect, setIncorrect] = useState(Number(localStorage.getItem(localStorageKeys.INCORRECT_ANSWERS)) || 0);
  const [timeLeft, setTimeLeft] = useState(Number(localStorage.getItem(localStorageKeys.TIMER)) || TOTAL_TIME);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    localStorage.setItem(localStorageKeys.CURRENT_CARD_INDEX, currentIndex);
    localStorage.setItem(localStorageKeys.CORRECT_ANSWERS, correct);
    localStorage.setItem(localStorageKeys.INCORRECT_ANSWERS, incorrect);
    localStorage.setItem(localStorageKeys.TIMER, timeLeft)

  }, [currentIndex, correct, incorrect, timeLeft]);

  const handleMark = (type) => {
    if(type === "correct") setCorrect((prev) => prev + 1);
    else setIncorrect((prev) => prev + 1);

    if(currentIndex < flashcards.length - 1){
      setCurrentIndex(currentIndex + 1);
    }
    else {
      setShowSummary(true);
    }
  }

  const handleTimeUp = () => {
    setShowSummary(true);
  };

  if(showSummary){
    const unattempted = flashcards.length - (correct + incorrect);
    return (
      <Summary 
        correct={correct}
        incorrect={incorrect}
        unattempted={unattempted}
      />
    );
  }


  return (
    <div style={{textAlign: "center"}}>
      <h1>FlashCard Learning App</h1>

      <Timer 
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        onTimeUp={handleTimeUp}
      />

      <Flashcard 
        card={flashcards[currentIndex]}
        onMark={handleMark}
      />

      <div>
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((prev) => prev -1)}
        >
          Previous
        </button>

        <button
          disabled={currentIndex === flashcards.length-1}
          onClick={() => setCurrentIndex((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default App
