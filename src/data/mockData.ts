import { Job, Application, User, Badge, UpskillingRoadmap } from '../types';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'TechStart Solutions',
    location: 'Dhaka, Bangladesh',
    remote: true,
    skills: ['React', 'JavaScript', 'CSS', 'HTML'],
    description: 'We are looking for a passionate frontend developer intern to join our team. You will work on real projects and learn from experienced developers.',
    challenge: {
      title: 'Build a Todo App',
      description: 'Create a responsive todo application using React. The app should allow users to add, edit, delete, and mark tasks as complete. Include proper state management and clean UI design.',
      submissionType: 'link',
      pointValue: 150,
      badgeAwarded: 'React Master'
    },
    deadline: '2025-02-15',
    employerId: 'emp1',
    createdAt: '2025-01-10',
    category: 'Web Development'
  },
  {
    id: '2',
    title: 'Digital Marketing Assistant',
    company: 'GrowthHub Agency',
    location: 'Chittagong, Bangladesh',
    remote: false,
    skills: ['Social Media', 'Content Writing', 'Analytics', 'SEO'],
    description: 'Join our dynamic marketing team as a Digital Marketing Assistant. Perfect for fresh graduates looking to start their career in digital marketing.',
    challenge: {
      title: 'Create a Social Media Campaign',
      description: 'Design a complete social media campaign for a fictional product launch. Include content calendar, post designs, and engagement strategy. Present your ideas in a professional format.',
      submissionType: 'text',
      pointValue: 120,
      badgeAwarded: 'Marketing Strategist'
    },
    deadline: '2025-02-20',
    employerId: 'emp2',
    createdAt: '2025-01-12',
    category: 'Digital Marketing'
  },
  {
    id: '3',
    title: 'UI/UX Design Intern',
    company: 'DesignCraft Studio',
    location: 'Sylhet, Bangladesh',
    remote: true,
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    description: 'We are seeking a creative UI/UX design intern to work on exciting client projects. You will collaborate with senior designers and developers.',
    challenge: {
      title: 'Redesign a Mobile App',
      description: 'Choose any existing mobile app and create a redesigned version focusing on improved user experience. Include user research insights, wireframes, and high-fidelity mockups.',
      submissionType: 'link',
      pointValue: 180,
      badgeAwarded: 'Design Innovator'
    },
    deadline: '2025-02-25',
    employerId: 'emp3',
    createdAt: '2025-01-14',
    category: 'Graphic Design'
  },
  {
    id: '4',
    title: 'Backend Developer Intern',
    company: 'DataFlow Systems',
    location: 'Dhaka, Bangladesh',
    remote: true,
    skills: ['Node.js', 'Express', 'MongoDB', 'API Development'],
    description: 'Join our backend team to build scalable APIs and work with cutting-edge technologies.',
    challenge: {
      title: 'Build a REST API',
      description: 'Create a complete REST API for a blog system with user authentication, CRUD operations, and proper error handling.',
      submissionType: 'link',
      pointValue: 200,
      badgeAwarded: 'API Architect'
    },
    deadline: '2025-03-01',
    employerId: 'emp4',
    createdAt: '2025-01-16',
    category: 'Web Development'
  },
  {
    id: '5',
    title: 'Content Writer Intern',
    company: 'ContentCraft Media',
    location: 'Remote',
    remote: true,
    skills: ['Content Writing', 'SEO', 'Research', 'Copywriting'],
    description: 'Create engaging content for various digital platforms and help brands tell their stories.',
    challenge: {
      title: 'Write a Tech Blog Series',
      description: 'Write a 3-part blog series about emerging technologies. Each article should be 800-1000 words with proper SEO optimization.',
      submissionType: 'text',
      pointValue: 100,
      badgeAwarded: 'Content Creator'
    },
    deadline: '2025-02-28',
    employerId: 'emp5',
    createdAt: '2025-01-18',
    category: 'Content Writing'
  },
  {
    id: '6',
    title: 'Data Entry Specialist',
    company: 'DataPro Solutions',
    location: 'Dhaka, Bangladesh',
    remote: true,
    skills: ['Excel', 'Data Analysis', 'Attention to Detail', 'Time Management'],
    description: 'Process and organize large datasets with accuracy and efficiency.',
    challenge: {
      title: 'Data Processing Challenge',
      description: 'Clean and organize a sample dataset, create pivot tables, and generate insights.',
      submissionType: 'file',
      pointValue: 80,
      badgeAwarded: 'Data Wizard'
    },
    deadline: '2025-02-18',
    employerId: 'emp6',
    createdAt: '2025-01-20',
    category: 'Data Entry'
  }
];

