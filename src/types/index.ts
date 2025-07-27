export interface User {
  id: string;
  name: string;
  email: string;
  type: 'employer' | 'jobseeker';
  company?: string;
  skills?: string[];
  avatar?: string;
  points?: number;
  badges?: string[];
  completedChallenges?: string[];
  // New fields for career development
  jobInterests?: string[];
  assessedSkills?: string[];
  upskillingProgress?: UpskillingProgress[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  skills: string[];
  description: string;
  challenge: {
    title: string;
    description: string;
    submissionType: 'text' | 'link' | 'file';
    pointValue?: number;
    badgeAwarded?: string;
  };
  deadline: string;
  employerId: string;
  createdAt: string;
  applications?: Application[];
  // New field for job category
  category?: string;
}

export interface Application {
  id: string;
  jobId: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  submission: {
    type: 'text' | 'link' | 'file';
    content: string;
  };
  submittedAt: string;
  status: 'submitted' | 'reviewed' | 'accepted' | 'rejected';
  rating?: number;
  feedback?: string;
  pointsEarned?: number;
  badgeEarned?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  skills: string[];
  difficulty: 'beginner' | 'intermediate';
  timeEstimate: string;
  pointValue: number;
  badgeAwarded: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// New interfaces for upskilling roadmap
export interface ChallengeStep {
  id: string;
  level: 'Beginner' | 'Intermediate' | 'Expert';
  title: string;
  description: string;
  deliverables: string[];
  estimatedTime: string;
  badgeName: string;
  pointValue: number;
  requiredTools?: string[];
  successCriteria: string[];
}

export interface UpskillingRoadmap {
  id: string;
  jobTitle: string;
  jobCategory: string;
  totalChallenges: number;
  estimatedDuration: string;
  challenges: ChallengeStep[];
}

export interface UpskillingProgress {
  roadmapId: string;
  jobTitle: string;
  completedChallenges: string[];
  currentLevel: 'Beginner' | 'Intermediate' | 'Expert';
  startedAt: string;
  lastUpdated: string;
}