
import { useState, useCallback } from "react"
import EditorToolbar from "./EditorToolbar"
import EditorTextarea from "./EditorTextarea"
import EditorHistory from "./EditorHistory"

const TextEditor = () => {
  const [content, setContent] = useState("")
  const [history, setHistory] = useState([""]) // Stack of past states
  const [historyIndex, setHistoryIndex] = useState(0) // Current position in history

  const handleTextChange = (newContent) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newContent)

    setContent(newContent)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setContent(history[newIndex])
    }
  }, [history, historyIndex])

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setContent(history[newIndex])
    }
  }, [history, historyIndex])

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1
  const totalStates = history.length

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 border-b border-blue-800">
          <h1 className="text-2xl font-bold text-white">Undo/Redo Text Editor</h1>
          <p className="text-blue-100 text-sm mt-1">Advanced state management with history tracking</p>
        </div>

        {/* Toolbar */}
        <EditorToolbar onUndo={handleUndo} onRedo={handleRedo} canUndo={canUndo} canRedo={canRedo} />

        {/* History Status */}
        <EditorHistory currentPosition={historyIndex} totalStates={totalStates} />

        {/* Textarea */}
        <EditorTextarea content={content} onChange={handleTextChange} />

        {/* Footer Stats */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Characters</p>
              <p className="text-2xl font-bold text-gray-900">{content.length}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Words</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  content
                    .trim()
                    .split(/\s+/)
                    .filter((w) => w).length
                }
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Lines</p>
              <p className="text-2xl font-bold text-gray-900">{content.split("\n").length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextEditor
