<script lang="ts">
    import WheelSpin from '$lib/components/wheel-spin.svelte';
    import JapanMap from '$lib/components/japan-map.svelte';

    interface City {
        City: string;
        Japanese: string;
        Prefecture: string;
        Region: string;
        ID: string;
    }

    let selectedPrefectureId: string | null = null;

    function handleCitySelected(city: City) {
        selectedPrefectureId = city.ID;
    }

    function handleSpinStarted() {
        selectedPrefectureId = null;
    }
</script>

<svelte:head>
	<title>Japanese Cities Spin the Wheel | ET-Lode</title>
	<meta name="description" content="Spin the wheel to discover a random Japanese city!" />
</svelte:head>

<main class="container">
	<WheelSpin onCitySelected={handleCitySelected} onSpinStarted={handleSpinStarted} />
	<JapanMap interactive={true} selectedPrefecture={selectedPrefectureId} />
</main>

<style>
	.container {
		max-width: 100vw;
		margin: 0;
		padding: 2rem;
		min-height: 100vh;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		align-items: start;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		box-sizing: border-box;
	}

	@media (max-width: 1024px) {
		.container {
			grid-template-columns: 1fr;
			gap: 2rem;
			align-items: start;
			justify-items: center;
			/* Reserve space to prevent jerky movement */
			min-height: 100vh;
		}

		/* Reserve minimum height for wheel component to prevent layout shift */
		.container > :global(:first-child) {
			min-height: 66vh;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
		}
	}

	@media (max-width: 400px) {
		.container {
			padding: 1rem;
			gap: 1.5rem;
		}
		/* Reserve minimum height for wheel component to prevent layout shift */
		.container > :global(:first-child) {
			min-height: 68vh;
		}
	}
</style>