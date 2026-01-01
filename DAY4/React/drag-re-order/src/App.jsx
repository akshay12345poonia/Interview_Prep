import React, { useState, useCallback } from 'react';

const DragReorderList = ({ initialTasks = [] }) => {

  const defaultTasks = [
    { id: '1', title: 'Complete project proposal', description: 'Write and submit the Q1 project proposal' },
    { id: '2', title: 'Review team feedback', description: 'Go through all team member feedback from last sprint' },
    { id: '3', title: 'Update documentation', description: 'Update API documentation with new endpoints' },
    { id: '4', title: 'Schedule client meeting', description: 'Set up meeting with client for next week' },
    { id: '5', title: 'Code review', description: 'Review pull requests from team members' },
    { id: '6', title: 'Deploy to staging', description: 'Deploy latest changes to staging environment' }
  ];

  const [tasks, setTasks] = useState(initialTasks.length > 0 ? initialTasks : defaultTasks);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [notification, setNotification] = useState(null);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Immutable array manipulation for moving items
  const moveItem = (fromIndex, toIndex) => {
    const newTasks = [...tasks];
    const [movedItem] = newTasks.splice(fromIndex, 1);
    newTasks.splice(toIndex, 0, movedItem);
    setTasks(newTasks);
  };

  const moveUp = (index) => {
    if (index > 0) {
      moveItem(index, index - 1);
      showNotification(`Moved "${tasks[index].title}" up`);
    }
  };

  const moveDown = (index) => {
    if (index < tasks.length - 1) {
      moveItem(index, index + 1);
      showNotification(`Moved "${tasks[index].title}" down`);
    }
  };

  // Add new task
  const addTask = useCallback(() => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        description: 'New task added'
      };
      setTasks(prev => [...prev, newTask]);
      setNewTaskTitle('');
      setIsAddingTask(false);
      showNotification(`"${newTask.title}" has been added to the list`);
    }
  }, [newTaskTitle]);

  // Remove task
  const removeTask = useCallback((taskId) => {
    const taskToRemove = tasks.find(task => task.id === taskId);
    setTasks(prev => prev.filter(task => task.id !== taskId));
    if (taskToRemove) {
      showNotification(`"${taskToRemove.title}" has been removed from the list`, 'info');
    }
  }, [tasks]);

  // Handle Enter key for adding tasks
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    } else if (e.key === 'Escape') {
      setIsAddingTask(false);
      setNewTaskTitle('');
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (e, taskId) => {
    setDraggedItem(taskId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', taskId);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedItem) {
      const dragIndex = tasks.findIndex(task => task.id === draggedItem);
      if (dragIndex !== -1 && dragIndex !== dropIndex) {
        moveItem(dragIndex, dropIndex);
        showNotification(`Moved "${tasks[dragIndex].title}" to position ${dropIndex + 1}`);
      }
    }
    
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : notification.type === 'info'
            ? 'bg-blue-500 text-white'
            : 'bg-red-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Task List</h2>
        <p className="text-gray-600">Drag items to reorder or use the move buttons</p>
      </div>
      
      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={`bg-white rounded-lg border shadow-sm transition-all duration-200 cursor-move ${
              draggedItem === task.id 
                ? 'opacity-50 scale-95 rotate-2' 
                : 'opacity-100 scale-100'
            } ${
              dragOverIndex === index 
                ? 'ring-2 ring-blue-500 ring-opacity-50 bg-blue-50 transform scale-105' 
                : 'hover:shadow-md hover:border-gray-300'
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, task.id)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          >
            <div className="p-4">
              <div className="flex items-center gap-3">
                {/* Position Number */}
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                
                {/* Drag Handle */}
                <div className="flex-shrink-0 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="12" r="1" fill="currentColor"/>
                    <circle cx="15" cy="12" r="1" fill="currentColor"/>
                    <circle cx="9" cy="6" r="1" fill="currentColor"/>
                    <circle cx="15" cy="6" r="1" fill="currentColor"/>
                    <circle cx="9" cy="18" r="1" fill="currentColor"/>
                    <circle cx="15" cy="18" r="1" fill="currentColor"/>
                  </svg>
                </div>
                
                {/* Task Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {task.description}
                    </p>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {/* Move Buttons */}
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className={`h-8 w-8 rounded border flex items-center justify-center transition-colors ${
                        index === 0 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 border-gray-300'
                      }`}
                      title="Move Up"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m18 15-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === tasks.length - 1}
                      className={`h-8 w-8 rounded border flex items-center justify-center transition-colors ${
                        index === tasks.length - 1 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 border-gray-300'
                      }`}
                      title="Move Down"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeTask(task.id)}
                    className="h-8 w-8 rounded border border-red-200 bg-white text-red-500 hover:text-red-700 hover:bg-red-50 flex items-center justify-center transition-colors"
                    title="Remove Task"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c0-1 1-2 2-2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add New Task Section */}
      <div className="mt-6">
        {!isAddingTask ? (
          <button
            onClick={() => setIsAddingTask(true)}
            className="w-full h-12 border-2 border-dashed border-gray-300 bg-transparent text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add New Task
          </button>
        ) : (
          <div className="bg-white rounded-lg border-2 border-blue-200 shadow-sm">
            <div className="p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter task title..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
                <button
                  onClick={addTask}
                  disabled={!newTaskTitle.trim()}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    newTaskTitle.trim()
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setIsAddingTask(false);
                    setNewTaskTitle('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to add, Escape to cancel
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Current Order Display */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">Current Order:</h3>
        <div className="text-sm text-gray-600">
          {tasks.map((task, index) => (
            <div key={task.id} className="flex items-center gap-2 py-1">
              <span className="font-medium text-blue-600">{index + 1}.</span>
              <span>{task.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DragReorderList;