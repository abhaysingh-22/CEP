import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getProfile, upsertProfile, signOut } from '../../integrations/supabase/auth';
import { getUserStats } from '../../integrations/supabase/database';
import { Loader2, User, LogOut, Save } from 'lucide-react';

export const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadProfile();
      loadStats();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await getProfile();
      if (error && !error.message.includes('No rows')) {
        throw error;
      }
      
      if (data) {
        setProfile(data);
        setUsername(data.username || '');
        setFullName(data.full_name || '');
      } else {
        // No profile exists yet, use user metadata
        setFullName(user?.user_metadata?.full_name || '');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const { data, error } = await getUserStats();
      if (error) throw error;
      setStats(data);
    } catch (err: any) {
      console.error('Error loading stats:', err.message);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const { data, error } = await upsertProfile({
        username: username.trim() || null,
        full_name: fullName.trim() || null,
      });

      if (error) throw error;

      setProfile(data);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Loading profile...</span>
      </div>
    );
  }

  const initials = (fullName || user?.email || 'U')
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Profile Card */}
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>
            Manage your account information and preferences
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ''}
                disabled
                className="bg-muted"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button type="submit" disabled={saving} className="flex-1">
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save Profile
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Stats Card */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>Your Impact</CardTitle>
            <CardDescription>
              Track your environmental consciousness journey
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-green-600">
                  {stats.totalCalculations}
                </div>
                <div className="text-sm text-muted-foreground">
                  Calculations
                </div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.totalFootprint.toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">
                  kg CO₂
                </div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-purple-600">
                  {stats.totalExperiences}
                </div>
                <div className="text-sm text-muted-foreground">
                  Experiences
                </div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-orange-600">
                  {stats.totalFeedback}
                </div>
                <div className="text-sm text-muted-foreground">
                  Feedback
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};