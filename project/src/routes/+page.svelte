<script lang="ts">
	import { onMount } from 'svelte';
	import type { Kortit } from '$lib/types/Kortit';
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import { text } from '@sveltejs/kit';

	let pakka: Kortit[] = $state([]);

	onMount(async () => {
		const response = await fetch('/json/Tarot.json');
		if (response.ok) {
			pakka = await response.json();
		} else {
			console.error('Failed to fetch cards:', response.statusText);
		}
	});

	let valittuKortti: Kortit | null = $state(null);
	function naytaKortti(kortti: Kortit) {
		valittuKortti = valittuKortti === kortti ? null : kortti;
	}

	let nostot: Kortit[] = $state([]); // Tällä hetkellä nostetut kortit

	let joNostetut = new Set(); // Nostettujen korttien pino
	let naytaTulos = $state(false); // Sivun vaihtaja alkusivun ja tulossivun välillä
	let maara = $state(0); //Montako korttia halutaan nostaa
	function palaa() {
		// Sivuissa takaisin meneva funktio, palaataa molemmat taulukot
		joNostetut.clear();
		nostot = [];
		naytaTulos = !naytaTulos;
	}
	function randomisointi() {
		//kortin randomisoija, joka samalla lisää nostetut kortit joNostetut pinoon
		let chosen;
		for (let i = 0; i < maara; i++) {
			do {
				chosen = Math.floor(Math.random() * pakka.length);
			} while (joNostetut.has(chosen));
			nostot.push(pakka[chosen]);
			joNostetut.add(chosen);
		}
	}

	function kortinNaytto() {
		// suorittaa randomisointi() funktion ja vaihtaa näkymän tulospuolelle
		randomisointi();
		naytaTulos = !naytaTulos;
	}
</script>

<div
	class="mx-auto min-h-screen min-w-screen space-y-4 bg-violet-950 shadow"
	style="background: radial-gradient(circle at center, #472454, #200f25);"
>
	<div class="gap grid p-6">
		{#if !naytaTulos}
			<img
				src="cardBack.png"
				class="mx-auto flex h-110 w-80 translate-y-1/2 blur-[2px]"
				alt="Kortti"
			/>

			<img
				src="cardBack.png"
				class="mx-auto flex h-110 w-80 -translate-y-1/2 shadow-md motion-safe:animate-[bounce_3s_infinite]"
				alt="Kortti"
				onclick={kortinNaytto}
			/>

			<!-- Alkusivu -->
			<div class="gap m-6 grid grid-cols-3">
				<Button onclick={() => maara--} text="/images/minus.png" disabled={maara <= 0} />
				<div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full p-5 text-white">
					{maara}
				</div>
				<Button onclick={() => maara++} text="/images/plus.png" disabled={maara >= 3} />
				<div></div>
				<Button onclick={kortinNaytto} text="Nosta kohtalosi" />
			</div>
		{/if}

		{#if naytaTulos}
			{#if maara <= 0}
				<div>Nosta kortti nössö</div>
			{/if}
			<!-- Kortin valittua -->
			{#each nostot as kortti (kortti.name)}
				<h1>{kortti.name}</h1>
				<div>
					<img
						onclick={() => naytaKortti(kortti)}
						class="h-sm w-sm"
						src={kortti.image}
						alt="Kortin kuvateksti"
					/>
					{#if valittuKortti === kortti}
						<Modal pakka={kortti} sulje={() => naytaKortti(kortti)} />
					{/if}
				</div>
			{/each}
			<Button onclick={palaa} text="Takaisin" />
		{/if}
	</div>
</div>
