<script>
    import { onMount } from 'svelte';
    
    // Skills data
    const skills = {
      programming: ["Python", "R", "SQL (T-SQL, PostgreSQL, SQLite)", "VBA", "TypeScript"],
      webDev: ["SvelteKit", "FastAPI", "Tailwind CSS"],
      ai: ["LangChain", "OpenAI API", "Retrieval-Augmented Generation", "Prompt Engineering"],
      languages: ["English (Native)", "Japanese (Professional)"],
      other: ["Git", "Linux (Ubuntu, Proxmox)", "Office365 Automation"]
    };
    
    // Timeline data
    const timeline = [
      {
        year: "2024",
        title: "Founded ET-Lode",
        description: "Established ET-Lode to provide custom AI automation solutions with a focus on multilingual capabilities."
      },
      {
        year: "2020-2024",
        title: "Manager of Business Process & Technology",
        description: "Led ERP migration and developed data analysis solutions that improved operational efficiency."
      },
      {
        year: "2019-2020",
        title: "Sourcing Analyst at Panasonic",
        description: "Achieved significant cost savings and developed reports to extract actionable insights from spend data."
      },
      {
        year: "2018-2019",
        title: "Bilingual Production Planner",
        description: "Managed production planning across multiple facilities and facilitated transitions to new production sites."
      },
      {
        year: "2016-2017",
        title: "Study in Japan",
        description: "Completed intensive Japanese language program at International Christian University in Tokyo."
      },
      {
        year: "2018",
        title: "Graduated from Washington & Lee University",
        description: "Earned dual degrees in Business Administration and Japanese with honors."
      }
    ];
  </script>
  
  <svelte:head>
    <title>About | ET-Lode</title>
    <meta name="description" content="Learn about ET-Lode's expertise in AI automation, multilingual solutions, and business process improvement." />
  </svelte:head>
  
  <section class="bg-black text-white py-16">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-4xl font-bold mb-4">About ET-Lode</h1>
      <p class="text-xl max-w-2xl mx-auto">
        Extract, Transform, Load – Empowering businesses with multilingual AI solutions.
      </p>
    </div>
  </section>
  
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-10 md:mb-0 md:pr-12">
          <h2 class="text-3xl font-bold mb-6">Our Story</h2>
          <p class="mb-4">
            ET-Lode was founded by Lee Sommerfeldt, combining expertise in business process management, data science, and multilingual communication to create a unique AI automation consultancy.
          </p>
          <p class="mb-4">
            The name "ET-Lode" is a play on the data engineering term "Extract, Transform, Load" (ETL) – reflecting our mission to extract value from your data, transform it through AI, and load it into systems that drive business growth.
          </p>
          <p>
            With experience working in both American and Japanese business environments, we specialize in creating AI solutions that bridge language barriers and cultural differences, enabling businesses to provide seamless service to customers worldwide.
          </p>
        </div>
        <div class="md:w-1/2">
          <img src="/images/about-illustration.svg" alt="About ET-Lode" class="w-full rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  </section>
  
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Meet the Founder</h2>
      
      <div class="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden">
        <div class="md:w-1/3">
          <img src="/images/founder-photo.jpg" alt="Lee Sommerfeldt" class="w-full h-full object-cover" />
        </div>
        <div class="md:w-2/3 p-8">
          <h3 class="text-2xl font-bold mb-4">Lee Sommerfeldt</h3>
          <p class="text-gray-700 mb-6">
            Lee combines a unique background in business process management, data science, and Japanese language to deliver AI solutions that work across cultural and linguistic boundaries. With experience at companies like Panasonic and Sumitomo, Lee understands both American and Japanese business environments.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-bold text-teal-600 mb-2">Education</h4>
              <ul class="text-gray-600 space-y-1">
                <li>MS in Information Systems, University of Nevada</li>
                <li>BS in Business Administration, Washington & Lee University</li>
                <li>BA in East Asian Languages & Literature (Japanese)</li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-teal-600 mb-2">Achievements</h4>
              <ul class="text-gray-600 space-y-1">
                <li>UNR College of Business Outstanding Graduate Student Award</li>
                <li>Achieved $682,000 in realized cost savings at Panasonic</li>
                <li>Pro Translator for Amazon Japan and Fanatics Japan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Technical Expertise</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-bold mb-4 text-teal-600">Programming</h3>
          <ul class="space-y-2">
            {#each skills.programming as skill}
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {skill}
              </li>
            {/each}
          </ul>
        </div>
        
        <div class="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-bold mb-4 text-yellow-500">Web Development</h3>
          <ul class="space-y-2">
            {#each skills.webDev as skill}
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {skill}
              </li>
            {/each}
          </ul>
          
          <h3 class="text-xl font-bold mb-4 mt-6 text-orange-500">AI & Machine Learning</h3>
          <ul class="space-y-2">
            {#each skills.ai as skill}
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {skill}
              </li>
            {/each}
          </ul>
        </div>
        
        <div class="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-bold mb-4 text-purple-600">Languages</h3>
          <ul class="space-y-2">
            {#each skills.languages as skill}
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {skill}
              </li>
            {/each}
          </ul>
          
          <h3 class="text-xl font-bold mb-4 mt-6 text-blue-600">Other Skills</h3>
          <ul class="space-y-2">
            {#each skills.other as skill}
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {skill}
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </section>
  
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Professional Journey</h2>
      
      <div class="relative">
        <!-- Timeline Line -->
        <div class="absolute h-full w-0.5 bg-teal-400 left-0 md:left-1/2 transform md:-translate-x-1/2"></div>
        
        <!-- Timeline Items -->
        <div class="space-y-12">
          {#each timeline as item, i}
            <div class="relative flex items-center justify-between flex-col {i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}">
              <!-- Timeline Dot -->
              <div class="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-teal-500 rounded-full z-10"></div>
              
              <!-- Year -->
              <div class="w-full md:w-5/12 text-center md:text-right {i % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:order-2 md:text-left'}">
                <span class="inline-block bg-black text-white text-lg font-bold py-1 px-4 rounded-full mb-2">{item.year}</span>
              </div>
              
              <!-- Content -->
              <div class="w-full md:w-5/12 bg-white p-6 rounded-lg shadow-md {i % 2 === 0 ? 'md:pl-8 md:text-left' : 'md:pr-8 md:text-left'}">
                <h3 class="text-xl font-bold mb-2">{item.title}</h3>
                <p class="text-gray-600">{item.description}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>