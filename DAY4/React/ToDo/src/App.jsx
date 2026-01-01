import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: '1', text: 'Complete React project', priority: 'High', completed: false },
    { id: '2', text: 'Review PRs', priority: 'Medium', completed: true },
    { id: '3', text: 'Update documentation', priority: 'Low', completed: false }
  ]);

  const [newTodo, setNewTodo] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');

  const priorityColors = {
    High: 'bg-red-500 text-white',
    Medium: 'bg-yellow-500 text-white',
    Low: 'bg-green-500 text-white'
  };

  // Add new todo
  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now().toString(), // Using timestamp as unique ID
        text: newTodo.trim(),
        priority: newPriority,
        completed: false
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  // Toggle completion status
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Todo List with Priorities
      </h1>

      {/* Add new todo form */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        
        <button
          onClick={addTodo}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Add
        </button>
      </div>

      {/* Todo list */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 py-8 text-lg">
            No todos yet. Add one above!
          </p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id} // Using stable ID as key, not index
              className={`flex items-center gap-4 p-4 border rounded-lg transition-all duration-200 hover:shadow-md ${
                todo.completed 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-white border-gray-300 hover:border-gray-400'
              }`}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              
              {/* Todo text */}
              <div className="flex-1 min-w-0">
                <span
                  className={`block text-lg ${
                    todo.completed
                      ? 'line-through text-gray-500'
                      : 'text-gray-900'
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              
              {/* Priority badge */}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[todo.priority]}`}
              >
                {todo.priority}
              </span>
              
              {/* Delete button */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Delete todo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      {todos.length > 0 && (
        <div className="flex justify-between text-sm text-gray-600 pt-6 mt-6 border-t border-gray-200">
          <span className="font-medium">Total: {todos.length}</span>
          <span className="font-medium">Completed: {todos.filter(t => t.completed).length}</span>
          <span className="font-medium">Remaining: {todos.filter(t => !t.completed).length}</span>
        </div>
      )}
    </div>
  );
};

export default TodoList;