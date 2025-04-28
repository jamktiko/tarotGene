<script lang="ts">
	import { onMount } from 'svelte';
	import type { Kortit } from '$lib/types/Kortit';

	let pakka: Kortit[] = $state([]);

	let picker = 0;
	
	let oldpicks = new Set();
	let boolean = false;

	function reset() {
		oldpicks.clear();
	}
	function rmFrmDck() {
		do {
			picker = Math.floor(Math.random() * pakka.length);
		} while (oldpicks.has(picker));

		oldpicks.add(picker);
	}

	function boleChang() {
		boolean = !boolean;
		rmFrmDck();
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
