import { supabase } from './client';
import { getCurrentUser } from './auth';
import type { Database } from './types';

type CarbonCalculation = Database['public']['Tables']['carbon_calculations']['Row'];
type CarbonCalculationInsert = Database['public']['Tables']['carbon_calculations']['Insert'];
type CommunityExperience = Database['public']['Tables']['community_experiences']['Row'];
type CommunityExperienceInsert = Database['public']['Tables']['community_experiences']['Insert'];
type Feedback = Database['public']['Tables']['feedback']['Row'];
type FeedbackInsert = Database['public']['Tables']['feedback']['Insert'];

// ===== Carbon Calculations =====

export const saveCarbonCalculation = async (calculation: Omit<CarbonCalculationInsert, 'user_id'>) => {
  const user = await getCurrentUser();
  
  if (!user) {
    return { data: null, error: new Error('User must be authenticated') };
  }

  const { data, error } = await supabase
    .from('carbon_calculations')
    .insert({
      ...calculation,
      user_id: user.id,
    })
    .select()
    .single();

  return { data, error };
};

export const getUserCarbonCalculations = async (limit = 50) => {
  const user = await getCurrentUser();
  
  if (!user) {
    return { data: [], error: new Error('User must be authenticated') };
  }

  const { data, error } = await supabase
    .from('carbon_calculations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit);

  return { data: data || [], error };
};

export const getTotalCarbonFootprint = async () => {
  const user = await getCurrentUser();
  
  if (!user) {
    return { data: 0, error: new Error('User must be authenticated') };
  }

  const { data, error } = await supabase
    .from('carbon_calculations')
    .select('carbon_footprint')
    .eq('user_id', user.id);

  if (error) return { data: 0, error };

  const total = data?.reduce((sum, calc) => sum + calc.carbon_footprint, 0) || 0;
  return { data: total, error: null };
};

// ===== Community Experiences =====

export const createCommunityExperience = async (experience: Omit<CommunityExperienceInsert, 'user_id'>) => {
  const user = await getCurrentUser();
  
  if (!user) {
    return { data: null, error: new Error('User must be authenticated') };
  }

  const { data, error } = await supabase
    .from('community_experiences')
    .insert({
      ...experience,
      user_id: user.id,
    })
    .select(`
      *,
      profiles!community_experiences_user_id_fkey (
        username,
        full_name,
        avatar_url
      )
    `)
    .single();

  return { data, error };
};

export const getCommunityExperiences = async (limit = 20) => {
  const { data, error } = await supabase
    .from('community_experiences')
    .select(`
      *,
      profiles!community_experiences_user_id_fkey (
        username,
        full_name,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false })
    .limit(limit);

  return { data: data || [], error };
};

export const getUserCommunityExperiences = async (limit = 20) => {
  const user = await getCurrentUser();
  
  if (!user) {
    return { data: [], error: new Error('User must be authenticated') };
  }

  const { data, error } = await supabase
    .from('community_experiences')
    .select(`
      *,
      profiles!community_experiences_user_id_fkey (
        username,
        full_name,
        avatar_url
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit);

  return { data: data || [], error };
};

export const likeCommunityExperience = async (experienceId: string) => {
  // First get current likes count
  const { data: experience, error: fetchError } = await supabase
    .from('community_experiences')
    .select('likes')
    .eq('id', experienceId)
    .single();

  if (fetchError || !experience) {
    return { data: null, error: fetchError || new Error('Experience not found') };
  }

  // Increment likes
  const { data, error } = await supabase
    .from('community_experiences')
    .update({ likes: experience.likes + 1 })
    .eq('id', experienceId)
    .select()
    .single();

  return { data, error };
};

// ===== Feedback =====

export const submitFeedback = async (feedback: Omit<FeedbackInsert, 'user_id'>) => {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from('feedback')
    .insert({
      ...feedback,
      user_id: user?.id || null,
    })
    .select()
    .single();

  return { data, error };
};

export const getUserFeedback = async (limit = 10) => {
  const user = await getCurrentUser();
  
  if (!user) {
    return { data: [], error: new Error('User must be authenticated') };
  }

  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit);

  return { data: data || [], error };
};

// ===== Analytics Functions =====

export const getUserStats = async () => {
  const user = await getCurrentUser();
  
  if (!user) {
    return { 
      data: null, 
      error: new Error('User must be authenticated') 
    };
  }

  try {
    // Get total calculations
    const { data: calculations } = await supabase
      .from('carbon_calculations')
      .select('carbon_footprint')
      .eq('user_id', user.id);

    // Get total experiences
    const { data: experiences } = await supabase
      .from('community_experiences')
      .select('id')
      .eq('user_id', user.id);

    // Get total feedback
    const { data: feedback } = await supabase
      .from('feedback')
      .select('id')
      .eq('user_id', user.id);

    const totalFootprint = calculations?.reduce((sum, calc) => sum + calc.carbon_footprint, 0) || 0;
    const totalCalculations = calculations?.length || 0;
    const totalExperiences = experiences?.length || 0;
    const totalFeedback = feedback?.length || 0;

    return {
      data: {
        totalFootprint,
        totalCalculations,
        totalExperiences,
        totalFeedback,
      },
      error: null
    };
  } catch (error) {
    return { data: null, error };
  }
};