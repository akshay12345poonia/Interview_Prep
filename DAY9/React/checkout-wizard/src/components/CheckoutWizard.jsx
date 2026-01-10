

import { useState } from "react"
import StepIndicator from "./StepIndicator"
import ShippingStep from "./steps/ShippingStep"
import BillingStep from "./steps/BillingStep"
import PaymentStep from "./steps/PaymentStep"
import ReviewStep from "./steps/ReviewStep"
import { validateStep, getInitialFormData } from "../utils/validation"

const STEPS = [
  { id: 0, name: "Shipping", label: "Shipping Address" },
  { id: 1, name: "Billing", label: "Billing Address" },
  { id: 2, name: "Payment", label: "Payment Details" },
  { id: 3, name: "Review", label: "Review & Download" },
]

export default function CheckoutWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState(getInitialFormData())
  const [errors, setErrors] = useState({})
  const [completedSteps, setCompletedSteps] = useState(new Set())

  const isStepValid = (stepId) => {
    const validation = validateStep(stepId, formData)
    return validation.isValid
  }

  const handleInputChange = (stepId, fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [`step${stepId}`]: {
        ...prev[`step${stepId}`],
        [fieldName]: value,
      },
    }))
    // Clear error for this field when user starts typing
    if (errors[`step${stepId}`]?.[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [`step${stepId}`]: {
          ...prev[`step${stepId}`],
          [fieldName]: "",
        },
      }))
    }
  }

  const handleNext = () => {
    const validation = validateStep(currentStep, formData)
    if (!validation.isValid) {
      setErrors((prev) => ({
        ...prev,
        [`step${currentStep}`]: validation.errors,
      }))
      return
    }

    const newCompleted = new Set(completedSteps)
    newCompleted.add(currentStep)
    setCompletedSteps(newCompleted)

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (stepId) => {
    // Allow jumping to completed steps or current step
    if (stepId <= currentStep || completedSteps.has(stepId)) {
      setCurrentStep(stepId)
    }
  }

  const handleDownloadJSON = () => {
    const dataToDownload = {
      shipping: formData.step0,
      billing: formData.step1,
      payment: {
        cardNumber: formData.step2.cardNumber.replace(/\s/g, "").slice(-4),
        cardholderName: formData.step2.cardholderName,
        expiryMonth: formData.step2.expiryMonth,
        expiryYear: formData.step2.expiryYear,
      },
      downloadedAt: new Date().toISOString(),
    }

    const jsonString = JSON.stringify(dataToDownload, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `checkout-data-${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const stepComponents = {
    0: (
      <ShippingStep
        formData={formData.step0}
        onChange={(field, value) => handleInputChange(0, field, value)}
        errors={errors.step0 || {}}
      />
    ),
    1: (
      <BillingStep
        formData={formData.step1}
        onChange={(field, value) => handleInputChange(1, field, value)}
        errors={errors.step1 || {}}
      />
    ),
    2: (
      <PaymentStep
        formData={formData.step2}
        onChange={(field, value) => handleInputChange(2, field, value)}
        errors={errors.step2 || {}}
      />
    ),
    3: <ReviewStep formData={formData} onDownload={handleDownloadJSON} />,
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase in 4 simple steps</p>
        </div>

        {/* Step Indicator */}
        <div className="mb-12">
          <StepIndicator
            steps={STEPS}
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={handleStepClick}
          />
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="min-h-[400px]">{stepComponents[currentStep]}</div>

          {/* Validation Errors Summary */}
          {errors[`step${currentStep}`] && Object.keys(errors[`step${currentStep}`]).length > 0 && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-sm font-semibold text-red-800 mb-2">Please fix the following errors:</h3>
              <ul className="list-disc list-inside space-y-1">
                {Object.entries(errors[`step${currentStep}`]).map(
                  ([field, error]) =>
                    error && (
                      <li key={field} className="text-sm text-red-700">
                        {error}
                      </li>
                    ),
                )}
              </ul>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Back
            </button>

            {currentStep < STEPS.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid(currentStep)}
                className="px-8 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleDownloadJSON}
                className="px-8 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
              >
                Download as JSON
              </button>
            )}
          </div>
        </div>

        {/* Progress Info */}
        <div className="mt-8 text-center text-gray-600">
          <p>
            Step {currentStep + 1} of {STEPS.length}
          </p>
        </div>
      </div>
    </div>
  )
}
