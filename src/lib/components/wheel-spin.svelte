<script lang="ts">
	import { onMount } from 'svelte';
	import japanCities from '$lib/data/japan_cities.json';

	interface City {
		City: string;
		Japanese: string;
		Prefecture: string;
        Region: string;
        ID: string;
	}

	// Props - callback function for when a city is selected
	let {
		onCitySelected,
		onSpinStarted
	}: {
		onCitySelected?: (city: City) => void;
		onSpinStarted?: () => void;
	} = $props();

	let selectedCity: City | null = $state(null);
	let showResult = $state(false);
	let selectedRegion = $state('');

	// Wheel parameters
	let r = 160;
	let cntSlices = 8;
	let rotation = $state(0);
	let rotationInc = 0;
	let contentRadius = r * 4 / 5;
	let spinning = $state(false);
	let outerWidth = 12;

	// Dynamic sizing for desktop
	let wheelSize = $state(320); // Default size
	let isMobile = $state(false);

	onMount(() => {
		const updateWheelSize = () => {
			const vw = window.innerWidth;
			const vh = window.innerHeight;
			isMobile = vw <= 1024;
			
			if (!isMobile) {
				// For desktop, use viewport-based sizing with min/max constraints
				// Use smaller of 50% viewport width or 60% viewport height for bigger wheels
				const vwSize = vw * 0.50;
				const vhSize = vh * 0.55;
				wheelSize = Math.min(Math.max(Math.min(vwSize, vhSize), 400), 800);
			} else {
				// Mobile keeps fixed sizing
				wheelSize = Math.min(vw - 40, 360);
			}
		};

		updateWheelSize();
		window.addEventListener('resize', updateWheelSize);
		
		return () => {
			window.removeEventListener('resize', updateWheelSize);
		};
	});

	// Create 8 visible segments for the wheel display based on actual regions
	const wheelSegments = [
		{ color: '#FF0001', label: ['北海道', 'Hokkaido'], region: 'Hokkaido' },        // Red
		{ color: '#FF8001', label: ['東北', 'Tohoku'], region: 'Tohoku' },              // Orange
		{ color: '#FFE610', label: ['関東', 'Kanto'], region: 'Kanto' },               // Yellow
		{ color: '#80C41C', label: ['中部', 'Chubu'], region: 'Chubu' },               // Green
		{ color: '#4FD6CA', label: ['関西', 'Kansai'], region: 'Kansai' },             // Teal
		{ color: '#3498DB', label: ['中国', 'Chugoku'], region: 'Chugoku' },           // Blue
		{ color: '#6B1687', label: ['四国', 'Shikoku'], region: 'Shikoku' },           // Purple
		{ color: '#E91E63', label: ['九州・沖縄', 'Kyushu', 'Okinawa'], region: 'Kyushu-Okinawa' } // Pink
	];

	// Reactive calculations
	let sliceAngle = $derived(Math.PI * 2 / cntSlices);
	let sliceDegrees = $derived(360 / cntSlices);
	let result = $derived((((270 - rotation) / sliceDegrees) + cntSlices) % cntSlices | 0);

	// Animation loop
	const animationInterval = setInterval(() => {
		if (rotationInc > 0.5) {
			rotation += rotationInc;	
			rotationInc *= 0.985;
			if (rotation > 360) rotation -= 360;
		} else {
			if (spinning) {
				handleSpinResult();
				spinning = false;
			}
		}
	}, 16);

	const spinWheel = () => {
		if (spinning) return;
		
		showResult = false;
		selectedCity = null;
		selectedRegion = '';
		
		// Call the spin started callback if provided
		if (onSpinStarted) {
			onSpinStarted();
		}
		
		// Start spinning with random velocity
		rotationInc = 12 + 8 * Math.random();
		spinning = true;
	};

	const handleSpinResult = () => {
		const selectedSegment = wheelSegments[result % wheelSegments.length];
		selectedRegion = selectedSegment.region;
		
		// Filter cities by the selected region
		const citiesInRegion = japanCities.filter((city: City) => city.Region === selectedRegion);
		
		if (citiesInRegion.length > 0) {
			const randomIndex = Math.floor(Math.random() * citiesInRegion.length);
			selectedCity = citiesInRegion[randomIndex] as City;
		} else {
			// Fallback to random city if no cities found in region
			const randomIndex = Math.floor(Math.random() * japanCities.length);
			selectedCity = japanCities[randomIndex] as City;
		}
		
		// Call the callback function if provided
		if (selectedCity && onCitySelected) {
			onCitySelected(selectedCity);
		}
		
		showResult = true;
	};

	// Cleanup interval on destroy
	onMount(() => {
		return () => {
			clearInterval(animationInterval);
		};
	});
