import { language } from ".";

export default {
  navigation: {
    home: "Home",
    services: "Services",
    about: "About",
    contact: "Contact"
  },
  footer: {
    tagline: "ET-Lode: Extract, Transform, Load. Enabling AI automation for global businesses.",
    quickLinks: "Quick Links",
    contactHeading: "Contact",
    allRightsReserved: "All rights reserved."
  },
  cta: {
    services: "Explore Services", // Call to action button text
    contact: "Connect with Us",
    allServices: "View All Services",
    consultation: {
      title: "Ready to Transform Your Business with AI?",
      description: "Let's discuss how our AI solutions can enhance your customer experience and streamline your operations.",
      button: "Request a Consultation",
    },
  },

  home: {
    headerTitle: "ET-Lode",
    metaDescription: "ET-Lode - AI Automation for Global Business",
    hero: {
      title: 'AI Automation for <span class="text-teal-400">Global</span> Business',//"AI Automation for Global Business",
      subtitle: "AI solutions that streamline multilingual operations and enhance customer experiences."
    },
    aiServices: "Our AI Automation Services",
    whyETLode: {
      title: "Why Choose ET-Lode?",
      skills: {
        multilingual: {
          title: "Multilingual Expertise",
          description: "With fluency in both English and Japanese, we bridge communication gaps and deliver AI solutions that truly speak your language."
        },
        technicalExcellence: {
          title: "Technical Excellence",
          description: "We bring extensive experience in AI, data engineering, and web development to deliver robust, scalable solutions."
        },
        businessProcess: {
          title: "Business Process Optimization",
          description: "With experience managing ERP migrations and business processes, we understand how to integrate AI into your existing workflows."
        },
        results: {
          title: "Results-Driven Approach",
          description: "We focus on delivering measurable results, ensuring that our AI solutions not only meet your needs but also drive business growth."
        }
      },
    },
    caseStudy: {
      title: "Featured Case Study",
      ecChatbot: {
        title: "Multilingual eCommerce AI Chatbot",
        description: "Developed an AI-powered chatbot for Japanese eCommerce businesses that delivers multilingual, on-demand customer support and personalized recommendations. Leveraging a RAG-enabled framework, it requires no pre-translation of product data simplifying master data maintainence.",
        results: {
          title: "Results:",
          1: "Multilingual customer responses in seconds",
          2: "Uncover customer insights with translated database of queries",
          3: "24/7 customer service coverage without additional staffing",
        }
      }
    },
  },
  services: {
    headerTitle: "Services | ET-Lode",
    metaDescription: "Explore ET-Lode's AI automation services, including multilingual chatbots, RAG-enabled LLM solutions, workflow automation, and more.",
    title: "Our Services",
    description: "Comprehensive AI automation solutions designed to help your business operate more efficiently in multiple languages.",
    keyFeatures: "Key Features:",
    chatbots: {
      title: "Multilingual AI Chatbots",
      description: "Custom AI chatbots that communicate fluently in multiple target languages, providing immediate customer support, product recommendations, and answers to frequently asked questions.",
      features: {
        1: "Semantic understanding via natural language processing",
        2: "Integration with your product database and knowledge base",
        3: "Custom personality and tone matching your brand",
        4: "Analytics dashboard to track user interactions",
        5: "Continuous improvement based on chat logs",
      },
    },
    rag: {
      title: "RAG-Enabled LLM Solutions",
      description: "Large Language Models with Retrieval-Augmented Generation capabilities that can access and reference your business data to provide accurate, context-aware responses.",
      features: {
        1: "Integration with your existing databases and documents",
        2: "Real-time information retrieval and processing",
        3: "Customized knowledge base creation and maintenance",
        4: "Multi-document query capability",
        5: "Secure handling of sensitive information",
      },
    },
    automation: {
      title: "Workflow Automation",
      description: "Custom automation solutions that streamline your business processes, reducing manual tasks and improving operational efficiency.",
      features: {
        1: "Office365 integration and automation",
        2: "Document processing and data extraction",
        3: "Custom ETL (Extract, Transform, Load) processes",
        4: "Business process analysis and optimization",
        5: "Integration with legacy systems",
      },
    },
    webdev: {
      title: "Web Development",
      description: "Modern, responsive web applications built with cutting-edge technologies like SvelteKit and integrated with your AI solutions.",
      features: {
        1: "SvelteKit and TypeScript development",
        2: "Responsive, mobile-first design",
        3: "AI integration for personalized user experiences",
        4: "Performance optimization",
        5: "Multilingual support",
      },
    },
    socialMedia: {
      title: "English Social Media Management",
      description: "Professional management of your English-language social media presence to engage with international customers.",
      features: {
        1: "Content strategy development",
        2: "Regular posting and engagement",
        3: "Analytics and performance reporting",
        4: "AI-assisted content creation",
        5: "Cross-platform management",
      },
    },
    translation: {
      title: "Japanese-to-English Translation",
      description: "Professional translation services for your content, product descriptions, and marketing materials between Japanese and English.",
      features: {
        1: "Technical documentation translation",
        2: "Marketing content localization",
        3: "Product description translation",
        4: "UI/UX text translation",
        5: "",
      },
    },    
    customSolutions: "Custom Solutions",
    customSolutionsDescription: "Don't see exactly what you need? We specialize in creating custom AI automation solutions tailored to your specific business requirements. Contact us to discuss your ideas and how we can help bring them to life.",
  },
  about: {
    headerTitle: "About | ET-Lode",
    metaDescription: "Learn about ET-Lode's expertise in AI automation, multilingual solutions, and business process improvement.",
    title: "About ET-Lode",
    subTitle: "Extract, Transform, Load – Empowering businesses with multilingual AI solutions.",
    storyTitle: "Our Story",
    storyDescription: '<p class="mb-4">ET-Lode was founded by Lee Sommerfeldt, combining expertise in business process management, machine learning, and multilingual communication to create a boutique AI automation consultancy.</p><p class="mb-4">The name "ET-Lode" is a play on the data engineering term "Extract, Transform, Load" (ETL) – reflecting our mission to extract value from your data, transform it through AI, and load it into systems that drive business growth.</p>',
    etlodeGraphic: {
      rawData: "Raw Data",
      aiProcessing: "AI Processing",
      businessGrowth: "Business Growth",
      tagline: "Extract value • Transform with AI • Load for growth"
    },
    founderTitle: "Meet the Founder",
    founderName: "Lee Sommerfeldt",
    founderDescription: "Lee combines a unique background in business process management, machine learning, and Japanese language to deliver AI solutions that work across cultural and linguistic boundaries. With experience at Panasonic and Sumitomo, Lee understands the unique challenges of globalized business environments.",
    founderEducation: {
      title: "Education",
      degree1: "MS in Information Systems, University of Nevada",
      degree2: "BS in Business Administration, Washington & Lee University",
      degree3: "BA in East Asian Languages & Literature (Japanese), Washington & Lee University",
    },
    techSkills: {
      title: "Technical Expertise",
      programmingTitle: "Programming",
      programming: ["Python", "SQL (T-SQL, PostgreSQL, SQLite)", "TypeScript", "R"],
      webDevTitle: "Web Development",
      webDev: ["SvelteKit", "FastAPI", "Tailwind CSS"],
      aiTitle: "AI & Machine Learning",
      ai: ["Agentic AI Frameworks (LangChain)", "OpenAI API", "Retrieval-Augmented Generation", "Prompt Engineering"],
      languagesTitle: "Languages",
      languages: ["English (Native)", "Japanese (Professional)"],
      otherTitle: "Other Skills",
      other: ["Git Version Control", "Linux (Ubuntu, Proxmox)", "Office365"],
    },
    journey: {
      title: "Professional Journey",
      timeline: [
      {
        year: "2024",
        title: "Founded ET-Lode",
        description: "Established ET-Lode to provide custom AI automation solutions with a focus on Retrieval Augmented Generation and agentic frameworks."
      },
      {
        year: "2023",
        title: "Graduated from University of Nevada, Reno",
        description: "Earned a Master of Science in Information Systems with a 4.0 GPA."
      },
      {
        year: "2020-2024",
        title: "Manager of Business Process & Technology",
        description: "Led ERP migration and developed data analysis platform improving operational efficiency."
      },
      {
        year: "2019-2020",
        title: "Sourcing Analyst",
        description: "Achieved significant cost savings via sourcing contracts with international vendors."
      },
      {
        year: "2018-2019",
        title: "Bilingual Production Planner",
        description: "Managed production planning across multiple global factories."
      },
      {
        year: "2018",
        title: "Graduated from Washington & Lee University",
        description: "Earned dual degrees in Business Administration and Japanese with honors."
      },
      {
        year: "2016-2017",
        title: "Full Year Abroad at International Christian University",
        description: "Completed intensive Japanese language program in Tokyo."
      },
      ]
    },

  },
  contact: {
    headerTitle: "Contact | ET-Lode",
    metaDescription: "Connect with ET-Lode for AI automation solutions, multilingual chatbots, and business process improvement.",
    title: "Contact",
    form: {
      name: "Name *",
      email: "Email *",
      company: "Company",
      phone: "Phone",
      message: "Message *",
      submit: "Send Message",
      sending: "Sending...",
      thanks: "Thank You!",
      success: "Your message has been received. We'll get back to you within 1-2 business days.",
      sendAnother: "Send Another Message",
      serviceOfInterest: "Service of Interest",
      serviceDropdown: "Select a service",
      serviceOptions: {
        1: "Multilingual AI Chatbots",
        2: "RAG-Enabled LLM Solutions",
        3: "Workflow Automation",
        4: "Web Development",
        5: "Social Media Management",
        6: "Translation Services",
        7: "Other / Custom Solutions"
      },
      language: "Preferred Language",
      english: "English",
      japanese: "Japanese",
      
    },
    info: {
      title: "Contact Information",
      email: "Email",
      phone: "Phone",
      responseTime: "Response Time",
      responseTimeDescription: "We typically respond within 1-2 business days.",
      languages: "Languages",
      languagesDescription: "Services available in English and Japanese",
    },
  }
};