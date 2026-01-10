export const getInitialFormData = () => ({
  step0: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  },
  step1: {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    sameAsShipping: false,
  },
  step2: {
    cardholderName: "",
    cardNumber: "",
    expiry: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  },
})

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[\d\s\-$$$$]{10,}$/
const zipCodeRegex = /^[a-zA-Z0-9\s-]{3,}$/

export const validateStep = (stepId, formData) => {
  const errors = {}
  const isValid = true

  switch (stepId) {
    case 0: // Shipping
      return validateShipping(formData.step0)
    case 1: // Billing
      return validateBilling(formData.step1)
    case 2: // Payment
      return validatePayment(formData.step2)
    case 3: // Review
      return { isValid: true, errors: {} }
    default:
      return { isValid: true, errors: {} }
  }
}

const validateShipping = (data) => {
  const errors = {}

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required"
  } else if (data.firstName.length < 2) {
    errors.firstName = "First name must be at least 2 characters"
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required"
  } else if (data.lastName.length < 2) {
    errors.lastName = "Last name must be at least 2 characters"
  }

  if (!data.email.trim()) {
    errors.email = "Email is required"
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address"
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required"
  } else if (!phoneRegex.test(data.phone)) {
    errors.phone = "Please enter a valid phone number"
  }

  if (!data.address.trim()) {
    errors.address = "Street address is required"
  } else if (data.address.length < 5) {
    errors.address = "Please enter a valid street address"
  }

  if (!data.city.trim()) {
    errors.city = "City is required"
  } else if (data.city.length < 2) {
    errors.city = "City must be at least 2 characters"
  }

  if (!data.state.trim()) {
    errors.state = "State/Province is required"
  } else if (data.state.length < 2) {
    errors.state = "State/Province must be at least 2 characters"
  }

  if (!data.zipCode.trim()) {
    errors.zipCode = "ZIP/Postal code is required"
  } else if (!zipCodeRegex.test(data.zipCode)) {
    errors.zipCode = "Please enter a valid ZIP/Postal code"
  }

  if (!data.country.trim()) {
    errors.country = "Country is required"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

const validateBilling = (data) => {
  const errors = {}

  if (data.sameAsShipping) {
    return { isValid: true, errors: {} }
  }

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required"
  } else if (data.firstName.length < 2) {
    errors.firstName = "First name must be at least 2 characters"
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required"
  } else if (data.lastName.length < 2) {
    errors.lastName = "Last name must be at least 2 characters"
  }

  if (!data.email.trim()) {
    errors.email = "Email is required"
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address"
  }

  if (!data.address.trim()) {
    errors.address = "Street address is required"
  } else if (data.address.length < 5) {
    errors.address = "Please enter a valid street address"
  }

  if (!data.city.trim()) {
    errors.city = "City is required"
  } else if (data.city.length < 2) {
    errors.city = "City must be at least 2 characters"
  }

  if (!data.state.trim()) {
    errors.state = "State/Province is required"
  } else if (data.state.length < 2) {
    errors.state = "State/Province must be at least 2 characters"
  }

  if (!data.zipCode.trim()) {
    errors.zipCode = "ZIP/Postal code is required"
  } else if (!zipCodeRegex.test(data.zipCode)) {
    errors.zipCode = "Please enter a valid ZIP/Postal code"
  }

  if (!data.country.trim()) {
    errors.country = "Country is required"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

const validatePayment = (data) => {
  const errors = {}

  if (!data.cardholderName.trim()) {
    errors.cardholderName = "Cardholder name is required"
  } else if (data.cardholderName.length < 3) {
    errors.cardholderName = "Cardholder name must be at least 3 characters"
  }

  const cardNumber = data.cardNumber.replace(/\s/g, "")
  if (!cardNumber) {
    errors.cardNumber = "Card number is required"
  } else if (cardNumber.length !== 16) {
    errors.cardNumber = "Card number must be 16 digits"
  } else if (!luhnCheck(cardNumber)) {
    errors.cardNumber = "Invalid card number"
  }

  if (!data.expiry.trim()) {
    errors.expiry = "Expiry date is required"
  } else if (!data.expiry.match(/^\d{2}\/\d{2}$/)) {
    errors.expiry = "Please enter expiry as MM/YY"
  } else {
    const [month, year] = data.expiry.split("/")
    const monthNum = Number.parseInt(month)
    if (monthNum < 1 || monthNum > 12) {
      errors.expiry = "Invalid month"
    } else {
      const currentYear = new Date().getFullYear() % 100
      const expiryYear = Number.parseInt(year)
      if (expiryYear < currentYear) {
        errors.expiry = "Card has expired"
      }
    }
  }

  if (!data.cvv.trim()) {
    errors.cvv = "CVV is required"
  } else if (data.cvv.length < 3 || data.cvv.length > 4) {
    errors.cvv = "CVV must be 3 or 4 digits"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

// Luhn algorithm for card validation
const luhnCheck = (num) => {
  let sum = 0
  let isEven = false

  for (let i = num.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(num[i], 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}
