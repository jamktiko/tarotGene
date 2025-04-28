<script lang="ts">
	import { onMount } from 'svelte';
	import type { Kortit } from '$lib/types/Kortit';

	let pakka: Kortit[] = $state([]); // Jsonin tiedot sisältävä muuttuja

	let nostot:number[] = $state([]); // Tällä hetkellä nostetut kortit
	
	let joNostetut = new Set(); // Nostettujen korttien pino
	let naytaTulos = $state(false); // Sivun vaihtaja alkusivun ja tulossivun välillä
	let maara= $state(0) //Montako korttia halutaan nostaa
	function reset() { // Sivuissa takaisin meneva funktio, resettaa molemmat taulukot
		joNostetut.clear();
		nostot=[]
		naytaTulos=!naytaTulos
	}
	function randomisointi() { //kortin randomisoija, joka samalla lisää nostetut kortit joNostetut pinoon
		let chosen
		for (let i = 0; i < maara; i++) {
			do {
			chosen = Math.floor(Math.random() * pakka.length);
		} while (joNostetut.has(chosen));
		nostot.push(chosen)
		joNostetut.add(chosen);
		
		}
	}

	function kortinNaytto() {// suorittaa randomisointi() funktion ja vaihtaa näkymän tulospuolelle
		naytaTulos = !naytaTulos;
		randomisointi();
	}

	onMount(async () => { //json fetchit
		const response = await fetch('/json/Tarot.json');
		if (response.ok) {
			pakka = await response.json();
		} else {
			console.error('Failed to fetch cards:', response.statusText);
		}
	});
</script>

{#if !naytaTulos} <!-- Alkusivu -->
<button onclick={()=>maara--}>vähennä</button>
<div>{maara}</div>
<button onclick={()=>maara++}>lisää</button>
<div></div>
<button onclick={kortinNaytto}>Näytä korttisi</button>
{/if}

{#if naytaTulos} <!-- Kortin valittua -->
	{#each nostot as kortti }
<div>Korttisi on {pakka[kortti].name}</div>
	<img src={pakka[kortti].image} alt="Ei ollut budjettia kuvaan">
	{/each}
<button onclick={reset}>takaisin</button>
{/if}
