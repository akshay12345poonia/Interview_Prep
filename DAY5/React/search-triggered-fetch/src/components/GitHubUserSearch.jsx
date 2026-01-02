import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, AlertCircle, Users, MapPin, Building, Calendar, ExternalLink, Github } from 'lucide-react';

const GitHubUserSearch = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTrigger, setSearchTrigger] = useState('');
  
  // Ref to track current request for aborting stale requests
  const abortControllerRef = useRef(null);

  const fetchGitHubUser = async (searchUsername) => {
    // Abort previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();
    
    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const response = await fetch(`https://api.github.com/users/${searchUsername}`, {
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      
      // Only update state if request wasn't aborted
      if (!abortControllerRef.current.signal.aborted) {
        setUser(userData);
      }
    } catch (err) {
      // Only update error state if request wasn't aborted
      if (!abortControllerRef.current.signal.aborted) {
        setError(err.message || 'Failed to fetch user');
      }
    } finally {
      // Only update loading state if request wasn't aborted
      if (!abortControllerRef.current.signal.aborted) {
        setLoading(false);
      }
    }
  };

  // Effect triggered by searchTrigger state change
  useEffect(() => {
    if (searchTrigger.trim()) {
      fetchGitHubUser(searchTrigger);
    }
    
    // Cleanup function to abort request on unmount or new search
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [searchTrigger]); // Dependency on searchTrigger

  const handleSearch = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setSearchTrigger(username.trim()); // This triggers the useEffect
    }
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Search Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Github className="h-12 w-12 text-gray-700" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">GitHub User Search</h1>
        <p className="text-gray-600">Search for GitHub users and view their profiles</p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-3 max-w-md mx-auto">
          <div className="flex-1 relative">
            <input
              type="text"
              value={username}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter GitHub username..."
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Search
              </>
            )}
          </button>
        </div>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600">Searching for user...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            {error === 'User not found' ? 'User Not Found' : 'Search Failed'}
          </h3>
          <p className="text-red-600">
            {error === 'User not found' 
              ? `No GitHub user found with username "${searchTrigger}"`
              : error
            }
          </p>
        </div>
      )}

      {/* User Profile Display */}
      {user && !loading && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-1">
                  {user.name || user.login}
                </h2>
                <p className="text-blue-100 mb-2">@{user.login}</p>
                {user.bio && (
                  <p className="text-blue-50 max-w-md">{user.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Followers */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{user.followers.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Followers</p>
                </div>
              </div>

              {/* Following */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Users className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{user.following.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Following</p>
                </div>
              </div>

              {/* Public Repos */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Github className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{user.public_repos.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Public Repos</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-3">
              {user.company && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Building className="h-4 w-4" />
                  <span>{user.company}</span>
                </div>
              )}
              
              {user.location && (
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="h-4 w-4" />
                <span>Joined {formatDate(user.created_at)}</span>
              </div>

              {user.blog && (
                <div className="flex items-center gap-2 text-gray-700">
                  <ExternalLink className="h-4 w-4" />
                  <a 
                    href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {user.blog}
                  </a>
                </div>
              )}
            </div>

            {/* View Profile Button */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Github className="h-4 w-4" />
                View GitHub Profile
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Search Examples */}
      {!user && !loading && !error && (
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Try searching for:</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {['octocat', 'torvalds', 'gaearon', 'sindresorhus', 'tj'].map((example) => (
              <button
                key={example}
                onClick={() => {
                  setUsername(example);
                  setSearchTrigger(example);
                }}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubUserSearch;