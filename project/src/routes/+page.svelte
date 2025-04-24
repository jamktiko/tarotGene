<script lang="ts">
	import { onMount } from 'svelte';
	import type { Kortit } from '$lib/types/Kortit';

	let pakka: Kortit[] = $state([]);

	onMount(async () => {
		const response = await fetch('/json/Tarot.json');
		if (response.ok) {
			pakka = await response.json();
		} else {
			console.error('Failed to fetch cards:', response.statusText);
		}
	});
</script>

{#each pakka as kortti (kortti.name)}
	<h1>{kortti.name}</h1>
	<p>{kortti.description}</p>
	<img src={kortti.image} alt="Kortin kuvateksti" />
{/each}
