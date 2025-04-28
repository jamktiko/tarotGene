<script lang="ts">
	import { onMount } from 'svelte';
	import type { Kortit } from '$lib/types/Kortit';

	let pakka: Kortit[] = $state([]);

	let picker:number[] = $state([]);
	
	let oldpicks = new Set();
	let naytaTulos = $state(false);

	function reset() {
		oldpicks.clear();
		picker=[]
	}
	function rmFrmDck() {
		let chosen
		for (let i = 0; i < 2; i++) {
			do {
			chosen = Math.floor(Math.random() * pakka.length);
		} while (oldpicks.has(chosen));
		picker.push(chosen)
		oldpicks.add(chosen);
		console.log(chosen);
		
		}


	}

	function boleChang() {
		naytaTulos = !naytaTulos;
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

{#if naytaTulos}
	{#each picker as kortti }
<div>Korttisi on {pakka[kortti].name}</div>
	<img src={pakka[kortti].image} alt="">
	{/each}

{/if}
<button onclick={boleChang}>Vaihda</button>