<script lang="ts">
	import { onMount } from 'svelte';
	import type { Kortit } from '$lib/types/Kortit';
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import { fly, fade } from "svelte/transition";
	// import { flip } from 'svelte/animate';
	// import { text } from '@sveltejs/kit';
	import {pakka} from '$lib/datanhaku.svelte'
// import Nosto from "$lib/components/Nosto.svelte";
import {nostetut} from "$lib/valitutkortit.svelte"

	onMount(async () => {
		await pakka.hKortit()
	})
	import type { fromStore } from 'svelte/store';
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
		nostot=[]
nostetut.tyhjenna()
		naytaTulos = !naytaTulos;
		maara = 0
	$inspect(nostetut.nNostetut)

	}
	function randomisointi() {
		//kortin randomisoija, joka samalla lisää nostetut kortit joNostetut pinoon
		let chosen;
		for (let i = 0; i < maara; i++) {
			do {
				chosen = Math.floor(Math.random() * pakka.tKortit.length);
			} while (joNostetut.has(chosen));
			nostetut.tyonna(pakka.tKortit[chosen]);
			joNostetut.add(chosen);
			nostot.push(pakka.tKortit[chosen])

		}
	$inspect(nostetut.nNostetut)

	}

	// function rakkaus() {
	// 	maara=6;
	// 	randomisointi();
	// 	naytaTulos=!naytaTulos

	// }
	function kortinNaytto() {
		// suorittaa randomisointi() funktion ja vaihtaa näkymän tulospuolelle
		randomisointi();
		naytaTulos = !naytaTulos;
	$inspect(nostetut.nNostetut)

	}
</script>

<div
	class="mx-auto min-h-screen min-w-screen space-y-4 bg-violet-950 shadow"
	style="background: radial-gradient(circle at center, #472454, #200f25);"
>
	<div class="gap grid p-6">
		{#if !naytaTulos}

			<!-- Alkusivu -->
			<div class="gap m-6 grid grid-cols-3 items-center">

        <div>
				<Button onclick={() => maara--} text="/images/minus.png" disabled={maara <= 0} />
        </div>

          <!--BOUNCY KORTIT-->
          <div>
          <img
          src="cardBack.png"
          class="mx-auto flex h-90 w-60 translate-y-1/2  blur-[2px] rounded-xl border-2 border-black outline-1 outline-[#FFD700]"
          alt="Kortti"
       transition:fade />

				{#if maara>0}

			
				<img
				src="cardBack.png"
				class="mx-auto flex h-90 w-60 -translate-y-1/2 shadow-md motion-safe:animate-[bounce_5s_infinite] transition duration-175 ease-in-out hover:scale-101 rounded-xl border-2 border-black outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#FFD700]"
				alt="Kortti"
				onclick={kortinNaytto}
		
			out:fly|global={{ x: 0, y: -1500 ,  duration: 1000}}/>
				{/if}
     
				<!-- {#if maara>1}
				<img
				src="cardBack.png"
				class="mx-auto flex h-90 w-60 -translate-y-1/2 shadow-md motion-safe:animate-[bounce_5s_infinite] transition duration-175 ease-in-out hover:scale-101 rounded-xl border-2 border-black outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#FFD700]"
				alt="Kortti"
				onclick={kortinNaytto}
			/>
				{/if} -->

				<!-- {#if maara>2}
				<img
				src="cardBack.png"
				class="mx-auto flex h-90 w-60 -translate-y-1/2 shadow-md motion-safe:animate-[bounce_5s_infinite] transition duration-175 ease-in-out hover:scale-101 rounded-xl border-2 border-black outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#FFD700]"
				alt="Kortti"
				onclick={kortinNaytto}
			/>
				{/if} -->

          </div>
          <!--/BOUNCY KORTIT-->


          <!--korttien lkm "index"-->
				<!-- <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full p-5 text-white"> -->
					<!-- {maara} -->
				<!-- </div> -->
        <div class="flex justify-center">
				<Button onclick={() => maara++} text="/images/plus.png" disabled={maara >= 3} />
        </div>

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
				{#each nostot as kortti, i(kortti.name)}
					<div in:fly|global={{ x: 0, y: -300 , delay: 1000+i*1000, duration: 2000}} out:fade class="flex flex-col items-center gap-6 pb-14" > 
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
			<Button onclick={palaa} text="/images/x_ikoni.png" />
		{/if}
	</div>
</div>
