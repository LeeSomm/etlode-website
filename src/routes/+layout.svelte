<script>
	import '../app.css';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	
	let isMenuOpen = false;
	let currentLanguage = 'en';
	
	const toggleMenu = () => {
	  isMenuOpen = !isMenuOpen;
	};
	
	const switchLanguage = (lang) => {
	  currentLanguage = lang;
	  // In a real implementation, this would trigger language changes
	  // throughout the site using i18n libraries
	};
	
	onMount(() => {
	  // Detect browser language for initial language setting
	  const browserLang = navigator.language.split('-')[0];
	  if (browserLang === 'ja') {
		currentLanguage = 'ja';
	  }
	});
  </script>
  
  <header class="bg-black text-white">
	<div class="container mx-auto px-4 py-4 flex justify-between items-center">
	  <div class="flex items-center">
		<img src="/images/etlode-logo.svg" alt="ET-Lode Logo" class="h-12 mr-3" />
		<span class="text-xl font-bold">ET-Lode</span>
	  </div>
	  
	  <div class="hidden md:flex space-x-6">
		<a href="/" class="hover:text-teal-400 {page.url.pathname === '/' ? 'text-teal-400' : ''}">Home</a>
		<a href="/services" class="hover:text-teal-400 {page.url.pathname === '/services' ? 'text-teal-400' : ''}">Services</a>
		<a href="/about" class="hover:text-teal-400 {page.url.pathname === '/about' ? 'text-teal-400' : ''}">About</a>
		<a href="/contact" class="hover:text-teal-400 {page.url.pathname === '/contact' ? 'text-teal-400' : ''}">Contact</a>
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
		  <a href="/" class="hover:text-teal-400 {page.url.pathname === '/' ? 'text-teal-400' : ''}">Home</a>
		  <a href="/services" class="hover:text-teal-400 {page.url.pathname === '/services' ? 'text-teal-400' : ''}">Services</a>
		  <a href="/about" class="hover:text-teal-400 {page.url.pathname === '/about' ? 'text-teal-400' : ''}">About</a>
		  <a href="/contact" class="hover:text-teal-400 {page.url.pathname === '/contact' ? 'text-teal-400' : ''}">Contact</a>
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
		  <img src="/images/etlode-logo.svg" alt="ET-Lode Logo" class="h-10 mb-3" />
		  <p class="text-sm text-gray-400">ET-Lode: Extract, Transform, Load. Enabling AI automation for global businesses.</p>
		</div>
		
		<div class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12">
		  <div>
			<h3 class="font-bold mb-3 text-teal-400">Quick Links</h3>
			<nav class="flex flex-col space-y-2">
			  <a href="/" class="text-sm hover:text-teal-400">Home</a>
			  <a href="/services" class="text-sm hover:text-teal-400">Services</a>
			  <a href="/about" class="text-sm hover:text-teal-400">About</a>
			  <a href="/contact" class="text-sm hover:text-teal-400">Contact</a>
			</nav>
		  </div>
		  
		  <div>
			<h3 class="font-bold mb-3 text-teal-400">Contact</h3>
			<p class="text-sm">Email: <a href="mailto:lee@etlode.com" class="hover:text-teal-400">lee@etlode.com</a></p>
			<p class="text-sm">Phone: (775) 391-8120</p>
		  </div>
		</div>
	  </div>
	  
	  <div class="border-t border-gray-800 mt-8 pt-6 text-sm text-gray-500">
		<p>&copy; {new Date().getFullYear()} ET-Lode. All rights reserved.</p>
	  </div>
	</div>
  </footer>