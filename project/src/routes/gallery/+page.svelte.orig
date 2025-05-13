<script lang="ts">
	import { onMount } from 'svelte';
	import type { Kortit } from '$lib/types/Kortit';

	let pakka: Kortit[] = $state([]);

	let nostot = 0;
	
	let joNostetut = new Set();
	let boolean = false;

	function palaa() {
		joNostetut.clear();
	}
	function randomisointi() {
		do {
			nostot = Math.floor(Math.random() * pakka.length);
		} while (joNostetut.has(nostot));

		joNostetut.add(nostot);
	}

	function kortinNaytto() {
		boolean = !boolean;
		randomisointi();
	}

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