export const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    applicantId: 'user1',
    applicantName: 'Sarah Ahmed',
    applicantEmail: 'sarah@example.com',
    submission: {
      type: 'link',
      content: 'https://github.com/sarah/todo-app-demo'
    },
    submittedAt: '2025-01-15T10:30:00Z',
    status: 'submitted',
    pointsEarned: 150,
    badgeEarned: 'React Master'
  },
  {
    id: '2',
    jobId: '2',
    applicantId: 'user2',
    applicantName: 'Rahman Khan',
    applicantEmail: 'rahman@example.com',
    submission: {
      type: 'text',
      content: 'I have created a comprehensive social media campaign for "EcoLife Water Bottles"...'
    },
    submittedAt: '2025-01-16T14:20:00Z',
    status: 'reviewed',
    rating: 4,
    feedback: 'Great creative approach and well-structured campaign!',
    pointsEarned: 120,
    badgeEarned: 'Marketing Strategist'
  }
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Sarah Ahmed',
    email: 'sarah@example.com',
    type: 'jobseeker',
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Node.js'],
    points: 270,
    badges: ['React Master', 'First Challenge'],
    completedChallenges: ['1'],
    jobInterests: ['Web Development', 'Frontend Development'],
    assessedSkills: ['React', 'JavaScript', 'CSS', 'HTML']
  },
  {
    id: 'emp1',
    name: 'John Smith',
    email: 'john@techstart.com',
    type: 'employer',
    company: 'TechStart Solutions'
  }
];

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'First Challenge',
    description: 'Complete your first challenge',
    icon: 'Trophy',
    rarity: 'common'
  },
  {
    id: '2',
    name: 'React Master',
    description: 'Complete a React-based challenge',
    icon: 'Code',
    rarity: 'rare'
  },
  {
    id: '3',
    name: 'Marketing Strategist',
    description: 'Excel in marketing challenges',
    icon: 'TrendingUp',
    rarity: 'rare'
  },
  {
    id: '4',
    name: 'Design Innovator',
    description: 'Create outstanding design solutions',
    icon: 'Palette',
    rarity: 'epic'
  },
  {
    id: '5',
    name: 'API Architect',
    description: 'Build robust backend systems',
    icon: 'Server',
    rarity: 'epic'
  },
  {
    id: '6',
    name: 'Content Creator',
    description: 'Craft compelling written content',
    icon: 'PenTool',
    rarity: 'common'
  },
  {
    id: '7',
    name: 'Challenge Champion',
    description: 'Complete 5 challenges',
    icon: 'Award',
    rarity: 'legendary'
  },
  {
    id: '8',
    name: 'Point Collector',
    description: 'Earn 500 points',
    icon: 'Star',
    rarity: 'rare'
  },
  {
    id: '9',
    name: 'HTML Hero',
    description: 'Master HTML fundamentals',
    icon: 'Code',
    rarity: 'common'
  },
  {
    id: '10',
    name: 'CSS Champion',
    description: 'Excel in CSS styling',
    icon: 'Palette',
    rarity: 'common'
  },
  {
    id: '11',
    name: 'JavaScript Ninja',
    description: 'Master JavaScript programming',
    icon: 'Zap',
    rarity: 'rare'
  },
  {
    id: '12',
    name: 'Design Thinking Pro',
    description: 'Complete design thinking challenges',
    icon: 'Lightbulb',
    rarity: 'rare'
  },
  {
    id: '13',
    name: 'Prototype Master',
    description: 'Create interactive prototypes',
    icon: 'Smartphone',
    rarity: 'epic'
  },
  {
    id: '14',
    name: 'Data Wizard',
    description: 'Excel in data processing tasks',
    icon: 'Database',
    rarity: 'rare'
  }
];

