import React, {useState} from "react"
const FlashCard = ({card, onMark}) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div style={styles.card}>
            <h2>{flipped ? card.answer : card.question}</h2>

            <button onClick={() => setFlipped(!flipped)}>
                {flipped ? "Show Question" : "Flip Card"}
            </button>

            {flipped && (
                <div style={{marginTop: "10px"}}>
                    <button onClick={() => onMark("correct")}>Correct</button>
                    <button onClick={() => onMark("incorrect")}>Incorrect</button>
                </div>
            )}
        </div>
    )
};

const styles ={
    card: {
        border: "2px solid black",
        padding: "20px",
        textAlign: "center",
        margin: "20px",
    },
};

export default FlashCard