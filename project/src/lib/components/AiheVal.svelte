<script lang="ts">
	import { nostetut as aiheet } from '$lib/valitutkortit.svelte';

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

<select bind:value={aiheet.valittuAihe}>
	<option value={0}>Vapaa</option>
	<option value={1}>Rakkaus</option>
	<option value={2}>Tulevaisuus</option>
	<option value={3}>Koulu</option>
</select>
