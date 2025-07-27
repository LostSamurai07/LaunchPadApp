import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase, getUserProfile, upsertUserProfile } from '../lib/supabase';
import { User, UpskillingRoadmap } from '../types';
import { saveRoadmapToDatabase, startRoadmapProgress } from '../lib/roadmapService';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'employer' | 'jobseeker') => Promise<void>;
  logout: () => void;
  signup: (userData: Partial<User>, password: string) => Promise<void>;
  awardPointsAndBadges: (points: number, badge?: string) => void;
  completeChallenge: (challengeId: string, roadmapId: string, badgeName: string, points: number) => void;
  saveGeneratedRoadmap: (roadmap: UpskillingRoadmap) => Promise<string>;
  isLoading: boolean;
  initialLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    let subscription: any = null;

    const getSession = async () => {
      console.log('🔍 AuthContext: Checking for existing session...');
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ AuthContext: Error getting session:', error);
          return;
        }

        if (session?.user) {
          console.log('✅ AuthContext: Found existing session for user:', session.user.id);
          await loadUserProfile(session.user);
        } else {
          console.log('ℹ️ AuthContext: No existing session found');
        }
      } catch (error) {
        console.error('❌ AuthContext: Error in getSession:', error);
      } finally {
        console.log('🏁 AuthContext: Initial session check complete, setting initialLoading to false');
        setInitialLoading(false);
      }
    };

    const setupAuthListener = () => {
      console.log('🔧 AuthContext: Setting up auth state listener...');
      try {
        // Listen for auth changes
        const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('🔄 AuthContext: Auth state changed:', event, session?.user?.id || 'no user');
          if (event === 'SIGNED_IN' && session?.user) {
            console.log('🔑 AuthContext: SIGNED_IN event detected, loading user profile...');
            await loadUserProfile(session.user);
          } else if (event === 'SIGNED_OUT') {
            console.log('👋 AuthContext: User signed out, clearing user state');
            setUser(null);
          }
        });

        subscription = data.subscription;
        console.log('✅ AuthContext: Auth listener setup complete');
      } catch (error) {
        console.error('❌ AuthContext: Error setting up auth listener:', error);
      }
    };

    // Initialize
    getSession();
    setupAuthListener();

    // Cleanup function
    return () => {
      console.log('🧹 AuthContext: Cleaning up auth listener...');
      if (subscription && typeof subscription.unsubscribe === 'function') {
        try {
          subscription.unsubscribe();
          console.log('✅ AuthContext: Auth listener unsubscribed successfully');
        } catch (error) {
          console.error('❌ AuthContext: Error unsubscribing auth listener:', error);
        }
      } else {
        console.log('⚠️ AuthContext: No valid subscription to unsubscribe');
      }
    };
  }, []);

  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    console.log('📋 AuthContext: Starting loadUserProfile for user ID:', supabaseUser.id);
    console.log('📋 AuthContext: User email:', supabaseUser.email);
    
    try {
      console.log('📡 AuthContext: Calling getUserProfile...');
      const profile = await getUserProfile(supabaseUser.id);
      console.log('📡 AuthContext: getUserProfile completed');
      
      if (profile) {
        console.log('✅ AuthContext: User profile found:', {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          type: profile.type
        });
        
        // Convert database format to app format
        const userProfile: User = {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          type: profile.type as 'employer' | 'jobseeker',
          company: profile.company,
          skills: profile.skills,
          avatar: profile.avatar,
          points: profile.points,
          badges: profile.badges,
          completedChallenges: profile.completed_challenges,
          jobInterests: profile.job_interests,
          assessedSkills: profile.assessed_skills,
          upskillingProgress: profile.upskilling_progress?.map(progress => ({
            roadmapId: progress.roadmap_id,
            jobTitle: progress.job_title,
            completedChallenges: progress.completed_challenges,
            currentLevel: progress.current_level,
            startedAt: progress.started_at,
            lastUpdated: progress.last_updated
          })) || []
        };
        
        console.log('🔄 AuthContext: About to call setUser with profile:', userProfile.name);
        setUser(userProfile);
        console.log('✅ AuthContext: setUser completed successfully');
      } else {
        console.log('⚠️ AuthContext: No profile found for user:', supabaseUser.id);
        console.log('⚠️ AuthContext: This might be a new user or profile creation failed');
      }
    } catch (error) {
      console.error('❌ AuthContext: Error in loadUserProfile:', error);
      console.error('❌ AuthContext: Error details:', {
        message: error.message,
        stack: error.stack
      });
    }
    
    console.log('🏁 AuthContext: loadUserProfile function completed');
  };

  const login = async (email: string, password: string, userType: 'employer' | 'jobseeker') => {
    console.log('🔐 AuthContext: Starting login process for:', email, 'as', userType);
    setIsLoading(true);
    
    try {
      console.log('📡 AuthContext: Calling supabase.auth.signInWithPassword...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      console.log('📡 AuthContext: Supabase auth response received');
      console.log('📡 AuthContext: Auth data:', {
        user: data.user ? { id: data.user.id, email: data.user.email } : null,
        session: data.session ? 'session exists' : 'no session'
      });

      if (error) {
        console.error('❌ AuthContext: Supabase auth error:', error);
        // Provide more specific error messages
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        } else if (error.message.includes('Email not confirmed')) {
          throw new Error('Please check your email and click the confirmation link before signing in.');
        }
        throw error;
      }

      if (data.user) {
        console.log('✅ AuthContext: Login successful, user authenticated');
        console.log('📋 AuthContext: About to load user profile...');
        await loadUserProfile(data.user);
        console.log('✅ AuthContext: Login process completed successfully');
      } else {
        console.log('⚠️ AuthContext: Login returned no user data');
      }
    } catch (error) {
      console.error('❌ AuthContext: Login error:', error);
      throw error;
    } finally {
      console.log('🏁 AuthContext: Setting isLoading to false');
      setIsLoading(false);
    }
  };

  const signup = async (userData: Partial<User>, password: string) => {
    console.log('📝 AuthContext: Starting signup process for:', userData.email, 'as', userData.type);
    setIsLoading(true);
    
    try {
      console.log('📡 AuthContext: Calling supabase.auth.signUp...');
      // First, create the auth user with proper email confirmation handling
      const { data, error } = await supabase.auth.signUp({
        email: userData.email!,
        password,
        options: {
          data: {
            name: userData.name,
            user_type: userData.type
          }
        }
      });

      console.log('📡 AuthContext: Supabase signup response received');
      console.log('📡 AuthContext: Signup data:', {
        user: data.user ? { id: data.user.id, email: data.user.email } : null,
        session: data.session ? 'session exists' : 'no session'
      });

      if (error) {
        console.error('❌ AuthContext: Supabase signup error:', error);
        if (error.message.includes('User already registered')) {
          throw new Error('An account with this email already exists. Please sign in instead.');
        }
        throw error;
      }

      if (data.user) {
        console.log('✅ AuthContext: User created successfully:', data.user.id);
        
        // Check if email confirmation is required
        if (!data.session) {
          console.log('📧 AuthContext: Email confirmation required');
          // Email confirmation is enabled - user needs to confirm email
          throw new Error('Please check your email and click the confirmation link to complete your registration.');
        }

        console.log('📋 AuthContext: Creating user profile in database...');
        // Create the user profile in our users table
        const profileData = {
          id: data.user.id,
          name: userData.name!,
          email: userData.email!,
          type: userData.type!,
          company: userData.company,
          skills: userData.skills || [],
          points: userData.type === 'jobseeker' ? 0 : undefined,
          badges: userData.type === 'jobseeker' ? [] : undefined,
          completed_challenges: userData.type === 'jobseeker' ? [] : undefined,
          job_interests: userData.jobInterests || [],
          assessed_skills: userData.assessedSkills || [],
          upskilling_progress: userData.type === 'jobseeker' ? [] : undefined
        };

        console.log('📡 AuthContext: About to upsert user profile...');
        await upsertUserProfile(profileData);
        console.log('✅ AuthContext: User profile created successfully');
        
        // If we have a session, load the user profile
        if (data.session) {
          console.log('✅ AuthContext: Session available, loading user profile...');
          await loadUserProfile(data.user);
        }
        
        console.log('✅ AuthContext: Signup process completed successfully');
      } else {
        console.log('⚠️ AuthContext: Signup returned no user data');
      }
    } catch (error) {
      console.error('❌ AuthContext: Signup error:', error);
      throw error;
    } finally {
      console.log('🏁 AuthContext: Setting isLoading to false');
      setIsLoading(false);
    }
  };

  const awardPointsAndBadges = async (points: number, badge?: string) => {
    if (!user || user.type !== 'jobseeker') return;

    try {
      const updatedUser = {
        ...user,
        points: (user.points || 0) + points,
        badges: badge && !user.badges?.includes(badge) 
          ? [...(user.badges || []), badge]
          : user.badges || []
      };

      // Check for milestone badges
      const currentPoints = updatedUser.points || 0;
      const currentBadges = updatedUser.badges || [];

      // Award milestone badges
      if (currentPoints >= 500 && !currentBadges.includes('Point Collector')) {
        updatedUser.badges = [...currentBadges, 'Point Collector'];
      }

      const completedChallenges = updatedUser.completedChallenges?.length || 0;
      if (completedChallenges >= 5 && !currentBadges.includes('Challenge Champion')) {
        updatedUser.badges = [...(updatedUser.badges || []), 'Challenge Champion'];
      }

      // Update in database
      await upsertUserProfile({
        id: user.id,
        points: updatedUser.points,
        badges: updatedUser.badges
      });

      setUser(updatedUser);
    } catch (error) {
      console.error('Error awarding points and badges:', error);
    }
  };

  const completeChallenge = async (challengeId: string, roadmapId: string, badgeName: string, points: number) => {
    if (!user || user.type !== 'jobseeker') return;

    try {
      const updatedUser = { ...user };
      
      // Add to completed challenges
      updatedUser.completedChallenges = [...(user.completedChallenges || []), challengeId];
      
      // Award points and badge
      updatedUser.points = (user.points || 0) + points;
      if (!user.badges?.includes(badgeName)) {
        updatedUser.badges = [...(user.badges || []), badgeName];
      }

      // Update upskilling progress
      const existingProgress = user.upskillingProgress?.find(p => p.roadmapId === roadmapId);
      if (existingProgress) {
        updatedUser.upskillingProgress = user.upskillingProgress?.map(p => 
          p.roadmapId === roadmapId 
            ? { ...p, completedChallenges: [...p.completedChallenges, challengeId], lastUpdated: new Date().toISOString() }
            : p
        );
      } else {
        updatedUser.upskillingProgress = [
          ...(user.upskillingProgress || []),
          {
            roadmapId,
            jobTitle: 'Current Roadmap',
            completedChallenges: [challengeId],
            currentLevel: 'Beginner' as const,
            startedAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
          }
        ];
      }

      // Check for milestone badges
      const currentPoints = updatedUser.points || 0;
      const currentBadges = updatedUser.badges || [];

      if (currentPoints >= 500 && !currentBadges.includes('Point Collector')) {
        updatedUser.badges = [...currentBadges, 'Point Collector'];
      }

      const completedChallengesCount = updatedUser.completedChallenges?.length || 0;
      if (completedChallengesCount >= 5 && !currentBadges.includes('Challenge Champion')) {
        updatedUser.badges = [...(updatedUser.badges || []), 'Challenge Champion'];
      }

      // Update in database
      await upsertUserProfile({
        id: user.id,
        points: updatedUser.points,
        badges: updatedUser.badges,
        completed_challenges: updatedUser.completedChallenges,
        upskilling_progress: updatedUser.upskillingProgress?.map(progress => ({
          roadmap_id: progress.roadmapId,
          job_title: progress.jobTitle,
          completed_challenges: progress.completedChallenges,
          current_level: progress.currentLevel,
          started_at: progress.startedAt,
          last_updated: progress.lastUpdated
        }))
      });

      // Update upskilling_progress table
      if (roadmapId) {
        const { error: progressError } = await supabase
          .from('upskilling_progress')
          .upsert({
            user_id: user.id,
            roadmap_id: roadmapId,
            job_title: 'Current Roadmap',
            completed_challenges: updatedUser.upskillingProgress?.find(p => p.roadmapId === roadmapId)?.completedChallenges || [challengeId],
            current_level: 'Beginner',
            last_updated: new Date().toISOString()
          }, { onConflict: 'user_id,roadmap_id' });

        if (progressError) {
          console.error('Error updating upskilling progress:', progressError);
        }
      }

      setUser(updatedUser);
    } catch (error) {
      console.error('Error completing challenge:', error);
    }
  };

  const saveGeneratedRoadmap = async (roadmap: UpskillingRoadmap): Promise<string> => {
    if (!user || user.type !== 'jobseeker') {
      throw new Error('Only job seekers can save roadmaps');
    }

    try {
      // Save roadmap to database
      const roadmapId = await saveRoadmapToDatabase(roadmap);
      
      // Start progress tracking for this roadmap
      await startRoadmapProgress(user.id, roadmapId, roadmap.jobTitle);
      
      // Reload user profile to get updated progress
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        await loadUserProfile(authUser);
      }
      
      return roadmapId;
    } catch (error) {
      console.error('Error saving generated roadmap:', error);
      throw error;
    }
  };

  const logout = async () => {
    console.log('👋 AuthContext: Starting logout process...');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ AuthContext: Logout error:', error);
      } else {
        console.log('✅ AuthContext: Logout successful');
      }
      setUser(null);
    } catch (error) {
      console.error('❌ AuthContext: Logout error:', error);
    }
  };

  // Debug logging for state changes
  useEffect(() => {
    console.log('🔄 AuthContext: User state changed:', user ? `${user.name} (${user.type})` : 'null');
  }, [user]);

  useEffect(() => {
    console.log('🔄 AuthContext: isLoading state changed:', isLoading);
  }, [isLoading]);

  useEffect(() => {
    console.log('🔄 AuthContext: initialLoading state changed:', initialLoading);
  }, [initialLoading]);

  const value = {
    user,
    login,
    logout,
    signup,
    awardPointsAndBadges,
    completeChallenge,
    saveGeneratedRoadmap,
    isLoading,
    initialLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};