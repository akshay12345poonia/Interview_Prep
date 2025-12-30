const ReviewSubmit = ({ formData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Review Your Information</h2>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-3">Personal Information</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600">First Name:</span>
            <span className="ml-2 font-medium">{formData.firstName}</span>
          </div>
          <div>
            <span className="text-gray-600">Last Name:</span>
            <span className="ml-2 font-medium">{formData.lastName}</span>
          </div>
          <div>
            <span className="text-gray-600">Date of Birth:</span>
            <span className="ml-2 font-medium">{formData.dateOfBirth}</span>
          </div>
          <div>
            <span className="text-gray-600">Phone:</span>
            <span className="ml-2 font-medium">{formData.phone}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-3">Account Details</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600">Email:</span>
            <span className="ml-2 font-medium">{formData.email}</span>
          </div>
          <div>
            <span className="text-gray-600">Username:</span>
            <span className="ml-2 font-medium">{formData.username}</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-600">Password:</span>
            <span className="ml-2 font-medium">••••••••</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-3">Preferences</h3>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-600">Country:</span>
            <span className="ml-2 font-medium capitalize">{formData.country}</span>
          </div>
          <div>
            <span className="text-gray-600">Interests:</span>
            <span className="ml-2 font-medium">
              {formData.interests.length > 0
                ? formData.interests.join(', ')
                : 'None selected'}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Newsletter:</span>
            <span className="ml-2 font-medium">
              {formData.newsletter ? 'Subscribed' : 'Not subscribed'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmit;
