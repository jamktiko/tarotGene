<script lang="ts">
	import { onMount } from 'svelte';
	import type { Kortit } from '$lib/types/Kortit';
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import {pakka} from '$lib/datanhaku.svelte'


	onMount(async () => {
		await pakka.hKortit()
	})
	$inspect(pakka.tKortit)

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
				chosen = Math.floor(Math.random() * pakka.tKortit.length);
			} while (joNostetut.has(chosen));
			nostot.push(pakka.tKortit[chosen]);
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
				class="mx-auto flex h-90 w-60 translate-y-1/2 pt-10 blur-[2px]"
				alt="Kortti"
			/>

			<img
				src="cardBack.png"
				class="mx-auto flex h-90 w-60 -translate-y-1/2 shadow-md motion-safe:animate-[bounce_5s_infinite] border-1 border-c rounded-lg border-black"
				alt="Kortti"
				onclick={kortinNaytto}
			/>

			<!-- Alkusivu -->
			<div class="gap m-6 grid grid-cols-3">
				<Button onclick={() => maara--} text="aaaaaa" disabled={maara <= 0} />

				<div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full p-5 text-white">
					{maara}
				</div>
				<Button onclick={() => maara++} text="aaaaaa" disabled={maara >= 3} />

				<div></div>
				<Button onclick={kortinNaytto} text="Nosta kohtalosi" />
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
						<h1 class="text-shadow-valkoinen font-['Rosarivo'] text-2xl text-amber-50">
							{kortti.name}
						</h1>
						<img
							onclick={() => naytaKortti(kortti)}
							class=" object-cover sm:h-45 sm:w-30 md:h-90 md:w-60"
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
