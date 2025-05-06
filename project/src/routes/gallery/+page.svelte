<script lang="ts">
	import { onMount } from 'svelte';
	import type { Kortit } from '$lib/types/Kortit';
	import Modal from '$lib/components/Modal.svelte'
    import {pakka} from '$lib/datanhaku.svelte'
	import {fly} from 'svelte/transition'
	
		
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


<div class="p-10 mx-auto min-h-screen min-w-screen space-y-4 bg-radial from-[#472454] to-[#200f25] grid grid-cols-6 gap-4 ">
    {#each pakka.tKortit as kortti, i(kortti.name)}
        <div class="flex flex-col items-center w-4xs h-6xs" in:fly|global={{ delay: i*100, duration: 50, x: 300, y: 0 }}>
            <h1 class="p-3 font-['rosarivo'] italic text-white text-2xl text-shadow-white text-shadow-sm">{kortti.ename}</h1>
            <button onclick={() => naytaKortti(kortti)}><img class='h-45 w-30 md:h-90 md:w-60 lg:w-75 lg:h-100 transition  duration-175 ease-in-out hover:scale-101 rounded-xl border-4 border-black outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#FFD700]' src={kortti.image} alt="Kortin kuvateksti" /></button>
            {#if valittuKortti === kortti}
                <Modal pakka={kortti} sulje={() =>naytaKortti(kortti)}/>
            {/if}
        </div>
	{:else}
		<p>Loading cards...</p>
	
    {/each}
	
</div>

