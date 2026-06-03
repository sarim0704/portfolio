export const profile = {
  name: 'Sarim Azhar',
  title: 'Full-Stack MERN Developer & AI-Integrated Product Builder',
  location: 'Kharian, Pakistan',
  email: 'sarimaz786@gmail.com',
  phone: '+92-327-8300828',
  github: 'https://github.com/sarim0704',
  linkedin: 'https://linkedin.com/in/sarim-azhar-6333422a8',
  portraitUrl: '/uploads/portrait.png',
  resumeUrl: '',
  bio: 'I am a Computer Science student at Air University with hands-on experience building and deploying full-stack MERN applications. I specialize in React.js, Node.js, Express.js, MongoDB, REST APIs, JWT authentication, and AI/ML integration using Python and Scikit-learn. My projects range from AI SaaS platforms and student marketplaces to machine learning models and client websites — all built with production-grade thinking, clean architecture, and modern UI.',
  heroRoles: ['MERN Developer', 'AI Product Builder', 'CS Student'],
  stats: [
    { label: 'Years Building', value: '3', suffix: '+' },
    { label: 'Projects Built', value: '7', suffix: '' },
    { label: 'ML Accuracy', value: '98.76', suffix: '%' }
  ]
};

export const projects = [
  {
    title: 'Servix AI', subtitle: 'AI-Powered Student Project Marketplace', category: 'MERN Stack + AI Integration', featured: true, order: 1,
    description: 'A full-stack MERN marketplace where students create, showcase, save, sell, and apply to academic and software projects.',
    features: ['JWT auth and protected routes', 'Project CRUD and pitch-based applications', 'Saved projects and notification system', 'AI project assistant with fallback logic', 'Resume and avatar upload'],
    techStack: ['React', 'Vite', 'Tailwind', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Gemini API'],
    liveUrl: 'https://servix-ai.vercel.app', githubUrl: 'https://github.com/sarim0704', thumbnailUrl: '/project-placeholders/servix.svg',
    impact: 'Demonstrates full MERN engineering: auth, uploads, AI integration, multi-model DB design, and cloud deployment.'
  },
  {
    title: 'HumanTrace AI Pro', subtitle: 'AI Writing Detection & Humanization Workspace', category: 'AI/ML SaaS Platform', featured: true, order: 2, status: 'In development',
    description: 'AI SaaS platform for detecting AI-generated writing, humanizing text, paraphrasing content, and analyzing uploaded documents.',
    features: ['AI text detection with probability scores', 'Sentence-level highlighting', 'Humanizer and paraphraser tools', 'Document upload and extraction', 'FastAPI ML service'],
    techStack: ['Next.js', 'Node.js', 'FastAPI', 'Python', 'Scikit-learn', 'MongoDB', 'JWT'],
    liveUrl: '', githubUrl: 'https://github.com/sarim0704', thumbnailUrl: '/project-placeholders/humantrace.svg',
    impact: 'Demonstrates ML pipeline integration, multi-service backend architecture, and SaaS product thinking.'
  },
  {
    title: 'CareerForge AI', subtitle: 'AI-Powered Career & Resume Platform', category: 'MERN SaaS Platform', featured: true, order: 3,
    description: 'Career SaaS platform for guidance, resume support, dashboard tools, and future AI-powered career workflows.',
    features: ['Landing page and dashboard', 'JWT authentication', 'Reusable SaaS components', 'Dark/light mode', 'Pricing layout'],
    techStack: ['React', 'Tailwind', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Framer Motion'],
    liveUrl: '', githubUrl: 'https://github.com/sarim0704', thumbnailUrl: '/project-placeholders/careerforge.svg',
    impact: 'Demonstrates SaaS product structure, scalable component architecture, and clean UI design thinking.'
  },
  {
    title: 'BungJackOfficial', subtitle: 'Professional Media & Creator Website', category: 'Client Website', featured: true, order: 4,
    description: 'A professional media and creator platform for content publishing, video sharing, announcements, and donation collection.',
    features: ['News/media landing page', 'Videos and posts section', 'Donation modal flow', 'Stripe-ready UI', 'Social media integration'],
    techStack: ['React', 'Tailwind', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    liveUrl: 'https://bungjackofficial.com', githubUrl: '', thumbnailUrl: '/project-placeholders/bungjack.svg',
    impact: 'Demonstrates client communication, real-world delivery, and payment integration planning.'
  },
  {
    title: 'Loan Approval Prediction', subtitle: 'Supervised Machine Learning Classification Model', category: 'Machine Learning', featured: false, order: 5,
    description: 'Machine learning project predicting loan approval outcomes using applicant data and supervised classification workflows.',
    features: ['Preprocessing and missing values', 'Label encoding and scaling', 'Random Forest and comparison models', 'Confusion matrix and metrics'],
    techStack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Jupyter'], liveUrl: '', githubUrl: 'https://github.com/sarim0704', thumbnailUrl: '/project-placeholders/loan.svg'
  },
  {
    title: 'Hospital Management System', subtitle: 'Relational Database Design & SQL Implementation', category: 'DBMS', featured: false, order: 6,
    description: 'Academic DBMS project with normalized tables, ERD, SQL joins, views, stored procedures, and triggers.',
    features: ['Patients, doctors, appointments', 'Normalized SQL schema', 'Views and joins', 'Stored procedures and triggers'],
    techStack: ['MySQL', 'SQL', 'DBMS', 'ERD'], liveUrl: '', githubUrl: 'https://github.com/sarim0704', thumbnailUrl: '/project-placeholders/hospital.svg'
  },
  {
    title: 'Tasmaha Cologne E-Commerce', subtitle: 'Full-Stack MERN E-Commerce / POS Concept', category: 'MERN E-Commerce', featured: false, order: 7,
    description: 'MERN e-commerce and POS concept for product listing, cart, checkout, admin products, and order management.',
    features: ['Product listing and detail pages', 'Cart and checkout flow', 'JWT authentication', 'Admin product management'],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind', 'JWT'], liveUrl: '', githubUrl: 'https://github.com/sarim0704', thumbnailUrl: '/project-placeholders/tasmaha.svg'
  }
];

export const skills = [
  { category: 'Frontend', order: 1, items: ['React.js', 'Next.js', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'React Router', 'Axios', 'Framer Motion'] },
  { category: 'Backend', order: 2, items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Middleware', 'MVC Architecture', 'Bcrypt', 'CORS', 'Multer', 'Dotenv'] },
  { category: 'Database', order: 3, items: ['MongoDB', 'Mongoose', 'MongoDB Atlas', 'MySQL', 'SQL Queries', 'CRUD', 'Data Modeling', 'Schema Design'] },
  { category: 'AI / ML', order: 4, items: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Logistic Regression', 'Random Forest', 'SVM', 'Text Classification', 'FastAPI', 'Gemini API'] },
  { category: 'Tools', order: 5, items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'Render', 'MongoDB Compass', 'Linux Basic', 'Cloudinary'] }
];

export const experience = [
  { role: 'Computer Science Student', organization: 'Air University', type: 'Academic', startDate: 'Aug 2024', endDate: 'May 2028', order: 1, bullets: ['Studying core CS topics including AI, DAA, OS, Full Stack Development, DBMS, and Linear Algebra.', 'Building practical MERN, AI/ML, and database-driven projects alongside coursework.', 'Current CGPA target: 3.0 with strong focus on project-based learning.'] },
  { role: 'President', organization: 'Air Media Club', type: 'Leadership', startDate: '2024', endDate: 'present', order: 2, bullets: ['Leading creative media activities, team coordination, and campus-level content planning.', 'Developing communication, leadership, and event execution skills.'] },
  { role: 'Executive Member', organization: 'Air Tech Society', type: 'Leadership', startDate: '2024', endDate: 'present', order: 3, bullets: ['Contributing to technical society activities, student collaboration, and project-based learning culture.', 'Supporting technical events and peer learning initiatives.'] }
];

export const testimonials = [];
