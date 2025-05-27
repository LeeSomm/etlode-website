<script lang="ts">
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';

  const faqs = [
    {
      question: "What is ET-Lode?",
      answer: "ET-Lode (etlode) is an AI automation consultancy specializing in multilingual solutions for global businesses. We help companies streamline operations and enhance customer experiences through advanced AI technologies."
    },
    {
      question: "How do you pronounce ET-Lode?",
      answer: "ET-Lode is pronounced 'ee-tee-lohd' and can also be written as 'etlode'. The name is inspired by the data engineering term ETL (Extract, Transform, Load)."
    },
    {
      question: "What services does etlode offer?",
      answer: "ET-Lode offers comprehensive AI automation services including multilingual chatbots, RAG-enabled LLM solutions, workflow automation, web development, social media management, and Japanese-English translation services."
    },
    {
      question: "Who founded ET-Lode?",
      answer: "ET-Lode was founded by Lee Sommerfeldt, who brings expertise in business process management, machine learning, and multilingual communication with fluency in both English and Japanese."
    },
    {
      question: "What makes etlode different from other AI companies?",
      answer: "ET-Lode specializes in multilingual AI solutions with particular expertise in English-Japanese language bridging. We combine technical excellence with deep understanding of international business processes."
    },
    {
      question: "How can I contact ET-Lode?",
      answer: "You can reach ET-Lode by email at lee@etlode.com, by phone at +1 (775) 391-8120, or through our contact form. We provide support in both English and Japanese."
    },
    {
      question: "What industries does etlode serve?",
      answer: "ET-Lode serves businesses across various industries including eCommerce, manufacturing, technology, consulting, and any organization looking to implement AI automation for global operations."
    },
    {
      question: "Does ET-Lode offer custom AI solutions?",
      answer: "Yes, ET-Lode specializes in creating custom AI automation solutions tailored to your specific business requirements. We design and build solutions from the ground up to meet your unique needs."
    }
  ];
</script>

<svelte:head>
  <title>Frequently Asked Questions | ET-Lode</title>
  <meta name="description" content="Find answers to common questions about ET-Lode (etlode), our AI automation services, multilingual solutions, and how we can help your business." />
  
  <!-- Brand-specific keywords -->
  <meta name="keywords" content="etlode faq, et-lode questions, etlode help, AI automation FAQ, multilingual chatbot questions, etlode support" />
  
  <!-- Open Graph Tags -->
  <meta property="og:title" content="FAQ | ET-Lode" />
  <meta property="og:description" content="Find answers to common questions about ET-Lode's AI automation services and multilingual solutions." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://etlode.com/faq" />
  <meta property="og:image" content="https://etlode.com/images/etlode-logo-w-name.png" />
  
  <!-- FAQ Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is ET-Lode?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ET-Lode (etlode) is an AI automation consultancy specializing in multilingual solutions for global businesses. We help companies streamline operations and enhance customer experiences through advanced AI technologies."
        }
      },
      {
        "@type": "Question", 
        "name": "How do you pronounce ET-Lode?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ET-Lode is pronounced 'ee-tee-lohd' and can also be written as 'etlode'. The name is inspired by the data engineering term ETL (Extract, Transform, Load)."
        }
      },
      {
        "@type": "Question",
        "name": "What services does etlode offer?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "ET-Lode offers comprehensive AI automation services including multilingual chatbots, RAG-enabled LLM solutions, workflow automation, web development, social media management, and Japanese-English translation services."
        }
      },
      {
        "@type": "Question",
        "name": "Who founded ET-Lode?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ET-Lode was founded by Lee Sommerfeldt, who brings expertise in business process management, machine learning, and multilingual communication with fluency in both English and Japanese."
        }
      }
    ]
  }
  </script>
</svelte:head>

<section class="bg-black text-white py-16">
  <div class="container mx-auto px-4 text-center">
    <h1 class="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
    <p class="text-xl max-w-2xl mx-auto">
      Find answers to common questions about ET-Lode and our AI automation services
    </p>
  </div>
</section>

<section class="py-16 bg-white">
  <div class="container mx-auto px-4 max-w-4xl">
    <div class="space-y-8">
      {#each faqs as faq, index}
        <div class="bg-gray-50 rounded-lg p-6 shadow-md">
          <h3 class="text-xl font-bold mb-3 text-gray-900">{faq.question}</h3>
          <p class="text-gray-700 leading-relaxed">{faq.answer}</p>
        </div>
      {/each}
    </div>
    
    <div class="mt-12 text-center">
      <h2 class="text-2xl font-bold mb-4">Still have questions?</h2>
      <p class="text-gray-600 mb-6">Can't find what you're looking for? We're here to help!</p>
      <a href="{base}/contact" class="inline-block bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-8 rounded-lg">
        Contact ET-Lode
      </a>
    </div>
  </div>
</section>
