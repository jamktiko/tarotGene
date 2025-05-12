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
	$inspect(aiheet.valittuAihe)
</script>

<select bind:value={aiheet.valittuAihe}>
	<option value={'description'}>Vapaa</option>
	<option value={'rakkaus'}>Rakkaus</option>
	<option value={'tulevaisuus'}>Tulevaisuus</option>
	<option value={'koulu'}>Koulu</option>
</select>
