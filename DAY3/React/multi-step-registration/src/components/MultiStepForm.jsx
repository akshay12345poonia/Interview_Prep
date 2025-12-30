import React, { useState } from 'react';

import PersonalInfo from './PersonalInfo';
import AccountDetails from './AccountDetails';
import Preferences from './Preferences';
import ReviewSubmit from './ReviewSubmit';
import ProgressBar from './ProgressBar';
const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    // Account Details
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    // Preferences
    country: '',
    interests: [],
    newsletter: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const totalSteps = 4;

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      // Simulate async submit
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfo formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <AccountDetails formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Preferences formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <ReviewSubmit formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Registration Form
          </h1>

          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

          <div className="mt-8">{renderStep()}</div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              Back
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Submit
              </button>
            )}
          </div>

          {/* Submit status */}
          {isSubmitting && (
            <p className="mt-4 text-blue-600">Submitting...</p>
          )}
          {submitStatus === 'success' && (
            <p className="mt-4 text-green-600">Registration successful!</p>
          )}
          {submitStatus === 'error' && (
            <p className="mt-4 text-red-600">Something went wrong. Please try again.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;