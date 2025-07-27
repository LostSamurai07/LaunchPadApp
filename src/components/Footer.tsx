import React from 'react';
import { Briefcase, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-text-primary text-background border-t-4 border-button-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <Briefcase className="h-10 w-10 text-highlight-accent-pink" />
              <div className="ml-4">
                <h2 className="text-2xl font-display font-black text-background">LaunchPad</h2>
                <p className="text-sm text-card-background font-body">Skills-Based Recruitment Platform For Freshers</p>
              </div>
            </div>
            <p className="text-card-background max-w-md font-body leading-relaxed">
              Connecting talented fresh graduates and students with amazing internship and entry-level opportunities through skills-based challenges.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-display font-bold mb-6 text-background">FOR JOB SEEKERS</h3>
            <ul className="space-y-3 text-card-background">
              <li><a href="#" className="hover:text-highlight-accent-pink transition-colors font-body uppercase tracking-wide text-sm">Browse Jobs</a></li>
              <li><a href="#" className="hover:text-highlight-accent-pink transition-colors font-body uppercase tracking-wide text-sm">Take Challenges</a></li>
              <li><a href="#" className="hover:text-highlight-accent-pink transition-colors font-body uppercase tracking-wide text-sm">Build Portfolio</a></li>
              <li><a href="#" className="hover:text-highlight-accent-pink transition-colors font-body uppercase tracking-wide text-sm">Career Tips</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display font-bold mb-6 text-background">FOR EMPLOYERS</h3>
            <ul className="space-y-3 text-card-background">
              <li><a href="#" className="hover:text-highlight-accent-pink transition-colors font-body uppercase tracking-wide text-sm">Post Jobs</a></li>
              <li><a href="#" className="hover:text-highlight-accent-pink transition-colors font-body uppercase tracking-wide text-sm">Create Challenges</a></li>
              <li><a href="#" className="hover:text-highlight-accent-pink transition-colors font-body uppercase tracking-wide text-sm">Find Talent</a></li>
              <li><a href="#" className="hover:text-highlight-accent-pink transition-colors font-body uppercase tracking-wide text-sm">Pricing</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-button-shadow mt-10 pt-8">
          {/* Hackathon Badges Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
              {/* Supabase Badge */}
              <a 
                href="https://supabase.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-highlight-accent-pink/20 hover:bg-highlight-accent-pink/30 px-4 py-2 rounded-xl border-2 border-highlight-accent-pink transition-all hover:scale-105 card-shadow"
              >
                <div className="w-6 h-6 bg-highlight-accent-pink rounded flex items-center justify-center">
                  <span className="text-background font-display font-bold text-xs">S</span>
                </div>
                <span className="text-background font-body font-semibold text-sm">Powered by Supabase</span>
                <ExternalLink className="h-4 w-4 text-background" />
              </a>

              {/* Build with Bolt Badge */}
              <a 
                href="https://bolt.new" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-highlight-accent-gold/20 hover:bg-highlight-accent-gold/30 px-4 py-2 rounded-xl border-2 border-highlight-accent-gold transition-all hover:scale-105 card-shadow"
              >
                <div className="w-6 h-6 bg-highlight-accent-gold rounded flex items-center justify-center">
                  <span className="text-text-primary font-display font-bold text-xs">⚡</span>
                </div>
                <span className="text-background font-body font-semibold text-sm">Built with Bolt</span>
                <ExternalLink className="h-4 w-4 text-background" />
              </a>
            </div>

            {/* Hackathon Participation */}
            <div className="mt-4 md:mt-0">
              <div className="bg-button-primary/20 hover:bg-button-primary/30 px-4 py-2 rounded-xl border-2 border-button-primary transition-all">
                <span className="text-background font-display font-bold text-sm uppercase tracking-wide">
                  🏆 Hackathon 2025 Participant
                </span>
              </div>
            </div>
          </div>

          {/* Contact Info and Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-8 text-card-background text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="font-body">Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="font-body">hello@launchpad.bd</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="font-body">+880 1234 567890</span>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0">
              <p className="text-card-background text-sm font-body font-semibold">LaunchPad © 2025 | Made in Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;