

import React from "react"

import { useRef } from "react"

export default function Navigation({ sections, activeSection, onNavigate }) {
  const navRef = useRef(null)

  // Use ref to prevent re-renders when checking scroll
  const navigationItemsRef = useRef(sections.map(() => React.createRef()))

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>

          <div className="flex gap-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onNavigate(section.id)}
                className={`text-sm font-medium transition-all duration-300 relative pb-2 ${
                  activeSection === section.id ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {section.label}
                {activeSection === section.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 transition-all duration-300"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
