// Database type definitions for Supabase
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          type: 'employer' | 'jobseeker';
          company?: string;
          skills?: string[];
          avatar?: string;
          points?: number;
          badges?: string[];
          completed_challenges?: string[];
          job_interests?: string[];
          assessed_skills?: string[];
          upskilling_progress?: any[];
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          type: 'employer' | 'jobseeker';
          company?: string;
          skills?: string[];
          avatar?: string;
          points?: number;
          badges?: string[];
          completed_challenges?: string[];
          job_interests?: string[];
          assessed_skills?: string[];
          upskilling_progress?: any[];
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          type?: 'employer' | 'jobseeker';
          company?: string;
          skills?: string[];
          avatar?: string;
          points?: number;
          badges?: string[];
          completed_challenges?: string[];
          job_interests?: string[];
          assessed_skills?: string[];
          upskilling_progress?: any[];
        };
      };
      jobs: {
        Row: {
          id: string;
          title: string;
          company: string;
          location: string;
          remote: boolean;
          skills: string[];
          description: string;
          challenge_title: string;
          challenge_description: string;
          submission_type: 'text' | 'link' | 'file';
          point_value?: number;
          badge_awarded?: string;
          deadline: string;
          employer_id: string;
          created_at: string;
          category?: string;
        };
        Insert: {
          id?: string;
          title: string;
          company: string;
          location: string;
          remote: boolean;
          skills: string[];
          description: string;
          challenge_title: string;
          challenge_description: string;
          submission_type: 'text' | 'link' | 'file';
          point_value?: number;
          badge_awarded?: string;
          deadline: string;
          employer_id: string;
          created_at?: string;
          category?: string;
        };
        Update: {
          id?: string;
          title?: string;
          company?: string;
          location?: string;
          remote?: boolean;
          skills?: string[];
          description?: string;
          challenge_title?: string;
          challenge_description?: string;
          submission_type?: 'text' | 'link' | 'file';
          point_value?: number;
          badge_awarded?: string;
          deadline?: string;
          employer_id?: string;
          created_at?: string;
          category?: string;
        };
      };
      applications: {
        Row: {
          id: string;
          job_id: string;
          applicant_id: string;
          applicant_name: string;
          applicant_email: string;
          submission_type: 'text' | 'link' | 'file';
          submission_content: string;
          submitted_at: string;
          status: 'submitted' | 'reviewed' | 'accepted' | 'rejected';
          rating?: number;
          feedback?: string;
          points_earned?: number;
          badge_earned?: string;
        };
        Insert: {
          id?: string;
          job_id: string;
          applicant_id: string;
          applicant_name: string;
          applicant_email: string;
          submission_type: 'text' | 'link' | 'file';
          submission_content: string;
          submitted_at?: string;
          status?: 'submitted' | 'reviewed' | 'accepted' | 'rejected';
          rating?: number;
          feedback?: string;
          points_earned?: number;
          badge_earned?: string;
        };
        Update: {
          id?: string;
          job_id?: string;
          applicant_id?: string;
          applicant_name?: string;
          applicant_email?: string;
          submission_type?: 'text' | 'link' | 'file';
          submission_content?: string;
          submitted_at?: string;
          status?: 'submitted' | 'reviewed' | 'accepted' | 'rejected';
          rating?: number;
          feedback?: string;
          points_earned?: number;
          badge_earned?: string;
        };
      };
      badges: {
        Row: {
          id: string;
          name: string;
          description: string;
          icon: string;
          rarity: 'common' | 'rare' | 'epic' | 'legendary';
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          icon: string;
          rarity: 'common' | 'rare' | 'epic' | 'legendary';
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          icon?: string;
          rarity?: 'common' | 'rare' | 'epic' | 'legendary';
        };
      };
      upskilling_roadmaps: {
        Row: {
          id: string;
          job_title: string;
          job_category: string;
          total_challenges: number;
          estimated_duration: string;
          challenges: any[];
        };
        Insert: {
          id?: string;
          job_title: string;
          job_category: string;
          total_challenges: number;
          estimated_duration: string;
          challenges: any[];
        };
        Update: {
          id?: string;
          job_title?: string;
          job_category?: string;
          total_challenges?: number;
          estimated_duration?: string;
          challenges?: any[];
        };
      };
      upskilling_progress: {
        Row: {
          id: string;
          user_id: string;
          roadmap_id: string;
          job_title: string;
          completed_challenges: string[];
          current_level: 'Beginner' | 'Intermediate' | 'Expert';
          started_at: string;
          last_updated: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          roadmap_id: string;
          job_title: string;
          completed_challenges: string[];
          current_level: 'Beginner' | 'Intermediate' | 'Expert';
          started_at?: string;
          last_updated?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          roadmap_id?: string;
          job_title?: string;
          completed_challenges?: string[];
          current_level?: 'Beginner' | 'Intermediate' | 'Expert';
          started_at?: string;
          last_updated?: string;
        };
      };
    };
  };
}