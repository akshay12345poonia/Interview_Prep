import { useState, useEffect } from 'react';

function AutoSaveNotes() {
  const [noteText, setNoteText] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    // Don't run on initial mount when noteText is empty
    if (noteText === '') {
      return;
    }

    // Set status to "Saving..." immediately when text changes
    setSaveStatus('Saving...');

    // Set up debounce timer (2 seconds)
    const saveTimer = setTimeout(() => {
      // Simulate saving to backend/database
      console.log('💾 Saving note:', noteText);
      console.log('📅 Saved at:', new Date().toLocaleTimeString());
      
      // Update status to "Saved ✓"
      setSaveStatus('Saved ✓');

      // Clear the "Saved ✓" message after 2 seconds
      setTimeout(() => {
        setSaveStatus('');
      }, 1000);
    }, 1000);

    // Cleanup function: Cancel pending save if user types again
    return () => {
      console.log('🧹 Cleanup: Canceling pending save timer');
      clearTimeout(saveTimer);
    };
  }, [noteText]); // Dependency array: re-run effect when noteText changes

  const handleTextChange = (e) => {
    setNoteText(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              📝 Auto-Save Notes
            </h1>
            {saveStatus && (
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  saveStatus === 'Saving...'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {saveStatus}
              </span>
            )}
          </div>

          <textarea
            value={noteText}
            onChange={handleTextChange}
            placeholder="Start typing your notes... Changes auto-save after 1 second of inactivity."
            className="w-full h-64 p-4 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none resize-none font-mono text-gray-700"
          />

    
        </div>
      </div>
    </div>
  );
}

export default AutoSaveNotes;