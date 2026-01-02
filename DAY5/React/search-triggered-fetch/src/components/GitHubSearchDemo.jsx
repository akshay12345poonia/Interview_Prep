import React, { useState } from 'react';
import GitHubUserSearch from './GitHubUserSearch';
import { Code, Search, Zap, Shield, RefreshCw, Users } from 'lucide-react';

const GitHubSearchDemo = () => {
  const [showImplementation, setShowImplementation] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              GitHub User Search Demo
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Demonstrates useEffect dependencies with search-triggered fetch, 
              request abortion for stale requests, and proper error handling.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Features Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <Search className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold">Search Triggered Fetch</h3>
              </div>
              <p className="text-gray-600 text-sm">
                useEffect with searchTrigger dependency ensures fetch only happens when search is triggered, not on every input change.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="h-6 w-6 text-yellow-600" />
                <h3 className="text-lg font-semibold">Abort Stale Requests</h3>
              </div>
              <p className="text-gray-600 text-sm">
                AbortController cancels previous requests when new searches are made, preventing race conditions.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold">Error Handling</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Handles 404 errors with "User not found" message and other HTTP errors gracefully.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <RefreshCw className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold">Loading States</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Visual feedback during API calls with loading spinners and disabled states.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-6 w-6 text-indigo-600" />
                <h3 className="text-lg font-semibold">Rich Profile Display</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Shows avatar, name, bio, follower count, and other GitHub profile information.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <Code className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-semibold">Clean Architecture</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Proper separation of concerns with controlled components and effect dependencies.
              </p>
            </div>
          </div>
        </div>

        {/* Implementation Details Toggle */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowImplementation(!showImplementation)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Code className="h-4 w-4" />
            {showImplementation ? 'Hide' : 'Show'} Implementation Details
          </button>
        </div>

        {/* Implementation Details */}
        {showImplementation && (
          <div className="mb-12 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Key Implementation Concepts</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">1. useEffect Dependencies</h4>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`// Effect triggered only when searchTrigger changes
useEffect(() => {
  if (searchTrigger.trim()) {
    fetchGitHubUser(searchTrigger);
  }
  
  return () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };
}, [searchTrigger]); // Dependency on searchTrigger only`}
                </pre>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">2. Aborting Stale Requests</h4>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`const fetchGitHubUser = async (searchUsername) => {
  // Abort previous request if it exists
  if (abortControllerRef.current) {
    abortControllerRef.current.abort();
  }

  // Create new AbortController for this request
  abortControllerRef.current = new AbortController();
  
  const response = await fetch(\`https://api.github.com/users/\${searchUsername}\`, {
    signal: abortControllerRef.current.signal
  });
};`}
                </pre>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">3. Search Trigger Pattern</h4>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`const handleSearch = (e) => {
  e.preventDefault();
  if (username.trim()) {
    setSearchTrigger(username.trim()); // This triggers the useEffect
  }
};

// Input changes don't trigger fetch, only search button/enter does
const handleInputChange = (e) => {
  setUsername(e.target.value); // No fetch triggered here
};`}
                </pre>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">4. Error Handling</h4>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`if (!response.ok) {
  if (response.status === 404) {
    throw new Error('User not found');
  }
  throw new Error(\`HTTP error! status: \${response.status}\`);
}

// Only update error state if request wasn't aborted
if (!abortControllerRef.current.signal.aborted) {
  setError(err.message || 'Failed to fetch user');
}`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Testing Instructions */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Testing Instructions</h3>
          <div className="space-y-2 text-blue-800 text-sm">
            <p>• <strong>Valid users:</strong> Try "octocat", "torvalds", "gaearon"</p>
            <p>• <strong>Invalid users:</strong> Try "nonexistentuser123456" to see error handling</p>
            <p>• <strong>Race conditions:</strong> Type quickly and search multiple times to test request abortion</p>
            <p>• <strong>Loading states:</strong> Watch the loading spinner during API calls</p>
            <p>• <strong>Enter key:</strong> Press Enter in the input field to search</p>
          </div>
        </div>

        {/* Main Component */}
        <GitHubUserSearch />
      </div>
    </div>
  );
};

export default GitHubSearchDemo;