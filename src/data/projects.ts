export interface Project {
  id: string;
  title: string;
  description: string;
  preview: string;
  technologies: string[];
  year: string;
  status: 'completed' | 'in-progress' | 'planned';
  features: string[];
  challenges: string;
  liveDemo?: string;
  github?: string;
  screenshots: string[];
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
}

export const projectsData: Project[] = [
  {
    id: "1",
    title: "India Music Distribution",
    description: "India Music Distribution is a full-featured platform that empowers independent artists to release and manage their music across 150+ streaming platforms. The platform handles thousands of daily uploads, ensures high availability, and provides analytics to track performance, enabling artists to focus on creating music while we take care of distribution and management.",
    preview: "India Music Distribution is a full-featured platform that empowers independent...",
    technologies: ["React.js", "Node.js", "MongoDB", "Express.js", "Supabase"],
    year: "Aug 2025",
    status: "completed",
    features: [
      "Multi-Platform Distribution: Release music to 150+ streaming services seamlessly.",
      "High-Volume Upload Handling: Process thousands of daily uploads with high reliability and minimal downtime.",
      "Artist Onboarding: Easily onboard hundreds of independent artists and manage their catalogs.",
      "Optimized Backend: Fast query processing and reduced response times for smooth operations.",
      "Analytics Dashboard: Track streams, downloads, revenue, and other performance metrics.",
      "Content Management: Organize, schedule, and update music releases efficiently.",
      "Secure Storage: Safe storage of audio files with backup and redundancy.",
      "Scalable Architecture: Supports growth and increasing traffic without performance loss."
    ],
    challenges: "Optimized backend queries to improve processing time by 30% and support high availability for over 1,000 daily uploads.",
    liveDemo: "https://indiamusicdistribution.com/",
    isRead: false,
    isStarred: false,
    isArchived: false,
    screenshots: [
      "/India Music Distribution/Home .png",
      "/India Music Distribution/Dashboard .png",
      "/India Music Distribution/Dashboard  2.png",
      "/India Music Distribution/Song.png",
      "/India Music Distribution/Admin Dashboard.png",
      "/India Music Distribution/Admin Dashboard 2.png",
    ],
  },
  {
    id: "2",
    title: "Portfolio Website",
    description: "This portfolio website showcases a diverse range of web development projects, emphasizing expertise in frontend technologies and UI/UX design. The site features a clean, responsive layout, providing visitors with an intuitive navigation experience across various projects and skills. Each project is presented with detailed information, highlighting the technologies used and the challenges overcome, offering a comprehensive view of Sanju's capabilities and growth as a developer.",
    preview: "This portfolio website showcases a diverse range of web development projects...",
    technologies: ["HTML5", "CSS3", "React.js", "Javascript", "Typescript",],
    year: "Jun 2025",
    status: "completed",
    features: [
  "Clean & Responsive Design: Optimized for all devices, providing a seamless browsing experience.",
  "Project Showcase: Detailed presentation of web development projects with technologies used and challenges faced.",
  "Frontend Focus: Highlights expertise in JavaScript, TypeScript, React.js, HTML, and CSS.",
  "Intuitive Navigation: Easy-to-use interface to explore projects, skills, and experience.",
  "UI/UX Emphasis: Modern design principles applied for an engaging user experience.",
  "Contact & Connectivity: Integrated contact options for networking and project inquiries.",
  "Performance Optimized: Fast loading times and smooth transitions across sections."
],
    challenges: "Designing a fully responsive and visually appealing portfolio that effectively showcases diverse projects while ensuring fast performance, intuitive navigation, and a consistent user experience across all devices.",
    liveDemo: "https://sanjukumarjha.netlify.app/",
    github: "https://github.com/sanjukumarjha/Sanju-Portfolio",
    isRead: false,
    isStarred: false,
    isArchived: false,
    screenshots: [
      "/Portfolio/1.png",
      "/Portfolio/2.png",
      "/Portfolio/3.png",
      "/Portfolio/4.png",
      "/Portfolio/5.png",
    ],
  },
  {
    id: "3",
    title: "Biodesim",
    description: "A web-based interactive simulation that visually represents the lifecycle of biodegradable plastics—from production to complete decomposition. Built using modern web technologies, the project educates users on how biodegradable plastics behave under different environmental conditions such as soil, water, and light. It features 3D animations, dynamic charts, and informative content to promote awareness about sustainable materials and their environmental impact.",
    preview: "A web-based interactive simulation that visually represents the lifecycle of...",
    technologies: ["React.js", "Three.js", "Node.js", "Express.js", "MongoDB", "Chart.js"],
    year: "May 2025",
    status: "completed",
    features: [
  "Interactive Lifecycle Simulation: Visualize the complete lifecycle of biodegradable plastics from production to decomposition.",
  "3D Animations: Realistic 3D representations of plastic degradation under various environmental conditions (soil, water, light).",
  "Dynamic Charts & Analytics: Display data on degradation rates, environmental impact, and resource usage.",
  "Educational Content: Informative insights about sustainable materials and their ecological effects.",
  "User-Friendly Interface: Intuitive and responsive design for seamless interaction and learning.",
  "Customizable Environmental Scenarios: Explore how different conditions affect plastic decomposition.",
  "Real-Time Updates: Immediate visual and data feedback as users interact with the simulation."
],
    challenges: "Implementing realistic 3D simulations and dynamic data visualizations while ensuring smooth performance and responsiveness across browsers, and effectively conveying complex environmental concepts to users.",
    liveDemo: "https://dulcet-rolypoly-04e896.netlify.app/",
    github: "https://github.com/sanjukumarjha/Biodesim",
    isRead: false,
    isStarred: false,
    isArchived: false,
    screenshots: [
      "/Biodesim/1.png",
      "/Biodesim/2.png",
      "/Biodesim/3.png",
      "/Biodesim/4.png",
      "/Biodesim/5.png",
      "/Biodesim/6.png",
      "/Biodesim/7.png",
      "/Biodesim/8.png",
      "/Biodesim/9.png",
      "/Biodesim/10.png",
    ],
  },
  {
    id: "4",
    title: "Utsavbox Shopify Storefront",
    description: "Developed enhanced Shopify layouts and custom storefronts for a festive-themed e-commerce store, creating reusable Liquid components to optimize site performance, improve user experience, and drive higher sales.",
    preview: "Enhanced Shopify layouts and custom storefronts for a festive-themed store.",
    technologies: ["Shopify", "Liquid"],
    year: "Sep 2024",
    status: "completed",
    features: [
      "Designed and implemented custom Shopify layouts, increasing sales by 15%.",
      "Built reusable Liquid components, enhancing site speed by 25%.",
      "Integrated video sliders and promotional features for 3 major campaigns."
    ],
    challenges: "Customizing the Shopify Liquid theme to meet specific marketing requirements while maintaining optimal page load speed for over 10,000 monthly visitors.",
    liveDemo: "https://utsavbox.co.in/",
    isRead: false,
    isStarred: false,
    isArchived: false,
    screenshots: [
      "/Utsavbox/1.png",
      "/Utsavbox/2.png",
      "/Utsavbox/3.png",
      "/Utsavbox/4.png",
      "/Utsavbox/5.png",
      "/Utsavbox/6.png",
      "/Utsavbox/7.png",
      "/Utsavbox/8.png",
      "/Utsavbox/9.png",
      "/Utsavbox/10.png",
    ],
  },
  {
    id: "5",
    title: "Sansocial - Social Media App",
    description: "Sansocial is a modern social media application designed to connect people, share updates, and engage with communities seamlessly. It allows users to create profiles, post text, images, and videos, follow friends, like and comment on posts, and discover trending content. The platform emphasizes a smooth user experience, real-time notifications, and personalized content feeds to keep users engaged and connected.",
    preview: "Sansocial is a modern social media application designed to connect people...",
    technologies: ["HTML5", "CSS3", "Javascript"],
    year: "Jul 2024",
    status: "completed",
    features: [
  "Responsive and intuitive user interface for posting text, images, and videos.",
  "Interactive news feed with smooth scrolling and dynamic content updates.",
  "Profile management with editable personal information and profile pictures.",
  "Like, comment, and share functionality implemented on the frontend.",
  "Real-time notifications and UI updates for user interactions.",
  "Mobile-friendly design ensuring a seamless experience across devices."
],
    challenges: "Designing and implementing an intuitive and responsive frontend interface, ensuring a seamless user experience across all features of the social media app.",
    liveDemo: "https://sanjukumarjha.github.io/SanSocial/",
    github: "https://github.com/sanjukumarjha/SanSocial",
    isRead: false,
    isStarred: false,
    isArchived: false,
    screenshots: [
      "/Sansocial/1.png",
      "/Sansocial/2.png",
      "/Sansocial/3.png",
      "/Sansocial/4.png",
      "/Sansocial/5.png",
    ],
  },
    {
    id: "6",
    title: "Dashboard of Intecom",
    description: "An analytics dashboard for an e-commerce intelligence company built with pure JavaScript, focusing on client-side rendering to reduce load times and improve user retention.",
    preview: "An analytics dashboard for an e-commerce intelligence company with pure JavaScript...",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    year: "Jun 2024",
    status: "completed",
    features: [
      "Client-side rendering to reduce load time by 50%.",
      "Responsive design and dark mode integration.",
      "Improved accessibility and user retention by 25%."
    ],
    challenges: "Building a highly performant dashboard with pure JavaScript, focusing on optimizing rendering and data visualization without heavy frameworks.",
    liveDemo: "https://sanjukumarjha.github.io/Dashboard-of-Intecom/",
    github: "https://github.com/sanjukumarjha/Dashboard-of-Intecom",
    isRead: false,
    isStarred: false,
    isArchived: false,
    screenshots: [
      "/Dashboard of Intecom/1.png",
      "/Dashboard of Intecom/2.png",
      "/Dashboard of Intecom/3.png",
      "/Dashboard of Intecom/4.png",
    ],
  },
];