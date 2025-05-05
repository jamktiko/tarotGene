<script lang="ts">
	import { onMount } from 'svelte';
	import type { Kortit } from '$lib/types/Kortit';
	import Modal from '$lib/components/Modal.svelte'
    import {pakka} from '$lib/datanhaku.svelte'
		// import {fiftyFifty} from "$lib/tulosruutu.svelte"

		// console.log(fiftyFifty.maara);
		
    let valittuKortti: Kortit | null = $state(null)
	function naytaKortti(kortti: Kortit) {
		valittuKortti = valittuKortti === kortti ? null:kortti;
	}
	if (pakka.tKortit.length === 0){
	onMount(
	async () => {
		await pakka.hKortit()
	})
	}
	$inspect(pakka.tKortit)

</script>

<div class="p-10 mx-auto min-h-screen min-w-screen space-y-4 bg-radial from-[#472454] to-[#200f25] grid grid-cols-3 sm:grid-cols-6 gap-4 ">
    {#each pakka.tKortit as kortti (kortti.name)}
        <div class="flex flex-col items-center w-4xs h-6xs">
            <h1 class="p-3 font-['rosarivo'] italic text-white text-2xl text-shadow-white text-shadow-sm">{kortti.name}</h1>
            <button onclick={() => naytaKortti(kortti)}><img class='h-45 w-30 md:h-90 md:w-60 lg:w-75 lg:h-100 transition  duration-175 ease-in-out hover:scale-101 rounded-xl border-4 border-black outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#FFD700]' src={kortti.image} alt="Kortin kuvateksti" /></button>
            {#if valittuKortti === kortti}
                <Modal pakka={kortti} sulje={() =>naytaKortti(kortti)}/>
            {/if}
        </div>
    {/each}
</div>
