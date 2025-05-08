<script>
  let services = [
    {
      id: 1,
      title: "Multilingual AI Chatbots",
      icon: "chat-bubble",
      description: "Custom AI chatbots that communicate fluently in multiple target languages, providing immediate customer support, product recommendations, and answers to frequently asked questions.",
      features: [
        "Semantic understanding via natural language processing",
        "Integration with your product database and knowledge base",
        "Custom personality and tone matching your brand",
        "Analytics dashboard to track user interactions",
        "Continuous improvement based on chat logs"
      ]
    },
    {
      id: 2,
      title: "RAG-Enabled LLM Solutions",
      icon: "database",
      description: "Large Language Models with Retrieval-Augmented Generation capabilities that can access and reference your business data to provide accurate, context-aware responses.",
      features: [
        "Integration with your existing databases and documents",
        "Real-time information retrieval and processing",
        "Customized knowledge base creation and maintenance",
        "Multi-document query capability",
        "Secure handling of sensitive information"
      ]
    },
    {
      id: 3,
      title: "Workflow Automation",
      icon: "automation",
      description: "Custom automation solutions that streamline your business processes, reducing manual tasks and improving operational efficiency.",
      features: [
        "Office365 integration and automation",
        "Document processing and data extraction",
        "Custom ETL (Extract, Transform, Load) processes",
        "Business process analysis and optimization",
        "Integration with legacy systems"
      ]
    },
    {
      id: 4,
      title: "Web Development",
      icon: "web",
      description: "Modern, responsive web applications built with cutting-edge technologies like SvelteKit and integrated with your AI solutions.",
      features: [
        "SvelteKit and TypeScript development",
        "Responsive, mobile-first design",
        "AI integration for personalized user experiences",
        "Performance optimization",
        "Multilingual support"
      ]
    },
    {
      id: 5,
      title: "English Social Media Management",
      icon: "social",
      description: "Professional management of your English-language social media presence to engage with international customers.",
      features: [
        "Content strategy development",
        "Regular posting and engagement",
        "Analytics and performance reporting",
        "AI-assisted content creation",
        "Cross-platform management"
      ]
    },
    {
      id: 6,
      title: "Japanese/English Translation",
      icon: "translate",
      description: "Professional translation services for your content, product descriptions, and marketing materials between Japanese and English.",
      features: [
        "Technical documentation translation",
        "Marketing content localization",
        "Product description translation",
        "UI/UX text translation",
      ]
    }
  ];
  
  let icons = {
    "chat-bubble": `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>`,
    "database": `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>`,
    "automation": `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>`,
    "web": `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>`,
    "social": `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
    </svg>`,
    "translate": `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>`
  };
</script>

<svelte:head>
  <title>Services | ET-Lode</title>
  <meta name="description" content="AI automation services including multilingual chatbots, RAG-enabled LLMs, workflow automation, and more." />
</svelte:head>

<section class="bg-black text-white py-16">
  <div class="container mx-auto px-4 text-center">
    <h1 class="text-4xl font-bold mb-4">Our Services</h1>
    <p class="text-xl max-w-2xl mx-auto">
      Comprehensive AI automation solutions designed to help your business operate more efficiently in multiple languages.
    </p>
  </div>
</section>

<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 gap-12">
      {#each services as service}
        <div class="bg-gray-50 rounded-lg shadow-md overflow-hidden">
          <div class="p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mr-4">
                {@html icons[service.icon]}
              </div>
              <h2 class="text-2xl font-bold">{service.title}</h2>
            </div>
            
            <p class="text-gray-600 mb-6">{service.description}</p>
            
            <div>
              <h3 class="font-bold text-teal-600 mb-3">Key Features:</h3>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                {#each service.features as feature}
                  <li class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="py-16 bg-teal-50">
  <div class="container mx-auto px-4 text-center">
    <h2 class="text-3xl font-bold mb-8">Custom Solutions</h2>
    <p class="text-xl mb-8 max-w-2xl mx-auto">
      Don't see exactly what you need? We specialize in creating custom AI automation solutions tailored to your specific business requirements.
    </p>
    <a href="/contact" class="inline-block bg-black hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-lg">
      Request a Consultation
    </a>
  </div>
</section>