/*
  # Insert Sample Upskilling Roadmaps

  1. Sample Data
    - Frontend Developer roadmap (6 challenges)
    - UI/UX Designer roadmap (5 challenges) 
    - Digital Marketing Specialist roadmap (4 challenges)
    - Data Entry Specialist roadmap (3 challenges)

  2. Features
    - Progressive difficulty levels (Beginner → Intermediate → Expert)
    - Real-world challenges with clear deliverables
    - Badge rewards and point values
    - Estimated completion times
*/

-- Insert sample upskilling roadmaps with proper UUIDs
INSERT INTO upskilling_roadmaps (id, job_title, job_category, total_challenges, estimated_duration, challenges) VALUES
(
  gen_random_uuid(),
  'Frontend Developer',
  'Web Development',
  6,
  '4-6 weeks',
  '[
    {
      "id": "web-dev-1",
      "level": "Beginner",
      "title": "Build a Personal Portfolio Website",
      "description": "Create a responsive personal portfolio website using HTML, CSS, and basic JavaScript.",
      "deliverables": ["HTML structure", "CSS styling", "Responsive design", "Contact form"],
      "estimatedTime": "1 week",
      "badgeName": "HTML Hero",
      "pointValue": 100,
      "requiredTools": ["VS Code", "Browser"],
      "successCriteria": ["Mobile responsive", "Clean code structure", "Working contact form"]
    },
    {
      "id": "web-dev-2",
      "level": "Beginner",
      "title": "Interactive Landing Page",
      "description": "Build an interactive landing page with animations and user interactions using CSS and JavaScript.",
      "deliverables": ["Animated elements", "Interactive buttons", "Smooth scrolling", "Form validation"],
      "estimatedTime": "1 week",
      "badgeName": "CSS Champion",
      "pointValue": 120,
      "requiredTools": ["VS Code", "Browser"],
      "successCriteria": ["Smooth animations", "Interactive elements", "Cross-browser compatibility"]
    },
    {
      "id": "web-dev-3",
      "level": "Intermediate",
      "title": "Todo App with Local Storage",
      "description": "Create a fully functional todo application with local storage persistence.",
      "deliverables": ["CRUD operations", "Local storage", "Filter functionality", "Clean UI"],
      "estimatedTime": "1.5 weeks",
      "badgeName": "JavaScript Ninja",
      "pointValue": 150,
      "requiredTools": ["VS Code", "Browser", "Local Storage API"],
      "successCriteria": ["Data persistence", "All CRUD operations", "User-friendly interface"]
    },
    {
      "id": "web-dev-4",
      "level": "Intermediate",
      "title": "Weather App with API Integration",
      "description": "Build a weather application that fetches data from a weather API and displays it beautifully.",
      "deliverables": ["API integration", "Error handling", "Location search", "Weather forecast"],
      "estimatedTime": "1.5 weeks",
      "badgeName": "API Explorer",
      "pointValue": 180,
      "requiredTools": ["VS Code", "Weather API", "Fetch API"],
      "successCriteria": ["Working API calls", "Error handling", "Clean data presentation"]
    },
    {
      "id": "web-dev-5",
      "level": "Expert",
      "title": "E-commerce Product Showcase",
      "description": "Create a complete e-commerce product showcase with shopping cart functionality.",
      "deliverables": ["Product catalog", "Shopping cart", "Checkout process", "User authentication"],
      "estimatedTime": "2 weeks",
      "badgeName": "React Master",
      "pointValue": 250,
      "requiredTools": ["React", "State Management", "Local Storage"],
      "successCriteria": ["Full shopping flow", "State management", "Responsive design"]
    },
    {
      "id": "web-dev-6",
      "level": "Expert",
      "title": "Full-Stack Blog Platform",
      "description": "Build a complete blog platform with user authentication, post creation, and commenting system.",
      "deliverables": ["User system", "Post CRUD", "Comment system", "Admin panel"],
      "estimatedTime": "2.5 weeks",
      "badgeName": "Full-Stack Hero",
      "pointValue": 300,
      "requiredTools": ["React", "Node.js", "Database", "Authentication"],
      "successCriteria": ["Complete user flow", "Secure authentication", "Full functionality"]
    }
  ]'::jsonb
),
(
  gen_random_uuid(),
  'UI/UX Designer',
  'Graphic Design',
  5,
  '3-5 weeks',
  '[
    {
      "id": "design-1",
      "level": "Beginner",
      "title": "Design System Creation",
      "description": "Create a comprehensive design system with colors, typography, and basic components.",
      "deliverables": ["Color palette", "Typography scale", "Button components", "Icon set"],
      "estimatedTime": "1 week",
      "badgeName": "Design Foundation",
      "pointValue": 120,
      "requiredTools": ["Figma", "Adobe XD"],
      "successCriteria": ["Consistent design system", "Reusable components", "Clear documentation"]
    },
    {
      "id": "design-2",
      "level": "Beginner",
      "title": "Mobile App Wireframes",
      "description": "Create wireframes for a mobile application focusing on user flow and information architecture.",
      "deliverables": ["User flow diagram", "Low-fidelity wireframes", "Navigation structure"],
      "estimatedTime": "1 week",
      "badgeName": "Wireframe Wizard",
      "pointValue": 100,
      "requiredTools": ["Figma", "Miro"],
      "successCriteria": ["Clear user flow", "Logical navigation", "Complete wireframe set"]
    },
    {
      "id": "design-3",
      "level": "Intermediate",
      "title": "High-Fidelity Mobile App Design",
      "description": "Transform wireframes into high-fidelity mobile app designs with proper visual hierarchy.",
      "deliverables": ["High-fidelity screens", "Interactive prototype", "Design specifications"],
      "estimatedTime": "1.5 weeks",
      "badgeName": "Design Thinking Pro",
      "pointValue": 180,
      "requiredTools": ["Figma", "Principle", "InVision"],
      "successCriteria": ["Pixel-perfect designs", "Interactive prototype", "Design system compliance"]
    },
    {
      "id": "design-4",
      "level": "Intermediate",
      "title": "User Research & Testing",
      "description": "Conduct user research, create personas, and perform usability testing on your designs.",
      "deliverables": ["User personas", "Research findings", "Usability test results", "Design iterations"],
      "estimatedTime": "1.5 weeks",
      "badgeName": "User Research Pro",
      "pointValue": 200,
      "requiredTools": ["Survey tools", "Analytics", "Testing platforms"],
      "successCriteria": ["Data-driven insights", "Clear personas", "Actionable recommendations"]
    },
    {
      "id": "design-5",
      "level": "Expert",
      "title": "Complete Product Design Case Study",
      "description": "Create a comprehensive case study showcasing your entire design process from research to final product.",
      "deliverables": ["Complete case study", "Process documentation", "Final designs", "Presentation"],
      "estimatedTime": "2 weeks",
      "badgeName": "Prototype Master",
      "pointValue": 300,
      "requiredTools": ["Figma", "Presentation tools", "Documentation"],
      "successCriteria": ["Professional case study", "Clear process documentation", "Compelling presentation"]
    }
  ]'::jsonb
),
(
  gen_random_uuid(),
  'Digital Marketing Specialist',
  'Digital Marketing',
  4,
  '3-4 weeks',
  '[
    {
      "id": "marketing-1",
      "level": "Beginner",
      "title": "Social Media Content Calendar",
      "description": "Create a comprehensive social media content calendar for a fictional brand.",
      "deliverables": ["Content calendar", "Post templates", "Hashtag strategy", "Engagement plan"],
      "estimatedTime": "1 week",
      "badgeName": "Content Planner",
      "pointValue": 100,
      "requiredTools": ["Canva", "Google Sheets", "Social media platforms"],
      "successCriteria": ["30-day calendar", "Consistent branding", "Engagement strategy"]
    },
    {
      "id": "marketing-2",
      "level": "Beginner",
      "title": "Email Marketing Campaign",
      "description": "Design and plan a complete email marketing campaign with multiple touchpoints.",
      "deliverables": ["Email templates", "Campaign flow", "Subject line variations", "Analytics plan"],
      "estimatedTime": "1 week",
      "badgeName": "Email Expert",
      "pointValue": 120,
      "requiredTools": ["Email design tools", "Analytics platforms"],
      "successCriteria": ["Professional templates", "Clear campaign flow", "Measurable goals"]
    },
    {
      "id": "marketing-3",
      "level": "Intermediate",
      "title": "SEO Content Strategy",
      "description": "Develop a comprehensive SEO content strategy with keyword research and content planning.",
      "deliverables": ["Keyword research", "Content strategy", "SEO-optimized articles", "Performance metrics"],
      "estimatedTime": "1.5 weeks",
      "badgeName": "SEO Strategist",
      "pointValue": 180,
      "requiredTools": ["SEO tools", "Analytics", "Content management"],
      "successCriteria": ["Thorough keyword research", "Strategic content plan", "SEO-optimized content"]
    },
    {
      "id": "marketing-4",
      "level": "Expert",
      "title": "Integrated Marketing Campaign",
      "description": "Create a complete integrated marketing campaign across multiple channels with ROI analysis.",
      "deliverables": ["Campaign strategy", "Multi-channel content", "Budget allocation", "ROI projections"],
      "estimatedTime": "2 weeks",
      "badgeName": "Marketing Strategist",
      "pointValue": 250,
      "requiredTools": ["Marketing automation", "Analytics", "Budget planning tools"],
      "successCriteria": ["Comprehensive strategy", "Multi-channel integration", "Clear ROI metrics"]
    }
  ]'::jsonb
),
(
  gen_random_uuid(),
  'Data Entry Specialist',
  'Data Entry',
  3,
  '2-3 weeks',
  '[
    {
      "id": "data-1",
      "level": "Beginner",
      "title": "Excel Mastery Challenge",
      "description": "Master essential Excel functions and create professional spreadsheets.",
      "deliverables": ["Formula-based calculations", "Data validation", "Conditional formatting", "Charts and graphs"],
      "estimatedTime": "1 week",
      "badgeName": "Excel Expert",
      "pointValue": 80,
      "requiredTools": ["Microsoft Excel", "Google Sheets"],
      "successCriteria": ["Advanced formulas", "Professional formatting", "Data visualization"]
    },
    {
      "id": "data-2",
      "level": "Intermediate",
      "title": "Data Cleaning & Analysis",
      "description": "Clean messy datasets and perform basic data analysis with insights.",
      "deliverables": ["Clean dataset", "Data analysis report", "Pivot tables", "Key insights"],
      "estimatedTime": "1.5 weeks",
      "badgeName": "Data Cleaner",
      "pointValue": 120,
      "requiredTools": ["Excel", "Data analysis tools"],
      "successCriteria": ["Clean, organized data", "Meaningful analysis", "Clear insights"]
    },
    {
      "id": "data-3",
      "level": "Expert",
      "title": "Database Management Project",
      "description": "Design and manage a complete database system with multiple tables and relationships.",
      "deliverables": ["Database design", "Data entry system", "Query optimization", "Reporting dashboard"],
      "estimatedTime": "1.5 weeks",
      "badgeName": "Data Wizard",
      "pointValue": 200,
      "requiredTools": ["Database software", "SQL", "Reporting tools"],
      "successCriteria": ["Efficient database design", "Optimized queries", "Professional dashboard"]
    }
  ]'::jsonb
);