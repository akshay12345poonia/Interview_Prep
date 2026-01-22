const EditorHistory = ({ currentPosition, totalStates }) => {
  const progressPercentage = totalStates > 1 ? (currentPosition / (totalStates - 1)) * 100 : 0

  return (
    <div className="bg-white px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-semibold text-gray-700">
          History Position:{" "}
          <span className="text-blue-600 font-bold">
            {currentPosition + 1}/{totalStates}
          </span>
        </label>
        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
          {totalStates - 1} change{totalStates - 1 !== 1 ? "s" : ""} recorded
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-blue-500 to-blue-600 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* History Steps Visual */}
      <div className="mt-3 flex gap-1 items-center">
        {Array.from({ length: Math.min(totalStates, 10) }).map((_, index) => (
          <div
            key={index}
            className={`
              h-2 flex-1 rounded-sm transition-all duration-200
              ${index <= currentPosition ? "bg-blue-500" : "bg-gray-300"}
              ${index === currentPosition ? "ring-2 ring-blue-400" : ""}
            `}
            title={`State ${index + 1}`}
          ></div>
        ))}
        {totalStates > 10 && <span className="text-xs text-gray-500 ml-2">+{totalStates - 10}</span>}
      </div>
    </div>
  )
}

export default EditorHistory
