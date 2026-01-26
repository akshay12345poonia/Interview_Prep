import React from "react";

const Controls = ({ onNext, onPrev, onStatusUpdate, isFirst, isLast, 
    currentStatus, isSessionActive
}) => {
    const isLocked = !!currentStatus || isSessionActive;
    return (
        <div className="mt-8 max-w-lg mx-auto w-full">
            <div className="flex gap-4 mb-6">
                <button onClick={() => onStatusUpdate('treated')}
                disabled={isLocked}
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-white transition-colors
                    ${isLocked ? 'bg-green-200 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-md'}`}>
                        ✔️ Mark Treated
                </button>
                
                <button onClick={() => onStatusUpdate('not_treated')}
                disabled={isLocked}
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-white transition-colors
                    ${isLocked ? 'bg-red-200 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 shadow-md'}`}>
                        ❌ Mark Not Treated
                    </button>

            </div>
            <hr className="border-gray-300 mb-6" />

            <div className="flex justify-between items-center">
                <button 
                    onClick={onPrev}
                    disabled={isFirst}
                    className={`px-6 py-2 rounded-md font-medium transition-colors
                        ${isFirst ? 'text-gray-300 bg-gray-100 cursor-not-allowed' :
                            'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}>
                             ⬅️ Previous
                </button>

                <span className="text-gray-400 text-sm">Navigation</span>

                <button
                    onClick={onNext}
                    disabled={isLast}
                    className={`px-6 py-2 rounded-md font-medium transition-colors
                        ${isLast ? 'text-gray-300 bg-gray-100 cursor-not-allowed'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                        }    
                    `}    
                >
                    Next ➡️
                </button>
            </div>
        </div>
    )
}

export default Controls