import React from 'react';
import { User, LogOut, Briefcase, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Briefcase className="h-8 w-8 text-highlight-accent-pink" />
              <div className="ml-3">
                <h1 className="text-xl font-display font-black text-text-primary">LaunchPad</h1>
                <p className="text-xs text-text-secondary -mt-1 font-body">Launch Your Career Here!</p>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#how-it-works" className="text-text-primary hover:text-highlight-accent-pink px-3 py-2 text-sm font-medium font-body transition-colors uppercase tracking-wide">
              How We Work
            </a>
            <a href="#why-choose-us" className="text-text-primary hover:text-highlight-accent-pink px-3 py-2 text-sm font-medium font-body transition-colors uppercase tracking-wide">
              Why Choose Launchpad?
            </a>
           
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-highlight-accent-pink rounded-full flex items-center justify-center card-shadow">
                    {user.type === 'employer' ? (
                      <Briefcase className="h-4 w-4 text-background" />
                    ) : (
                      <Users className="h-4 w-4 text-background" />
                    )}
                  </div>
                  <span className="text-sm font-medium font-body text-text-primary">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-body uppercase tracking-wide">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="retro-button bg-button-primary hover:bg-highlight-accent-orange text-background px-6 py-2 rounded-lg text-sm font-bold font-display"
              >
                Log In Or Sign Up Here!
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;