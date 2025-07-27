import React, { useState } from 'react';
import { Plus, Users, Star, Eye, CheckCircle, XCircle, Calendar, ExternalLink } from 'lucide-react';
import { mockJobs, mockApplications } from '../data/mockData';
import { Job, Application } from '../types';

const EmployerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'applications' | 'post-job'>('overview');
  const [newJob, setNewJob] = useState({
    title: '',
    company: 'TechStart Solutions',
    location: '',
    remote: false,
    skills: '',
    description: '',
    challenge: {
      title: '',
      description: '',
      submissionType: 'link' as 'text' | 'link' | 'file'
    },
    deadline: ''
  });

  const myJobs = mockJobs.filter(job => job.employerId === 'emp1');
  const jobApplications = mockApplications.filter(app => 
    myJobs.some(job => job.id === app.jobId)
  );

  const handlePostJob = () => {
    console.log('Posting new job:', newJob);
    // Reset form
    setNewJob({
      title: '',
      company: 'TechStart Solutions',
      location: '',
      remote: false,
      skills: '',
      description: '',
      challenge: {
        title: '',
        description: '',
        submissionType: 'link'
      },
      deadline: ''
    });
    setActiveTab('jobs');
  };

  const handleRateApplication = (applicationId: string, rating: number, feedback: string) => {
    console.log('Rating application:', applicationId, rating, feedback);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'text-highlight-accent-gold bg-highlight-accent-gold/20 border-highlight-accent-gold';
      case 'reviewed':
        return 'text-highlight-accent-pink bg-highlight-accent-pink/20 border-highlight-accent-pink';
      case 'accepted':
        return 'text-button-primary bg-button-primary/20 border-button-primary';
      case 'rejected':
        return 'text-highlight-accent-red bg-highlight-accent-red/20 border-highlight-accent-red';
      default:
        return 'text-text-secondary bg-text-secondary/20 border-text-secondary';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-black text-text-primary mb-2">EMPLOYER DASHBOARD</h1>
        <p className="text-lg font-body text-text-secondary">Manage your job postings and find the best talent</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-8 bg-card-background p-2 rounded-2xl w-fit card-shadow-lg border-4 border-button-shadow">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-3 rounded-xl font-display font-semibold transition-all uppercase tracking-wide ${
            activeTab === 'overview'
              ? 'bg-button-primary text-background card-shadow transform scale-105'
              : 'text-text-primary hover:text-button-primary'
          }`}
        >
          OVERVIEW
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-6 py-3 rounded-xl font-display font-semibold transition-all uppercase tracking-wide ${
            activeTab === 'jobs'
              ? 'bg-button-primary text-background card-shadow transform scale-105'
              : 'text-text-primary hover:text-button-primary'
          }`}
        >
          MY JOBS ({myJobs.length})
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-6 py-3 rounded-xl font-display font-semibold transition-all uppercase tracking-wide ${
            activeTab === 'applications'
              ? 'bg-button-primary text-background card-shadow transform scale-105'
              : 'text-text-primary hover:text-button-primary'
          }`}
        >
          APPLICATIONS ({jobApplications.length})
        </button>
        <button
          onClick={() => setActiveTab('post-job')}
          className={`px-6 py-3 rounded-xl font-display font-semibold transition-all uppercase tracking-wide ${
            activeTab === 'post-job'
              ? 'bg-button-primary text-background card-shadow transform scale-105'
              : 'text-text-primary hover:text-button-primary'
          }`}
        >
          POST NEW JOB
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="retro-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-highlight-accent-pink text-sm font-display font-semibold uppercase tracking-wide">Active Jobs</p>
                  <p className="text-3xl font-display font-black text-text-primary">{myJobs.length}</p>
                </div>
                <div className="bg-highlight-accent-pink p-4 rounded-2xl card-shadow">
                  <Users className="h-8 w-8 text-background" />
                </div>
              </div>
            </div>

            <div className="retro-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-button-primary text-sm font-display font-semibold uppercase tracking-wide">Total Applications</p>
                  <p className="text-3xl font-display font-black text-text-primary">{jobApplications.length}</p>
                </div>
                <div className="bg-button-primary p-4 rounded-2xl card-shadow">
                  <Eye className="h-8 w-8 text-background" />
                </div>
              </div>
            </div>

            <div className="retro-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-highlight-accent-gold text-sm font-display font-semibold uppercase tracking-wide">Reviewed</p>
                  <p className="text-3xl font-display font-black text-text-primary">
                    {jobApplications.filter(app => app.status === 'reviewed' || app.status === 'accepted').length}
                  </p>
                </div>
                <div className="bg-highlight-accent-gold p-4 rounded-2xl card-shadow">
                  <CheckCircle className="h-8 w-8 text-text-primary" />
                </div>
              </div>
            </div>

            <div className="retro-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-highlight-accent-orange text-sm font-display font-semibold uppercase tracking-wide">Pending Review</p>
                  <p className="text-3xl font-display font-black text-text-primary">
                    {jobApplications.filter(app => app.status === 'submitted').length}
                  </p>
                </div>
                <div className="bg-highlight-accent-orange p-4 rounded-2xl card-shadow">
                  <Calendar className="h-8 w-8 text-background" />
                </div>
              </div>
            </div>
          </div>

          <div className="retro-card">
            <h3 className="text-xl font-display font-bold text-text-primary mb-6 uppercase">Recent Applications</h3>
            <div className="space-y-4">
              {jobApplications.slice(0, 3).map(application => {
                const job = mockJobs.find(j => j.id === application.jobId);
                return (
                  <div key={application.id} className="flex items-center justify-between p-6 bg-background rounded-2xl border-4 border-text-secondary card-shadow">
                    <div>
                      <p className="font-body font-bold text-text-primary">{application.applicantName}</p>
                      <p className="text-sm font-body text-text-secondary">{job?.title}</p>
                      <p className="text-xs font-body text-text-secondary">{new Date(application.submittedAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-xs font-display font-semibold border-2 uppercase tracking-wide ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Jobs Tab */}
      {activeTab === 'jobs' && (
        <div className="space-y-8">
          {myJobs.map(job => (
            <div key={job.id} className="retro-card">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-display font-bold text-text-primary mb-2 uppercase">{job.title}</h3>
                  <p className="text-lg font-body font-semibold text-text-secondary">{job.company}</p>
                  <div className="flex items-center space-x-6 mt-3 text-sm text-text-secondary">
                    <span className="font-body">{job.location}</span>
                    {job.remote && <span className="bg-highlight-accent-pink/20 text-highlight-accent-pink px-3 py-1 rounded-full text-xs font-display font-semibold border-2 border-highlight-accent-pink uppercase tracking-wide">Remote</span>}
                    <span className="font-body">Deadline: {job.deadline}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-display font-black text-button-primary">
                    {jobApplications.filter(app => app.jobId === job.id).length}
                  </p>
                  <p className="text-sm font-body text-text-secondary uppercase tracking-wide">Applications</p>
                </div>
              </div>

              <p className="text-text-secondary mb-6 font-body leading-relaxed">{job.description}</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-display font-bold text-text-primary mb-3 uppercase">Required Skills:</h4>
                  <div className="flex flex-wrap gap-3">
                    {job.skills.map(skill => (
                      <span key={skill} className="bg-highlight-accent-gold/30 text-text-primary px-4 py-2 rounded-full text-sm font-body font-semibold border-2 border-highlight-accent-gold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-display font-bold text-text-primary mb-3 uppercase">Challenge:</h4>
                  <p className="text-text-secondary font-body">{job.challenge.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <div className="space-y-8">
          {jobApplications.map(application => {
            const job = mockJobs.find(j => j.id === application.jobId);
            return (
              <div key={application.id} className="retro-card">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-display font-bold text-text-primary mb-1 uppercase">{application.applicantName}</h3>
                    <p className="text-lg font-body font-semibold text-text-secondary">{application.applicantEmail}</p>
                    <p className="text-sm font-body text-text-secondary mt-1">Applied for: {job?.title}</p>
                    <p className="text-xs font-body text-text-secondary">Submitted on {new Date(application.submittedAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-display font-semibold border-2 uppercase tracking-wide ${getStatusColor(application.status)}`}>
                    {application.status}
                  </span>
                </div>

                <div className="mb-6">
                  <h4 className="font-display font-bold text-text-primary mb-3 uppercase">Submission:</h4>
                  <div className="bg-background p-6 rounded-2xl border-4 border-text-secondary card-shadow">
                    {application.submission.type === 'link' ? (
                      <a 
                        href={application.submission.content} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-button-primary hover:text-highlight-accent-orange flex items-center font-body font-medium"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {application.submission.content}
                      </a>
                    ) : (
                      <p className="text-text-primary font-body">{application.submission.content}</p>
                    )}
                  </div>
                </div>

                {application.rating && (
                  <div className="mb-6">
                    <h4 className="font-display font-bold text-text-primary mb-3 uppercase">Your Rating:</h4>
                    <div className="flex items-center space-x-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-6 w-6 ${i < application.rating! ? 'text-highlight-accent-gold fill-current' : 'text-text-secondary'}`} />
                        ))}
                      </div>
                      <span className="text-sm font-body font-semibold text-text-secondary">({application.rating}/5)</span>
                    </div>
                    {application.feedback && (
                      <p className="text-text-secondary mt-3 font-body leading-relaxed">{application.feedback}</p>
                    )}
                  </div>
                )}

                {application.status === 'submitted' && (
                  <div className="flex space-x-4">
                    <button className="retro-button bg-button-primary hover:bg-highlight-accent-orange text-background px-6 py-3 rounded-xl font-display font-bold">
                      ACCEPT & HIRE
                    </button>
                    <button className="retro-button bg-highlight-accent-gold hover:bg-highlight-accent-orange text-text-primary px-6 py-3 rounded-xl font-display font-bold">
                      LEAVE RATING
                    </button>
                    <button className="retro-button bg-highlight-accent-red hover:bg-highlight-accent-pink text-background px-6 py-3 rounded-xl font-display font-bold">
                      REJECT
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Post Job Tab */}
      {activeTab === 'post-job' && (
        <div className="retro-card">
          <h3 className="text-2xl font-display font-black text-text-primary mb-8 uppercase">Post a New Job</h3>
          
          <form onSubmit={(e) => { e.preventDefault(); handlePostJob(); }} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-display font-bold text-text-primary mb-3 uppercase tracking-wide">Job Title</label>
                <input
                  type="text"
                  required
                  value={newJob.title}
                  onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                  className="w-full px-4 py-4 border-4 border-text-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-button-primary focus:border-button-primary font-body card-shadow"
                  placeholder="e.g., Frontend Developer Intern"
                />
              </div>

              <div>
                <label className="block text-sm font-display font-bold text-text-primary mb-3 uppercase tracking-wide">Location</label>
                <input
                  type="text"
                  required
                  value={newJob.location}
                  onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                  className="w-full px-4 py-4 border-4 border-text-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-button-primary focus:border-button-primary font-body card-shadow"
                  placeholder="e.g., Dhaka, Bangladesh"
                />
              </div>

              <div>
                <label className="block text-sm font-display font-bold text-text-primary mb-3 uppercase tracking-wide">Required Skills (comma separated)</label>
                <input
                  type="text"
                  required
                  value={newJob.skills}
                  onChange={(e) => setNewJob({...newJob, skills: e.target.value})}
                  className="w-full px-4 py-4 border-4 border-text-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-button-primary focus:border-button-primary font-body card-shadow"
                  placeholder="e.g., React, JavaScript, CSS, HTML"
                />
              </div>

              <div>
                <label className="block text-sm font-display font-bold text-text-primary mb-3 uppercase tracking-wide">Application Deadline</label>
                <input
                  type="date"
                  required
                  value={newJob.deadline}
                  onChange={(e) => setNewJob({...newJob, deadline: e.target.value})}
                  className="w-full px-4 py-4 border-4 border-text-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-button-primary focus:border-button-primary font-body card-shadow"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remote"
                checked={newJob.remote}
                onChange={(e) => setNewJob({...newJob, remote: e.target.checked})}
                className="h-5 w-5 text-button-primary focus:ring-button-primary border-text-secondary rounded"
              />
              <label htmlFor="remote" className="ml-3 block text-sm font-body font-semibold text-text-primary uppercase tracking-wide">
                This is a remote position
              </label>
            </div>

            <div>
              <label className="block text-sm font-display font-bold text-text-primary mb-3 uppercase tracking-wide">Job Description</label>
              <textarea
                rows={4}
                required
                value={newJob.description}
                onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                className="w-full px-4 py-4 border-4 border-text-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-button-primary focus:border-button-primary font-body card-shadow"
                placeholder="Describe the role, responsibilities, and what you're looking for..."
              />
            </div>

            <div className="border-t-4 border-text-secondary pt-8">
              <h4 className="text-xl font-display font-bold text-text-primary mb-6 uppercase">Skills Challenge</h4>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-display font-bold text-text-primary mb-3 uppercase tracking-wide">Challenge Title</label>
                  <input
                    type="text"
                    required
                    value={newJob.challenge.title}
                    onChange={(e) => setNewJob({
                      ...newJob, 
                      challenge: {...newJob.challenge, title: e.target.value}
                    })}
                    className="w-full px-4 py-4 border-4 border-text-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-button-primary focus:border-button-primary font-body card-shadow"
                    placeholder="e.g., Build a Todo App"
                  />
                </div>

                <div>
                  <label className="block text-sm font-display font-bold text-text-primary mb-3 uppercase tracking-wide">Challenge Description</label>
                  <textarea
                    rows={4}
                    required
                    value={newJob.challenge.description}
                    onChange={(e) => setNewJob({
                      ...newJob, 
                      challenge: {...newJob.challenge, description: e.target.value}
                    })}
                    className="w-full px-4 py-4 border-4 border-text-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-button-primary focus:border-button-primary font-body card-shadow"
                    placeholder="Describe what the candidate needs to create or accomplish..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-display font-bold text-text-primary mb-3 uppercase tracking-wide">Submission Type</label>
                  <select
                    value={newJob.challenge.submissionType}
                    onChange={(e) => setNewJob({
                      ...newJob, 
                      challenge: {...newJob.challenge, submissionType: e.target.value as 'text' | 'link' | 'file'}
                    })}
                    className="w-full px-4 py-4 border-4 border-text-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-button-primary focus:border-button-primary font-body card-shadow"
                  >
                    <option value="link">Link (GitHub, CodePen, etc.)</option>
                    <option value="text">Text Response</option>
                    <option value="file">File Upload</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex space-x-6">
              <button
                type="submit"
                className="retro-button bg-button-primary hover:bg-highlight-accent-orange text-background px-8 py-4 rounded-xl font-display font-bold flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                POST JOB
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className="retro-button bg-card-background hover:bg-highlight-accent-pink text-text-primary px-8 py-4 rounded-xl font-display font-bold"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;