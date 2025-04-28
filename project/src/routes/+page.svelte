<script lang="ts">
	import { onMount } from 'svelte';
	import type { Kortit } from '$lib/types/Kortit';

	let pakka: Kortit[] = $state([]);

	let picker:number[] = $state([]);
	
	let oldpicks = new Set();
	let naytaTulos = $state(false);
let maara= $state(0)
	function reset() {
		oldpicks.clear();
		picker=[]
		naytaTulos=!naytaTulos
	}
	function rmFrmDck() {
		let chosen
		for (let i = 0; i < maara; i++) {
			do {
			chosen = Math.floor(Math.random() * pakka.length);
		} while (oldpicks.has(chosen));
		picker.push(chosen)
		oldpicks.add(chosen);
		console.log(chosen);
		
		}


	}

	function boleChang() {
		naytaTulos = !naytaTulos;
		rmFrmDck();
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

{#if naytaTulos}
	{#each picker as kortti }
<div>Korttisi on {pakka[kortti].name}</div>
	<img src={pakka[kortti].image} alt="">
	{/each}
<button onclick={reset}>takaisin</button>
{/if}

{#if !naytaTulos}
<button onclick={()=>maara--}>vähennä</button>
<div>{maara}</div>
<button onclick={()=>maara++}>lisää</button>
<div></div>
<button onclick={boleChang}>Näytä korttisi</button>
	
{/if}