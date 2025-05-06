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

<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" id="Backdrop"> <!--chekattu-->
	<div
		class="w-[360px] sm:w-[700px] h-[600px] p-10 bg-radial from-[#472454] to-[#200f25] border-black outline-1 outline-[#FFD700] shadow-lg"
		id="Modal"
	> <!--chekattu-->
		<div class="mb-6 flex flex-col items-center"> <!--chekattu-->
			<h1
				class="font-['rosarivo'] italic text-white text-xl sm:text-2xl text-shadow-white text-shadow-sm"
			>
				{pakka.name}
			</h1> <!--chekattu-->
		</div>
		<div class="grid grid-cols-1 sm:flex gap-10 sm:gap-6"> <!--chekattu-->
			<img
				class="h-40 w-30 md:h-90 md:w-60 lg:w-75 lg:h-100 transition duration-175 ease-in-out hover:scale-101 rounded-xl border-4 border-black outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#FFD700]"
				src={pakka.image}
				alt="kortin kuva"
			/> <!--chekattu-->
			<div class="flex flex-col justify-between"> <!--chekattu-->
				<p class="text:sm sm:text-md text-white md:text-lg">{pakka.description}</p> <!--chekattu-->
				{#if aiheet.valittuAihe === 1}
					<p class="text:sm sm:text-md text-white md:text-lg">{pakka.rakkaus}</p> <!--uusi lisäys katotaan responsiivisuus-->
				{/if}
				<div class="flex sm:mt-0 sm:mr-[250px] mt-[60px] flex-col items-center mb-6">
					<button
						class="w-30 px-4  py-2 text-[#FFD700] bg-[#000000] hover:bg-[#222222] rounded ring-2 ring-[#FFD700]"
						onclick={sulje}
					>
						sulje
					</button> <!--chekattu-->
				</div>
			</div>
		</div>
	</div>
</div>
