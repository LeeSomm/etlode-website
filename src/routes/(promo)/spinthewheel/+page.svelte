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
			align-items: center;
			justify-items: center;
		}
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
			gap: 1.5rem;
		}
	}
</style>