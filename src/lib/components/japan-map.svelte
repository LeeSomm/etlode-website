<script lang="ts">
	import JapanMapSvg from './japan-map-svg.svelte';

	// Props - Svelte 5 syntax with event callbacks
	let {
		highlightedPrefecture = $bindable(null),
		selectedPrefecture = $bindable(null),
		interactive = true,
		showTooltip = true,
		onPrefectureHover,
		onPrefectureClick
	}: {
		highlightedPrefecture?: string | null; // External highlight (e.g., from data/search)
		selectedPrefecture?: string | null;
		interactive?: boolean;
		showTooltip?: boolean;
		onPrefectureHover?: (prefectureId: string | null) => void;
		onPrefectureClick?: (prefectureId: string) => void;
	} = $props();

	// Prefecture mapping (JP codes to prefecture names)
	const prefectureMap: Record<string, string> = {
		'JP-01': 'Hokkaido',
		'JP-02': 'Aomori',
		'JP-03': 'Iwate',
		'JP-04': 'Miyagi',
		'JP-05': 'Akita',
		'JP-06': 'Yamagata',
		'JP-07': 'Fukushima',
		'JP-08': 'Ibaraki',
		'JP-09': 'Tochigi',
		'JP-10': 'Gunma',
		'JP-11': 'Saitama',
		'JP-12': 'Chiba',
		'JP-13': 'Tokyo',
		'JP-14': 'Kanagawa',
		'JP-15': 'Niigata',
		'JP-16': 'Toyama',
		'JP-17': 'Ishikawa',
		'JP-18': 'Fukui',
		'JP-19': 'Yamanashi',
		'JP-20': 'Nagano',
		'JP-21': 'Gifu',
		'JP-22': 'Shizuoka',
		'JP-23': 'Aichi',
		'JP-24': 'Mie',
		'JP-25': 'Shiga',
		'JP-26': 'Kyoto',
		'JP-27': 'Osaka',
		'JP-28': 'Hyogo',
		'JP-29': 'Nara',
		'JP-30': 'Wakayama',
		'JP-31': 'Tottori',
		'JP-32': 'Shimane',
		'JP-33': 'Okayama',
		'JP-34': 'Hiroshima',
		'JP-35': 'Yamaguchi',
		'JP-36': 'Tokushima',
		'JP-37': 'Kagawa',
		'JP-38': 'Ehime',
		'JP-39': 'Kochi',
		'JP-40': 'Fukuoka',
		'JP-41': 'Saga',
		'JP-42': 'Nagasaki',
		'JP-43': 'Kumamoto',
		'JP-44': 'Oita',
		'JP-45': 'Miyazaki',
		'JP-46': 'Kagoshima',
		'JP-47': 'Okinawa'
	};

	// Regional groupings for color coding
	const regionColors: Record<string, string> = {
		'Hokkaido': '#FF0001',
		'Tohoku': '#FF8001',
		'Kanto': '#FFE610',
		'Chubu': '#80C41C',
		'Kansai': '#4FD6CA',
		'Chugoku': '#3498DB',
		'Shikoku': '#6B1687',
		'Kyushu-Okinawa': '#E91E63'
	};


	// Prefecture ID to region mapping
	const prefectureIdToRegion: Record<string, string> = {
		'JP-01': 'Hokkaido',
		'JP-02': 'Tohoku', 'JP-03': 'Tohoku', 'JP-04': 'Tohoku', 'JP-05': 'Tohoku', 'JP-06': 'Tohoku', 'JP-07': 'Tohoku',
		'JP-08': 'Kanto', 'JP-09': 'Kanto', 'JP-10': 'Kanto', 'JP-11': 'Kanto', 'JP-12': 'Kanto', 'JP-13': 'Kanto', 'JP-14': 'Kanto',
		'JP-15': 'Chubu', 'JP-16': 'Chubu', 'JP-17': 'Chubu', 'JP-18': 'Chubu', 'JP-19': 'Chubu', 'JP-20': 'Chubu', 'JP-21': 'Chubu', 'JP-22': 'Chubu', 'JP-23': 'Chubu',
		'JP-24': 'Kansai', 'JP-25': 'Kansai', 'JP-26': 'Kansai', 'JP-27': 'Kansai', 'JP-28': 'Kansai', 'JP-29': 'Kansai', 'JP-30': 'Kansai',
		'JP-31': 'Chugoku', 'JP-32': 'Chugoku', 'JP-33': 'Chugoku', 'JP-34': 'Chugoku', 'JP-35': 'Chugoku',
		'JP-36': 'Shikoku', 'JP-37': 'Shikoku', 'JP-38': 'Shikoku', 'JP-39': 'Shikoku',
		'JP-40': 'Kyushu-Okinawa', 'JP-41': 'Kyushu-Okinawa', 'JP-42': 'Kyushu-Okinawa', 'JP-43': 'Kyushu-Okinawa', 'JP-44': 'Kyushu-Okinawa', 'JP-45': 'Kyushu-Okinawa', 'JP-46': 'Kyushu-Okinawa', 'JP-47': 'Kyushu-Okinawa'
	};

	// State - using Svelte 5 reactive state
	let hoveredPrefecture = $state<string | null>(null);
	let tooltipX = $state(0);
	let tooltipY = $state(0);
	let svgElement = $state<SVGElement | undefined>(undefined);

	// Handle mouse events
	function handleMouseEnter(event: MouseEvent, prefectureId: string) {
		if (!interactive) return;
		
		hoveredPrefecture = prefectureId;
		onPrefectureHover?.(prefectureId);
		
		// Bring hovered prefecture to front, but keep selected on top
		bringPrefectureToFront(prefectureId);
		
		if (showTooltip) {
			updateTooltipPosition(event);
		}
	}

	function handleMouseLeave() {
		if (!interactive) return;
		
		hoveredPrefecture = null;
		onPrefectureHover?.(null);
	}

	function handleMouseMove(event: MouseEvent) {
		if (!interactive || !hoveredPrefecture || !showTooltip) return;
		updateTooltipPosition(event);
	}

	function handleClick(prefectureId: string) {
		if (!interactive) return;
		
		if (prefectureId !== selectedPrefecture) {
			selectedPrefecture = prefectureId;
			onPrefectureClick?.(prefectureId);
		} else {
			selectedPrefecture = null; // Deselect if already selected
		}
		
		// Always bring clicked prefecture to front
		bringPrefectureToFront(prefectureId);
	}

	function handleKeyDown(event: KeyboardEvent, prefectureId: string) {
		if (!interactive) return;
		
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick(prefectureId);
		}
	}

    function updateTooltipPosition(event: MouseEvent) {
        if (!svgElement) return;
        
        // Use clientX/clientY for viewport-relative positioning
        // Add offset to prevent tooltip from appearing under cursor
        tooltipX = event.clientX + 15;
        tooltipY = event.clientY - 10;
    }

	// Function to bring a prefecture to front by moving it to the end of its parent
	// Always ensures selected prefecture stays on top
	function bringPrefectureToFront(prefectureId: string) {
		if (!svgElement) return;
		
		const prefectureElement = svgElement.querySelector(`#${prefectureId}`);
		if (prefectureElement && prefectureElement.parentNode) {
			// Move the element to the end of its parent (brings it to front)
			prefectureElement.parentNode.appendChild(prefectureElement);
		}
		
		// If there's a selected prefecture and it's not the one we just moved,
		// make sure selected stays on top
		if (selectedPrefecture && selectedPrefecture !== prefectureId) {
			const selectedElement = svgElement.querySelector(`#${selectedPrefecture}`);
			if (selectedElement && selectedElement.parentNode) {
				selectedElement.parentNode.appendChild(selectedElement);
			}
		}
	}

	// Get prefecture color based on state - cleaner priority logic
	function getPrefectureColor(prefectureId: string): string {
		if (!prefectureMap[prefectureId]) return '#39FF14'; // Neon green for unknown prefectures

		// Priority 1: Selected prefecture (user clicked)
		if (selectedPrefecture === prefectureId) {
			return '#000000'; // Black - highest contrast against all colors
			// Alternative options:
			// return 'url(#rainbowGradient)'; // Reference to SVG gradient
			// return '#ffffff'; // White - also high contrast
			// return '#2d3748'; // Dark gray - softer than black
			// return '#1a202c'; // Very dark blue-gray
		}

		// Priority 2: External highlight (from parent component - e.g., search results)
		if (highlightedPrefecture === prefectureId) {
			return '#fbbf24'; // Yellow highlight
		}

		// Priority 3: Hovered prefecture (user hovering)
		if (hoveredPrefecture === prefectureId) {
			const region = prefectureIdToRegion[prefectureId];
			const regionColor = region ? regionColors[region] : '#6b7280';
			// Make hovered color brighter/more saturated
			return regionColor;
		}

		// Priority 4: Default state - muted region color
		const region = prefectureIdToRegion[prefectureId];
		const regionColor = region ? regionColors[region] : '#e5e7eb';
		// Make default colors more muted by reducing opacity in the color functions
		return regionColor;
	}


	// Get prefecture stroke - simplified logic with Safari compatibility
	function getPrefectureStroke(prefectureId: string): string {
		// Any interactive state gets emphasized stroke
		if (selectedPrefecture === prefectureId || 
			highlightedPrefecture === prefectureId) {
			// Safari has issues with SVG gradients in some contexts, use solid color instead
			return 'url(#rainbowGradient)';
		}	
		else if (hoveredPrefecture === prefectureId) {
			return '#000000'; // Black stroke for high contrast
		}

		return '#2d3748'; // Default stroke color
	}

	// Get prefecture opacity - simplified logic
	function getPrefectureOpacity(prefectureId: string): number {
		// Selected and externally highlighted get full opacity
		if (selectedPrefecture === prefectureId || highlightedPrefecture === prefectureId) {
			return 1;
		}

		// Hovered gets slightly more opacity
		if (hoveredPrefecture === prefectureId) {
			return 1;
		}

		// Default state is more muted
		return 0.7;
	}
</script>

<!-- Example of a specific prefecture path in the SVG 
    <path
        d="m 260.23993,277.87889 -0.17,-0.35 0.5,-1.77 -0.86,-1.4 0.11,-1.46 0.46,-1.37 -0.25,-0.32 -0.89,0.36 -1.14,-0.35 0,0 -0.97,-1.57 -0.32,-1.21 0,0 0.22,-2.19 1.69,-2.97 1.28,0.15 1.66,-0.5 1.48,-1.13 -0.02,0.57 1.18,0.87 -0.03,0.65 0.5,0.21 -0.09,0.48 0.27,0.32 0.32,0.15 0.3,-0.21 0.94,0.39 0.52,0.71 0.85,-0.17 0.92,-0.73 0.63,-0.01 0.75,0.47 -0.07,0.24 0.84,0.05 -0.02,0.31 0.99,0.5 1.72,-1.4 0.8,-0.08 0,0 -0.32,0.83 0.64,0.81 -0.01,0.51 1.26,-0.26 0.85,-0.55 1.56,0.3 0.22,0.39 0.84,-0.27 0,0 -0.31,0.98 0.52,0.5 -0.58,0.57 0.08,0.47 -0.46,0.24 -1.46,2 -0.03,1.06 -1.28,1.93 -2.75,1.53 -0.43,1.23 0.16,2.32 0,0 -3.41,0.79 -3.43,1.23 -2.03,0.27 -0.26,-0.21 0.8,-1.71 0.49,0.05 0.25,0.57 2.36,-1.02 0.86,-0.53 -0.1,-0.44 0.45,-0.36 0.48,0.15 0.22,-0.19 0.21,-1.14 -0.57,-0.7 -1.69,-0.31 -0.52,0.46 -0.24,0.93 -0.81,-0.57 -2.13,0.25 -1.42,-1.37 0.31,-1.08 -0.44,-0.19 -0.42,0.59 -0.27,2.22 1.02,0.93 0.15,0.88 -1.69,-0.6 -0.77,-0.73 z"
        id="JP-23"
        fill={getPrefectureColor('JP-23')}
        stroke={getPrefectureStroke('JP-23')}
        stroke-width="1"
        opacity={getPrefectureOpacity('JP-23')}
        class:cursor-pointer={interactive}
        {...(interactive ? {
            'on:mouseenter': (e) => handleMouseEnter(e, 'JP-23'),
            'on:mouseleave': handleMouseLeave,
            'on:mousemove': handleMouseMove,
            'on:click': () => handleClick('JP-23'),
            'on:keydown': (e) => handleKeyDown(e, 'JP-23'),
            'tabindex': 0,
            'role': 'button',
            'aria-label': 'Aichi Prefecture'
        } : {})}
    /> -->

<div class="japan-map-container">
    <JapanMapSvg 
        bind:svgElement
        {getPrefectureColor}
        {getPrefectureStroke}
        {getPrefectureOpacity}
        {handleMouseEnter}
        {handleMouseLeave}
        {handleMouseMove}
        {handleClick}
        {handleKeyDown}
        {interactive}
    />
</div>

{#if showTooltip && hoveredPrefecture}
    <div 
        class="tooltip" 
        style="left: {tooltipX + 10}px; top: {tooltipY + 5}px;"
    >
        {prefectureMap[hoveredPrefecture]}
    </div>
{/if}

<style>
	.japan-map-container {
		width: 100%;
		max-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.japan-map-container :global(svg) {
		width: 100%;
		height: auto;
		max-height: 100vh;
		object-fit: contain;
	}

	.tooltip {
		position: fixed; /* Changed from absolute to fixed for viewport positioning */
		background: rgba(0, 0, 0, 0.9); /* Slightly more opaque for better visibility */
		color: white;
		padding: 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
		pointer-events: none;
		z-index: 9999; /* Much higher z-index to ensure it appears above everything */
		white-space: nowrap;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); /* Add shadow for better visibility */
		border: 1px solid rgba(255, 255, 255, 0.1); /* Subtle border for definition */
	}
</style>
