<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { language, setLanguage, t, type LanguageKey } from '$lib/i18n';

	let isMenuOpen = false;
	let isProjectsDropdownOpen = false;
	let currentLanguage = 'en';
	
	const toggleMenu = () => {
	  isMenuOpen = !isMenuOpen;
	};

	const toggleProjectsDropdown = () => {
		isProjectsDropdownOpen = !isProjectsDropdownOpen;
	};
	
	const switchLanguage = (lang: LanguageKey) => {
		setLanguage(lang);
	};
  
  $: currentLanguage = $language;

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
	<meta name="language" content={$language}/>
	
	<!-- Hreflang tags for multilingual SEO -->
	<link rel="alternate" hreflang="en" href="https://etlode.com{page.url.pathname}" />
	<link rel="alternate" hreflang="ja" href="https://etlode.com{page.url.pathname}?lang=ja" />
	<link rel="alternate" hreflang="x-default" href="https://etlode.com{page.url.pathname}" />
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
            
      <!-- Projects Dropdown -->
      <div class="relative">
        <button 
          class="hover:text-teal-400 {page.url.pathname.includes('/congress-trading') || page.url.pathname.includes('/spinthewheel') ? 'text-teal-400' : ''} flex items-center"
          onclick={toggleProjectsDropdown} 
        >
          Projects
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        {#if isProjectsDropdownOpen}
          <div 
            class="absolute top-full left-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg z-50"
            role="menu"
            tabindex="-1"
            aria-label="Project Navigation"
            onmouseleave={toggleProjectsDropdown}
          >
            <div class="py-1">
              <a
                href="{base}/congress-trading"
                role="menuitem"
                tabindex="0"
                class="block px-4 py-2 text-sm hover:bg-gray-800 hover:text-teal-400"
              >
                Congressional Trading
              </a>
              <a
                href="{base}/spinthewheel"
                role="menuitem"
                tabindex="0"
                class="block px-4 py-2 text-sm hover:bg-gray-800 hover:text-teal-400"
              >
                Japan Wheel
              </a>
            </div>
          </div>
        {/if}
      </div>
    </div>
    
    <div class="hidden md:flex items-center space-x-4">
      <button 
        class="px-2 py-1 rounded {currentLanguage === 'en' ? 'bg-yellow-400 text-black' : 'text-yellow-400'}"
        onclick={() => switchLanguage('en')}
      >
        EN
      </button>
      <button 
        class="px-2 py-1 rounded {currentLanguage === 'ja' ? 'bg-yellow-400 text-black' : 'text-yellow-400'}"
        onclick={() => switchLanguage('ja')}
      >
        日本語
      </button>
    </div>
    
    <button class="md:hidden text-white" onclick={toggleMenu} aria-label="Toggle menu">
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
        
        <!-- Projects section in mobile menu -->
        <div class="border-l-2 border-teal-400 pl-4">
          <div class="text-teal-400 font-medium mb-2">Projects</div>
          <a href="{base}/congress-trading" class="block hover:text-teal-400 {page.url.pathname.includes('/congress-trading') ? 'text-teal-400' : ''} text-sm mb-1">Congressional Trading</a>
          <a href="{base}/spinthewheel" class="block hover:text-teal-400 {page.url.pathname.includes('/spinthewheel') ? 'text-teal-400' : ''} text-sm">Japan Wheel</a>
        </div>
        
        <a href="{base}/faq" class="hover:text-teal-400 {page.url.pathname.includes('/faq') ? 'text-teal-400' : ''}">FAQ</a>
        <a href="{base}/contact" class="hover:text-teal-400 {page.url.pathname.includes('/contact') ? 'text-teal-400' : ''}">{$t.navigation.contact}</a>
        <div class="flex space-x-4 pt-2">
          <button 
            class="px-2 py-1 rounded {currentLanguage === 'en' ? 'bg-yellow-400 text-black' : 'text-yellow-400'}"
            onclick={() => switchLanguage('en')}
          >
            EN
          </button>
          <button 
            class="px-2 py-1 rounded {currentLanguage === 'ja' ? 'bg-yellow-400 text-black' : 'text-yellow-400'}"
            onclick={() => switchLanguage('ja')}
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
  {#if showScrollToTop}
    <button 
      onclick={scrollToTop}
      class="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  {/if}
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
          <h3 class="font-bold mb-3 text-teal-400">Projects</h3>
          <nav class="flex flex-col space-y-2">
            <a href="{base}/congress-trading" class="text-sm hover:text-teal-400">Congressional Trading</a>
            <a href="{base}/spinthewheel" class="text-sm hover:text-teal-400">Japan Wheel</a>
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