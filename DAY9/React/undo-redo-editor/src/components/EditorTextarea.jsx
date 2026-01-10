
const EditorTextarea = ({ content, onChange }) => {
  const handleKeyDown = (e) => {
    // Optional: Add keyboard shortcuts (Ctrl+Z, Ctrl+Y handled by parent)
    if ((e.ctrlKey || e.metaKey) && e.key === "z") {
      e.preventDefault()
      // Handle undo in parent component
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "y") {
      e.preventDefault()
      // Handle redo in parent component
    }
  }

  return (
    <div className="p-6 bg-white">
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Start typing here... Your changes will be automatically saved in history!"
        className="
          w-full h-96 p-4 border-2 border-gray-300 rounded-lg
          focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200
          font-mono text-sm text-gray-800 resize-vertical
          placeholder-gray-400 transition-all duration-200
        "
      />
    </div>
  )
}

export default EditorTextarea
