<script lang="ts">
	import { onMount } from 'svelte';
	import type { Kortit } from '$lib/types/Kortit';
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import { fly, fade } from 'svelte/transition';
	import { pakka } from '$lib/datanhaku.svelte';
	import { nostetut } from '$lib/valitutkortit.svelte'; // Tällä hetkellä nostetut kortit sijaisee täällä
	import { fiftyFifty } from '$lib/tulosruutu.svelte'; // Hallitsee ruudun vaihdon booleania sekä nostettujen korttien määrää
	import AiheValinta from '$lib/components/AiheVal.svelte';

	onMount(async () => {
		await pakka.hKortit();
	});
	
	$inspect(pakka.tKortit);

	let valittuKortti: Kortit | null = $state(null);
	function naytaKortti(kortti: Kortit) {
		valittuKortti = valittuKortti === kortti ? null : kortti;
	}

	let joNostetut = new Set(); // Nostettujen korttien pino

	// Sivuissa takaisin meneva funktio, palauttaa molemmat taulukot
	function palaa() {
		joNostetut.clear();
		nostetut.tyhjenna();
		fiftyFifty.vaihda();
		fiftyFifty.maara = 1;
	}

	//kortin randomisoija, joka samalla lisää nostetut kortit joNostetut pinoon
	function randomisointi() {
		let chosen;
		for (let i = 0; i < fiftyFifty.maara; i++) {
			do {
				chosen = Math.floor(Math.random() * pakka.tKortit.length);
			} while (joNostetut.has(chosen));
			nostetut.tyonna(pakka.tKortit[chosen]);
			joNostetut.add(chosen);
		}
	}

	// suorittaa randomisointi() funktion ja vaihtaa näkymän tulospuolelle
	function kortinNaytto() {
		randomisointi();
		fiftyFifty.vaihda();
	}

	function aloita() {
		fiftyFifty.aloita();
	}
</script>

<!--Intro meininki-->
{#if fiftyFifty.intro}
	<div>
		<div class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black" out:fade|global={{ delay: 2000, duration: 2000 }}>
			<h1 class="text-shadow-valkoinen text-4xl text-white sm:text-5xl" in:fade|global={{ duration: 3000 }} out:fade|global={{ duration: 2000 }}>
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
				<div  class="justify-self-center sm:justify-self-start grid font-['Rosarivo'] text-sm sm:text-lg text-white text-shadow-sm text-shadow-white rounded-xl border-4 border-black outline-1 outline-[#FFD700] mb-4 animate-pulse sm:animate-none">
					<p class="p-1 justify-self-center">Vinkki: <br> Nosta kortit klikkaamalla pakkaa</p>
				</div>
				<!-- /infoikkuna -->

				 <!-- korttien määrä -->
				<div class="justify-self-center pb-15 font-['Rosarivo'] text-lg sm:text-xl text-white text-shadow-sm text-shadow-white">Nostettavien korttien määrä:
          			<div class=" text-3xl sm:text-4xl">
           				{fiftyFifty.maara}
					</div>
          		</div>
				<!-- /korttien määrä -->
			</div>
			<!-- /yläosan elementit -->

			<div class="flex flex-row items-center justify-center gap-6 p-4 sm:gap-10">
				<!--Plus nappi-->
				<div class="w-16 sm:w-20">
					<Button onclick={() => fiftyFifty.maara--} text="/images/minus.png" disabled={fiftyFifty.maara <= 0}/>
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
				<div class="w-16 sm:w-20">
					<Button
						onclick={() => fiftyFifty.maara++}
						text="/images/plus.png"
						disabled={fiftyFifty.maara >= 3}
					/>
				</div>
			</div>

			<!--AIHEVALINTA-->
			<div class="m-1 flex justify-center">
				<AiheValinta />
			</div>
		{/if}

		{#if fiftyFifty.booleani}
			{#if fiftyFifty.maara <= 0}
				<div class="text-shadow-valkoinen grid place-items-center pt-20 pb-60 text-xl text-white delay-1500">
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
