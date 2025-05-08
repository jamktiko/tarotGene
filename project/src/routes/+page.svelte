<script lang="ts">
	import { onMount } from 'svelte';
	import type { Kortit } from '$lib/types/Kortit';
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import { fly, fade } from 'svelte/transition';
	// import { flip } from 'svelte/animate';
	// import { text } from '@sveltejs/kit';
	import { pakka } from '$lib/datanhaku.svelte';
	// import Nosto from "$lib/components/Nosto.svelte";
	import { nostetut } from '$lib/valitutkortit.svelte'; // Tällä hetkellä nostetut kortit sijaisee täällä
	import { fiftyFifty } from '$lib/tulosruutu.svelte'; // Hallitsee ruudun vaihdon booleania sekä nostettujen korttien määrää
	import AiheValinta from '$lib/components/AiheVal.svelte';

	// console.log(fiftyFifty.maara);

	onMount(async () => {
		await pakka.hKortit();
	});
	import type { fromStore } from 'svelte/store';
	$inspect(pakka.tKortit);

	let valittuKortti: Kortit | null = $state(null);
	function naytaKortti(kortti: Kortit) {
		valittuKortti = valittuKortti === kortti ? null : kortti;
	}

	// let nostot: Kortit[] = $state([]); // Tällä hetkellä nostetut kortit

	let joNostetut = new Set(); // Nostettujen korttien pino
	// let naytaTulos = $state(false); // Sivun vaihtaja alkusivun ja tulossivun välillä
	// let maara = $state(0); //Montako korttia halutaan nostaa
	function palaa() {
		// Sivuissa takaisin meneva funktio, palauttaa molemmat taulukot
		joNostetut.clear();
		// nostot=[]
		nostetut.tyhjenna();
		fiftyFifty.vaihda();
		fiftyFifty.maara = 0;
		// $inspect(nostetut.nNostetut)
		// console.log(nostetut.nNostetut);
	}
	function randomisointi() {
		//kortin randomisoija, joka samalla lisää nostetut kortit joNostetut pinoon
		let chosen;
		for (let i = 0; i < fiftyFifty.maara; i++) {
			do {
				chosen = Math.floor(Math.random() * pakka.tKortit.length);
			} while (joNostetut.has(chosen));
			nostetut.tyonna(pakka.tKortit[chosen]);
			joNostetut.add(chosen);
			// nostot.push(pakka.tKortit[chosen])
		}
		// $inspect(nostetut.nNostetut)
		// console.log(nostetut.nNostetut);
	}

	// function rakkaus() {
	// 	maara=6;
	// 	randomisointi();
	// 	naytaTulos=!naytaTulos

	// }
	function kortinNaytto() {
		// suorittaa randomisointi() funktion ja vaihtaa näkymän tulospuolelle
		randomisointi();
		fiftyFifty.vaihda();

		// $inspect(nostetut.nNostetut)
		// console.log(nostetut.nNostetut);
		// console.log(fiftyFifty.booleani);
	}
</script>

<div
	class="mx-auto min-h-screen min-w-screen space-y-4 bg-violet-950 shadow"
	style="background: radial-gradient(circle at center, #472454, #200f25);"
