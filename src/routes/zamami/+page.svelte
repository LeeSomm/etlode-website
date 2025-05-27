<script lang="ts">
  import { t } from '$lib/i18n';

  // Form state management
  let currentStep = 1;
  const totalSteps = 4;
  let submitted = false;
  let loading = false;

  // Step 1: Route and Date Selection
  let routeData = {
    from: 'naha',
    to: 'zamami', 
    tripType: 'roundTrip',
    outboundDate: '',
    returnDate: '',
    passengers: {
      adult: 2,
      child: 0,
      infant: 0
    }
  };

  // Step 2: Ferry Selection
  let ferryData = {
    outbound: {
      vessel: '',
      departure: '',
      arrival: '',
      price: 0
    },
    return: {
      vessel: '',
      departure: '', 
      arrival: '',
      price: 0
    }
  };

  // Mock ferry schedules
  const ferrySchedules = [
    {
      id: 'queen-0900',
      vessel: 'queenZamami',
      departure: '09:00',
      arrival: '09:50',
      duration: 50,
      price: 3170,
      available: 89
    },
    {
      id: 'ferry-1000',
      vessel: 'ferryZamami', 
      departure: '10:00',
      arrival: '12:00',
      duration: 120,
      price: 2120,
      available: 156
    },
    {
      id: 'queen-1400',
      vessel: 'queenZamami',
      departure: '14:00',
      arrival: '14:50', 
      duration: 50,
      price: 3170,
      available: 76
    }
  ];

  // Step 3: Passenger Information
  let passengerData = {
    representative: {
      firstName: '',
      lastName: '',
      firstNameKana: '',
      lastNameKana: '',
      gender: '',
      birthDate: '',
      phone: '',
      email: '',
      emergencyName: '',
      emergencyPhone: ''
    },
    passengers: [
      {
        firstName: '',
        lastName: '',
        firstNameKana: '',
        lastNameKana: '',
        gender: '',
        birthDate: '',
        type: 'adult'
      }
    ],
    specialRequests: {
      wheelchair: false,
      pet: false,
      luggage: false
    }
  };

  // Step 4: Payment
  let paymentData = {
    method: 'creditCard',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: '',
    agreeTerms: false,
    agreePrivacy: false
  };

  let errors: any = {};

  // Navigation functions
  const nextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        currentStep += 1;
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      currentStep -= 1;
    }
  };

  // Validation
  const validateCurrentStep = () => {
    errors = {};
    
    if (currentStep === 1) {
      if (!routeData.outboundDate) {
        errors.outboundDate = $t.zamami.form.validation.required;
      }
      if (routeData.tripType === 'roundTrip' && !routeData.returnDate) {
        errors.returnDate = $t.zamami.form.validation.required;
      }
      if (routeData.passengers.adult + routeData.passengers.child === 0) {
        errors.passengers = $t.zamami.form.validation.minPassengers;
      }
    } else if (currentStep === 2) {
      if (!ferryData.outbound.vessel) {
        errors.outboundFerry = $t.zamami.form.validation.required;
      }
      if (routeData.tripType === 'roundTrip' && !ferryData.return.vessel) {
        errors.returnFerry = $t.zamami.form.validation.required;
      }
    } else if (currentStep === 3) {
      if (!passengerData.representative.firstName) {
        errors.repFirstName = $t.zamami.form.validation.required;
      }
      if (!passengerData.representative.lastName) {
        errors.repLastName = $t.zamami.form.validation.required;
      }
      if (!passengerData.representative.phone) {
        errors.repPhone = $t.zamami.form.validation.required;
      }
      if (!passengerData.representative.email) {
        errors.repEmail = $t.zamami.form.validation.required;
      }
    } else if (currentStep === 4) {
      if (!paymentData.agreeTerms) {
        errors.terms = $t.zamami.form.validation.required;
      }
      if (!paymentData.agreePrivacy) {
        errors.privacy = $t.zamami.form.validation.required;
      }
    }

    return Object.keys(errors).length === 0;
  };

  // Calculate total passengers
  $: totalPassengers = routeData.passengers.adult + routeData.passengers.child + routeData.passengers.infant;

  // Calculate total price
  $: totalPrice = (() => {
    let total = 0;
    if (ferryData.outbound.price) {
      total += ferryData.outbound.price * (routeData.passengers.adult + routeData.passengers.child);
    }
    if (routeData.tripType === 'roundTrip' && ferryData.return.price) {
      total += ferryData.return.price * (routeData.passengers.adult + routeData.passengers.child);
    }
    return total;
  })();

  // Ferry selection handlers
  const selectOutboundFerry = (ferry: any) => {
    ferryData.outbound = {
      vessel: ferry.vessel,
      departure: ferry.departure,
      arrival: ferry.arrival,
      price: ferry.price
    };
  };

  const selectReturnFerry = (ferry: any) => {
    ferryData.return = {
      vessel: ferry.vessel,
      departure: ferry.departure,
      arrival: ferry.arrival,
      price: ferry.price
    };
  };

  // Mock booking submission
  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    
    loading = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    submitted = true;
    loading = false;
  };

  // Generate random booking reference
  const bookingRef = 'ZM' + Math.random().toString(36).substr(2, 8).toUpperCase();

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
</script>

