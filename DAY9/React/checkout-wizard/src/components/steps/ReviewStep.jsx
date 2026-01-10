
export default function ReviewStep({ formData, onDownload }) {
  const formatCardNumber = (number) => {
    return number.replace(/\s/g, "").slice(-4).padStart(4, "*")
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Review</h2>
        <p className="text-gray-600">Please verify your information before downloading</p>
      </div>

      {/* Shipping Section */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-3">✓</span>
          Shipping Address
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-medium text-gray-900">
              {formData.step0.firstName} {formData.step0.lastName}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-medium text-gray-900">{formData.step0.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Phone</p>
            <p className="font-medium text-gray-900">{formData.step0.phone}</p>
          </div>
          <div>
            <p className="text-gray-600">Address</p>
            <p className="font-medium text-gray-900">{formData.step0.address}</p>
          </div>
          <div>
            <p className="text-gray-600">City</p>
            <p className="font-medium text-gray-900">
              {formData.step0.city}, {formData.step0.state} {formData.step0.zipCode}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Country</p>
            <p className="font-medium text-gray-900">{formData.step0.country}</p>
          </div>
        </div>
      </div>

      {/* Billing Section */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-3">✓</span>
          Billing Address
        </h3>
        {formData.step1.sameAsShipping ? (
          <p className="text-gray-600 italic">Same as shipping address</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium text-gray-900">
                {formData.step1.firstName} {formData.step1.lastName}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{formData.step1.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Address</p>
              <p className="font-medium text-gray-900">{formData.step1.address}</p>
            </div>
            <div>
              <p className="text-gray-600">City</p>
              <p className="font-medium text-gray-900">
                {formData.step1.city}, {formData.step1.state} {formData.step1.zipCode}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Payment Section */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-3">✓</span>
          Payment Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Cardholder</p>
            <p className="font-medium text-gray-900">{formData.step2.cardholderName}</p>
          </div>
          <div>
            <p className="text-gray-600">Card Number</p>
            <p className="font-medium text-gray-900 tracking-widest">
              **** **** **** {formatCardNumber(formData.step2.cardNumber)}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Expiry</p>
            <p className="font-medium text-gray-900">{formData.step2.expiry}</p>
          </div>
        </div>
      </div>

      {/* Summary Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-2">Ready to Download?</h4>
        <p className="text-gray-600 text-sm mb-4">
          All information has been validated. Click below to download your checkout data as JSON.
        </p>
        <button
          onClick={onDownload}
          className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          Download as JSON
        </button>
      </div>
    </div>
  )
}
