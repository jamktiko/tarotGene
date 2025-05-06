<script lang="ts">
	// import {valittuAihe} from "$lib/components/AiheVal.svelte";
	import { nostetut as aiheet } from '$lib/valitutkortit.svelte'; // Tällä hetkellä nostetut kortit sijaisee täällä

	import type { Kortit } from '$lib/types/Kortit';
	interface Props {
		pakka: Kortit;
		sulje: () => void;
	}

	let { pakka, sulje }: Props = $props();
</script>

<div class="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black" id="Backdrop">
	<div
		class="w-[360px] border-black bg-radial from-[#472454] to-[#200f25] p-10 shadow-lg outline-1 outline-[#FFD700] md:w-[700px]"
		id="Modal"
	>
		<div class="mb-6 flex flex-col items-center">
			<h1
				class="font-['rosarivo'] text-xl text-white italic text-shadow-sm text-shadow-white sm:text-2xl"
			>
				{pakka.name}
			</h1>
		</div>
		<div class="flex gap-6">
			<img
				class="h-45 w-30 rounded-xl border-4 border-black shadow-lg outline-1 outline-[#FFD700] transition duration-175 ease-in-out hover:scale-101 hover:shadow-[#FFD700] md:h-90 md:w-60 lg:h-100 lg:w-75"
				src={pakka.image}
				alt="kortin kuva"
			/>
			<div class="flex flex-col justify-between">
				<p class="text:sm sm:text-md text-white md:text-lg">{pakka.description}</p>
				{#if aiheet.valittuAihe === 1}
					<p class="text:sm sm:text-md text-white md:text-lg">{pakka.rakkaus}</p>
				{/if}
				<div class="mt-5 mr-[250px] mb-6 flex flex-col items-center">
					<button
						class="w-30 rounded bg-[#000000] px-4 py-2 text-[#FFD700] ring-2 ring-[#FFD700] hover:bg-[#222222]"
						onclick={sulje}
					>
						sulje
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
