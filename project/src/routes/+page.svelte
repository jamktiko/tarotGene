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
		fiftyFifty.maara = 1;
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

	function aloita() {
		fiftyFifty.aloita();
	}
</script>

<!--Intro meininki-->
<!-- <div class="overflow-hidden bg-black"> -->
{#if fiftyFifty.intro}
	<div>
		<div
			class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
			out:fade|global={{ delay: 2000, duration: 2000 }}
		>
			<h1
				class="text-shadow-valkoinen text-4xl text-white sm:text-5xl"
				in:fade|global={{ duration: 3000 }}
				out:fade|global={{ duration: 2000 }}
			>
				Deck of Destiny
			</h1>
			<div class="w-16 animate-pulse sm:h-20 pt-10" out:fade|global={{ duration: 1000 }}>
				<Button onclick={aloita} text="/images/Start.png" />
			</div>
		</div>
	</div>
{/if}

<!--/Intro meininki-->

<div
	class="mx-auto space-y-4">
	<div class="gap grid p-6">
		{#if !fiftyFifty.booleani}
			<!-- Alkusivu -->

			<!-- Tässä sivun yläosan elementit eli nostettavien korttien numero ja info ruutu -->
			<div class="grid">
				<!-- infoikkuna -->
				
				<div  class=" grid font-['Rosarivo'] text-lg text-white text-shadow-sm text-shadow-white rounded-xl border-4 border-black object-cover outline-1 outline-[#FFD700] w-sm">
					<p class="p-1 justify-self-center">Vinkki: Nosta kortit klikkaamalla pakkaa</p>
				</div>
				<!-- /infoikkuna -->
				 <!-- korttien määrä -->
				<div class="justify-self-center pb-15 font-['Rosarivo'] text-xl text-white text-shadow-sm text-shadow-white">Nostettavien korttien määrä: {fiftyFifty.maara}</div>
				<!-- /korttien määrä -->

			</div>
			<!-- /yläosan elementit -->

			<div class="flex flex-row items-center justify-center gap-6 p-4 sm:gap-10">
				<!--Plus nappi-->
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
						class=" absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 transform rounded-xl border-4 border-black object-cover outline-1 outline-[#FFD700] blur-[2px]"
						alt="Kortti"
						onclick={kortinNaytto}
						transition:fade
					/>

					<!--Eka kortti-->
					<div class="z-10">
						{#if fiftyFifty.maara > 0}
							<img
								src="cardBack1.png"
								class="cursor-pointer absolute top-0 left-1/2 z-10 -translate-x-1/2 transform rounded-xl border-4 border-black object-cover animate-bounce-glow outline-1 outline-[#FFD700] transition duration-300 ease-in-out hover:scale-101 h-full w-full"
								alt="Kortti"
								onclick={kortinNaytto}
								in:fade
								out:fly|global={{ x: 0, y: -1500, duration: 1000, delay:100 }}
							/>
						{/if}
					</div>

					<!--Toka kortti-->
					<div class="z-10">
						{#if fiftyFifty.maara > 1}
							<img
								src="cardBack2.png"
								class="cursor-pointer absolute top-0 left-1/2 z-10 -translate-x-1/2 transform rounded-xl border-4 border-black object-cover animate-bounce-glow outline-1 outline-[#FFD700] transition duration-300 ease-in-out hover:scale-101 h-full w-full"
								alt="Kortti"
								onclick={kortinNaytto}
								in:fade
								out:fly|global={{ x: 0, y: -1500, duration: 1000, delay: 200 }}
							/>
						{/if}
					</div>

					<!--Kolmas kortti-->
					<div class="z-10">
						{#if fiftyFifty.maara > 2}
							<img
								src="cardBack3.png"
								class="cursor-pointer absolute top-0 left-1/2 z-10 -translate-x-1/2 transform rounded-xl border-4 border-black object-cover animate-bounce-glow outline-1 outline-[#FFD700] transition duration-300 ease-in-out hover:scale-101 h-full w-full"
								alt="Kortti"
								onclick={kortinNaytto}
								in:fade
								out:fly|global={{ x: 0, y: -1500, duration: 1000, delay: 300 }}
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
			<!--AIHEVALINTA-->
			<div class="m-1 flex justify-center">
				<AiheValinta />
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
			<div in:fade={{delay:2000}} class="max-w-60 justify-self-center mb-5 font-['Rosarivo'] text-lg text-white text-shadow-sm text-shadow-white rounded-xl border-4 border-black object-cover outline-1 outline-[#FFD700] w-sm">
				<p class="p-1 justify-self-center">Vinkki: Näytä ennustus painamalla korttia!</p>
			</div>
			<div class="flex flex-wrap justify-center gap-4">
				
				{#each nostetut.nNostetut as kortti, i (kortti.name)}
					<div
						in:fly|global={{ x: 0, y: -300, delay: 2000 + i * 1000, duration: 1000 }}
						out:fade
						class="flex flex-col items-center gap-6 pb-14 ">
						<h1 class="font-['Rosarivo'] text-xl text-white text-shadow-sm text-shadow-white sm:text-2xl">{kortti.name}</h1>
						<img
							onclick={() => naytaKortti(kortti)}
							class="w-4xs h-6xs cursor-pointer rounded-xl border-4 border-black object-cover shadow-lg outline-1 outline-[#FFD700] transition duration-175 ease-in-out hover:scale-101 hover:shadow-[#FFD700] sm:h-90 sm:w-60 lg:h-100 lg:w-70"
							src={kortti.image}
							alt="Kortin kuvateksti"
						/>
					</div>
					{#if valittuKortti === kortti}
						<Modal aihe={nostetut.valittuAihe} pakka={kortti} sulje={() => naytaKortti(kortti)} />
					{/if}
				{/each}
			</div>
			<Button onclick={palaa} text="/images/x_ikoni.png" />
		{/if}
	</div>
</div>
<!-- </div> -->
