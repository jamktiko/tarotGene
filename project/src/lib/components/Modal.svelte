<script lang="ts">
	// import {valittuAihe} from "$lib/components/AiheVal.svelte";
	import { nostetut as aiheet } from '$lib/valitutkortit.svelte'; // Tällä hetkellä nostetut kortit sijaisee täällä
	import { fly, fade } from 'svelte/transition';

	import type { Kortit } from '$lib/types/Kortit';
	interface Props {
		pakka: Kortit;
		sulje: () => void;
	}

	let { pakka, sulje }: Props = $props();
</script>

<div
	transition:fade={{ delay: 0, duration: 250 }}
	class="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black"
	id="Backdrop"
>
	<div
		transition:fly={{ delay: 250, duration: 250 }}
		class="h-[600px] w-[360px] sm:w-[600px] md:w-[800px] border-black bg-radial from-[#472454] to-[#200f25] p-10 shadow-lg outline-1 outline-[#FFD700]"
		id="Modal"
	>
		<div class="mb-6 flex flex-col items-center">
			<h1
				class="font-['rosarivo'] text-xl text-white italic text-shadow-sm text-shadow-white sm:text-2xl"
			>
				{pakka.name}
			</h1>
		</div>
		<div class="grid grid-cols-1 gap-10 sm:flex sm:gap-6">
			<img
				class="cursor-pointer h-40 w-30 sm:h-60 sm:w-40 md:h-90 md:w-60 lg:w-11/12 lg:h-100 transition duration-175 ease-in-out hover:scale-101 rounded-xl border-4 border-black outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#FFD700]"
				src={pakka.image}
				alt="kortin kuva"
        onclick={sulje} 
			/>
			<div class="flex flex-col justify-between">
				<p class="text:sm sm:text-md font-serif text-[#b3b3b3] md:p-4 md:text-xl">
					{pakka.description}
				</p>
				{#if aiheet.valittuAihe === 1}
					<p class="text:20rem sm:text-md font-sans pt-4 text-[#8e8e8e] md:text-lg">{pakka.rakkaus}</p>
				{/if}
				{#if aiheet.valittuAihe === 3}
					<p class="text:20rem sm:text-md font-sans pt-4 text-[#8e8e8e] md:text-lg">{pakka.koulu}</p>
				{/if}
				<div class="mt-[60px] mb-6 flex flex-col items-center sm:mt-0 md:ml-[60px] sm:mr-[250px]">
					<button
						class="w-30 cursor-pointer rounded bg-[#000000] px-4 py-2 text-[#E5B80B] ring-2 ring-[#E5B80B] hover:bg-[#222222]"
						onclick={sulje}
					>
						sulje
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
