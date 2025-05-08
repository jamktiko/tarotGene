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

<h1
	class="text-shadow-valkoinen items-center rounded-full border-4 border-black px-5 py-2 font-serif text-2xl text-amber-50 shadow-md outline-1 outline-[#FFD700] transition duration-175 ease-in-out hover:scale-105 hover:shadow-[#FFD700] active:bg-gray-900"
>
	Valitse Aihe:
</h1>
<select bind:value={aiheet.valittuAihe} transition:fade>
	<option value={0}>Vapaa</option>
	<option value={1}>Rakkaus</option>
	<option value={2}>Tulevaisuus</option>
	<option value={3}>Koulu</option>
</select>