</script>

<div class="wheel-spin-container">
    <div class="header">
		<h1>Wheel of Japan</h1>
		<p>Spin the wheel to discover a random Japanese city!</p>
	</div>

	<div class="main-content">
		<div class="wheel-container">
			<div class="wheel-wrapper">
				<!-- SVG Wheel -->
				<svg 
					viewBox="0 0 {r*2+outerWidth*2} {r*2+outerWidth*2}" 
					width={wheelSize} 
					height={wheelSize}
					class="wheel-svg"
				>
					<g transform="translate({r+outerWidth} {r+outerWidth}) rotate({rotation}) translate({-r} {-r})">
						<!-- Outer circle with border -->
						<circle r={r} cx={r} cy={r} fill="transparent" stroke-width={outerWidth} stroke="#fff"/>
						
						<!-- Wheel segments -->
						{#each Array(cntSlices) as _, idx}
							{@const x = Math.cos(sliceAngle * idx)}
							{@const y = Math.sin(sliceAngle * idx)}
							{@const x2 = Math.cos(sliceAngle * (idx + 1))}
							{@const y2 = Math.sin(sliceAngle * (idx + 1))}
							{@const tx = Math.cos(sliceAngle * (idx + 0.5)) * contentRadius + r}
							{@const ty = Math.sin(sliceAngle * (idx + 0.5)) * contentRadius + r}
							{@const contentRotation = 90 + (360 / cntSlices * (idx + 0.5))}
							{@const path = [
								`M ${x * r + r} ${y * r + r}`,
								`A ${r} ${r} 0 0 1 ${x2 * r + r} ${y2 * r + r}`,
								`L ${r} ${r}`
							].join(' ')}
							
							<path d={path} fill={wheelSegments[idx % wheelSegments.length].color} stroke="#fff" stroke-width="2"/>
							
							<!-- Text content -->
							<g transform="translate({tx} {ty}) rotate({contentRotation}) translate({-tx} {-ty})">
								<text 
									font-size="15" 
									x={tx} 
									y={ty} 
									text-anchor="middle" 
									dominant-baseline="central"
									fill="white" 
									font-weight="bold"
									style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8); white-space: pre-line;"
								>
									{#each wheelSegments[idx % wheelSegments.length].label as line, lineIdx}
										<tspan x={tx} dy={lineIdx === 0 ? "-0.4em" : "1.2em"}>{line}</tspan>
									{/each}
								</text>
							</g>
						{/each}
					</g>
				</svg>
				
				<!-- Center button -->
				<button 
					class="spin-button" 
					onclick={spinWheel}
					disabled={spinning}
				>
					{spinning ? '⚡' : '🎰'}
				</button>
				
				<!-- Pointer -->
				<div class="pointer"></div>
			</div>
			
			<!-- Debug info -->
			{#if selectedRegion && spinning}
				<div class="debug-info">Current: {wheelSegments[result % wheelSegments.length].region}</div>
			{/if}
			
		</div>

	</div>

	<!-- Fixed-height results area to prevent layout shifts -->
	<div class="results-area">
		<!-- Result Display -->
		{#if showResult && selectedCity}
			<div class="result-container" class:show={showResult}>
				<div class="result-card">
					<h3>🎊 You got:</h3>
					<div class="city-info">
						<div class="city-name-en">{selectedCity.City}</div>
						<div class="city-name-jp">{selectedCity.Japanese}</div>
						<div class="prefecture">{selectedCity.Prefecture} Prefecture</div>
						<div class="region">Region: {selectedCity.Region}</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="info-section">
				<p>
					This wheel randomly selects from <strong>{japanCities.length}</strong> Japanese cities and municipalities.
					<br>Each spin gives you a random city from across all 47 prefectures of Japan!
				</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.wheel-spin-container {
		width: 100%;
		padding: 0.5rem;
		text-align: center;
		color: white;
		border-radius: 15px;
		max-width: none; /* Allow container to expand with wheel size */
		margin: 0 auto;
	}

	.main-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		gap: 1rem;
		margin: 0.5rem 0;
	}

	.wheel-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		max-width: none; /* Allow wheel to be as large as needed */
	}

	.header h1 {
		font-size: 3rem;
		margin: 0;
		background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		max-height: 12vh;
	}

	.header h1::before {
		content: "🎌 ";
		-webkit-text-fill-color: initial;
		color: white;
	}

	.header p {
		font-size: 1rem;
		opacity: 0.8;
		margin-bottom: 0.5rem;
	}

	.wheel-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.wheel-svg {
		filter: drop-shadow(0 8px 32px rgba(0, 0, 0, 0.3));
		transition: width 0.3s ease, height 0.3s ease;
	}

	.spin-button {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 60px;
		height: 60px;
		border-radius: 50%;
		border: 3px solid #fff;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		font-size: 1.5rem;
		cursor: pointer;
		transition: all 0.3s ease;
		z-index: 10;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
		color: white;
	}

	.spin-button:hover:not(:disabled) {
		transform: translate(-50%, -50%) scale(1.1);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
	}

	.spin-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		animation: pulse 1s infinite;
	}

	@keyframes pulse {
		0%, 100% { transform: translate(-50%, -50%) scale(1); }
		50% { transform: translate(-50%, -50%) scale(1.05); }
	}

	.pointer {
		position: absolute;
		top: 5px;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-top: 30px solid #fff;
		z-index: 5;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
	}

	.debug-info {
		margin-top: 1rem;
		padding: 0.5rem;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		font-size: 0.9rem;
		color: #fff;
	}

	.results-area {
		/* Fixed height container to prevent layout shifts */
		min-height: 200px;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		margin: 1rem auto 0;
		width: 100%;
		max-width: 800px;
	}

	.result-container {
		width: 100%;
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.5s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.result-container.show {
		opacity: 1;
		transform: translateY(0);
	}

	.result-card {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 15px;
		padding: 1.0rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		width: 100%;
	}

	.result-card h3 {
		font-size: 1.0rem;
		color: #ffd700;
	}

	.city-info {
		margin: 0.3rem 0;
	}

	.city-name-en {
		font-size: 1.5rem;
		font-weight: bold;
		/* margin: 0.1rem 0; */
		color: #fff;
	}

	.city-name-jp {
		font-size: 1.3rem;
		margin: 0.3rem 0;
		color: #4ecdc4;
		font-weight: 500;
	}

	.prefecture {
		font-size: 1rem;
		opacity: 0.8;
		margin: 0.3rem 0;
	}

	.region {
		font-size: 0.9rem;
		opacity: 0.7;
		margin: 0.3rem 0;
		font-style: italic;
	}

	.info-section {
		width: 100%;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 15px;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.info-section p {
		margin: 0;
		line-height: 1.6;
		opacity: 0.9;
	}

	/* Mobile responsiveness */
	@media (max-width: 1024px) {
		.wheel-spin-container {
			padding: 0.25rem;
		}

		.main-content {
			gap: 0.5rem;
			margin: 0.25rem 0;
		}

		/* .results-area { */
			/* Slightly smaller buffer on mobile */
			/* min-height: 200px; */
		/* } */

		.header h1 {
			font-size: 2.5rem;
		}

		.header p {
			font-size: 1.2rem;
			margin-bottom: 0.25rem;
		}

		.spin-button {
			width: 50px;
			height: 50px;
			font-size: 1.3rem;
		}

		.city-name-en {
			font-size: 1.3rem;
		}

		.city-name-jp {
			font-size: 1.1rem;
		}

		.result-card {
			padding: 1rem;
		}

		.info-section {
			padding: 1rem;
		}
	}
</style>