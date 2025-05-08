<script>
    import { onMount } from 'svelte';
    
    let showScrollToTop = false;
    
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    onMount(() => {
      const handleScroll = () => {
        showScrollToTop = window.scrollY > 500;
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    });
  </script>
  
  <section class="bg-gradient-to-r from-black to-gray-900 text-white py-20">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-10 md:mb-0">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            AI Automation for <span class="text-teal-400">Global</span> Business
          </h1>
          <p class="text-xl mb-8">
            Multilingual AI solutions that streamline operations and enhance customer experiences.
          </p>
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="/services" class="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-lg text-center">
              Explore Services
            </a>
            <a href="/contact" class="border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black font-medium py-3 px-6 rounded-lg text-center">
              Get in Touch
            </a>
          </div>
        </div>
        <div class="md:w-1/2 flex justify-center">
          <img src="/images/ai-illustration.svg" alt="AI Automation Illustration" class="max-w-full h-auto" />
        </div>
      </div>
    </div>
  </section>
  
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Our AI Automation Services</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div class="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Multilingual AI Chatbots</h3>
          <p class="text-gray-600">
            Custom AI chatbots that can communicate in English and Japanese, providing immediate customer support and product recommendations.
          </p>
        </div>
        
        <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div class="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">RAG-Enabled LLM Solutions</h3>
          <p class="text-gray-600">
            AI systems that can reference your business data, FAQs, and product catalogs to provide accurate and contextual responses.
          </p>
        </div>
        
        <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Workflow Automation</h3>
          <p class="text-gray-600">
            Custom automation solutions that streamline your business processes, reducing manual tasks and improving efficiency.
          </p>
        </div>
      </div>
      
      <div class="text-center mt-12">
        <a href="/services" class="inline-block bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg">
          View All Services
        </a>
      </div>
    </div>
  </section>
  
  <section class="py-16 bg-gray-100">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Why Choose ET-Lode?</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div class="flex">
          <div class="mr-4 mt-1">
            <div class="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-2">Multilingual Expertise</h3>
            <p class="text-gray-600">
              With fluency in both English and Japanese, we bridge communication gaps and deliver AI solutions that truly speak your language.
            </p>
          </div>
        </div>
        
        <div class="flex">
          <div class="mr-4 mt-1">
            <div class="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-2">Technical Excellence</h3>
            <p class="text-gray-600">
              Our team brings extensive experience in AI, data engineering, and web development to deliver robust, scalable solutions.
            </p>
          </div>
        </div>
        
        <div class="flex">
          <div class="mr-4 mt-1">
            <div class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-2">Business Process Knowledge</h3>
            <p class="text-gray-600">
              With experience managing ERP migrations and business processes, we understand how to integrate AI into your existing workflows.
            </p>
          </div>
        </div>
        
        <div class="flex">
          <div class="mr-4 mt-1">
            <div class="w-10 h-10 bg-teal-400 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-2">Proven Results</h3>
            <p class="text-gray-600">
              Our solutions have helped businesses achieve significant efficiency improvements and cost savings.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Featured Case Study</h2>
      
      <div class="bg-gray-50 rounded-lg shadow-md overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/2">
            <img src="/images/ecommerce-case-study.jpg" alt="eCommerce AI Chatbot" class="w-full h-full object-cover" />
          </div>
          <div class="md:w-1/2 p-8">
            <h3 class="text-2xl font-bold mb-4">Multilingual eCommerce AI Chatbot</h3>
            <p class="text-gray-600 mb-6">
              Developed an AI-powered chatbot for a Japanese eCommerce business that answers customer queries in both Japanese and English, providing personalized product recommendations based on a database of products and customer preferences.
            </p>
            <div class="mb-6">
              <h4 class="font-bold text-teal-600 mb-2">Results:</h4>
              <ul class="text-gray-600 space-y-2">
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>85% reduction in customer service response time</span>
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>32% increase in conversion rate from international customers</span>
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>24/7 customer service coverage without additional staffing</span>
                </li>
              </ul>
            </div>
            <a href="/case-studies" class="inline-block text-teal-600 font-medium hover:text-teal-800">
              View More Case Studies →
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <section class="py-16 bg-black text-white">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-8">Ready to Transform Your Business with AI?</h2>
      <p class="text-xl mb-8 max-w-2xl mx-auto">
        Let's discuss how our multilingual AI solutions can enhance your customer experience and streamline your operations.
      </p>
      <a href="/contact" class="inline-block bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-8 rounded-lg">
        Contact Us Today
      </a>
    </div>
  </section>
  
  {#if showScrollToTop}
    <button 
      on:click={scrollToTop}
      class="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  {/if}