<svelte:head>
  <title>{$t.zamami.headerTitle}</title>
  <meta name="description" content={$t.zamami.metaDescription} />
  
  <!-- Open Graph Tags -->
  <meta property="og:title" content="Zamami Ferry Reservation Demo | ET-Lode" />
  <meta property="og:description" content="Experience our modern ferry reservation system design for Zamami Island, Okinawa." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://etlode.com/zamami" />
  <meta property="og:image" content="https://etlode.com/images/etlode-logo-w-name.png" />
</svelte:head>

<!-- Hero Section with Okinawan styling -->
<section class="bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600 text-white py-16 relative overflow-hidden">
  <!-- Decorative coral pattern -->
  <div class="absolute inset-0 opacity-10">
    <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="currentColor"/>
    </svg>
  </div>
  
  <div class="container mx-auto px-4 text-center relative z-10">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">{$t.zamami.title}</h1>
    <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
      {$t.zamami.subtitle}
    </p>
    
    <!-- Demo Notice -->
    <div class="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 max-w-2xl mx-auto">
      <h3 class="text-lg font-semibold mb-2 text-yellow-100">🏝️ {$t.zamami.demo.notice}</h3>
      <p class="text-white/90">{$t.zamami.demo.description}</p>
    </div>
  </div>
</section>

