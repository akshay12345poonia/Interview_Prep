import {useEffect, useState} from "react";

const DEFAULT_TIME = 300
export default function Timer() {
    const [time, setTime] = useState(DEFAULT_TIME)
    const [isRunning, setIsRunning] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(time);

    useEffect(() => {
        if(!isRunning || time === 0 || isEditing) return;
        const interval = setInterval(() => {
            setTime((prev) => Math.max(prev - 1, 0))
        }, 1000)
        return () => clearInterval(interval)
    }, [isRunning, time, isEditing])

    useEffect(() => {
        if(time === 0){
            setIsRunning(false)
        }
    }, [time])
    const formatTime = () => {
        const minutes = String(Math.floor(time/60)).padStart(2, "0")
        const seconds = String(time % 60).padStart(2, "0")
        return `${minutes}:${seconds}`
    }

    const handleStartStop = () => {
        if(time ===0) return
        setIsRunning(!isRunning)
    }
    const handleReset = () => {
        setIsRunning(false)
        setTime(DEFAULT_TIME)
    }
    const handleEditConfirm = () => {
        setTime(Math.max(Number(inputValue), 0))
        setIsEditing(false)
    }
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg w-80 text-center">
            <h1 className="text-2xl font-bold mb-6">Timer App</h1>
            <div className={`text-5xl font-mono mb-6 cursor-pointer ${time === 0 ? "text-red-500" : "text-gray-800"}`}
            onClick={() => {
                setIsEditing(true)
                setIsRunning(false)
                setInputValue(time)
            }}>
                {isEditing ? (
                    <input 
                        type="number"
                        className="w-full text-center border rounded"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={handleEditConfirm}
                        onKeyDown={(e) => e.key === "Enter" && handleEditConfirm()}
                        autoFocus
                    />
                ) : (formatTime()
                )}
            </div>

            <div className="flex gap-4 justify-center">
                <button
                    onClick={handleStartStop}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                    disabled={time === 0}
                >
                    {isRunning ? "Stop" : "Start"}
                </button>

                <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Reset
                </button>
            </div>

            {time === 0 && (
                <p className="mt-4 text-red-600 font-semibold">Time's Up</p>
            )}
        </div>
    )
}