// Mock upskilling roadmaps
export const mockUpskillingRoadmaps: UpskillingRoadmap[] = [
  {
    id: 'roadmap-web-dev',
    jobTitle: 'Frontend Developer',
    jobCategory: 'Web Development',
    totalChallenges: 6,
    estimatedDuration: '4-6 weeks',
    challenges: [
      {
        id: 'web-dev-1',
        level: 'Beginner',
        title: 'Build a Personal Portfolio Website',
        description: 'Create a responsive personal portfolio website using HTML, CSS, and basic JavaScript.',
        deliverables: ['HTML structure', 'CSS styling', 'Responsive design', 'Contact form'],
        estimatedTime: '1 week',
        badgeName: 'HTML Hero',
        pointValue: 100,
        requiredTools: ['VS Code', 'Browser'],
        successCriteria: ['Mobile responsive', 'Clean code structure', 'Working contact form']
      },
      {
        id: 'web-dev-2',
        level: 'Beginner',
        title: 'Interactive Landing Page',
        description: 'Build an interactive landing page with animations and user interactions using CSS and JavaScript.',
        deliverables: ['Animated elements', 'Interactive buttons', 'Smooth scrolling', 'Form validation'],
        estimatedTime: '1 week',
        badgeName: 'CSS Champion',
        pointValue: 120,
        requiredTools: ['VS Code', 'Browser'],
        successCriteria: ['Smooth animations', 'Interactive elements', 'Cross-browser compatibility']
      },
      {
        id: 'web-dev-3',
        level: 'Intermediate',
        title: 'Todo App with Local Storage',
        description: 'Create a fully functional todo application with local storage persistence.',
        deliverables: ['CRUD operations', 'Local storage', 'Filter functionality', 'Clean UI'],
        estimatedTime: '1.5 weeks',
        badgeName: 'JavaScript Ninja',
        pointValue: 150,
        requiredTools: ['VS Code', 'Browser', 'Local Storage API'],
        successCriteria: ['Data persistence', 'All CRUD operations', 'User-friendly interface']
      },
      {
        id: 'web-dev-4',
        level: 'Intermediate',
        title: 'Weather App with API Integration',
        description: 'Build a weather application that fetches data from a weather API and displays it beautifully.',
        deliverables: ['API integration', 'Error handling', 'Location search', 'Weather forecast'],
        estimatedTime: '1.5 weeks',
        badgeName: 'API Explorer',
        pointValue: 180,
        requiredTools: ['VS Code', 'Weather API', 'Fetch API'],
        successCriteria: ['Working API calls', 'Error handling', 'Clean data presentation']
      },
      {
        id: 'web-dev-5',
        level: 'Expert',
        title: 'E-commerce Product Showcase',
        description: 'Create a complete e-commerce product showcase with shopping cart functionality.',
        deliverables: ['Product catalog', 'Shopping cart', 'Checkout process', 'User authentication'],
        estimatedTime: '2 weeks',
        badgeName: 'React Master',
        pointValue: 250,
        requiredTools: ['React', 'State Management', 'Local Storage'],
        successCriteria: ['Full shopping flow', 'State management', 'Responsive design']
      },
      {
        id: 'web-dev-6',
        level: 'Expert',
        title: 'Full-Stack Blog Platform',
        description: 'Build a complete blog platform with user authentication, post creation, and commenting system.',
        deliverables: ['User system', 'Post CRUD', 'Comment system', 'Admin panel'],
        estimatedTime: '2.5 weeks',
        badgeName: 'Full-Stack Hero',
        pointValue: 300,
        requiredTools: ['React', 'Node.js', 'Database', 'Authentication'],
        successCriteria: ['Complete user flow', 'Secure authentication', 'Full functionality']
      }
    ]
  },
  {
    id: 'roadmap-design',
    jobTitle: 'UI/UX Designer',
    jobCategory: 'Graphic Design',
    totalChallenges: 5,
    estimatedDuration: '3-5 weeks',
    challenges: [
      {
        id: 'design-1',
        level: 'Beginner',
        title: 'Design System Creation',
        description: 'Create a comprehensive design system with colors, typography, and basic components.',
        deliverables: ['Color palette', 'Typography scale', 'Button components', 'Icon set'],
        estimatedTime: '1 week',
        badgeName: 'Design Foundation',
        pointValue: 120,
        requiredTools: ['Figma', 'Adobe XD'],
        successCriteria: ['Consistent design system', 'Reusable components', 'Clear documentation']
      },
      {
        id: 'design-2',
        level: 'Beginner',
        title: 'Mobile App Wireframes',
        description: 'Create wireframes for a mobile application focusing on user flow and information architecture.',
        deliverables: ['User flow diagram', 'Low-fidelity wireframes', 'Navigation structure'],
        estimatedTime: '1 week',
        badgeName: 'Wireframe Wizard',
        pointValue: 100,
        requiredTools: ['Figma', 'Miro'],
        successCriteria: ['Clear user flow', 'Logical navigation', 'Complete wireframe set']
      },
      {
        id: 'design-3',
        level: 'Intermediate',
        title: 'High-Fidelity Mobile App Design',
        description: 'Transform wireframes into high-fidelity mobile app designs with proper visual hierarchy.',
        deliverables: ['High-fidelity screens', 'Interactive prototype', 'Design specifications'],
        estimatedTime: '1.5 weeks',
        badgeName: 'Design Thinking Pro',
        pointValue: 180,
        requiredTools: ['Figma', 'Principle', 'InVision'],
        successCriteria: ['Pixel-perfect designs', 'Interactive prototype', 'Design system compliance']
      },
      {
        id: 'design-4',
        level: 'Intermediate',
        title: 'User Research & Testing',
        description: 'Conduct user research, create personas, and perform usability testing on your designs.',
        deliverables: ['User personas', 'Research findings', 'Usability test results', 'Design iterations'],
        estimatedTime: '1.5 weeks',
        badgeName: 'User Research Pro',
        pointValue: 200,
        requiredTools: ['Survey tools', 'Analytics', 'Testing platforms'],
        successCriteria: ['Data-driven insights', 'Clear personas', 'Actionable recommendations']
      },
      {
        id: 'design-5',
        level: 'Expert',
        title: 'Complete Product Design Case Study',
        description: 'Create a comprehensive case study showcasing your entire design process from research to final product.',
        deliverables: ['Complete case study', 'Process documentation', 'Final designs', 'Presentation'],
        estimatedTime: '2 weeks',
        badgeName: 'Prototype Master',
        pointValue: 300,
        requiredTools: ['Figma', 'Presentation tools', 'Documentation'],
        successCriteria: ['Professional case study', 'Clear process documentation', 'Compelling presentation']
      }
    ]
  },
  {
    id: 'roadmap-marketing',
    jobTitle: 'Digital Marketing Specialist',
    jobCategory: 'Digital Marketing',
    totalChallenges: 4,
    estimatedDuration: '3-4 weeks',
    challenges: [
      {
        id: 'marketing-1',
        level: 'Beginner',
        title: 'Social Media Content Calendar',
        description: 'Create a comprehensive social media content calendar for a fictional brand.',
        deliverables: ['Content calendar', 'Post templates', 'Hashtag strategy', 'Engagement plan'],
        estimatedTime: '1 week',
        badgeName: 'Content Planner',
        pointValue: 100,
        requiredTools: ['Canva', 'Google Sheets', 'Social media platforms'],
        successCriteria: ['30-day calendar', 'Consistent branding', 'Engagement strategy']
      },
      {
        id: 'marketing-2',
        level: 'Beginner',
        title: 'Email Marketing Campaign',
        description: 'Design and plan a complete email marketing campaign with multiple touchpoints.',
        deliverables: ['Email templates', 'Campaign flow', 'Subject line variations', 'Analytics plan'],
        estimatedTime: '1 week',
        badgeName: 'Email Expert',
        pointValue: 120,
        requiredTools: ['Email design tools', 'Analytics platforms'],
        successCriteria: ['Professional templates', 'Clear campaign flow', 'Measurable goals']
      },
      {
        id: 'marketing-3',
        level: 'Intermediate',
        title: 'SEO Content Strategy',
        description: 'Develop a comprehensive SEO content strategy with keyword research and content planning.',
        deliverables: ['Keyword research', 'Content strategy', 'SEO-optimized articles', 'Performance metrics'],
        estimatedTime: '1.5 weeks',
        badgeName: 'SEO Strategist',
        pointValue: 180,
        requiredTools: ['SEO tools', 'Analytics', 'Content management'],
        successCriteria: ['Thorough keyword research', 'Strategic content plan', 'SEO-optimized content']
      },
      {
        id: 'marketing-4',
        level: 'Expert',
        title: 'Integrated Marketing Campaign',
        description: 'Create a complete integrated marketing campaign across multiple channels with ROI analysis.',
        deliverables: ['Campaign strategy', 'Multi-channel content', 'Budget allocation', 'ROI projections'],
        estimatedTime: '2 weeks',
        badgeName: 'Marketing Strategist',
        pointValue: 250,
        requiredTools: ['Marketing automation', 'Analytics', 'Budget planning tools'],
        successCriteria: ['Comprehensive strategy', 'Multi-channel integration', 'Clear ROI metrics']
      }
    ]
  },
  {
    id: 'roadmap-data-entry',
    jobTitle: 'Data Entry Specialist',
    jobCategory: 'Data Entry',
    totalChallenges: 3,
    estimatedDuration: '2-3 weeks',
    challenges: [
      {
        id: 'data-1',
        level: 'Beginner',
        title: 'Excel Mastery Challenge',
        description: 'Master essential Excel functions and create professional spreadsheets.',
        deliverables: ['Formula-based calculations', 'Data validation', 'Conditional formatting', 'Charts and graphs'],
        estimatedTime: '1 week',
        badgeName: 'Excel Expert',
        pointValue: 80,
        requiredTools: ['Microsoft Excel', 'Google Sheets'],
        successCriteria: ['Advanced formulas', 'Professional formatting', 'Data visualization']
      },
      {
        id: 'data-2',
        level: 'Intermediate',
        title: 'Data Cleaning & Analysis',
        description: 'Clean messy datasets and perform basic data analysis with insights.',
        deliverables: ['Clean dataset', 'Data analysis report', 'Pivot tables', 'Key insights'],
        estimatedTime: '1.5 weeks',
        badgeName: 'Data Cleaner',
        pointValue: 120,
        requiredTools: ['Excel', 'Data analysis tools'],
        successCriteria: ['Clean, organized data', 'Meaningful analysis', 'Clear insights']
      },
      {
        id: 'data-3',
        level: 'Expert',
        title: 'Database Management Project',
        description: 'Design and manage a complete database system with multiple tables and relationships.',
        deliverables: ['Database design', 'Data entry system', 'Query optimization', 'Reporting dashboard'],
        estimatedTime: '1.5 weeks',
        badgeName: 'Data Wizard',
        pointValue: 200,
        requiredTools: ['Database software', 'SQL', 'Reporting tools'],
        successCriteria: ['Efficient database design', 'Optimized queries', 'Professional dashboard']
      }
    ]
  }
];