<script lang="ts">
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
    import { t } from '$lib/i18n'
    import EtlodeAboutPageGraphic from '$lib/components/etlode-about-page-graphic.svelte';

    // Skills data
    const skills =    {
      programming: $t.about.techSkills.programming,
      webDev: $t.about.techSkills.webDev,
      ai: $t.about.techSkills.ai,
      languages: $t.about.techSkills.languages,
      other: $t.about.techSkills.other
    };
    
    // Timeline data
    const timeline = $t.about.journey.timeline;

  </script>
  
  <svelte:head>
    <title>{$t.about.headerTitle}</title>
    <meta name="description" content={$t.about.metaDescription} />
  </svelte:head>
  
  <section class="bg-black text-white py-16">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-4xl font-bold mb-4">{$t.about.title}</h1>
      <p class="text-xl max-w-2xl mx-auto">
        {$t.about.subTitle}
      </p>
    </div>
  </section>
  
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-10 md:mb-0 md:pr-12">
          <h2 class="text-3xl font-bold mb-6">{$t.about.storyTitle}</h2>
          {@html $t.about.storyDescription}
        </div>
        <div class="w-full lg:w-1/2">
          <EtlodeAboutPageGraphic />
        </div>
      </div>
    </div>
  </section>
  
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">{$t.about.founderTitle}</h2>
      
      <div class="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden">
        <div class="md:w-1/3">
          <img src="{base}/images/leesomm_headshot.jpg" alt="Lee Sommerfeldt" class="w-full h-full object-cover" />
        </div>
        <div class="md:w-2/3 p-8">
          <h3 class="text-2xl font-bold mb-4">{$t.about.founderName}</h3>
          <p class="text-gray-700 mb-6">
            {$t.about.founderDescription}
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-bold text-teal-600 mb-2">{$t.about.founderEducation.title}</h4>
              <ul class="text-gray-600 space-y-1">
                <li>{$t.about.founderEducation.degree1}</li>
                <li>{$t.about.founderEducation.degree2}</li>
                <li>{$t.about.founderEducation.degree3}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">{$t.about.techSkills.title}</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-bold mb-4 text-teal-600">{$t.about.techSkills.programmingTitle}</h3>
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
          <h3 class="text-xl font-bold mb-4 text-yellow-500">{$t.about.techSkills.webDevTitle}</h3>
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
        </div>
        
        <div class="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-bold mb-4 text-orange-500">{$t.about.techSkills.aiTitle}</h3>
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
          <h3 class="text-xl font-bold mb-4 text-purple-600">{$t.about.techSkills.languagesTitle}</h3>
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
        </div>
        
        <div class="bg-gray-50 p-6 rounded-lg shadow-md">  
          <h3 class="text-xl font-bold mb-4 text-blue-600">{$t.about.techSkills.otherTitle}</h3>
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
      <h2 class="text-3xl font-bold text-center mb-12">{$t.about.journey.title}</h2>
      
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