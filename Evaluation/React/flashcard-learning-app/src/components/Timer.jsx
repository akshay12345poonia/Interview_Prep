import React, {useEffect} from "react";
const Timer = ({timeLeft, setTimeLeft, onTimeUp}) => {
    useEffect(() => {
        if(timeLeft <= 0){
            onTimeUp();
            return;
        }
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <h3>
            Time Left: {minutes}:{seconds < 10 ? "0" : ""} 
            {seconds}
        </h3>
    )
}

export default Timer;