>
	<div class="gap grid p-6">
		{#if !fiftyFifty.booleani}
			<AiheValinta />
			<!-- Alkusivu -->
			<div class="flex flex-row items-center justify-center gap-6 p-4 sm:gap-10">
				<div class="w-16 sm:w-20">
					<Button
						onclick={() => fiftyFifty.maara--}
						text="/images/minus.png"
						disabled={fiftyFifty.maara <= 0}
					/>
				</div>

				<!--BOUNCY KORTIT-->

				<!--Blurrattu tausta kortti-->
				<div class="relative aspect-[2/3] w-40 sm:w-48 md:w-60">
					<img
						src="cardBack.png"
						class=" absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 transform rounded-xl border-4 border-black object-contain outline-1 outline-[#FFD700] blur-[2px]"
						alt="Kortti"
						onclick={kortinNaytto}
						transition:fade
					/>

					<!--Eka kortti-->
					<div class="z-10">
						{#if fiftyFifty.maara > 0}
							<img
								src="cardBack.png"
								class="cursor-pointer absolute top-0 left-1/2 z-10 -translate-x-1/2 transform rounded-xl border-4 border-black object-contain animate-bounce-glow outline-1 outline-[#FFD700] transition duration-300 ease-in-out hover:scale-101"
								alt="Kortti"
								onclick={kortinNaytto}
								in:fade
								out:fly|global={{ x: 0, y: -1500, duration: 1000 }}
							/>
						{/if}
					</div>

					<!--Toka kortti-->
					<div class="z-10">
						{#if fiftyFifty.maara > 1}
							<img
								src="cardBack.png"
								class="cursor-pointer absolute top-0 left-1/2 z-10 -translate-x-1/2 transform rounded-xl border-4 border-black object-contain animate-bounce-glow outline-1 outline-[#FFD700] transition duration-300 ease-in-out hover:scale-101"
								alt="Kortti"
								onclick={kortinNaytto}
								in:fade
								out:fly|global={{ x: 0, y: -1500, duration: 1000, delay: 100 }}
							/>
						{/if}
					</div>

					<!--Kolmas kortti-->
					<div class="z-10">
						{#if fiftyFifty.maara > 2}
							<img
								src="cardBack.png"
								class="cursor-pointer absolute top-0 left-1/2 z-10 -translate-x-1/2 transform rounded-xl border-4 border-black object-contain animate-bounce-glow outline-1 outline-[#FFD700] transition duration-300 ease-in-out hover:scale-101"
								alt="Kortti"
								onclick={kortinNaytto}
								in:fade
								out:fly|global={{ x: 0, y: -1500, duration: 1000, delay: 200 }}
							/>
						{/if}
					</div>
				</div>
				<!--/BOUNCY KORTIT-->

				<!--korttien lkm "index"-->
				<!-- <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full p-5 text-white"> -->
				<!-- {maara} -->
				<!-- </div> -->
				<div class="w-16 sm:w-20">
					<Button
						onclick={() => fiftyFifty.maara++}
						text="/images/plus.png"
						disabled={fiftyFifty.maara >= 3}
					/>
				</div>

				<!-- <Button onclick={kortinNaytto} text="Nosta kohtalosi" /> -->
			</div>
		{/if}

		{#if fiftyFifty.booleani}
			{#if fiftyFifty.maara <= 0}
				<div
					class="text-shadow-valkoinen grid place-items-center pt-20 pb-60 text-xl text-white delay-1500"
				>
					Nosta kortti nössö
				</div>
			{/if}

			<!-- Kortin valittua -->
			<div class="flex flex-wrap justify-center gap-4">
				{#each nostetut.nNostetut as kortti, i (kortti.name)}
					<div
						in:fly|global={{ x: 0, y: -300, delay: 2000 + i * 1000, duration: 1000 }}
						out:fade
						class="flex flex-col items-center gap-6 pb-14"
					>
						<h1 class="font-['Rosarivo'] text-xl sm:text-2xl text-white text-shadow-sm text-shadow-white">
							{kortti.name}
						</h1>
						<img
							onclick={() => naytaKortti(kortti)}
							class="cursor-pointer object-cover h-40 w-30 sm:h-90 sm:w-60 lg:w-70 lg:h-100 transition duration-175 ease-in-out hover:scale-101 rounded-xl border-4 border-black outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#FFD700]"
							src={kortti.image}
							alt="Kortin kuvateksti"
						/>
					</div>
					{#if valittuKortti === kortti}
						<Modal pakka={kortti} sulje={() => naytaKortti(kortti)} />
					{/if}
				{/each}
			</div>
			<Button onclick={palaa} text="/images/x_ikoni.png" />
		{/if}
	</div>
</div>
