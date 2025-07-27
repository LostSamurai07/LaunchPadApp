import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Star, 
  Target, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Play,
  Sparkles,
  Brain,
  Rocket,
  Save,
  Loader2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockJobs, mockBadges, mockUpskillingRoadmaps } from '../data/mockData';
import { Job, Badge, UpskillingRoadmap, ChallengeStep } from '../types';
import { generateCustomRoadmap, GenerateRoadmapRequest } from '../lib/roadmapService';

const JobSeekerDashboard: React.FC = () => {
  const { user, awardPointsAndBadges, completeChallenge, saveGeneratedRoadmap } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'challenges' | 'roadmap' | 'ai-roadmap'>('overview');
  const [selectedRoadmap, setSelectedRoadmap] = useState<UpskillingRoadmap | null>(null);
  const [generatedRoadmap, setGeneratedRoadmap] = useState<UpskillingRoadmap | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [roadmapForm, setRoadmapForm] = useState({
    skills: '',
    jobPreference: '',
    currentLevel: 'Beginner' as 'Beginner' | 'Intermediate' | 'Expert'
  });

  // Filter jobs based on user's skills and interests for overview section
  const recommendedJobs = mockJobs.filter(job => {
    const userSkills = user?.skills || [];
    const userInterests = user?.jobInterests || [];
    
    const hasMatchingSkills = job.skills.some(skill => 
      userSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
    
    const hasMatchingInterests = userInterests.some(interest =>
      job.title.toLowerCase().includes(interest.toLowerCase()) ||
      job.category?.toLowerCase().includes(interest.toLowerCase())
    );
    
    return hasMatchingSkills || hasMatchingInterests;
  }).slice(0, 3);

  const handleCompleteChallenge = (challengeId: string, roadmapId: string, badgeName: string, points: number) => {
    completeChallenge(challengeId, roadmapId, badgeName, points);
  };

  const getBadgeIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      Trophy, Star, Target, BookOpen, Award, TrendingUp, Clock, CheckCircle
    };
    const IconComponent = iconMap[iconName] || Trophy;
    return <IconComponent className="h-6 w-6" />;
  };

  const getBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-highlight-accent-gold/30 text-text-primary border-highlight-accent-gold';
      case 'rare': return 'bg-button-primary/30 text-button-primary border-button-primary';
      case 'epic': return 'bg-highlight-accent-pink/30 text-highlight-accent-pink border-highlight-accent-pink';
      case 'legendary': return 'bg-highlight-accent-orange/30 text-highlight-accent-orange border-highlight-accent-orange';
      default: return 'bg-text-secondary/30 text-text-secondary border-text-secondary';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-highlight-accent-gold/30 text-text-primary border-highlight-accent-gold';
      case 'Intermediate': return 'bg-button-primary/30 text-button-primary border-button-primary';
      case 'Expert': return 'bg-highlight-accent-pink/30 text-highlight-accent-pink border-highlight-accent-pink';
      default: return 'bg-text-secondary/30 text-text-secondary border-text-secondary';
    }
  };

  const handleGenerateRoadmap = async () => {
    if (!roadmapForm.skills.trim() || !roadmapForm.jobPreference.trim()) {
      alert('Please fill in both your skills and job preference');
      return;
    }

    setIsGenerating(true);
    try {
      const request: GenerateRoadmapRequest = {
        userSkills: roadmapForm.skills.split(',').map(s => s.trim()).filter(s => s),
        jobPreference: roadmapForm.jobPreference.trim(),
        currentLevel: roadmapForm.currentLevel
      };

      const roadmap = await generateCustomRoadmap(request);
      setGeneratedRoadmap(roadmap);
      setActiveTab('ai-roadmap');
    } catch (error) {
      console.error('Error generating roadmap:', error);
      alert('Failed to generate roadmap. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveRoadmap = async () => {
    if (!generatedRoadmap) return;

    setIsSaving(true);
    try {
      await saveGeneratedRoadmap(generatedRoadmap);
      alert('Roadmap saved successfully! You can now track your progress.');
      setGeneratedRoadmap(null);
      setActiveTab('roadmap');
    } catch (error) {
      console.error('Error saving roadmap:', error);
      alert('Failed to save roadmap. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Initialize form with user's current data
  useEffect(() => {
    if (user) {
      setRoadmapForm({
        skills: user.skills?.join(', ') || '',
        jobPreference: user.jobInterests?.[0] || '',
        currentLevel: 'Beginner'
      });
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-black text-text-primary mb-2">
          WELCOME BACK, {user.name.toUpperCase()}!
        </h1>
        <p className="text-lg font-body text-text-secondary">Ready to level up your skills and land your dream job?</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-card-background p-2 rounded-2xl w-fit card-shadow-lg border-4 border-button-shadow">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl font-display font-semibold transition-all uppercase tracking-wide text-sm ${
            activeTab === 'overview'
              ? 'bg-button-primary text-background card-shadow transform scale-105'
              : 'text-text-primary hover:text-button-primary'
          }`}
        >
          OVERVIEW
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 rounded-xl font-display font-semibold transition-all uppercase tracking-wide text-sm ${
            activeTab === 'jobs'
              ? 'bg-button-primary text-background card-shadow transform scale-105'
              : 'text-text-primary hover:text-button-primary'
          }`}
        >
          JOBS ({mockJobs.length})
        </button>
        <button
          onClick={() => setActiveTab('challenges')}
          className={`px-4 py-2 rounded-xl font-display font-semibold transition-all uppercase tracking-wide text-sm ${
            activeTab === 'challenges'
              ? 'bg-button-primary text-background card-shadow transform scale-105'
              : 'text-text-primary hover:text-button-primary'
          }`}
        >
          CHALLENGES
        </button>
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-4 py-2 rounded-xl font-display font-semibold transition-all uppercase tracking-wide text-sm ${
            activeTab === 'roadmap'
              ? 'bg-button-primary text-background card-shadow transform scale-105'
              : 'text-text-primary hover:text-button-primary'
          }`}
        >
          ROADMAPS
        </button>
        <button
          onClick={() => setActiveTab('ai-roadmap')}
          className={`px-4 py-2 rounded-xl font-display font-semibold transition-all uppercase tracking-wide text-sm flex items-center ${
            activeTab === 'ai-roadmap'
              ? 'bg-button-primary text-background card-shadow transform scale-105'
              : 'text-text-primary hover:text-button-primary'
          }`}
        >
          <Brain className="h-4 w-4 mr-1" />
          AI ROADMAP
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="retro-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-highlight-accent-gold text-sm font-display font-semibold uppercase tracking-wide">Total Points</p>
                  <p className="text-3xl font-display font-black text-text-primary">{user.points || 0}</p>
                </div>
                <div className="bg-highlight-accent-gold p-4 rounded-2xl card-shadow">
                  <Star className="h-8 w-8 text-text-primary" />
                </div>
              </div>
            </div>

            <div className="retro-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-button-primary text-sm font-display font-semibold uppercase tracking-wide">Badges Earned</p>
                  <p className="text-3xl font-display font-black text-text-primary">{user.badges?.length || 0}</p>
                </div>
                <div className="bg-button-primary p-4 rounded-2xl card-shadow">
                  <Award className="h-8 w-8 text-background" />
                </div>
              </div>
            </div>

            <div className="retro-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-highlight-accent-pink text-sm font-display font-semibold uppercase tracking-wide">Challenges Done</p>
                  <p className="text-3xl font-display font-black text-text-primary">{user.completedChallenges?.length || 0}</p>
                </div>
                <div className="bg-highlight-accent-pink p-4 rounded-2xl card-shadow">
                  <Target className="h-8 w-8 text-background" />
                </div>
              </div>
            </div>

            <div className="retro-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-highlight-accent-orange text-sm font-display font-semibold uppercase tracking-wide">Job Matches</p>
                  <p className="text-3xl font-display font-black text-text-primary">{recommendedJobs.length}</p>
                </div>
                <div className="bg-highlight-accent-orange p-4 rounded-2xl card-shadow">
                  <TrendingUp className="h-8 w-8 text-background" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Badges */}
          <div className="retro-card">
            <h3 className="text-xl font-display font-bold text-text-primary mb-6 uppercase">Your Badges</h3>
            {user.badges && user.badges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {user.badges.slice(0, 6).map(badgeName => {
                  const badge = mockBadges.find(b => b.name === badgeName);
                  return badge ? (
                    <div key={badge.id} className={`p-4 rounded-2xl border-2 card-shadow ${getBadgeColor(badge.rarity)}`}>
                      <div className="flex items-center space-x-3">
                        {getBadgeIcon(badge.icon)}
                        <div>
                          <p className="font-display font-bold text-sm uppercase">{badge.name}</p>
                          <p className="text-xs font-body opacity-80">{badge.description}</p>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            ) : (
              <p className="text-text-secondary font-body">Complete challenges to earn your first badges!</p>
            )}
          </div>

          {/* Recommended Jobs */}
          <div className="retro-card">
            <h3 className="text-xl font-display font-bold text-text-primary mb-6 uppercase">Recommended Jobs For You</h3>
            <div className="space-y-4">
              {recommendedJobs.map(job => (
                <div key={job.id} className="p-6 bg-background rounded-2xl border-4 border-text-secondary card-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-display font-bold text-text-primary uppercase">{job.title}</h4>
                      <p className="text-text-secondary font-body font-semibold">{job.company}</p>
                      <p className="text-sm text-text-secondary font-body">{job.location} {job.remote && '• Remote'}</p>
                    </div>
                    <span className="bg-highlight-accent-gold/30 text-text-primary px-3 py-1 rounded-full text-xs font-display font-semibold border-2 border-highlight-accent-gold uppercase tracking-wide">
                      {job.challenge.pointValue} PTS
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.slice(0, 4).map(skill => (
                      <span key={skill} className="bg-button-primary/20 text-button-primary px-3 py-1 rounded-full text-xs font-body font-semibold border border-button-primary">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-text-secondary text-sm font-body mb-4">{job.challenge.title}</p>
                  <button className="retro-button bg-button-primary hover:bg-highlight-accent-orange text-background px-6 py-2 rounded-xl font-display font-bold text-sm">
                    APPLY NOW
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Jobs Tab - Now showing ALL jobs */}
      {activeTab === 'jobs' && (
        <div className="space-y-8">
          <div className="retro-card">
            <h3 className="text-2xl font-display font-black text-text-primary mb-8 uppercase">All Available Jobs</h3>
            <div className="space-y-6">
              {mockJobs.map(job => (
                <div key={job.id} className="p-8 bg-background rounded-2xl border-4 border-text-secondary card-shadow">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-xl font-display font-bold text-text-primary uppercase mb-2">{job.title}</h4>
                      <p className="text-lg font-body font-semibold text-text-secondary">{job.company}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-text-secondary">
                        <span className="font-body">{job.location}</span>
                        {job.remote && <span className="bg-highlight-accent-pink/20 text-highlight-accent-pink px-3 py-1 rounded-full text-xs font-display font-semibold border-2 border-highlight-accent-pink uppercase tracking-wide">Remote</span>}
                        <span className="font-body">Deadline: {job.deadline}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-display font-black text-highlight-accent-gold">
                        {job.challenge.pointValue} PTS
                      </p>
                      <p className="text-sm font-body text-text-secondary uppercase tracking-wide">Reward</p>
                    </div>
                  </div>

                  <p className="text-text-secondary mb-6 font-body leading-relaxed">{job.description}</p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h5 className="font-display font-bold text-text-primary mb-3 uppercase">Required Skills:</h5>
                      <div className="flex flex-wrap gap-3">
                        {job.skills.map(skill => (
                          <span key={skill} className="bg-highlight-accent-gold/30 text-text-primary px-4 py-2 rounded-full text-sm font-body font-semibold border-2 border-highlight-accent-gold">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-display font-bold text-text-primary mb-3 uppercase">Challenge:</h5>
                      <p className="text-text-secondary font-body">{job.challenge.title}</p>
                      <p className="text-xs text-text-secondary mt-1 font-body">Badge: {job.challenge.badgeAwarded}</p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button className="retro-button bg-button-primary hover:bg-highlight-accent-orange text-background px-8 py-3 rounded-xl font-display font-bold">
                      APPLY NOW
                    </button>
                    <button className="retro-button bg-card-background hover:bg-highlight-accent-pink text-text-primary px-8 py-3 rounded-xl font-display font-bold">
                      VIEW DETAILS
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Challenges Tab */}
      {activeTab === 'challenges' && (
        <div className="space-y-8">
          <div className="retro-card">
            <h3 className="text-2xl font-display font-black text-text-primary mb-8 uppercase">Available Challenges</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockBadges.slice(0, 8).map(badge => (
                <div key={badge.id} className={`p-6 rounded-2xl border-2 card-shadow ${getBadgeColor(badge.rarity)}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getBadgeIcon(badge.icon)}
                      <div>
                        <h4 className="font-display font-bold uppercase">{badge.name}</h4>
                        <p className="text-xs font-body opacity-80 capitalize">{badge.rarity} Badge</p>
                      </div>
                    </div>
                    <span className="text-lg font-display font-black">
                      {badge.rarity === 'common' ? '100' : badge.rarity === 'rare' ? '150' : badge.rarity === 'epic' ? '200' : '300'} PTS
                    </span>
                  </div>
                  <p className="text-sm font-body mb-4 opacity-90">{badge.description}</p>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleCompleteChallenge(badge.id, 'general', badge.name, badge.rarity === 'common' ? 100 : badge.rarity === 'rare' ? 150 : badge.rarity === 'epic' ? 200 : 300)}
                      className="retro-button bg-background hover:bg-highlight-accent-orange text-text-primary px-4 py-2 rounded-xl font-display font-bold text-sm"
                    >
                      START
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Roadmap Tab */}
      {activeTab === 'roadmap' && (
        <div className="space-y-8">
          <div className="retro-card">
            <h3 className="text-2xl font-display font-black text-text-primary mb-8 uppercase">Career Roadmaps</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockUpskillingRoadmaps.map(roadmap => (
                <div key={roadmap.id} className="p-6 bg-background rounded-2xl border-4 border-text-secondary card-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-display font-bold text-text-primary uppercase">{roadmap.jobTitle}</h4>
                      <p className="text-text-secondary font-body font-semibold">{roadmap.jobCategory}</p>
                    </div>
                    <span className="bg-highlight-accent-gold/30 text-text-primary px-3 py-1 rounded-full text-xs font-display font-semibold border-2 border-highlight-accent-gold uppercase tracking-wide">
                      {roadmap.totalChallenges} Challenges
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary font-body mb-4">Duration: {roadmap.estimatedDuration}</p>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => setSelectedRoadmap(roadmap)}
                      className="retro-button bg-button-primary hover:bg-highlight-accent-orange text-background px-6 py-2 rounded-xl font-display font-bold text-sm"
                    >
                      VIEW ROADMAP
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Roadmap Details */}
          {selectedRoadmap && (
            <div className="retro-card">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-display font-black text-text-primary uppercase">{selectedRoadmap.jobTitle} Roadmap</h3>
                  <p className="text-lg font-body text-text-secondary">{selectedRoadmap.jobCategory} • {selectedRoadmap.estimatedDuration}</p>
                </div>
                <button 
                  onClick={() => setSelectedRoadmap(null)}
                  className="retro-button bg-card-background hover:bg-highlight-accent-pink text-text-primary px-4 py-2 rounded-xl font-display font-bold text-sm"
                >
                  CLOSE
                </button>
              </div>

              <div className="space-y-6">
                {selectedRoadmap.challenges.map((challenge, index) => (
                  <div key={challenge.id} className="p-6 bg-background rounded-2xl border-4 border-text-secondary card-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-display font-semibold border-2 uppercase tracking-wide ${getLevelColor(challenge.level)}`}>
                            {challenge.level}
                          </span>
                          <span className="text-lg font-display font-black text-highlight-accent-gold">
                            {challenge.pointValue} PTS
                          </span>
                        </div>
                        <h4 className="text-lg font-display font-bold text-text-primary uppercase">{challenge.title}</h4>
                        <p className="text-sm text-text-secondary font-body">Estimated time: {challenge.estimatedTime}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-body text-text-secondary">Badge:</p>
                        <p className="font-display font-bold text-button-primary uppercase">{challenge.badgeName}</p>
                      </div>
                    </div>

                    <p className="text-text-secondary font-body mb-4 leading-relaxed">{challenge.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-display font-bold text-text-primary mb-2 uppercase text-sm">Deliverables:</h5>
                        <ul className="text-sm text-text-secondary font-body space-y-1">
                          {challenge.deliverables.map((deliverable, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-button-primary" />
                              <span>{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-display font-bold text-text-primary mb-2 uppercase text-sm">Success Criteria:</h5>
                        <ul className="text-sm text-text-secondary font-body space-y-1">
                          {challenge.successCriteria.map((criteria, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <Target className="h-4 w-4 text-highlight-accent-pink" />
                              <span>{criteria}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button 
                        onClick={() => handleCompleteChallenge(challenge.id, selectedRoadmap.id, challenge.badgeName, challenge.pointValue)}
                        className="retro-button bg-button-primary hover:bg-highlight-accent-orange text-background px-6 py-2 rounded-xl font-display font-bold text-sm flex items-center"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        START CHALLENGE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI Roadmap Tab */}
      {activeTab === 'ai-roadmap' && (
        <div className="space-y-8">
          <div className="retro-card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-button-primary p-3 rounded-2xl card-shadow">
                <Brain className="h-8 w-8 text-background" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-black text-text-primary uppercase">AI-Powered Custom Roadmap</h3>
                <p className="text-text-secondary font-body">Get a personalized learning path based on your skills and goals</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-display font-bold text-text-primary mb-3 uppercase tracking-wide">
                    Your Current Skills (comma separated)
                  </label>
                  <textarea
                    rows={3}
                    value={roadmapForm.skills}
                    onChange={(e) => setRoadmapForm({...roadmapForm, skills: e.target.value})}
                    className="w-full px-4 py-3 border-4 border-text-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-button-primary focus:border-button-primary font-body card-shadow"
                    placeholder="e.g., HTML, CSS, JavaScript, React, Figma, Photoshop"
                  />
                </div>

                <div>
                  <label className="block text-sm font-display font-bold text-text-primary mb-3 uppercase tracking-wide">
                    Target Job/Career
                  </label>
                  <input
                    type="text"
                    value={roadmapForm.jobPreference}
                    onChange={(e) => setRoadmapForm({...roadmapForm, jobPreference: e.target.value})}
                    className="w-full px-4 py-3 border-4 border-text-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-button-primary focus:border-button-primary font-body card-shadow"
                    placeholder="e.g., Frontend Developer, UI/UX Designer, Digital Marketer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-display font-bold text-text-primary mb-3 uppercase tracking-wide">
                    Current Level
                  </label>
                  <select
                    value={roadmapForm.currentLevel}
                    onChange={(e) => setRoadmapForm({...roadmapForm, currentLevel: e.target.value as 'Beginner' | 'Intermediate' | 'Expert'})}
                    className="w-full px-4 py-3 border-4 border-text-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-button-primary focus:border-button-primary font-body card-shadow"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerateRoadmap}
                  disabled={isGenerating}
                  className="retro-button bg-button-primary hover:bg-highlight-accent-orange text-background px-8 py-4 rounded-xl font-display font-bold w-full flex items-center justify-center disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      GENERATING...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      GENERATE MY ROADMAP
                    </>
                  )}
                </button>
              </div>

              {/* Info */}
              <div className="bg-background p-6 rounded-2xl border-4 border-text-secondary card-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <Rocket className="h-6 w-6 text-highlight-accent-pink" />
                  <h4 className="font-display font-bold text-text-primary uppercase">How It Works</h4>
                </div>
                <ul className="space-y-3 text-text-secondary font-body">
                  <li className="flex items-start space-x-2">
                    <span className="bg-button-primary text-background rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                    <span>Tell us about your current skills and target career</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-button-primary text-background rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                    <span>Our AI analyzes your profile and creates a personalized roadmap</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-button-primary text-background rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                    <span>Get 3 progressive challenges from beginner to expert level</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-button-primary text-background rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                    <span>Save your roadmap and start building your portfolio</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Generated Roadmap Display */}
          {generatedRoadmap && (
            <div className="retro-card">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-display font-black text-text-primary uppercase">Your Custom Roadmap</h3>
                  <p className="text-lg font-body text-text-secondary">{generatedRoadmap.jobTitle} • {generatedRoadmap.estimatedDuration}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveRoadmap}
                    disabled={isSaving}
                    className="retro-button bg-highlight-accent-gold hover:bg-highlight-accent-orange text-text-primary px-6 py-3 rounded-xl font-display font-bold flex items-center disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        SAVING...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        SAVE ROADMAP
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setGeneratedRoadmap(null)}
                    className="retro-button bg-card-background hover:bg-highlight-accent-pink text-text-primary px-6 py-3 rounded-xl font-display font-bold"
                  >
                    CLOSE
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {generatedRoadmap.challenges.map((challenge, index) => (
                  <div key={challenge.id} className="p-6 bg-background rounded-2xl border-4 border-text-secondary card-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-display font-semibold border-2 uppercase tracking-wide ${getLevelColor(challenge.level)}`}>
                            {challenge.level}
                          </span>
                          <span className="text-lg font-display font-black text-highlight-accent-gold">
                            {challenge.pointValue} PTS
                          </span>
                        </div>
                        <h4 className="text-lg font-display font-bold text-text-primary uppercase">{challenge.title}</h4>
                        <p className="text-sm text-text-secondary font-body">Estimated time: {challenge.estimatedTime}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-body text-text-secondary">Badge:</p>
                        <p className="font-display font-bold text-button-primary uppercase">{challenge.badgeName}</p>
                      </div>
                    </div>

                    <p className="text-text-secondary font-body mb-4 leading-relaxed">{challenge.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-display font-bold text-text-primary mb-2 uppercase text-sm">Deliverables:</h5>
                        <ul className="text-sm text-text-secondary font-body space-y-1">
                          {challenge.deliverables.map((deliverable, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-button-primary" />
                              <span>{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-display font-bold text-text-primary mb-2 uppercase text-sm">Success Criteria:</h5>
                        <ul className="text-sm text-text-secondary font-body space-y-1">
                          {challenge.successCriteria.map((criteria, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <Target className="h-4 w-4 text-highlight-accent-pink" />
                              <span>{criteria}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {challenge.requiredTools && challenge.requiredTools.length > 0 && (
                      <div className="mb-4">
                        <h5 className="font-display font-bold text-text-primary mb-2 uppercase text-sm">Required Tools:</h5>
                        <div className="flex flex-wrap gap-2">
                          {challenge.requiredTools.map((tool, i) => (
                            <span key={i} className="bg-highlight-accent-orange/20 text-highlight-accent-orange px-3 py-1 rounded-full text-xs font-body font-semibold border border-highlight-accent-orange">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobSeekerDashboard;