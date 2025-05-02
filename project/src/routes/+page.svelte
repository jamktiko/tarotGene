<script lang="ts">
	import { onMount } from 'svelte';
	import type { Kortit } from '$lib/types/Kortit';
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	// import { text } from '@sveltejs/kit';

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
		maara = 0
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

	function rakkaus() {
		maara=6;
		randomisointi();
		naytaTulos=!naytaTulos

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
			<!-- Tausta Kuva -->
			<img
				src="cardBack.png"
				class="mx-auto flex h-90 w-60 translate-y-1/2 pt-10 blur-[2px] rounded-xl border-2 border-black outline-1 outline-[#FFD700]"
				alt="Kortti"
			/>

			<!-- Liikkuva kuva -->
			<img
				src="cardBack.png"
				class="mx-auto flex h-90 w-60 -translate-y-1/2 shadow-md motion-safe:animate-[bounce_5s_infinite] transition duration-175 ease-in-out hover:scale-101 rounded-xl border-2 border-black outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#FFD700]"
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
				<!-- <Button onclick={kortinNaytto} text="Nosta kohtalosi" /> -->
		  </div>
		{/if}

		{#if naytaTulos}
			{#if maara <= 0}
				<div class="text-shadow-valkoinen grid place-items-center pt-20 pb-60 text-xl text-white">
					Nosta kortti nössö
				</div>
			{/if}
			<!-- Kortin valittua -->
			<div class="flex flex-wrap justify-center gap-4">
				{#each nostot as kortti (kortti.name)}
					<div class="flex flex-col items-center gap-6 pb-14">
						<h1 class="font-['Rosarivo'] text-white text-2xl text-shadow-white text-shadow-sm">
							{kortti.name}
						</h1>
						<img
							onclick={() => naytaKortti(kortti)}
							class=" object-cover sm:h-45 sm:w-30 md:h-90 md:w-60 transition duration-175 ease-in-out hover:scale-101 w-75 h-100 rounded-xl border-4 border-black outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#FFD700]"
							src={kortti.image}
							alt="Kortin kuvateksti"
						/>
					</div>
					{#if valittuKortti === kortti}
						<Modal pakka={kortti} sulje={() => naytaKortti(kortti)} />
					{/if}
				{/each}
			</div>
			<Button onclick={palaa} text="Takaisin" />
		{/if}
	</div>
</div>
