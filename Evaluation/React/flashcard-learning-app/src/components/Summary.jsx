import React from "react";

const Summary = ({correct, incorrect, unattempted}) => {
    return (
        <div>
            <h1>Session Summary</h1>
            <h3>Correct Answer: {correct}</h3>
            <h3>Incorrect Answer: {incorrect}</h3>
            <h3>Unattempted Cards: {unattempted}</h3>
        </div>
    )
}

export default Summary