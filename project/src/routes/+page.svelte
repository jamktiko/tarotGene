<script lang="ts">
	import { onMount } from 'svelte';
	import type { Kortit } from '$lib/types/Kortit';
	import Modal from '$lib/components/Modal.svelte'

<<<<<<< HEAD
	let pakka: Kortit[] = $state([]) 

	onMount(async () => {
		const response = await fetch('/json/Tarot.json');
		if (response.ok) {
			pakka = await response.json();
		} else {
			console.error('Failed to fetch cards:', response.statusText);
		}
	});	

	let valittuKortti: Kortit | null = $state(null)
	function naytaKortti(kortti: Kortit) {
		valittuKortti = valittuKortti === kortti ? null:kortti;
	}
	
	let picker = 0;
	
	let oldpicks = new Set();
	let boolean = false;


	function reset() {
		oldpicks.clear();
=======
	import Button from "$lib/components/Button.svelte"
	let pakka: Kortit[] = $state([]); // Jsonin tiedot sisältävä muuttuja

	let nostot:number[] = $state([]); // Tällä hetkellä nostetut kortit
	
	let joNostetut = new Set(); // Nostettujen korttien pino
	let naytaTulos = $state(false); // Sivun vaihtaja alkusivun ja tulossivun välillä
	let maara= $state(0) //Montako korttia halutaan nostaa
	function palaa() { // Sivuissa takaisin meneva funktio, palaataa molemmat taulukot
		joNostetut.clear();
		nostot=[]
		naytaTulos=!naytaTulos
>>>>>>> develop
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

<<<<<<< HEAD

</script>

{#each pakka as kortti (kortti.name)}
		<h1>{kortti.name}</h1>
	<div>
			<img onclick={() => naytaKortti(kortti)} class='w-sm h-sm' src={kortti.image} alt="Kortin kuvateksti" />
		{#if valittuKortti === kortti}
			<Modal pakka={kortti} sulje={() =>naytaKortti(kortti)}/>
		{/if}
	</div>

{/each}
=======
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
<Button onclick={()=>maara--} text="Vähennä"/>

<div>{maara}</div>
<Button onclick={()=>maara++} text="Lisää"/>

<div></div>
<Button onclick={kortinNaytto} text="Nosta kohtalosi"/>

{/if}

{#if naytaTulos} <!-- Kortin valittua -->
	{#each nostot as kortti }
<div>Korttisi on {pakka[kortti].name}</div>
	<img src={pakka[kortti].image} alt="Ei ollut budjettia kuvaan">
	{/each}
<Button onclick={palaa} text="Takaisin"/>
{/if}
>>>>>>> develop
