
<script lang="ts">
	import { nostetut as aiheet } from '$lib/valitutkortit.svelte';
	import { fiftyFifty as intro } from '$lib/tulosruutu.svelte';
	import { fade } from 'svelte/transition';

	// interface Props{
	// valittuAihe:number
	// }

	// let {valittuAihe}:Props = $props()

	// let aihe=[

	// {nimi:"Vapaa"},
	// {nimi:"rakkaus"},
	//   {nimi:"tulevaisuus"},
	//   {nimi:"koulu"}
	// ]
</script>

{#if intro.aihetimer}
	<div class="grid" transition:fade={{ duration: 3000 }}>
		<div class="animate-pulse">
			<h1 class="text-shadow-valkoinen m-2 p-1 font-serif text-xl text-white sm:text-2xl">
				Valitse aihe
			</h1>
		</div>
		<select class="rounded-md border-2 border-yellow-500 bg-[#472454] px-4 py-2 text-white shadow-md transition duration-150 ease-in-out focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 focus:outline-none" bind:value={aiheet.valittuAihe}>
			<option value={'description'}>Vapaa</option>
			<option value={'rakkaus'}>Rakkaus</option>
			<option value={'tulevaisuus'}>Tulevaisuus</option>
			<option value={'koulu'}>Koulu</option>
		</select>
	</div>
{/if}
