<script lang="ts">
	import { nostetut as aiheet } from '$lib/valitutkortit.svelte';
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

<div class="grid">
<div class="animate-pulse">
  <h1 class="text-shadow-valkoinen m-2 p-1 text-white text-xl sm:text-2xl font-serif">Valitse aihe</h1>
</div>
<select
  bind:value={aiheet.valittuAihe}
  class="bg-[#472454] text-white border-2 border-yellow-500 rounded-md px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition duration-150 ease-in-out"
>
  <option value={0}>Ei valittu</option>
  <option value={1}>Rakkaus</option>
  <option value={2}>Tulevaisuus</option>
  <option value={3}>Koulu</option>
</select>
</div>


