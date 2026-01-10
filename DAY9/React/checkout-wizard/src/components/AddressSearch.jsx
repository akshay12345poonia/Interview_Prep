
import { useState, useMemo } from "react"

const MOCK_ADDRESSES = [
  "123 Main Street",
  "456 Oak Avenue",
  "789 Elm Road",
  "321 Pine Boulevard",
  "654 Maple Drive",
  "987 Birch Lane",
  "159 Cedar Court",
  "753 Willow Way",
  "852 Ash Street",
  "741 Spruce Avenue",
]

export default function AddressSearch({ value, onChange, error, onFocus, onBlur }) {
  const [isOpen, setIsOpen] = useState(false)

  const suggestions = useMemo(() => {
    if (!value.trim()) return []
    return MOCK_ADDRESSES.filter((addr) => addr.toLowerCase().includes(value.toLowerCase()))
  }, [value])

  const handleSelectSuggestion = (address) => {
    onChange(address)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => {
          setIsOpen(true)
          onFocus?.()
        }}
        onBlur={() => {
          onBlur?.()
          setTimeout(() => setIsOpen(false), 200)
        }}
        placeholder="Start typing your address..."
        className={error ? "border-red-500" : ""}
      />

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition text-gray-700"
            >
              <span className="text-blue-600 mr-2">📍</span>
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && value && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-4">
          <p className="text-gray-500 text-sm">No addresses found</p>
        </div>
      )}
    </div>
  )
}
