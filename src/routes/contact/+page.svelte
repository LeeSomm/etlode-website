<script>
    let formData = {
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
      service: 'Select a service',
      language: 'english'
    };
    
    let submitted = false;
    let loading = false;
    let errors = {};
    
    const validateForm = () => {
      errors = {};
      
      if (!formData.name.trim()) {
        errors.name = 'Name is required';
      }
      
      if (!formData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
      
      if (!formData.message.trim()) {
        errors.message = 'Message is required';
      }
      
      if (formData.service === 'Select a service') {
        errors.service = 'Please select a service';
      }
      
      return Object.keys(errors).length === 0;
    };
    
    const handleSubmit = () => {
      if (!validateForm()) return;
      
      loading = true;
      
      // In a real application, you would send data to your backend
      // fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // })
      
      // For demo purposes, simulate form submission
      setTimeout(() => {
        submitted = true;
        loading = false;
        
        // Reset form for potential new submission
        formData = {
          name: '',
          email: '',
          company: '',
          phone: '',
          message: '',
          service: 'Select a service',
          language: 'english'
        };
      }, 1500);
    };
  </script>
  
  <svelte:head>
    <title>Contact | ET-Lode</title>
    <meta name="description" content="Get in touch with ET-Lode for AI automation solutions, multilingual chatbots, and business process improvement." />
  </svelte:head>
  
  <section class="bg-black text-white py-16">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-4xl font-bold mb-4">Contact Us</h1>
      <p class="text-xl max-w-2xl mx-auto">
        Let's discuss how our AI automation solutions can transform your business.
      </p>
    </div>
  </section>
  
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/2 mb-10 md:mb-0 md:pr-12">
          <h2 class="text-3xl font-bold mb-6">Get In Touch</h2>
          
          {#if submitted}
            <div class="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg mb-8">
              <h3 class="text-xl font-bold mb-2">Thank You!</h3>
              <p>Your message has been received. We'll get back to you within 1-2 business days.</p>
              <button 
                on:click={() => submitted = false} 
                class="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Send Another Message
              </button>
            </div>
          {:else}
            <form on:submit|preventDefault={handleSubmit} class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-gray-700 font-medium mb-2">Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    bind:value={formData.name} 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    class:border-red-500={errors.name}
                  />
                  {#if errors.name}
                    <p class="text-red-500 text-sm mt-1">{errors.name}</p>
                  {/if}
                </div>
                
                <div>
                  <label for="email" class="block text-gray-700 font-medium mb-2">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    bind:value={formData.email} 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    class:border-red-500={errors.email}
                  />
                  {#if errors.email}
                    <p class="text-red-500 text-sm mt-1">{errors.email}</p>
                  {/if}
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="company" class="block text-gray-700 font-medium mb-2">Company</label>
                  <input 
                    type="text" 
                    id="company" 
                    bind:value={formData.company}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label for="phone" class="block text-gray-700 font-medium mb-2">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    bind:value={formData.phone}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label for="service" class="block text-gray-700 font-medium mb-2">Service of Interest</label>
                <select 
                  id="service" 
                  bind:value={formData.service}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  class:border-red-500={errors.service}
                >
                  <option value="Select a service" disabled>Select a service</option>
                  <option value="Multilingual AI Chatbots">Multilingual AI Chatbots</option>
                  <option value="RAG-Enabled LLM Solutions">RAG-Enabled LLM Solutions</option>
                  <option value="Workflow Automation">Workflow Automation</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Social Media Management">Social Media Management</option>
                  <option value="Translation Services">Translation Services</option>
                  <option value="Other">Other / Not Sure</option>
                </select>
                {#if errors.service}
                  <p class="text-red-500 text-sm mt-1">{errors.service}</p>
                {/if}
              </div>
              
              <div>
                <label class="block text-gray-700 font-medium mb-2">Preferred Language</label>
                <div class="flex space-x-6">
                  <label class="inline-flex items-center">
                    <input type="radio" class="form-radio" name="language" value="english" bind:group={formData.language}>
                    <span class="ml-2">English</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input type="radio" class="form-radio" name="language" value="japanese" bind:group={formData.language}>
                    <span class="ml-2">Japanese</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label for="message" class="block text-gray-700 font-medium mb-2">Message *</label>
                <textarea 
                  id="message" 
                  bind:value={formData.message}
                  rows="5"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  class:border-red-500={errors.message}
                ></textarea>
                {#if errors.message}
                  <p class="text-red-500 text-sm mt-1">{errors.message}</p>
                {/if}
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                class="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center"
              >
                {#if loading}
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                {:else}
                  Send Message
                {/if}
              </button>
            </form>
          {/if}
        </div>
        
        <div class="md:w-1/2 bg-gray-50 p-8 rounded-lg">
          <h2 class="text-3xl font-bold mb-6">Contact Information</h2>
          
          <div class="space-y-6">
            <div class="flex items-start">
              <div class="mr-4 mt-1">
                <div class="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-xl font-bold mb-1">Email</h3>
                <p><a href="mailto:lee@etlode.com" class="text-teal-600 hover:text-teal-800">lee@etlode.com</a></p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="mr-4 mt-1">
                <div class="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-xl font-bold mb-1">Phone</h3>
                <p><a href="tel:+19794720345" class="text-teal-600 hover:text-teal-800">(775) 391-8120</a></p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="mr-4 mt-1">
                <div class="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-xl font-bold mb-1">Response Time</h3>
                <p>We typically respond within 1-2 business days.</p>
              </div>
            </div>
  
            <div class="flex items-start">
              <div class="mr-4 mt-1">
                <div class="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-xl font-bold mb-1">Languages</h3>
                <p>Services available in English and Japanese</p>
              </div>
            </div>
          </div>
          
          <div class="mt-12">
            <h3 class="text-xl font-bold mb-4">Connect With Us</h3>
            <div class="flex space-x-4">
              <a href="https://www.linkedin.com/company/etlode/" class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://github.com/LeeSomm/" class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <style>
    /* Additional custom styles can be added here */
    :global(body) {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
  </style>