<!-- Main Booking Form -->
<section class="py-12 bg-gray-50 min-h-screen">
  <div class="container mx-auto px-4 max-w-4xl">
    
    {#if submitted}
      <!-- Success State -->
      <div class="bg-white rounded-xl shadow-lg p-8 text-center">
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-4">{$t.zamami.form.success.title}</h2>
        <p class="text-gray-600 mb-8">{$t.zamami.form.success.description}</p>
        
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div class="text-sm text-blue-800 font-medium">{$t.zamami.form.success.bookingRef}</div>
          <div class="text-2xl font-bold text-blue-900">{bookingRef}</div>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            {$t.zamami.form.success.downloadPDF}
          </button>
          <button 
            on:click={() => { submitted = false; currentStep = 1; }}
            class="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            {$t.zamami.form.success.newBooking}
          </button>
        </div>
      </div>
    {:else}
      <!-- Progress Steps -->
      <div class="mb-8">
        <div class="flex items-center justify-center mb-4">
          {#each Array(totalSteps) as _, i}
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full flex items-center justify-center border-2 
                          {currentStep > i + 1 ? 'bg-blue-600 border-blue-600 text-white' : 
                           currentStep === i + 1 ? 'bg-blue-100 border-blue-600 text-blue-600' : 
                           'bg-gray-100 border-gray-300 text-gray-400'}">
                {#if currentStep > i + 1}
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                {:else}
                  {i + 1}
                {/if}
              </div>
              {#if i < totalSteps - 1}
                <div class="w-16 h-0.5 mx-2 {currentStep > i + 1 ? 'bg-blue-600' : 'bg-gray-300'}"></div>
              {/if}
            </div>
          {/each}
        </div>
        
        <div class="text-center">
          <span class="text-sm text-gray-500">{$t.zamami.form.step} {currentStep} {$t.zamami.form.of} {totalSteps}</span>
          <h2 class="text-xl font-semibold mt-1">
            {#if currentStep === 1}{$t.zamami.form.steps[1]}
            {:else if currentStep === 2}{$t.zamami.form.steps[2]}
            {:else if currentStep === 3}{$t.zamami.form.steps[3]}
            {:else if currentStep === 4}{$t.zamami.form.steps[4]}
            {/if}
          </h2>
        </div>
      </div>

      <!-- Form Content -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        
        {#if currentStep === 1}
          <!-- Step 1: Route & Date Selection -->
          <div class="p-8">
            <h3 class="text-2xl font-bold mb-6 text-gray-900">{$t.zamami.form.route.title}</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <!-- Route Selection -->
              <div>
                <label for="route-from" class="block text-gray-700 font-medium mb-2">{$t.zamami.form.route.from}</label>
                <select id="route-from" bind:value={routeData.from} class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="naha">{$t.zamami.form.route.ports.naha}</option>
                </select>
              </div>
              
              <div>
                <label for="route-to" class="block text-gray-700 font-medium mb-2">{$t.zamami.form.route.to}</label>
                <select id="route-to" bind:value={routeData.to} class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="zamami">{$t.zamami.form.route.ports.zamami}</option>
                  <option value="aka">{$t.zamami.form.route.ports.aka}</option>
                </select>
              </div>
            </div>

            <!-- Trip Type -->
            <div class="mb-6">
              <div class="flex space-x-4">
                <label class="inline-flex items-center">
                  <input type="radio" bind:group={routeData.tripType} value="roundTrip" class="h-4 w-4 text-blue-600">
                  <span class="ml-2 text-gray-700">{$t.zamami.form.route.roundTrip}</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="radio" bind:group={routeData.tripType} value="oneWay" class="h-4 w-4 text-blue-600">
                  <span class="ml-2 text-gray-700">{$t.zamami.form.route.oneWay}</span>
                </label>
              </div>
            </div>

            <!-- Dates -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label for="outbound-date" class="block text-gray-700 font-medium mb-2">{$t.zamami.form.route.date}</label>
                <input 
                  id="outbound-date"
                  type="date" 
                  bind:value={routeData.outboundDate}
                  min={today}
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  class:border-red-500={errors.outboundDate}
                />
                {#if errors.outboundDate}
                  <p class="text-red-500 text-sm mt-1">{errors.outboundDate}</p>
                {/if}
              </div>
              
              {#if routeData.tripType === 'roundTrip'}
                <div>
                  <label for="return-date" class="block text-gray-700 font-medium mb-2">{$t.zamami.form.route.returnDate}</label>
                  <input 
                    id="return-date"
                    type="date" 
                    bind:value={routeData.returnDate}
                    min={routeData.outboundDate || today}
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    class:border-red-500={errors.returnDate}
                  />
                  {#if errors.returnDate}
                    <p class="text-red-500 text-sm mt-1">{errors.returnDate}</p>
                  {/if}
                </div>
              {/if}
            </div>

            <!-- Passenger Count -->
            <div>
              <span class="block text-gray-700 font-medium mb-4">{$t.zamami.form.route.passengers}</span>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label for="adult-select" class="block text-sm text-gray-600 mb-2">{$t.zamami.form.route.adult}</label>
                  <select id="adult-select" bind:value={routeData.passengers.adult} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {#each Array(10) as _, i}
                      <option value={i}>{i}</option>
                    {/each}
                  </select>
                </div>
                <div>
                  <label for="child-select" class="block text-sm text-gray-600 mb-2">{$t.zamami.form.route.child}</label>
                  <select id="child-select" bind:value={routeData.passengers.child} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {#each Array(10) as _, i}
                      <option value={i}>{i}</option>
                    {/each}
                  </select>
                </div>
                <div>
                  <label for="infant-select" class="block text-sm text-gray-600 mb-2">{$t.zamami.form.route.infant}</label>
                  <select id="infant-select" bind:value={routeData.passengers.infant} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {#each Array(5) as _, i}
                      <option value={i}>{i}</option>
                    {/each}
                  </select>
                </div>
              </div>
              {#if errors.passengers}
                <p class="text-red-500 text-sm mt-2">{errors.passengers}</p>
              {/if}
            </div>
          </div>

        {:else if currentStep === 2}
          <!-- Step 2: Ferry Selection -->
          <div class="p-8">
            <h3 class="text-2xl font-bold mb-6 text-gray-900">{$t.zamami.form.ferry.title}</h3>
            
            <!-- Outbound Ferry Selection -->
            <div class="mb-8">
              <h4 class="text-lg font-semibold mb-4 text-gray-800">往路 - {routeData.outboundDate}</h4>
              <div class="space-y-4">
                {#each ferrySchedules as ferry}
                  <button class="w-full text-left border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors
                              {ferryData.outbound.vessel === ferry.vessel && ferryData.outbound.departure === ferry.departure ? 'border-blue-500 bg-blue-50' : ''}"
                       on:click={() => selectOutboundFerry(ferry)}>
                    <div class="flex items-center justify-between">
                      <div class="flex-1">
                        <div class="font-semibold text-gray-900">
                          {ferry.vessel === 'queenZamami' ? $t.zamami.form.ferry.queenZamami : $t.zamami.form.ferry.ferryZamami}
                        </div>
                        <div class="text-sm text-gray-600 mt-1">
                          {$t.zamami.form.ferry.departure}: {ferry.departure} → {$t.zamami.form.ferry.arrival}: {ferry.arrival} 
                          ({ferry.duration}{$t.zamami.form.ferry.mins})
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="font-bold text-blue-600">¥{ferry.price.toLocaleString()}</div>
                        <div class="text-sm text-gray-500">{$t.zamami.form.ferry.capacity}: {ferry.available}</div>
                      </div>
                      <div class="ml-4">
                        <span class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                          {$t.zamami.form.ferry.select}
                        </span>
                      </div>
                    </div>
                  </button>
                {/each}
              </div>
              {#if errors.outboundFerry}
                <p class="text-red-500 text-sm mt-2">{errors.outboundFerry}</p>
              {/if}
            </div>

            <!-- Return Ferry Selection (if round trip) -->
            {#if routeData.tripType === 'roundTrip'}
              <div>
                <h4 class="text-lg font-semibold mb-4 text-gray-800">復路 - {routeData.returnDate}</h4>
                <div class="space-y-4">
                  {#each ferrySchedules as ferry}
                    <button class="w-full text-left border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors
                                {ferryData.return.vessel === ferry.vessel && ferryData.return.departure === ferry.departure ? 'border-blue-500 bg-blue-50' : ''}"
                         on:click={() => selectReturnFerry(ferry)}>
                      <div class="flex items-center justify-between">
                        <div class="flex-1">
                          <div class="font-semibold text-gray-900">
                            {ferry.vessel === 'queenZamami' ? $t.zamami.form.ferry.queenZamami : $t.zamami.form.ferry.ferryZamami}
                          </div>
                          <div class="text-sm text-gray-600 mt-1">
                            {$t.zamami.form.ferry.departure}: {ferry.departure} → {$t.zamami.form.ferry.arrival}: {ferry.arrival} 
                            ({ferry.duration}{$t.zamami.form.ferry.mins})
                          </div>
                        </div>
                        <div class="text-right">
                          <div class="font-bold text-blue-600">¥{ferry.price.toLocaleString()}</div>
                          <div class="text-sm text-gray-500">{$t.zamami.form.ferry.capacity}: {ferry.available}</div>
                        </div>
                        <div class="ml-4">
                          <span class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                            {$t.zamami.form.ferry.select}
                          </span>
                        </div>
                      </div>
                    </button>
                  {/each}
                </div>
                {#if errors.returnFerry}
                  <p class="text-red-500 text-sm mt-2">{errors.returnFerry}</p>
                {/if}
              </div>
            {/if}
          </div>

        {:else if currentStep === 3}
          <!-- Step 3: Passenger Information -->
          <div class="p-8">
            <h3 class="text-2xl font-bold mb-6 text-gray-900">{$t.zamami.form.passenger.title}</h3>
            
            <!-- Representative Information -->
            <div class="mb-8">
              <h4 class="text-lg font-semibold mb-4 text-gray-800">{$t.zamami.form.passenger.representative}</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="rep-lastname" class="block text-gray-700 font-medium mb-2">{$t.zamami.form.passenger.lastName}</label>
                  <input 
                    id="rep-lastname"
                    type="text"
                    bind:value={passengerData.representative.lastName}
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    class:border-red-500={errors.repLastName}
                  />
                  {#if errors.repLastName}
                    <p class="text-red-500 text-sm mt-1">{errors.repLastName}</p>
                  {/if}
                </div>
                <div>
                  <label for="rep-firstname" class="block text-gray-700 font-medium mb-2">{$t.zamami.form.passenger.firstName}</label>
                  <input 
                    id="rep-firstname"
                    type="text"
                    bind:value={passengerData.representative.firstName}
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    class:border-red-500={errors.repFirstName}
                  />
                  {#if errors.repFirstName}
                    <p class="text-red-500 text-sm mt-1">{errors.repFirstName}</p>
                  {/if}
                </div>
                <div>
                  <label for="rep-lastname-kana" class="block text-gray-700 font-medium mb-2">{$t.zamami.form.passenger.lastNameKana}</label>
                  <input 
                    id="rep-lastname-kana"
                    type="text"
                    bind:value={passengerData.representative.lastNameKana}
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label for="rep-firstname-kana" class="block text-gray-700 font-medium mb-2">{$t.zamami.form.passenger.firstNameKana}</label>
                  <input 
                    id="rep-firstname-kana"
                    type="text"
                    bind:value={passengerData.representative.firstNameKana}
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label for="rep-phone" class="block text-gray-700 font-medium mb-2">{$t.zamami.form.passenger.phone}</label>
                  <input 
                    id="rep-phone"
                    type="tel"
                    bind:value={passengerData.representative.phone}
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    class:border-red-500={errors.repPhone}
                  />
                  {#if errors.repPhone}
                    <p class="text-red-500 text-sm mt-1">{errors.repPhone}</p>
                  {/if}
                </div>
                <div>
                  <label for="rep-email" class="block text-gray-700 font-medium mb-2">{$t.zamami.form.passenger.email}</label>
                  <input 
                    id="rep-email"
                    type="email"
                    bind:value={passengerData.representative.email}
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    class:border-red-500={errors.repEmail}
                  />
                  {#if errors.repEmail}
                    <p class="text-red-500 text-sm mt-1">{errors.repEmail}</p>
                  {/if}
                </div>
              </div>
            </div>

            <!-- Special Requests -->
            <div>
              <h4 class="text-lg font-semibold mb-4 text-gray-800">{$t.zamami.form.passenger.specialRequests}</h4>
              <div class="space-y-3">
                <label class="inline-flex items-center">
                  <input type="checkbox" bind:checked={passengerData.specialRequests.wheelchair} class="h-4 w-4 text-blue-600">
                  <span class="ml-2 text-gray-700">{$t.zamami.form.passenger.wheelchair}</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="checkbox" bind:checked={passengerData.specialRequests.pet} class="h-4 w-4 text-blue-600">
                  <span class="ml-2 text-gray-700">{$t.zamami.form.passenger.pet}</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="checkbox" bind:checked={passengerData.specialRequests.luggage} class="h-4 w-4 text-blue-600">
                  <span class="ml-2 text-gray-700">{$t.zamami.form.passenger.luggage}</span>
                </label>
              </div>
            </div>
          </div>

        {:else if currentStep === 4}
          <!-- Step 4: Payment & Confirmation -->
          <div class="p-8">
            <h3 class="text-2xl font-bold mb-6 text-gray-900">{$t.zamami.form.payment.title}</h3>
            
            <!-- Booking Summary -->
            <div class="bg-gray-50 rounded-lg p-6 mb-8">
              <h4 class="text-lg font-semibold mb-4 text-gray-800">{$t.zamami.form.payment.summary}</h4>
              
              <!-- Outbound Journey -->
              <div class="mb-4">
                <div class="font-medium text-gray-700">{$t.zamami.form.payment.outbound}</div>
                <div class="text-sm text-gray-600">
                  {ferryData.outbound.departure} - {ferryData.outbound.arrival} | 
                  {ferryData.outbound.vessel === 'queenZamami' ? $t.zamami.form.ferry.queenZamami : $t.zamami.form.ferry.ferryZamami}
                </div>
                <div class="text-sm text-gray-600">
                  {routeData.passengers.adult} 大人 + {routeData.passengers.child} 子供 = ¥{(ferryData.outbound.price * (routeData.passengers.adult + routeData.passengers.child)).toLocaleString()}
                </div>
              </div>

              <!-- Return Journey (if applicable) -->
              {#if routeData.tripType === 'roundTrip'}
                <div class="mb-4">
                  <div class="font-medium text-gray-700">{$t.zamami.form.payment.return}</div>
                  <div class="text-sm text-gray-600">
                    {ferryData.return.departure} - {ferryData.return.arrival} | 
                    {ferryData.return.vessel === 'queenZamami' ? $t.zamami.form.ferry.queenZamami : $t.zamami.form.ferry.ferryZamami}
                  </div>
                  <div class="text-sm text-gray-600">
                    {routeData.passengers.adult} 大人 + {routeData.passengers.child} 子供 = ¥{(ferryData.return.price * (routeData.passengers.adult + routeData.passengers.child)).toLocaleString()}
                  </div>
                </div>
              {/if}

              <div class="border-t pt-4">
                <div class="flex justify-between text-xl font-bold text-gray-900">
                  <span>{$t.zamami.form.payment.total}</span>
                  <span>¥{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="mb-6">
              <span class="block text-gray-700 font-medium mb-4">{$t.zamami.form.payment.method}</span>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label class="border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors
                              {paymentData.method === 'creditCard' ? 'border-blue-500 bg-blue-50' : ''}">
                  <input type="radio" bind:group={paymentData.method} value="creditCard" class="sr-only">
                  <div class="text-center">
                    <div class="text-lg font-medium">{$t.zamami.form.payment.creditCard}</div>
                  </div>
                </label>
                <label class="border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors
                              {paymentData.method === 'paypal' ? 'border-blue-500 bg-blue-50' : ''}">
                  <input type="radio" bind:group={paymentData.method} value="paypal" class="sr-only">
                  <div class="text-center">
                    <div class="text-lg font-medium">{$t.zamami.form.payment.paypal}</div>
                  </div>
                </label>
                <label class="border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors
                              {paymentData.method === 'applePay' ? 'border-blue-500 bg-blue-50' : ''}">
                  <input type="radio" bind:group={paymentData.method} value="applePay" class="sr-only">
                  <div class="text-center">
                    <div class="text-lg font-medium">{$t.zamami.form.payment.applePay}</div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Credit Card Details (if selected) -->
            {#if paymentData.method === 'creditCard'}
              <div class="mb-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="md:col-span-2">
                    <label for="card-number" class="block text-gray-700 font-medium mb-2">{$t.zamami.form.payment.cardNumber}</label>
                    <input 
                      id="card-number"
                      type="text"
                      bind:value={paymentData.cardNumber}
                      placeholder="1234 5678 9012 3456"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label for="card-expiry" class="block text-gray-700 font-medium mb-2">{$t.zamami.form.payment.expiry}</label>
                    <input 
                      id="card-expiry"
                      type="text"
                      bind:value={paymentData.expiry}
                      placeholder="MM/YY"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label for="card-cvv" class="block text-gray-700 font-medium mb-2">{$t.zamami.form.payment.cvv}</label>
                    <input 
                      id="card-cvv"
                      type="text"
                      bind:value={paymentData.cvv}
                      placeholder="123"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div class="md:col-span-2">
                    <label for="card-name" class="block text-gray-700 font-medium mb-2">{$t.zamami.form.payment.cardName}</label>
                    <input 
                      id="card-name"
                      type="text"
                      bind:value={paymentData.cardName}
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            {/if}

            <!-- Terms and Conditions -->
            <div class="space-y-4">
              <label class="inline-flex items-start">
                <input 
                  type="checkbox" 
                  bind:checked={paymentData.agreeTerms} 
                  class="h-4 w-4 text-blue-600 mt-1"
                  class:border-red-500={errors.terms}
                />
                <span class="ml-2 text-gray-700">{$t.zamami.form.payment.termsText}</span>
              </label>
              {#if errors.terms}
                <p class="text-red-500 text-sm">{errors.terms}</p>
              {/if}
              
              <label class="inline-flex items-start">
                <input 
                  type="checkbox" 
                  bind:checked={paymentData.agreePrivacy} 
                  class="h-4 w-4 text-blue-600 mt-1"
                  class:border-red-500={errors.privacy}
                />
                <span class="ml-2 text-gray-700">{$t.zamami.form.payment.privacyText}</span>
              </label>
              {#if errors.privacy}
                <p class="text-red-500 text-sm">{errors.privacy}</p>
              {/if}
            </div>
          </div>
        {/if}

        <!-- Navigation Buttons -->
        <div class="bg-gray-50 px-8 py-6 flex justify-between items-center">
          <div>
            {#if currentStep > 1}
              <button 
                on:click={prevStep}
                class="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                {$t.zamami.form.previous}
              </button>
            {/if}
          </div>
          
          <div>
            {#if currentStep < totalSteps}
              <button 
                on:click={nextStep}
                class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                {$t.zamami.form.next}
              </button>
            {:else}
              <button 
                on:click={handleSubmit}
                disabled={loading}
                class="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center"
              >
                {#if loading}
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {$t.zamami.form.booking}
                {:else}
                  {$t.zamami.form.book}
                {/if}
              </button>
            {/if}
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>

<!-- Features Section -->
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12 text-gray-900">{$t.zamami.features.title}</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="text-center">
        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">{$t.zamami.features.realtime}</h3>
        <p class="text-gray-600">{$t.zamami.features.realtimeDesc}</p>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">{$t.zamami.features.mobile}</h3>
        <p class="text-gray-600">{$t.zamami.features.mobileDesc}</p>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">{$t.zamami.features.multilingual}</h3>
        <p class="text-gray-600">{$t.zamami.features.multilingualDesc}</p>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">{$t.zamami.features.secure}</h3>
        <p class="text-gray-600">{$t.zamami.features.secureDesc}</p>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">{$t.zamami.features.weather}</h3>
        <p class="text-gray-600">{$t.zamami.features.weatherDesc}</p>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">{$t.zamami.features.qr}</h3>
        <p class="text-gray-600">{$t.zamami.features.qrDesc}</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
  <div class="container mx-auto px-4 text-center">
    <h2 class="text-3xl font-bold mb-4">{$t.zamami.contact.title}</h2>
    <p class="text-xl mb-8 max-w-3xl mx-auto">
      {$t.zamami.contact.description}
    </p>
    <a href="/contact" class="bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 px-8 rounded-lg text-lg transition-colors">
      {$t.zamami.contact.button}
    </a>
  </div>
</section>

<style>
  :global(body) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
