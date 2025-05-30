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
	<title>Japanese Cities Spin the Wheel | Etlode</title>
	<meta name="description" content="Spin the wheel to discover a random Japanese city!" />
</svelte:head>

<main class="container">
	<div class="wheel-section">
		<WheelSpin onCitySelected={handleCitySelected} onSpinStarted={handleSpinStarted} />
	</div>
	<div class="map-section">
		<JapanMap interactive={true} bind:selectedPrefecture={selectedPrefectureId} />
	</div>
</main>

<style>
	.container {
		max-width: 100vw;
		margin: 0;
		padding: 1rem;
		min-height: 100vh;
		display: grid;
		grid-template-columns: minmax(400px, 1fr) minmax(500px, 1.2fr);
		gap: 2rem;
		align-items: start;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		box-sizing: border-box;
	}

	.wheel-section {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		height: fit-content;
		max-height: 100vh;
		padding-top: 1rem;
	}

	.map-section {
		display: flex;
		justify-content: center;
		align-items: center;
		height: fit-content;
		max-width: 75%;
		/* position: sticky; */
		/* top: 2rem; */
	}

	@media (max-width: 1200px) {
		.container {
			grid-template-columns: 1fr 1fr;
			gap: 1.5rem;
		}
	}

	@media (max-width: 1024px) {
		.container {
			grid-template-columns: 1fr;
			gap: 1rem;
			align-items: start;
			justify-items: center;
			padding: 0.5rem;
		}

		.wheel-section {
			height: 75vh; /* Increased from 60vh to provide more space */
			max-height: 75vh;
			min-height: 75vh;
			padding-top: 0.5rem;
			width: 100%;
		}

		.map-section {
			width: 100%;
			max-width: 600px;
			position: static;
		}
	}

	@media (max-width: 768px) {
		.container {
			padding: 0.5rem;
			gap: 0.5rem;
		}

		.wheel-section {
			height: 70vh; /* Increased from 55vh to provide more space */
			max-height: 70vh;
			min-height: 70vh;
			padding-top: 0.25rem;
		}
	}

	@media (max-width: 480px) {
		.container {
			gap: 0.5rem;
			padding: 0.25rem;
		}

		.wheel-section {
			height: 70vh; /* Increased from 50vh to provide more space */
			max-height: 70vh;
			min-height: 70vh;
			padding-top: 0;
		}
	}
</style>