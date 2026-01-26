import React from "react";


const Summary = ({ total, treated, notTreated, pending, onReset }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-bounce-in">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Session Ended</h2>
        <p className="text-gray-500 mb-8">Summary Report</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="text-2xl font-bold text-blue-700">{total}</div>
            <div className="text-xs uppercase text-blue-400 font-bold">Total Patients</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl">
            <div className="text-2xl font-bold text-yellow-700">{pending}</div>
            <div className="text-xs uppercase text-yellow-400 font-bold">Pending</div>
          </div>
          <div className="bg-green-50 p-4 rounded-xl">
            <div className="text-2xl font-bold text-green-700">{treated}</div>
            <div className="text-xs uppercase text-green-400 font-bold">Treated</div>
          </div>
          <div className="bg-red-50 p-4 rounded-xl">
            <div className="text-2xl font-bold text-red-700">{notTreated}</div>
            <div className="text-xs uppercase text-red-400 font-bold">Untreated</div>
          </div>
        </div>

        <button 
          onClick={onReset}
          className="w-full bg-gray-800 text-white py-3 rounded-lg font-bold hover:bg-gray-700 transition"
        >
          Start New Session
        </button>
      </div>
    </div>
  );
};

export default Summary;