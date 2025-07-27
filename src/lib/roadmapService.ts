import { supabase } from './supabase';
import { UpskillingRoadmap } from '../types';

export interface GenerateRoadmapRequest {
  userSkills: string[];
  jobPreference: string;
  currentLevel?: string;
}

export const generateCustomRoadmap = async (
  request: GenerateRoadmapRequest
): Promise<UpskillingRoadmap> => {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl) {
      throw new Error('Supabase URL not configured');
    }

    const functionUrl = `${supabaseUrl}/functions/v1/generate-roadmap`;
    
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate roadmap');
    }

    const data = await response.json();
    return data.roadmap;
  } catch (error) {
    console.error('Error generating custom roadmap:', error);
    throw error;
  }
};

export const saveRoadmapToDatabase = async (roadmap: UpskillingRoadmap): Promise<string> => {
  try {
    const { data, error } = await supabase
      .from('upskilling_roadmaps')
      .insert({
        job_title: roadmap.jobTitle,
        job_category: roadmap.jobCategory,
        total_challenges: roadmap.totalChallenges,
        estimated_duration: roadmap.estimatedDuration,
        challenges: roadmap.challenges.map(challenge => ({
          id: challenge.id,
          level: challenge.level,
          title: challenge.title,
          description: challenge.description,
          deliverables: challenge.deliverables,
          estimatedTime: challenge.estimatedTime,
          badgeName: challenge.badgeName,
          pointValue: challenge.pointValue,
          requiredTools: challenge.requiredTools || [],
          successCriteria: challenge.successCriteria
        }))
      })
      .select('id')
      .single();

    if (error) {
      throw error;
    }

    return data.id;
  } catch (error) {
    console.error('Error saving roadmap to database:', error);
    throw error;
  }
};

export const startRoadmapProgress = async (
  userId: string,
  roadmapId: string,
  jobTitle: string
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('upskilling_progress')
      .insert({
        user_id: userId,
        roadmap_id: roadmapId,
        job_title: jobTitle,
        completed_challenges: [],
        current_level: 'Beginner'
      });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error starting roadmap progress:', error);
    throw error;
  }
};