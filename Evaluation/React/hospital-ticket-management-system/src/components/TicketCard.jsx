import React from "react";

const TicketCard = ({patient, status}) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 max-w-lg w-full mx-auto relative overflow-hidden transition-al duration-300">
            {status && (
                <div className={`absolute top-0 right-0 px-4 py-2 rounded-bl-xl font-bold text-white uppercase text-xs tracking-wider
                    ${status === 'treated' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {status === 'treated' ? 'Treated' : 'Not Treated'}
                </div>
            )}

            <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {patient.name}
            </h2>
            <p className="text-gray-500 text-sm mb-6">Patient ID: #{patient.id}</p>
            <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600 font-medium">Age</span>
                    <span className="text-gray-900">{patient.age}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600 font-medium">Assigned Doctor</span>
                    <span className="text-blue-600 font-medium">{patient-doctor}</span>
                </div>

                <div className="mt-4">
                    <span className="text-gray-600 font-medium block mb-1">Problem Description</span>
                    <p className="bg-gray-50 p-3 rounded-lg text-gray-700 italic border border-gray-100">
                        "{patient.problem}"
                    </p>
                </div>
            </div>

        </div>
    )
}

export default TicketCard