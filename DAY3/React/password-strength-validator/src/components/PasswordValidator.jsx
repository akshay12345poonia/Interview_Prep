
import { useState } from 'react';
import { Check, X, Eye, EyeOff } from 'lucide-react';

function PasswordValidator() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const criteria = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const criteriaMet = Object.values(criteria).filter(Boolean).length;

  const getBorderColor = () => {
    if (criteriaMet <= 1) return 'border-red-500 focus:border-red-600';
    if (criteriaMet <= 3) return 'border-yellow-500 focus:border-yellow-600';
    return 'border-green-500 focus:border-green-600';
  };

  const getStrengthLabel = () => {
    if (criteriaMet <= 1) return { text: 'Weak', color: 'text-red-500' };
    if (criteriaMet <= 3) return { text: 'Medium', color: 'text-yellow-500' };
    return { text: 'Strong', color: 'text-green-500' };
  };

  const strength = getStrengthLabel();

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Password Strength Validator</h2>

      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Enter Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 ${getBorderColor()}`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {password && (
          <p className={`mt-2 text-sm font-semibold ${strength.color}`}>
            Strength: {strength.text}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Password Requirements:</h3>

        <CriterionItem
          met={criteria.length}
          label="At least 8 characters"
        />

        <CriterionItem
          met={criteria.uppercase}
          label="Contains uppercase letter"
        />

        <CriterionItem
          met={criteria.number}
          label="Contains number"
        />

        <CriterionItem
          met={criteria.special}
          label="Contains special character"
        />
      </div>

      <div className="mt-6">
        <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-gray-200">
          <div className={`h-full transition-all duration-300 ${criteriaMet >= 1 ? 'bg-red-500 w-1/4' : 'w-0'}`} />
          <div className={`h-full transition-all duration-300 ${criteriaMet >= 2 ? 'bg-yellow-500 w-1/4' : 'w-0'}`} />
          <div className={`h-full transition-all duration-300 ${criteriaMet >= 3 ? 'bg-yellow-500 w-1/4' : 'w-0'}`} />
          <div className={`h-full transition-all duration-300 ${criteriaMet >= 4 ? 'bg-green-500 w-1/4' : 'w-0'}`} />
        </div>
      </div>
    </div>
  );
}

function CriterionItem({ met, label }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
        met ? 'bg-green-500' : 'bg-red-500'
      }`}>
        {met ? (
          <Check className="w-4 h-4 text-white" />
        ) : (
          <X className="w-4 h-4 text-white" />
        )}
      </div>
      <span className={`text-sm transition-colors duration-200 ${
        met ? 'text-green-700 font-medium' : 'text-gray-600'
      }`}>
        {label}
      </span>
    </div>
  );
}

export default PasswordValidator;
