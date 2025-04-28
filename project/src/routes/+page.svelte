<script lang="ts">
	import { onMount } from 'svelte';
	import type { Kortit } from '$lib/types/Kortit';
	import Modal from '$lib/components/Modal.svelte'

	let pakka: Kortit[] = $state([]) 

	onMount(async () => {
		const response = await fetch('/json/Tarot.json');
		if (response.ok) {
			pakka = await response.json();
		} else {
			console.error('Failed to fetch cards:', response.statusText);
		}
	});	

	let valittuKortti: Kortit | null = $state(null)
	function naytaKortti(kortti: Kortit) {
		valittuKortti = valittuKortti === kortti ? null:kortti;
	}
	
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


</script>

{#each pakka as kortti (kortti.name)}
		<h1>{kortti.name}</h1>
	<div>
			<img onclick={() => naytaKortti(kortti)} class='w-sm h-sm' src={kortti.image} alt="Kortin kuvateksti" />
		{#if valittuKortti === kortti}
			<Modal pakka={kortti} sulje={() =>naytaKortti(kortti)}/>
		{/if}
	</div>

{/each}
