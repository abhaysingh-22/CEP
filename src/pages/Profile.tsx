import React from 'react';
import { UserProfile } from '../components/auth/UserProfile';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

const Profile: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-nature-primary/5 to-nature-accent/5 pt-20 px-4">
        <div className="max-w-4xl mx-auto py-8">
          <UserProfile />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;