import React, { useState } from 'react';
import { X, User, Building, Mail, Lock, UserPlus, LogIn, Target, Zap, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'employer' | 'jobseeker'>('jobseeker');
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    skills: '',
    jobInterests: ''
  });
  
  const { login, signup, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    console.log('🔐 AuthModal: Starting authentication process...');
    console.log('🔐 AuthModal: isLogin:', isLogin, 'userType:', userType);
    
    try {
      if (isLogin) {
        console.log('🔐 AuthModal: Calling login function...');
        await login(formData.email, formData.password, userType);
        console.log('✅ AuthModal: Login completed successfully');
      } else {
        console.log('📝 AuthModal: Calling signup function...');
        const userData = {
          name: formData.name,
          email: formData.email,
          type: userType,
          company: userType === 'employer' ? formData.company : undefined,
          skills: userType === 'jobseeker' ? formData.skills.split(',').map(s => s.trim()).filter(s => s) : undefined,
          jobInterests: userType === 'jobseeker' ? formData.jobInterests.split(',').map(s => s.trim()).filter(s => s) : undefined,
          assessedSkills: userType === 'jobseeker' ? formData.skills.split(',').map(s => s.trim()).filter(s => s) : undefined
        };
        await signup(userData, formData.password);
        console.log('✅ AuthModal: Signup completed successfully');
      }
      
      console.log('🚪 AuthModal: About to close modal...');
      onClose();
      console.log('✅ AuthModal: Modal closed successfully');
    } catch (error: any) {
      console.error('❌ AuthModal: Auth error:', error);
      setError(error.message || 'An error occurred during authentication');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-text-primary bg-opacity-75" onClick={onClose}></div>
        
        <div className="inline-block w-full max-w-md p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-background shadow-2xl rounded-3xl border-4 border-button-shadow card-shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-display font-bold text-text-primary">
              {isLogin ? 'SIGN IN' : 'SIGN UP'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors rounded-full hover:bg-card-background"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-4 border-red-200 rounded-xl">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm font-body text-red-700">{error}</p>
              </div>
            </div>
          )}

          <div className="mb-8">
            <p className="text-sm font-body font-medium text-text-primary mb-4 uppercase tracking-wide">Are you an Employer or Job Seeker?</p>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setUserType('jobseeker')}
                className={`flex-1 p-4 rounded-2xl border-4 transition-all font-body font-medium card-shadow ${
                  userType === 'jobseeker'
                    ? 'border-button-primary bg-button-primary/20 text-button-primary'
                    : 'border-text-secondary text-text-secondary hover:border-text-primary'
                }`}
              >
                <User className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-display uppercase">Job Seeker</span>
              </button>
              <button
                type="button"
                onClick={() => setUserType('employer')}
                className={`flex-1 p-4 rounded-2xl border-4 transition-all font-body font-medium card-shadow ${
                  userType === 'employer'
                    ? 'border-button-primary bg-button-primary/20 text-button-primary'
                    : 'border-text-secondary text-text-secondary hover:border-text-primary'
                }`}
              >
                <Building className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-display uppercase">Employer</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-body font-semibold text-text-primary mb-2 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border-4 border-text-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-button-primary focus:border-button-primary font-body transition-all card-shadow"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-body font-semibold text-text-primary mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 border-4 border-text-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-button-primary focus:border-button-primary font-body transition-all card-shadow"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-body font-semibold text-text-primary mb-2 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 border-4 border-text-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-button-primary focus:border-button-primary font-body transition-all card-shadow"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {!isLogin && userType === 'employer' && (
              <div>
                <label className="block text-sm font-body font-semibold text-text-primary mb-2 uppercase tracking-wide">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-3 border-4 border-text-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-button-primary focus:border-button-primary font-body transition-all card-shadow"
                  placeholder="Enter your company name"
                />
              </div>
            )}

            {!isLogin && userType === 'jobseeker' && (
              <>
                <div>
                  <label className="block text-sm font-body font-semibold text-text-primary mb-2 uppercase tracking-wide">
                    <Zap className="inline h-4 w-4 mr-1" />
                    Your Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    className="w-full px-4 py-3 border-4 border-text-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-button-primary focus:border-button-primary font-body transition-all card-shadow"
                    placeholder="e.g., React, JavaScript, CSS, HTML, Figma"
                  />
                  <p className="text-xs text-text-secondary mt-1 font-body">List your current skills to get personalized job recommendations</p>
                </div>

                <div>
                  <label className="block text-sm font-body font-semibold text-text-primary mb-2 uppercase tracking-wide">
                    <Target className="inline h-4 w-4 mr-1" />
                    Job Interests (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.jobInterests}
                    onChange={(e) => setFormData({...formData, jobInterests: e.target.value})}
                    className="w-full px-4 py-3 border-4 border-text-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-button-primary focus:border-button-primary font-body transition-all card-shadow"
                    placeholder="e.g., Web Development, Graphic Design, Digital Marketing"
                  />
                  <p className="text-xs text-text-secondary mt-1 font-body">Tell us what types of jobs you're interested in</p>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="retro-button w-full bg-button-primary hover:bg-highlight-accent-orange disabled:bg-text-secondary text-background py-3 px-6 rounded-xl font-display font-bold flex items-center justify-center"
            >
              {isLoading ? (
                'PLEASE WAIT...'
              ) : (
                <>
                  {isLogin ? <LogIn className="h-5 w-5 mr-2" /> : <UserPlus className="h-5 w-5 mr-2" />}
                  {isLogin ? 'SIGN IN' : 'SIGN UP'}
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-sm font-body font-medium text-button-primary hover:text-highlight-accent-orange transition-colors uppercase tracking-wide"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;