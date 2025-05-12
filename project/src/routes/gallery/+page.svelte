<script lang="ts">
	import { onMount } from 'svelte';
	import type { Kortit } from '$lib/types/Kortit';
	import Modal from '$lib/components/Modal.svelte'
    import {pakka} from '$lib/datanhaku.svelte'
	import {fly} from 'svelte/transition'


	//näytä kortti funktio katsoo valitun kortin ja jos valittuKortti muuttujassa on kortti niin avataan sen kortin modaali ikkuna
    let valittuKortti: Kortit | null = $state(null)
	function naytaKortti(kortti: Kortit) {
		valittuKortti = valittuKortti === kortti ? null:kortti;
	}
	$inspect(pakka.tKortit.length)
	//katsotaan onko pakassa kortteja ja palautetaan ne jos on, jos ei niin fetchataan kortit jsonista
	if (pakka.tKortit.length === 0){
		onMount(
		async () => {
			await pakka.hKortit()
		})
	} 	
</script>

<!-- gridi johon kortit sijoitetaan -->
<div class="p-10 mx-auto min-h-screen min-w-screen space-y-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 bg-transparent">
	<!-- käydään eachilla kortit läpi -->
    {#each pakka.tKortit as kortti, i(kortti.name)}
		<!-- tehdään jokaiselle kortille oma divi johon sijoitetaan kortin nimi, kuva ja button onclick tapahtumaa varten -->
        <div class="flex flex-col items-center w-4xs h-6xs" in:fly|global={{ delay: 1000 + (i * 100), duration: 100, x: 300, y: 0 }}>
          <div class="min-h-[6rem] flex flex-col justify-between">
            <h1 class="line-clamp-3 text-center pt-8 font-['rosarivo'] italic text-white text-lg sm:text-xl md:text-xl lg:text-2xl text-shadow-white text-shadow-sm">{kortti.ename}</h1>
          </div>
            <button onclick={() => naytaKortti(kortti)}>
              <img class='pb-1 cursor-pointer size-full transition  duration-175 ease-in-out hover:scale-101 rounded-xl border-4 border-black outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#FFD700]' src={kortti.image} alt="Kortin kuvateksti" /></button>
			<!-- katsotaan valittuKortti muuttujan arvo ja määritetään onko modaali ikkuna auki vai ei -->
            {#if valittuKortti === kortti}
                <Modal pakka={kortti} sulje={() =>naytaKortti(kortti)}/>
            {/if}
        </div>
	{:else}
		<p>Loading cards...</p>
	
    {/each}
	
</div>

