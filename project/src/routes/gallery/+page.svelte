<script lang="ts">
	import { onMount } from 'svelte';
	import type { Kortit } from '$lib/types/Kortit';
	import Modal from '$lib/components/Modal.svelte'
    

    let pakka: Kortit[] = $state([])

    let valittuKortti: Kortit | null = $state(null)
	function naytaKortti(kortti: Kortit) {
		valittuKortti = valittuKortti === kortti ? null:kortti;
	}

    onMount(async () => {
		const response = await fetch('/json/Tarot.json');
		if (response.ok) {
			pakka = await response.json();
		} else {
			console.error('Failed to fetch cards:', response.statusText);
		}
	});

</script>

<header>
    <h1><a href="/">Takaisin arvontaan</a></h1>
</header>
<div class="grid grid-cols-6 gap-4 ">
    {#each pakka as kortti (kortti.name)}
        <div class="flex flex-col items-center w-3xs h-3xs">
            <h1>{kortti.name}</h1>
            <button onclick={() => naytaKortti(kortti)}><img class='w-sm h-sm' src={kortti.image} alt="Kortin kuvateksti" /></button>
            {#if valittuKortti === kortti}
                <Modal pakka={kortti} sulje={() =>naytaKortti(kortti)}/>
            {/if}
        </div>
    {/each}
</div>
