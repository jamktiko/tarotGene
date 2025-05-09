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
	<div class="grid" transition:fade={{ delay: 8000, duration: 3000 }}>
		<div class="animate-pulse">
			<h1 class="text-shadow-valkoinen m-2 p-1 font-serif text-xl text-white sm:text-2xl">
				Valitse aihe
			</h1>
		</div>
		<select
			bind:value={aiheet.valittuAihe}
			class="rounded-md border-2 border-yellow-500 bg-[#472454] px-4 py-2 text-white shadow-md transition duration-150 ease-in-out focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
		>
			<option value={0}>Ei valittu</option>
			<option value={1}>Rakkaus</option>
			<option value={2}>Tulevaisuus</option>
			<option value={3}>Koulu</option>
		</select>
	</div>
{/if}
