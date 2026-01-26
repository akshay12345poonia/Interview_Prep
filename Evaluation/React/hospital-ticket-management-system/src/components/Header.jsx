import React from "react";

const Header = ({timer, treated, notTreated, pending}) => {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds/60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="bg-white shadow-md p-4 mb-6 round-lg flex justify-between items-center flex-wrap gap-4">
            <div className="flex flex-col">
                <span className="text-gray-500 text-sm font-bold uppercase">Session Timer</span>
                <span className={`text-3xl font-mono font-bold ${timer < 60 ? "text-red-500" : "text-blue-600"}`}>
                    {formatTime(timer)}
                </span>
            </div>

            <div className="flex gap-6 text-sm font-medium">
                <div className="text-center">
                    <div className="text-gray-500">Treated</div>
                    <div className="text-green-600 text-xl font-bold">{treated}</div>
                </div>
                <div className="text-center">
                    <div className="text-gray-500">Untreated</div>
                    <div className="text-red-600 text-xl font-bold">{notTreated}</div>
                </div>
                <div className="text-center">
                    <div className="text-gray-500">Pending</div>
                    <div className="text-yellow-600 text-xl font-bold">{pending}</div>
                </div>
            </div>
        </div>
    )
}

export default Header;
