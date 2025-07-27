import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import JobSeekerDashboard from './components/JobSeekerDashboard';
import EmployerDashboard from './components/EmployerDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const AppContent: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, initialLoading } = useAuth();

  console.log('🔄 App: Rendering AppContent with user:', user ? `${user.name} (${user.type})` : 'null');
  console.log('🔄 App: initialLoading:', initialLoading);

  const handleAuthClick = () => {
    console.log('🔐 App: Auth button clicked');
    setIsAuthModalOpen(true);
  };

  const handleGetStarted = () => {
    console.log('🚀 App: Get started button clicked');
    if (user) {
      console.log('ℹ️ App: User already logged in, no need to show modal');
      return;
    }
    setIsAuthModalOpen(true);
  };

  const handleModalClose = () => {
    console.log('🚪 App: Modal close requested');
    setIsAuthModalOpen(false);
  };

  const renderDashboard = () => {
    if (!user) {
      console.log('⚠️ App: renderDashboard called but no user found');
      return null;
    }
    
    console.log('📊 App: Rendering dashboard for user type:', user.type);
    return user.type === 'employer' ? (
      <EmployerDashboard />
    ) : (
      <JobSeekerDashboard />
    );
  };

  // Show loading state during initial load
  if (initialLoading) {
    console.log('⏳ App: Showing initial loading state');
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-button-primary mx-auto mb-4"></div>
          <p className="text-xl font-display font-bold text-text-primary">LOADING LAUNCHPAD...</p>
        </div>
      </div>
    );
  }

  console.log('🎨 App: Rendering main application interface');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Bolt Badge */}
      <div className="bolt-badge-container">
        <a 
          href="https://bolt.new/?rid=os72mi" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bolt-badge-link"
        >
          <img 
            src="https://storage.bolt.army/white_circle_360x360.png" 
            alt="Built with Bolt.new badge" 
            className="bolt-badge bolt-badge-intro"
            onAnimationEnd={(e) => e.currentTarget.classList.add('animated')}
          />
        </a>
      </div>

      {/* Main Content Box */}
      <div className="bg-background rounded-xl soft-shadow mx-auto max-w-6xl my-12 overflow-hidden flex flex-col flex-grow">
        <Header onAuthClick={handleAuthClick} />
        
        <main className="flex-grow">
          {user ? (
            renderDashboard()
          ) : (
            <LandingPage onGetStarted={handleGetStarted} />
          )}
        </main>

        <Footer />
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={handleModalClose} 
      />
    </div>
  );
};

export default App;