import { useState } from 'react';
import { Plus, Trash2, Eye } from 'lucide-react';

export default function DynamicFormBuilder() {
  const [questions, setQuestions] = useState([
    { id: Date.now(), text: '', type: 'text' }
  ]);

  // Add new question with proper immutability
  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      text: '',
      type: 'text'
    };
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  };

  // Remove question by id with proper immutability
  const removeQuestion = (id) => {
    setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
  };

  // Update question text with proper immutability
  const updateQuestionText = (id, newText) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q =>
        q.id === id ? { ...q, text: newText } : q
      )
    );
  };

  // Update question type with proper immutability
  const updateQuestionType = (id, newType) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q =>
        q.id === id ? { ...q, type: newType } : q
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Dynamic Form Builder
          </h1>
          <p className="text-gray-600">
            Create your custom survey with dynamic questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Question Editor
              </h2>
              <button
                onClick={addQuestion}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus size={20} />
                Add Question
              </button>
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">
                      Question {index + 1}
                    </span>
                    {questions.length > 1 && (
                      <button
                        onClick={() => removeQuestion(question.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Question Text
                      </label>
                      <input
                        type="text"
                        value={question.text}
                        onChange={(e) => updateQuestionText(question.id, e.target.value)}
                        placeholder="Enter your question..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Answer Type
                      </label>
                      <select
                        value={question.type}
                        onChange={(e) => updateQuestionType(question.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Preview Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Eye size={24} className="text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Live Preview
              </h2>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Survey Form
              </h3>

              {questions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No questions added yet. Add your first question to see the preview.
                </p>
              ) : (
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <div key={question.id} className="bg-white rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {index + 1}. {question.text || `Question ${index + 1}`}
                      </label>
                      <input
                        type={question.type}
                        placeholder={`Enter your ${question.type} answer...`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        disabled
                      />
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-gray-500">Type:</span>
                        <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
                          {question.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {questions.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    disabled
                  >
                    Submit Survey (Preview Mode)
                  </button>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Summary</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-indigo-600">{questions.length}</p>
                  <p className="text-xs text-gray-600">Total Questions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {questions.filter(q => q.text.trim()).length}
                  </p>
                  <p className="text-xs text-gray-600">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">
                    {questions.filter(q => !q.text.trim()).length}
                  </p>
                  <p className="text-xs text-gray-600">Empty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}