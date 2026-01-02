import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import UserProfileLoader from './UserProfileLoader';

const UserProfileDemo = () => {
  const [customUserId, setCustomUserId] = useState(1);
  const [demoUserId, setDemoUserId] = useState(1);

  const handleUserIdChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setCustomUserId(value);
  };

  const loadUser = () => {
    setDemoUserId(customUserId);
  };

  return (
    <div className="container mx-auto py-8 space-y-8 px-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">User Profile Loader Demo</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          This demo showcases a React component that fetches user data with proper loading states, 
          error handling, and cleanup for unmounted components using useEffect.
        </p>
      </div>

      <Tabs defaultValue="demo" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="demo">Interactive Demo</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="usage">Usage Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="demo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Try Different User IDs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <Label htmlFor="userId">User ID (1-10 for valid users)</Label>
                  <Input
                    id="userId"
                    type="number"
                    min="1"
                    max="999"
                    value={customUserId}
                    onChange={handleUserIdChange}
                    placeholder="Enter user ID"
                  />
                </div>
                <Button onClick={loadUser}>Load User</Button>
              </div>
              <div className="text-sm text-gray-600">
                <p>• Try IDs 1-10 for valid users</p>
                <p>• Try ID 999 to see error handling</p>
                <p>• Watch the loading spinner during fetch</p>
              </div>
            </CardContent>
          </Card>

          <UserProfileLoader userId={demoUserId} key={demoUserId} />
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🔄 Loading States
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Animated loading spinner</li>
                  <li>• Loading message display</li>
                  <li>• Prevents UI flashing</li>
                  <li>• Smooth state transitions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ⚠️ Error Handling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Network error detection</li>
                  <li>• HTTP status error handling</li>
                  <li>• User-friendly error messages</li>
                  <li>• Retry functionality with counter</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🧹 Cleanup & Memory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Prevents memory leaks</li>
                  <li>• Handles unmounted components</li>
                  <li>• useRef for mount tracking</li>
                  <li>• Proper useEffect cleanup</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎨 UI/UX Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Responsive design</li>
                  <li>• Accessible components</li>
                  <li>• Icon integration</li>
                  <li>• Professional styling</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Component Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import UserProfileLoader from './components/UserProfileLoader';

// Basic usage
<UserProfileLoader userId={1} />

// With dynamic user ID
const [userId, setUserId] = useState(1);
<UserProfileLoader userId={userId} key={userId} />

// The key prop forces re-mount when userId changes`}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Implementation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Badge variant="secondary" className="mb-2">useEffect Hook</Badge>
                <p className="text-sm text-gray-600">
                  Fetches data on mount and when userId changes. Includes cleanup function to prevent state updates on unmounted components.
                </p>
              </div>
              
              <div>
                <Badge variant="secondary" className="mb-2">useRef for Cleanup</Badge>
                <p className="text-sm text-gray-600">
                  Uses isMountedRef to track component mount state and prevent memory leaks from async operations.
                </p>
              </div>
              
              <div>
                <Badge variant="secondary" className="mb-2">Error Boundaries</Badge>
                <p className="text-sm text-gray-600">
                  Comprehensive error handling for network failures, HTTP errors, and JSON parsing issues.
                </p>
              </div>
              
              <div>
                <Badge variant="secondary" className="mb-2">Retry Mechanism</Badge>
                <p className="text-sm text-gray-600">
                  Includes retry functionality with counter to track retry attempts and provide user feedback.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfileDemo;