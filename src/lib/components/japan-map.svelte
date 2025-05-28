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
		highlightedPrefecture?: string | null;
		selectedPrefecture?: string | null;
		interactive?: boolean;
		showTooltip?: boolean;
		onPrefectureHover?: (prefecture: string | null) => void;
		onPrefectureClick?: (prefecture: string) => void;
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


	// Prefecture to region mapping
	const prefectureToRegion: Record<string, string> = {
		'Hokkaido': 'Hokkaido',
		'Aomori': 'Tohoku', 'Iwate': 'Tohoku', 'Miyagi': 'Tohoku', 'Akita': 'Tohoku', 'Yamagata': 'Tohoku', 'Fukushima': 'Tohoku',
		'Ibaraki': 'Kanto', 'Tochigi': 'Kanto', 'Gunma': 'Kanto', 'Saitama': 'Kanto', 'Chiba': 'Kanto', 'Tokyo': 'Kanto', 'Kanagawa': 'Kanto',
		'Niigata': 'Chubu', 'Toyama': 'Chubu', 'Ishikawa': 'Chubu', 'Fukui': 'Chubu', 'Yamanashi': 'Chubu', 'Nagano': 'Chubu', 'Gifu': 'Chubu', 'Shizuoka': 'Chubu', 'Aichi': 'Chubu',
		'Mie': 'Kansai', 'Shiga': 'Kansai', 'Kyoto': 'Kansai', 'Osaka': 'Kansai', 'Hyogo': 'Kansai', 'Nara': 'Kansai', 'Wakayama': 'Kansai',
		'Tottori': 'Chugoku', 'Shimane': 'Chugoku', 'Okayama': 'Chugoku', 'Hiroshima': 'Chugoku', 'Yamaguchi': 'Chugoku',
		'Tokushima': 'Shikoku', 'Kagawa': 'Shikoku', 'Ehime': 'Shikoku', 'Kochi': 'Shikoku',
		'Fukuoka': 'Kyushu-Okinawa', 'Saga': 'Kyushu-Okinawa', 'Nagasaki': 'Kyushu-Okinawa', 'Kumamoto': 'Kyushu-Okinawa', 'Oita': 'Kyushu-Okinawa', 'Miyazaki': 'Kyushu-Okinawa', 'Kagoshima': 'Kyushu-Okinawa', 'Okinawa': 'Kyushu-Okinawa'
	};

	// State - using Svelte 5 reactive state
	let hoveredPrefecture = $state<string | null>(null);
	let tooltipX = $state(0);
	let tooltipY = $state(0);
	let svgElement = $state<SVGElement | undefined>(undefined);

	// Handle mouse events
	function handleMouseEnter(event: MouseEvent, prefectureId: string) {
		if (!interactive) return;
		
		const prefecture = prefectureMap[prefectureId];
		if (prefecture) {
			hoveredPrefecture = prefecture;
			highlightedPrefecture = prefecture;
			onPrefectureHover?.(prefecture);
			
			if (showTooltip) {
				updateTooltipPosition(event);
			}
		}
	}

	function handleMouseLeave() {
		if (!interactive) return;
		
		hoveredPrefecture = null;
		highlightedPrefecture = null;
		onPrefectureHover?.(null);
	}

	function handleMouseMove(event: MouseEvent) {
		if (!interactive || !hoveredPrefecture || !showTooltip) return;
		updateTooltipPosition(event);
	}

	function handleClick(prefectureId: string) {
		if (!interactive) return;
		
		const prefecture = prefectureMap[prefectureId];
		if (prefecture && prefecture !== selectedPrefecture) {
            selectedPrefecture = prefecture;
		} else if (prefecture === selectedPrefecture) {
            selectedPrefecture = null; // Deselect if already selected
        }
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
        
        tooltipX = event.clientX;
        tooltipY = event.clientY;
    }

	// Get prefecture color based on state - using $derived for reactivity
	function getPrefectureColor(prefectureId: string): string {
		const prefecture = prefectureMap[prefectureId];
		if (!prefecture) return '#39FF14'; // Neon green for unknown prefectures

		// Highlighted prefecture (from external prop)
		if (highlightedPrefecture === prefecture) {
			return '#fbbf24'; // Yellow highlight
		}

		// Selected prefecture - handle both ID and name formats
		if (selectedPrefecture === prefecture || selectedPrefecture === prefectureId) {
			return '#dc2626'; // Red selection
		}

		// Hovered prefecture
		if (hoveredPrefecture === prefecture) {
			const region = prefectureToRegion[prefecture];
			return region ? regionColors[region] : '#6b7280';
		}

		// Default state - use region color
		const region = prefectureToRegion[prefecture];
		return region ? regionColors[region] : '#e5e7eb';
	}

	// Get prefecture stroke - using $derived for reactivity
	function getPrefectureStroke(prefectureId: string): string {
		const prefecture = prefectureMap[prefectureId];
		if (!prefecture) return '#d1d5db';

		if (highlightedPrefecture === prefecture || selectedPrefecture === prefecture || selectedPrefecture === prefectureId || hoveredPrefecture === prefecture) {
			return '#1f2937'; // Dark gray stroke
		}

		return '#d1d5db'; // Default stroke color - light gray
	}

	// Get prefecture opacity - using $derived for reactivity
	function getPrefectureOpacity(prefectureId: string): number {
		const prefecture = prefectureMap[prefectureId];
		if (!prefecture) return 0.7;

		if (highlightedPrefecture === prefecture || selectedPrefecture === prefecture || selectedPrefecture === prefectureId) {
			return 1;
		}

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

{#if showTooltip && hoveredPrefecture}
    <div 
        class="tooltip" 
        style="left: {tooltipX + 10}px; top: {tooltipY + 5}px;"
    >
        {hoveredPrefecture}
    </div>
{/if}

<style>

	.tooltip {
		position: absolute;
		background: rgba(0, 0, 0, 0.8);
		color: white;
		padding: 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
		pointer-events: none;
		z-index: 10;
		white-space: nowrap;
	}
</style>