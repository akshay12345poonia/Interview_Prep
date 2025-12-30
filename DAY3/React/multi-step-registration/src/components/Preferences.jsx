const Preferences = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Preferences</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country *
        </label>
        <select
          value={formData.country}
          onChange={(e) => updateFormData('country', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Select a country</option>
          <option value="usa">United States</option>
          <option value="canada">Canada</option>
          <option value="uk">United Kingdom</option>
          <option value="australia">Australia</option>
          <option value="india">India</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Interests (Select all that apply)
        </label>
        <div className="space-y-2">
          {['Technology', 'Sports', 'Music', 'Travel', 'Food'].map((interest) => (
            <label key={interest} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.interests.includes(interest)}
                onChange={(e) => {
                  const newInterests = e.target.checked
                    ? [...formData.interests, interest]
                    : formData.interests.filter((i) => i !== interest);
                  updateFormData('interests', newInterests);
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">{interest}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Newsletter Subscription
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.newsletter}
            onChange={(e) => updateFormData('newsletter', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-gray-700">
            I want to receive newsletters and updates
          </span>
        </label>
      </div>
    </div>
  );
};
export default Preferences;