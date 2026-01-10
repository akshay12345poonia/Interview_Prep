
import React from "react"

export default function StepIndicator({ steps, currentStep, completedSteps, onStepClick }) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          {/* Step Circle */}
          <button
            onClick={() => onStepClick(step.id)}
            disabled={step.id > currentStep && !completedSteps.has(step.id)}
            className={`
              flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg
              transition transform hover:scale-110
              ${
                completedSteps.has(step.id)
                  ? "bg-green-500 text-white cursor-pointer hover:bg-green-600"
                  : currentStep === step.id
                    ? "bg-blue-600 text-white cursor-default"
                    : step.id < currentStep
                      ? "bg-green-500 text-white cursor-pointer hover:bg-green-600"
                      : "bg-gray-200 text-gray-600 cursor-not-allowed"
              }
            `}
            title={`${step.label}${completedSteps.has(step.id) ? " (Completed)" : ""}`}
          >
            {completedSteps.has(step.id) ? "✓" : step.id + 1}
          </button>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`
              flex-1 h-1 mx-2 rounded
              ${completedSteps.has(step.id) && completedSteps.has(steps[index + 1].id) ? "bg-green-500" : "bg-gray-300"}
            `}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
