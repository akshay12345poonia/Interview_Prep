import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Loader2, AlertCircle, RefreshCw, User, Mail, Phone, Globe, MapPin, Building } from 'lucide-react';

const UserProfileLoader = ({ userId = 1 }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  
  // Ref to track if component is mounted (for cleanup)
  const isMountedRef = useRef(true);

  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const userData = await response.json();
      
      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setUser(userData);
      }
    } catch (err) {
      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setError(err.message || 'Failed to fetch user profile');
      }
    } finally {
      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchUserProfile();
  };

  // Fetch user profile on component mount and when userId changes
  useEffect(() => {
    fetchUserProfile();
    
    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMountedRef.current = false;
    };
  }, [userId]);

  // Reset mounted ref when component mounts
  useEffect(() => {
    isMountedRef.current = true;
  }, []);

  // Loading state
  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600">Loading user profile...</p>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto border-red-200">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Failed to Load Profile
          </h3>
          <p className="text-gray-600 text-center mb-6">
            {error}
          </p>
          <Button 
            onClick={handleRetry}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retry {retryCount > 0 && `(${retryCount})`}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Success state - Display user profile
  if (user) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <p className="text-gray-600">@{user.username}</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Information
            </h3>
            <div className="grid gap-2 pl-7">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-500" />
                <a 
                  href={`https://${user.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {user.website}
                </a>
              </div>
            </div>
          </div>

          <Separator />

          {/* Address Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address
            </h3>
            <div className="pl-7">
              <p className="text-sm text-gray-600">
                {user.address.suite}, {user.address.street}
              </p>
              <p className="text-sm text-gray-600">
                {user.address.city}, {user.address.zipcode}
              </p>
              <Badge variant="secondary" className="mt-2">
                Coordinates: {user.address.geo.lat}, {user.address.geo.lng}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Company Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Building className="h-5 w-5" />
              Company
            </h3>
            <div className="pl-7">
              <p className="font-medium">{user.company.name}</p>
              <p className="text-sm text-gray-600 italic">
                "{user.company.catchPhrase}"
              </p>
              <Badge variant="outline" className="mt-2">
                {user.company.bs}
              </Badge>
            </div>
          </div>

          {/* Retry button for successful loads (for testing) */}
          <div className="pt-4 text-center">
            <Button 
              onClick={handleRetry}
              variant="ghost"
              size="sm"
              className="text-gray-500"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default UserProfileLoader;