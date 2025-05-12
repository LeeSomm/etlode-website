<script>
    import { onMount } from 'svelte';
    import AIAutomationGraphic from '$lib/components/ai-automation-graphic.svelte';
    import {t} from '$lib/i18n'
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
  
  <svelte:head>
    <title>{$t.home.headerTitle}</title>
    <meta name="description" content={$t.home.metaDescription} />
  </svelte:head>
  
  <section class="bg-gradient-to-r from-black to-gray-900 text-white py-20">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-10 md:mb-0">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            <!-- AI Automation for <span class="text-teal-400">Global</span> Business -->
            {@html $t.home.hero.title}
          </h1>
          <p class="text-xl mb-8">
            {$t.home.hero.subtitle}
          </p>
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="/services" class="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-lg text-center">
              {$t.cta.services}
            </a>
            <a href="/contact" class="border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black font-medium py-3 px-6 rounded-lg text-center">
              {$t.cta.contact}
            </a>
          </div>
        </div>
        <div class="md:w-1/2 flex justify-center">
            <AIAutomationGraphic />
        </div>
      </div>
    </div>
  </section>
  
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">{$t.home.aiServices}</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div class="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">{$t.services.chatbots.title}</h3>
          <p class="text-gray-600">
            {$t.services.chatbots.description}
          </p>
        </div>
        
        <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div class="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">{$t.services.rag.title}</h3>
          <p class="text-gray-600">
            {$t.services.rag.description}
          </p>
        </div>
        
        <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">{$t.services.automation.title}</h3>
          <p class="text-gray-600">
            {$t.services.automation.description}
          </p>
        </div>
      </div>
      
      <div class="text-center mt-12">
        <a href="/services" class="inline-block bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg">
          {$t.cta.allServices}
        </a>
      </div>
    </div>
  </section>
  
  <section class="py-16 bg-gray-100">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">{$t.home.whyETLode.title}</h2>
      
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
            <h3 class="text-xl font-bold mb-2">{$t.home.whyETLode.skills.multilingual.title}</h3>
            <p class="text-gray-600">
              {$t.home.whyETLode.skills.multilingual.description}
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
            <h3 class="text-xl font-bold mb-2">{$t.home.whyETLode.skills.technicalExcellence.title}</h3>
            <p class="text-gray-600">
              {$t.home.whyETLode.skills.technicalExcellence.description}
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
            <h3 class="text-xl font-bold mb-2">{$t.home.whyETLode.skills.businessProcess.title}</h3>
            <p class="text-gray-600">
              {$t.home.whyETLode.skills.businessProcess.description}
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
            <h3 class="text-xl font-bold mb-2">{$t.home.whyETLode.skills.results.title}</h3>
            <p class="text-gray-600">
              {$t.home.whyETLode.skills.results.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">{$t.home.caseStudy.title}</h2>
      
      <div class="bg-gray-50 rounded-lg shadow-md overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/2">
            <img src="/images/chatbot-demo.gif" alt="eCommerce AI Chatbot" class="w-full h-full object-contain" />
          </div>
          <div class="md:w-1/2 p-8">
            <h3 class="text-2xl font-bold mb-4">{$t.home.caseStudy.ecChatbot.title}</h3>
            <p class="text-gray-600 mb-6">
                {$t.home.caseStudy.ecChatbot.description}
            </p>
            <div class="mb-6">
              <h4 class="font-bold text-teal-600 mb-2">{$t.home.caseStudy.ecChatbot.results.title}</h4>
              <ul class="text-gray-600 space-y-2">
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{$t.home.caseStudy.ecChatbot.results[1]}</span>
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{$t.home.caseStudy.ecChatbot.results[2]}</span>
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{$t.home.caseStudy.ecChatbot.results[3]}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <section class="py-16 bg-black text-white">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-8">{$t.cta.consultation.title}</h2>
      <p class="text-xl mb-8 max-w-2xl mx-auto">
        {$t.cta.consultation.description}
      </p>
      <a href="/contact" class="inline-block bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-8 rounded-lg">
        {$t.cta.contact}
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