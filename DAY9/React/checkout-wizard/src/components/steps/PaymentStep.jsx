
export default function PaymentStep({ formData, onChange, errors }) {
  const handleCardNumberChange = (value) => {
    // Remove non-digits and format with spaces every 4 digits
    const cleaned = value.replace(/\D/g, "")
    const formatted = cleaned.substring(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ")
    onChange("cardNumber", formatted)
  }

  const handleExpiryChange = (value) => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.length <= 4) {
      const formatted = cleaned.length > 2 ? `${cleaned.substring(0, 2)}/${cleaned.substring(2)}` : cleaned
      onChange("expiry", formatted)
    }
  }

  const handleCVVChange = (value) => {
    const cleaned = value.replace(/\D/g, "").substring(0, 4)
    onChange("cvv", cleaned)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>
        <p className="text-gray-600 mb-6">Enter your credit card information</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
        <input
          type="text"
          value={formData.cardholderName}
          onChange={(e) => onChange("cardholderName", e.target.value)}
          placeholder="John Doe"
          className={errors.cardholderName ? "border-red-500" : ""}
        />
        {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
        <input
          type="text"
          value={formData.cardNumber}
          onChange={(e) => handleCardNumberChange(e.target.value)}
          placeholder="1234 5678 9012 3456"
          maxLength="19"
          className={errors.cardNumber ? "border-red-500" : ""}
        />
        {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
        <p className="text-xs text-gray-500 mt-1">Test: 4532 1111 1111 1111</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
          <input
            type="text"
            value={formData.expiry}
            onChange={(e) => handleExpiryChange(e.target.value)}
            placeholder="MM/YY"
            maxLength="5"
            className={errors.expiry ? "border-red-500" : ""}
          />
          {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
          <input
            type="text"
            value={formData.cvv}
            onChange={(e) => handleCVVChange(e.target.value)}
            placeholder="123"
            maxLength="4"
            className={errors.cvv ? "border-red-500" : ""}
          />
          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
        </div>
      </div>

      {/* Split expiry into month/year for storage */}
      <div className="hidden">
        <input type="hidden" value={formData.expiryMonth} readOnly />
        <input type="hidden" value={formData.expiryYear} readOnly />
      </div>

      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Demo Mode:</strong> Use test card 4532 1111 1111 1111 with any future date and any CVV
        </p>
      </div>
    </div>
  )
}
