<script lang="ts">
    import {t} from '$lib/i18n'

    let formData = {
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
      service: 'Select a service',
      // language: 'english'
    };
    
    let submitted = false;
    let loading = false;
    let error = false;
    let errors: FormErrors = {};
    
    type FormErrors = {
      name?: string;
      email?: string;
      message?: string;
      service?: string;
    };

    const validateForm = () => {
      const errors: FormErrors = {};
      
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
      
      return { isValid: Object.keys(errors).length === 0, errors };
    };
    
    const handleSubmit = async () => {
      const { isValid, errors: formErrors } = validateForm();
      errors = formErrors;
      
      if (!isValid) return;
      
      loading = true;
      error = false;
      
      try {
        // Send form data to Formspree
        // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree form ID
        const response = await fetch('https://formspree.io/f/xwpoagaz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          submitted = true;
          
          // Reset form for potential new submission
          formData = {
            name: '',
            email: '',
            company: '',
            phone: '',
            message: '',
            service: 'Select a service',
            // language: 'english'
          };
        } else {
          error = true;
        }
      } catch (e) {
        error = true;
      } finally {
        loading = false;
      }
    };
  </script>
  
  <svelte:head>
    <title>{$t.contact.headerTitle}</title>
    <meta name="description" content={$t.contact.metaDescription} />
  </svelte:head>
  
  <section class="bg-black text-white py-16">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-4xl font-bold mb-4">{$t.contact.title}</h1>
      <p class="text-xl max-w-2xl mx-auto">
        {$t.cta.consultation.description}
      </p>
    </div>
  </section>
  
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/2 mb-10 md:mb-0 md:pr-12">
          <h2 class="text-3xl font-bold mb-6">{$t.cta.contact}</h2>
          
          {#if submitted}
            <div class="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg mb-8">
              <h3 class="text-xl font-bold mb-2">{$t.contact.form.thanks}</h3>
              <p>{$t.contact.form.success}</p>
              <button 
                on:click={() => submitted = false} 
                class="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {$t.contact.form.sendAnother}
              </button>
            </div>
          {:else}
            <form on:submit|preventDefault={handleSubmit} class="space-y-6">
              {#if error}
                <div class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                  <p>{$t.contact.form.error || 'There was an error submitting your form. Please try again.'}</p>
                </div>
              {/if}
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-gray-700 font-medium mb-2">{$t.contact.form.name}</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    bind:value={formData.name} 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    class:border-red-500={errors.name}
                  />
                  {#if errors.name}
                    <p class="text-red-500 text-sm mt-1">{errors.name}</p>
                  {/if}
                </div>
                
                <div>
                  <label for="email" class="block text-gray-700 font-medium mb-2">{$t.contact.form.email}</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
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
                  <label for="company" class="block text-gray-700 font-medium mb-2">{$t.contact.form.company}</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company"
                    bind:value={formData.company}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label for="phone" class="block text-gray-700 font-medium mb-2">{$t.contact.form.phone}</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    bind:value={formData.phone}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label for="service" class="block text-gray-700 font-medium mb-2">{$t.contact.form.serviceOfInterest}</label>
                <select 
                  id="service" 
                  name="service"
                  bind:value={formData.service}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  class:border-red-500={errors.service}
                >
                  <option value="Select a service" disabled>{$t.contact.form.serviceDropdown}</option>
                  <option value="Multilingual AI Chatbots">{$t.contact.form.serviceOptions[1]}</option>
                  <option value="RAG-Enabled LLM Solutions">{$t.contact.form.serviceOptions[2]}</option>
                  <option value="Workflow Automation">{$t.contact.form.serviceOptions[3]}</option>
                  <option value="Web Development">{$t.contact.form.serviceOptions[4]}</option>
                  <option value="Social Media Management">{$t.contact.form.serviceOptions[5]}</option>
                  <option value="Translation Services">{$t.contact.form.serviceOptions[6]}</option>
                  <option value="Other">{$t.contact.form.serviceOptions[7]}</option>
                </select>
                {#if errors.service}
                  <p class="text-red-500 text-sm mt-1">{errors.service}</p>
                {/if}
              </div>
              
              <!-- <div>
                <label for="language" class="block text-gray-700 font-medium mb-2">{$t.contact.form.language}</label>
                <div class="flex space-x-6">
                  <label class="inline-flex items-center">
                    <input type="radio" class="form-radio" name="language" value="english" bind:group={formData.language}>
                    <span class="ml-2">{$t.contact.form.english}</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input type="radio" class="form-radio" name="language" value="japanese" bind:group={formData.language}>
                    <span class="ml-2">{$t.contact.form.japanese}</span>
                  </label>
                </div>
              </div> -->
              
              <div>
                <label for="message" class="block text-gray-700 font-medium mb-2">{$t.contact.form.message}</label>
                <textarea 
                  id="message" 
                  name="message"
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
                  {$t.contact.form.sending}
                {:else}
                  {$t.contact.form.submit}
                {/if}
              </button>
            </form>
          {/if}
        </div>
        
        <div class="md:w-1/2 bg-gray-50 p-8 rounded-lg">
          <h2 class="text-3xl font-bold mb-6">{$t.contact.info.title}</h2>
          
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
                <h3 class="text-xl font-bold mb-1">{$t.contact.info.email}</h3>
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
                <h3 class="text-xl font-bold mb-1">{$t.contact.info.phone}</h3>
                <p><a href="tel:+17753918120" class="text-teal-600 hover:text-teal-800">+1 (775) 391-8120</a></p>
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
                <h3 class="text-xl font-bold mb-1">{$t.contact.info.responseTime}</h3>
                <p>{$t.contact.info.responseTimeDescription}</p>
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
                <h3 class="text-xl font-bold mb-1">{$t.contact.info.languages}</h3>
                <p>{$t.contact.info.languagesDescription}</p>
              </div>
            </div>
          </div>
          
          <div class="mt-12">
            <h3 class="text-xl font-bold mb-4">{$t.cta.extLinks}</h3>
            <div class="flex space-x-4">
              <a href="https://www.linkedin.com/company/etlode/" class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
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