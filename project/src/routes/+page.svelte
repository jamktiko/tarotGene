<script lang="ts">
	import { onMount } from 'svelte';
	import type { Kortit } from '$lib/types/Kortit';
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';

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
		naytaTulos = !naytaTulos;
		randomisointi();
	}
</script>

<div class="mx-auto min-h-screen min-w-screen space-y-4 bg-violet-950 shadow" style="background: radial-gradient(circle at center, #472454, #200f25);">
<div class="gap grid p-6">
{#if !naytaTulos}
<!--Etusivun korttitakapuoli-->
<img src="cardBack.png" class="shadow-3xl border-shadow mx-auto mt-8 flex h-90 w-60 rounded-xl border-4 border-black shadow-xl outline-2 outline-[#FFD700] transition duration-175 ease-in-out hover:scale-101 hover:shadow-[#FFD700]" alt="Kortti" />
<!-- Alkusivu -->
  <div class="gap grid m-6 grid-cols-3">
	<Button onclick={() => maara--} text="aaaaaa" disabled={maara <= 0} />

	<div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full p-5 text-white">{maara}</div>
	<Button onclick={() => maara++} text="aaaaaa" disabled={maara >= 3} />

	<div></div>
	<Button onclick={kortinNaytto} text="Nosta kohtalosi" />
  </div>
{/if}


{#if naytaTulos}
	{#if maara <= 0}
		<div class="grid place-items-center text-white text-xl text-shadow-valkoinen pt-20 pb-60">Nosta kortti nössö</div>
	{/if}
	<!-- Kortin valittua -->
  <div class="flex flex-wrap justify-center gap-4 ">
	{#each nostot as kortti (kortti.name)}

  <div class="mx-auto flex flex-col items-center gap-6 pb-14">
		<h1 class="font-['Rosarivo'] text-white text-2xl text-shadow-valkoinen text-shadow-sm">{kortti.name}</h1>
			<img
				onclick={() => naytaKortti(kortti)}
			  class="transition duration-175 ease-in-out hover:scale-101 w-75 h-100 rounded-xl border-4 border-black outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#FFD700] sm:w-15 sm:h-23 md:w-60 md:h-90"
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
