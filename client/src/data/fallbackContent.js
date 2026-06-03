export const fallbackContent = {
  profile: {
    name: 'Sarim Azhar',
    title: 'Full-Stack MERN Developer & AI-Integrated Product Builder',
    bio: 'I am a Computer Science student at Air University with hands-on experience building and deploying full-stack MERN applications. I specialize in React.js, Node.js, Express.js, MongoDB, REST APIs, JWT authentication, and AI/ML integration using Python and Scikit-learn. My projects range from AI SaaS platforms and student marketplaces to machine learning models and client websites — all built with production-grade thinking, clean architecture, and modern UI.',
    email: 'sarimaz786@gmail.com',
    phone: '+92-327-8300828',
    github: 'https://github.com/sarim0704',
    linkedin: 'https://linkedin.com/in/sarim-azhar-6333422a8',
    portraitUrl: '/uploads/portrait.png',
    resumeUrl: '',
    heroRoles: ['MERN Developer', 'AI Product Builder', 'CS Student'],
    stats: [
      { label: 'Years Building', value: '3', suffix: '+' },
      { label: 'Projects Built', value: '7', suffix: '' },
      { label: 'ML Accuracy', value: '98.76', suffix: '%' }
    ]
  },
  projects: [
    { title: 'Servix AI', subtitle: 'AI-Powered Student Project Marketplace', category: 'MERN Stack + AI Integration', featured: true, order: 1, description: 'A full-stack MERN marketplace where students create, showcase, save, sell, and apply to academic and software projects.', techStack: ['React', 'Node.js', 'MongoDB', 'JWT'], liveUrl: 'https://servix-ai.vercel.app', githubUrl: 'https://github.com/sarim0704', thumbnailUrl: '/project-placeholders/servix.svg' },
    { title: 'HumanTrace AI Pro', subtitle: 'AI Writing Detection & Humanization Workspace', category: 'AI/ML SaaS Platform', featured: true, order: 2, description: 'AI SaaS platform for detecting AI-generated writing, humanizing text, paraphrasing content, and analyzing uploaded documents.', techStack: ['Next.js', 'FastAPI', 'Python', 'ML'], liveUrl: '', githubUrl: 'https://github.com/sarim0704', thumbnailUrl: '/project-placeholders/humantrace.svg' },
    { title: 'CareerForge AI', subtitle: 'AI-Powered Career & Resume Platform', category: 'MERN SaaS Platform', featured: true, order: 3, description: 'Career SaaS platform for guidance, resume support, dashboard tools, and future AI-powered career workflows.', techStack: ['React', 'Tailwind', 'Node.js', 'MongoDB'], liveUrl: '', githubUrl: 'https://github.com/sarim0704', thumbnailUrl: '/project-placeholders/careerforge.svg' },
    { title: 'BungJackOfficial', subtitle: 'Professional Media & Creator Website', category: 'Client Website', featured: true, order: 4, description: 'Professional media platform for content publishing, video sharing, announcements, and donation collection.', techStack: ['React', 'Tailwind', 'Stripe', 'CMS'], liveUrl: 'https://bungjackofficial.com', githubUrl: '', thumbnailUrl: '/project-placeholders/bungjack.svg' },
    { title: 'Loan Approval Prediction', subtitle: 'Supervised ML Classification Model', category: 'Machine Learning', featured: false, order: 5, description: 'Machine learning project predicting loan approval outcomes using applicant data.', techStack: ['Python', 'Pandas', 'Scikit-learn', 'Jupyter'], liveUrl: '', githubUrl: 'https://github.com/sarim0704', thumbnailUrl: '/project-placeholders/loan.svg' },
    { title: 'Hospital Management System', subtitle: 'SQL Database Project', category: 'DBMS', featured: false, order: 6, description: 'Academic DBMS project with normalized tables, ERD, joins, views, stored procedures, and triggers.', techStack: ['MySQL', 'SQL', 'DBMS'], liveUrl: '', githubUrl: 'https://github.com/sarim0704', thumbnailUrl: '/project-placeholders/hospital.svg' },
    { title: 'Tasmaha Cologne E-Commerce', subtitle: 'MERN E-Commerce Concept', category: 'MERN E-Commerce', featured: false, order: 7, description: 'MERN e-commerce and POS concept with product listing, cart, checkout, admin products, and orders.', techStack: ['React', 'Node.js', 'MongoDB', 'JWT'], liveUrl: '', githubUrl: 'https://github.com/sarim0704', thumbnailUrl: '/project-placeholders/tasmaha.svg' }
  ],
  skills: [
    { category: 'Frontend', order: 1, items: ['React.js', 'Next.js', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'React Router', 'Axios', 'Framer Motion'] },
    { category: 'Backend', order: 2, items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Middleware', 'MVC Architecture', 'Bcrypt', 'CORS', 'Multer'] },
    { category: 'Database', order: 3, items: ['MongoDB', 'Mongoose', 'MongoDB Atlas', 'MySQL', 'SQL Queries', 'CRUD', 'Data Modeling'] },
    { category: 'AI / ML', order: 4, items: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Logistic Regression', 'Random Forest', 'SVM', 'Text Classification', 'FastAPI'] },
    { category: 'Tools', order: 5, items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'Render', 'MongoDB Compass', 'Linux Basic', 'Cloudinary'] }
  ],
  experience: [
    { role: 'Computer Science Student', organization: 'Air University', type: 'Academic', startDate: 'Aug 2024', endDate: 'May 2028', order: 1, bullets: ['Studying AI, DAA, OS, Full Stack Development, DBMS, and Linear Algebra.', 'Building practical MERN, AI/ML, and database-driven projects.', 'Current CGPA target: 3.0 with strong project-based learning.'] },
    { role: 'President', organization: 'Air Media Club', type: 'Leadership', startDate: '2024', endDate: 'present', order: 2, bullets: ['Leading creative media activities and team coordination.', 'Developing communication, leadership, and event execution skills.'] },
    { role: 'Executive Member', organization: 'Air Tech Society', type: 'Leadership', startDate: '2024', endDate: 'present', order: 3, bullets: ['Contributing to technical society activities and peer learning.', 'Supporting technical events and student collaboration.'] }
  ],
  testimonials: []
};
