<script lang="ts">
  import {t} from '$lib/i18n'
  import { derived } from 'svelte/store';
  import { base } from '$app/paths';
      
  // Make services reactive by deriving it from the $t store
  const services = derived(t, ($t) => [
    {
      id: 1,
      icon: "chat-bubble",
      title: $t.services.chatbots.title,
      description: $t.services.chatbots.description,
      features: [
        $t.services.chatbots.features[1],
        $t.services.chatbots.features[2],
        $t.services.chatbots.features[3],
        $t.services.chatbots.features[4],
        $t.services.chatbots.features[5],
      ]
    },
    {
      id: 2,
      icon: "database",
      title: $t.services.rag.title,
      description: $t.services.rag.description,
      features: [
        $t.services.rag.features[1],
        $t.services.rag.features[2],
        $t.services.rag.features[3],
        $t.services.rag.features[4],
        $t.services.rag.features[5],
      ]
    },
    {
      id: 3,
      icon: "automation",
      title: $t.services.automation.title,
      description: $t.services.automation.description,
      features: [
        $t.services.automation.features[1],
        $t.services.automation.features[2],
        $t.services.automation.features[3],
        $t.services.automation.features[4],
        $t.services.automation.features[5],
      ]
    },
    {
      id: 4,
      icon: "web",
      title: $t.services.webdev.title,
      description: $t.services.webdev.description,
      features: [
        $t.services.webdev.features[1],
        $t.services.webdev.features[2],
        $t.services.webdev.features[3],
        $t.services.webdev.features[4],
        $t.services.webdev.features[5],
      ]
    },
    {
      id: 5,
      icon: "social",
      title: $t.services.socialMedia.title,
      description: $t.services.socialMedia.description,
      features: [
        $t.services.socialMedia.features[1],
        $t.services.socialMedia.features[2],
        $t.services.socialMedia.features[3],
        $t.services.socialMedia.features[4],
        $t.services.socialMedia.features[5],
      ]
    },
    {
      id: 6,
      icon: "translate",
      title: $t.services.translation.title,
      description: $t.services.translation.description,
      features: [
        $t.services.translation.features[1],
        $t.services.translation.features[2],
        $t.services.translation.features[3],
        $t.services.translation.features[4],
        // $t.services.translation.features[5],
      ]
    }
  ]);
  
  type IconDictionary = {
    [key: string]: string;
  }
  
  let icons: IconDictionary = {
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
    <title>{$t.services.headerTitle}</title>
    <meta name="description" content={$t.services.metaDescription} />
    
    <!-- Brand-specific keywords -->
    <meta name="keywords" content="etlode services, et-lode ai automation, etlode chatbots, etlode LLM, etlode workflow automation, AI automation services, multilingual chatbots, RAG-enabled LLM" />
    
    <!-- Open Graph Tags -->
    <meta property="og:title" content="AI Automation Services | ET-Lode" />
    <meta property="og:description" content="Comprehensive AI automation solutions including multilingual chatbots, RAG-enabled LLM solutions, workflow automation, web development, and translation services." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://etlode.com/services" />
    <meta property="og:image" content="https://etlode.com/images/etlode-logo-w-name.png" />
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="AI Automation Services | ET-Lode" />
    <meta name="twitter:description" content="Comprehensive AI automation solutions for global businesses." />
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "AI Automation Services",
      "provider": {
        "@type": "Organization",
        "name": "ET-Lode, LLC",
        "url": "https://etlode.com"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI Automation Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Multilingual AI Chatbots",
              "description": "Custom AI chatbots that communicate fluently in multiple target languages, providing immediate customer support, product recommendations, and answers to frequently asked questions.",
              "category": "AI Solutions"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "RAG-Enabled LLM Solutions",
              "description": "Large Language Models with Retrieval-Augmented Generation capabilities that can access and reference your business data to provide accurate, context-aware responses.",
              "category": "AI Solutions"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Workflow Automation",
              "description": "Custom automation solutions that streamline your business processes, reducing manual tasks and improving operational efficiency.",
              "category": "Business Automation"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Web Development",
              "description": "Modern, responsive web applications built with cutting-edge technologies like SvelteKit and integrated with your AI solutions.",
              "category": "Web Development"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Translation Services",
              "description": "Professional translation services for your content, product descriptions, and marketing materials between Japanese and English.",
              "category": "Translation"
            }
          }
        ]
      }
    }
    </script>
</svelte:head>

<section class="bg-black text-white py-16">
  <div class="container mx-auto px-4 text-center">
    <h1 class="text-4xl font-bold mb-4">{$t.services.title}</h1>
    <p class="text-xl max-w-2xl mx-auto">
      {$t.services.description}
    </p>
  </div>
</section>

<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 gap-12">
      {#each $services as service, index}
        <div class="bg-gray-50 rounded-lg shadow-md overflow-hidden">
          <div class="p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                class:bg-teal-500={index % 3 === 0}
                class:bg-yellow-400={index % 3 === 1}
                class:bg-orange-500={index % 3 === 2}>
                {@html icons[service.icon]}
              </div>
              <h2 class="text-2xl font-bold">{service.title}</h2>
            </div>
            
            <p class="text-gray-600 mb-6">{service.description}</p>
            
            <div>
              <h3 class="font-bold text-teal-600 mb-3">{$t.services.keyFeatures}</h3>
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
    <h2 class="text-3xl font-bold mb-8">{$t.services.customSolutions}</h2>
    <p class="text-xl mb-8 max-w-2xl mx-auto">
      {$t.services.customSolutionsDescription}
    </p>
    <a href="{base}/contact" class="inline-block bg-black hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-lg">
      {$t.cta.consultation.button}
    </a>
  </div>
</section>