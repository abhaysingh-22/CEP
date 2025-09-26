import { supabase } from './client';
import type { AuthError, User, Session } from '@supabase/supabase-js';

export interface AuthResponse {
  user: User | null;
  error: AuthError | null;
}

export interface ProfileData {
  id?: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
}

// Sign up with email and password
export const signUp = async (email: string, password: string, userData?: { full_name?: string }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData || {}
    }
  });
  
  return { user: data.user, error };
};

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { user: data.user, session: data.session, error };
};

// Sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Get current session
export const getCurrentSession = async (): Promise<Session | null> => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (event: string, session: Session | null) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};

// Create or update user profile
export const upsertProfile = async (profileData: ProfileData) => {
  const user = await getCurrentUser();
  
  if (!user) {
    return { error: new Error('No authenticated user') };
  }

  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      ...profileData,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  return { data, error };
};

// Get user profile
export const getProfile = async (userId?: string) => {
  const targetUserId = userId || (await getCurrentUser())?.id;
  
  if (!targetUserId) {
    return { data: null, error: new Error('No user ID provided') };
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', targetUserId)
    .single();

  return { data, error };
};

// Reset password
export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  
  return { error };
};

// Update password
export const updatePassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });
  
  return { user: data.user, error };
};