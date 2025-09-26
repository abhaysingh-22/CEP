import { supabase } from './client';
import type { AuthError, User, Session } from '@supabase/supabase-js';

export interface AuthResponse {
  user: User | null;
  error: AuthError | null;
}

// Simple sign up without profile creation (for testing)
export const signUp = async (email: string, password: string) => {
  console.log('Attempting signup with:', { email, password: '***' });
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  console.log('Signup result:', { data, error });
  
  return { user: data.user, error };
};

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  console.log('Attempting signin with:', { email, password: '***' });
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  console.log('Signin result:', { data, error });
  
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