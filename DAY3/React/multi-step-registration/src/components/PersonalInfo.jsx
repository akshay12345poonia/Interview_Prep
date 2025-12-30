const PersonalInfo = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Information</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          First Name *
        </label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => updateFormData('firstName', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="First Name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Last Name *
        </label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => updateFormData('lastName', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Last Name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth *
        </label>
        <input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number *
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData('phone', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="+91 9999999999"
          required
        />
      </div>
    </div>
  );
};
export default PersonalInfo;