import React from 'react';
import { ArrowRight, Users, Target, Award, Shield, Clock, TrendingUp } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-500/20 to-orange-400/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left">
              <h1 className="text-4xl md:text-6xl font-display font-black text-text-primary mb-6 leading-tight">
                The First Ever
                <span className="block text-3xl md:text-5xl mt-2 text-button-primary">
                  Skills-Based
                </span>
                <span className="block text-2xl md:text-4xl mt-2 text-text-secondary">
                  Recruitment Platform
                </span>
                <span className="block text-xl md:text-3xl text-text-secondary mt-4">For Freshers</span>
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl leading-relaxed font-body font-medium">
                Skip the traditional CV screening. Showcase your skills through real-world challenges and get hired by top companies. 
               
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button
                  onClick={onGetStarted}
                  className="retro-button bg-button-primary hover:bg-highlight-accent-orange text-background px-8 py-4 rounded-lg text-lg font-bold font-display flex items-center justify-center"
                >
                  JOIN NOW
                  <ArrowRight className="ml-3 h-6 w-6" />
                </button>
                <button className="retro-button border-4 border-button-primary text-button-primary hover:bg-button-primary hover:text-background px-8 py-4 rounded-lg text-lg font-bold font-display">
                  WATCH DEMO
                </button>
              </div>
            </div>

            {/* Right Column - Hero Image Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="retro-card max-w-md w-full">
                <img 
                  src="/hero image.jpg" 
                  alt="LaunchPad Hero" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-20 h-20 bg-highlight-accent-pink/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-10 w-16 h-16 bg-highlight-accent-gold/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-highlight-accent-orange/30 rounded-full animate-pulse delay-500"></div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-black text-text-primary mb-6">
              How We Connect The Best Talent To The Job
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto font-body font-medium leading-relaxed">
              Our revolutionary 3-step process ensures you get hired based on your skills, not your connections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="retro-card text-center">
              <div className="bg-button-primary w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 card-shadow">
                <Users className="h-10 w-10 text-background" />
              </div>
              <h3 className="text-xl font-display font-bold text-text-primary mb-4">1. SIGN UP</h3>
              <p className="text-text-secondary leading-relaxed font-body">
                Create your profile and tell us about your skills and interests. No need for lengthy CVs or GPA requirements.
              </p>
            </div>

            <div className="retro-card text-center">
              <div className="bg-highlight-accent-pink w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 card-shadow">
                <Target className="h-10 w-10 text-background" />
              </div>
              <h3 className="text-xl font-display font-bold text-text-primary mb-4">2. COMPLETE CHALLENGE</h3>
              <p className="text-text-secondary leading-relaxed font-body">
                Take on real-world challenges designed by employers. Show your problem-solving skills and creativity.
              </p>
            </div>

            <div className="retro-card text-center">
              <div className="bg-highlight-accent-gold w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 card-shadow">
                <Award className="h-10 w-10 text-text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold text-text-primary mb-4">3. GET HIRED</h3>
              <p className="text-text-secondary leading-relaxed font-body">
                Top performers get direct offers from companies. Build your reputation with every successful challenge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-20 bg-highlight-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-black text-text-primary mb-6">
              Why Choose LaunchPad?
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto font-body font-medium leading-relaxed">
              We're revolutionizing how fresh talent meets opportunity in Bangladesh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="retro-card">
              <div className="bg-button-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 card-shadow">
                <Target className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-lg font-display font-bold text-text-primary mb-4">SKILLS-FIRST HIRING</h3>
              <p className="text-text-secondary font-body leading-relaxed">
                Get evaluated based on your actual abilities and potential, not just academic credentials or experience.
              </p>
            </div>

            <div className="retro-card">
              <div className="bg-highlight-accent-pink w-16 h-16 rounded-2xl flex items-center justify-center mb-6 card-shadow">
                <Shield className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-lg font-display font-bold text-text-primary mb-4">VERIFIED JOB POSTS</h3>
              <p className="text-text-secondary font-body leading-relaxed">
                All job postings are verified by our team. No fake jobs or scams - only genuine opportunities from real companies.
              </p>
            </div>

            <div className="retro-card">
              <div className="bg-highlight-accent-gold w-16 h-16 rounded-2xl flex items-center justify-center mb-6 card-shadow">
                <Clock className="h-8 w-8 text-text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold text-text-primary mb-4">QUICK HIRING PROCESS</h3>
              <p className="text-text-secondary font-body leading-relaxed">
                Skip lengthy interview rounds. Complete challenges and get hired within days, not months.
              </p>
            </div>

            <div className="retro-card">
              <div className="bg-highlight-accent-orange w-16 h-16 rounded-2xl flex items-center justify-center mb-6 card-shadow">
                <Award className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-lg font-display font-bold text-text-primary mb-4">SKILL CERTIFICATES</h3>
              <p className="text-text-secondary font-body leading-relaxed">
                Earn verified certificates and badges for every challenge you complete successfully.
              </p>
            </div>

            <div className="retro-card">
              <div className="bg-button-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 card-shadow">
                <Users className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-lg font-display font-bold text-text-primary mb-4">ENTRY-LEVEL FOCUS</h3>
              <p className="text-text-secondary font-body leading-relaxed">
                Exclusively for internships and entry-level positions. Perfect platform to start your career journey.
              </p>
            </div>

            <div className="retro-card">
              <div className="bg-highlight-accent-pink w-16 h-16 rounded-2xl flex items-center justify-center mb-6 card-shadow">
                <TrendingUp className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-lg font-display font-bold text-text-primary mb-4">CAREER GROWTH</h3>
              <p className="text-text-secondary font-body leading-relaxed">
                Build your professional portfolio and track your progress as you complete more challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-highlight-accent-pink/30 via-button-primary/30 to-highlight-accent-orange/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-black text-text-primary mb-6">
            Ready to Launch Your Career?
          </h2>
          <p className="text-lg md:text-xl text-text-secondary mb-10 font-body font-medium leading-relaxed">
            Join thousands of fresh graduates who are already showcasing their skills and landing their dream jobs.
          </p>
          <button
            onClick={onGetStarted}
            className="retro-button bg-button-primary hover:bg-highlight-accent-orange text-background px-10 py-4 rounded-lg text-xl font-bold font-display inline-flex items-center"
          >
            START YOUR JOURNEY TODAY
            <ArrowRight className="ml-3 h-6 w-6" />
          </button>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-highlight-accent-gold/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-highlight-accent-pink/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-button-primary/20 rounded-full animate-pulse delay-500"></div>
      </section>
    </div>
  );
};

export default LandingPage;