
const EditorToolbar = ({ onUndo, onRedo, canUndo, canRedo }) => {
  return (
    <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex items-center gap-4">
      {/* Undo Button */}
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`
          px-4 py-2 rounded-md font-medium text-sm transition-all duration-200
          flex items-center gap-2 border-2
          ${
            canUndo
              ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 cursor-pointer shadow-md hover:shadow-lg"
              : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed opacity-60"
          }
        `}
        title={canUndo ? "Undo (Ctrl+Z)" : "Nothing to undo"}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h10a8 8 0 018 8v2M3 10L9 4m0 0L3 10"
          />
        </svg>
        Undo
      </button>

      {/* Redo Button */}
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className={`
          px-4 py-2 rounded-md font-medium text-sm transition-all duration-200
          flex items-center gap-2 border-2
          ${
            canRedo
              ? "bg-green-600 hover:bg-green-700 text-white border-green-600 cursor-pointer shadow-md hover:shadow-lg"
              : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed opacity-60"
          }
        `}
        title={canRedo ? "Redo (Ctrl+Y)" : "Nothing to redo"}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 10h-10a8 8 0 00-8 8v2m0 0l6-6m0 0l-6 6"
          />
        </svg>
        Redo
      </button>

      {/* Divider */}
      <div className="w-px h-8 bg-gray-300"></div>

      {/* Info Text */}
      <div className="text-sm text-gray-600">
        <p>💡 Tip: Type something, click undo/redo, then type again to see redo history clear!</p>
      </div>
    </div>
  )
}

export default EditorToolbar
