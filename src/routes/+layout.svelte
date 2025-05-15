<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { language, setLanguage, t, type LanguageKey } from '$lib/i18n';

	let isMenuOpen = false;
	let currentLanguage = 'en';
	
	const toggleMenu = () => {
	  isMenuOpen = !isMenuOpen;
	};
	
	const switchLanguage = (lang: LanguageKey) => {
		setLanguage(lang);
	};
  
  	$: currentLanguage = $language;

</script>
  
<svelte:head>
	<meta name="language" content={$language}/>
</svelte:head>

<header class="bg-black text-white">
  <div class="container mx-auto px-4 py-4 flex justify-between items-center">
    <div class="flex items-center">
      <a href="{base}/" class="flex items-center">
        <img src="{base}/images/etlode-logo-only.png" alt="ET-Lode Logo" class="h-12 mr-3" />
        <span class="text-xl font-bold">ET-Lode</span>
      </a>  
    </div>
    
    <div class="hidden md:flex space-x-6">
      <a href="{base}/" class="hover:text-teal-400 {page.url.pathname === '/' || page.url.pathname === base+'/' ? 'text-teal-400' : ''}">{$t.navigation.home}</a>
      <a href="{base}/services" class="hover:text-teal-400 {page.url.pathname.includes('/services') ? 'text-teal-400' : ''}">{$t.navigation.services}</a>
      <a href="{base}/about" class="hover:text-teal-400 {page.url.pathname.includes('/about') ? 'text-teal-400' : ''}">{$t.navigation.about}</a>
      <a href="{base}/contact" class="hover:text-teal-400 {page.url.pathname.includes('/contact') ? 'text-teal-400' : ''}">{$t.navigation.contact}</a>
    </div>
    
    <div class="hidden md:flex items-center space-x-4">
      <button 
        class="px-2 py-1 rounded {currentLanguage === 'en' ? 'bg-yellow-400 text-black' : 'text-yellow-400'}"
        on:click={() => switchLanguage('en')}
      >
        EN
      </button>
      <button 
        class="px-2 py-1 rounded {currentLanguage === 'ja' ? 'bg-yellow-400 text-black' : 'text-yellow-400'}"
        on:click={() => switchLanguage('ja')}
      >
        日本語
      </button>
    </div>
    
    <button class="md:hidden text-white" on:click={toggleMenu} aria-label="Toggle menu">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
  
  {#if isMenuOpen}
    <div class="md:hidden bg-gray-900 py-4 px-4">
      <nav class="flex flex-col space-y-4">
        <a href="{base}/" class="hover:text-teal-400 {page.url.pathname === '/' || page.url.pathname === base+'/' ? 'text-teal-400' : ''}">{$t.navigation.home}</a>
        <a href="{base}/services" class="hover:text-teal-400 {page.url.pathname.includes('/services') ? 'text-teal-400' : ''}">{$t.navigation.services}</a>
        <a href="{base}/about" class="hover:text-teal-400 {page.url.pathname.includes('/about') ? 'text-teal-400' : ''}">{$t.navigation.about}</a>
        <a href="{base}/contact" class="hover:text-teal-400 {page.url.pathname.includes('/contact') ? 'text-teal-400' : ''}">{$t.navigation.contact}</a>
        <div class="flex space-x-4 pt-2">
          <button 
            class="px-2 py-1 rounded {currentLanguage === 'en' ? 'bg-yellow-400 text-black' : 'text-yellow-400'}"
            on:click={() => switchLanguage('en')}
          >
            EN
          </button>
          <button 
            class="px-2 py-1 rounded {currentLanguage === 'ja' ? 'bg-yellow-400 text-black' : 'text-yellow-400'}"
            on:click={() => switchLanguage('ja')}
          >
            日本語
          </button>
        </div>
      </nav>
    </div>
  {/if}
</header>
  
<main>
	<slot />
</main>
  
<footer class="bg-black text-white py-8">
  <div class="container mx-auto px-4">
    <div class="flex flex-col md:flex-row justify-between">
      <div class="mb-6 md:mb-0">
        <img src="{base}/images/etlode-logo-only.png" alt="ET-Lode Logo" class="h-10 mb-3" />
        <p class="text-sm text-gray-400">{$t.footer.tagline}</p>
      </div>
      
      <div class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12 md:pr-8">
        <div>
          <h3 class="font-bold mb-3 text-teal-400">{$t.footer.quickLinks}</h3>
          <nav class="flex flex-col space-y-2">
            <a href="{base}/" class="text-sm hover:text-teal-400">{$t.navigation.home}</a>
            <a href="{base}/services" class="text-sm hover:text-teal-400">{$t.navigation.services}</a>
            <a href="{base}/about" class="text-sm hover:text-teal-400">{$t.navigation.about}</a>
            <a href="{base}/contact" class="text-sm hover:text-teal-400">{$t.navigation.contact}</a>
          </nav>
        </div>
        
        <div>
          <h3 class="font-bold mb-3 text-teal-400">{$t.footer.contactHeading}</h3>
          <p class="text-sm">Email: <a href="mailto:lee@etlode.com" class="hover:text-teal-400">lee@etlode.com</a></p>
          <p class="text-sm">Phone: +1 (775) 391-8120</p>
        </div>
      </div>
    </div>
    
    <div class="border-t border-gray-800 mt-8 pt-6 text-sm text-gray-500">
      <p>&copy; {new Date().getFullYear()} ET-Lode, LLC. {$t.footer.allRightsReserved}</p>
    </div>
  </div>
</footer>