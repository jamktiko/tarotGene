<script lang="ts">
<<<<<<< HEAD
	// import {valittuAihe} from "$lib/components/AiheVal.svelte";
	import { nostetut as aiheet } from '$lib/valitutkortit.svelte'; // Tällä hetkellä nostetut kortit sijaisee täällä
    import {fly, fade} from 'svelte/transition'

	import type { Kortit } from '$lib/types/Kortit';
	interface Props {
		pakka: Kortit;
		sulje: () => void;
	}

	let { pakka, sulje }: Props = $props();
</script>

<div transition:fade={{delay:0, duration:250}} class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" id="Backdrop">
	<div transition:fly={{delay: 250, duration:250}} class="w-[360px] sm:w-[800px] h-[600px] p-10 bg-radial from-[#472454] to-[#200f25] border-black outline-1 outline-[#FFD700] shadow-lg" id="Modal">
		<div class="mb-6 flex flex-col items-center">
			<h1 class="font-['rosarivo'] italic text-white text-xl sm:text-2xl text-shadow-white text-shadow-sm">
				{pakka.name}
			</h1>
		</div>
		<div class="grid grid-cols-1 sm:flex gap-10 sm:gap-6">
			<img
				class="h-40 w-30 md:h-90 md:w-60 lg:w-full lg:h-100 transition duration-175 ease-in-out hover:scale-101 rounded-xl border-4 border-black outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#FFD700]"
				src={pakka.image}
				alt="kortin kuva"
        onclick={sulje}
			/>
			<div class="flex flex-col justify-between">
				<p class="text:sm sm:text-md text-[#b3b3b3] md:text-xl font-serif md:p-4">{pakka.description}</p>
				{#if aiheet.valittuAihe === 1}
					<p class="text:20rem sm:text-md text-white md:text-lg pt-4">{pakka.rakkaus}</p>
				{/if}
				<div class="flex sm:mt-0 sm:mr-[250px] mt-[60px] flex-col items-center mb-6">
					<button
						class="cursor-pointer w-30 px-4  py-2 text-[#FFD700] bg-[#000000] hover:bg-[#222222] rounded ring-2 ring-[#FFD700]"
						onclick={sulje}
					>
						sulje
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
=======
    import type {Kortit} from '$lib/types/Kortit'
    interface Props {
        pakka: Kortit;
        sulje: () => void
    }
    let {pakka, sulje}: Props = $props()
    import {fade} from 'svelte/transition'
    
</script>

<div transition:fade={{duration: 100}} class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" id="Backdrop">
    <div transition:fade={{duration: 10}} class="w-[360px] md:w-[700px] p-10 bg-radial from-[#472454] to-[#200f25] border-black outline-1 outline-[#FFD700] shadow-lg" id="Modal">
        <div class="flex flex-col items-center mb-6">
            <h1 class="font-['rosarivo'] italic text-white text-xl sm:text-2xl text-shadow-white text-shadow-sm">{pakka.name}</h1>
        </div>
        <div class="flex gap-6">
            <img class="h-45 w-30 md:h-90 md:w-60 lg:w-75 lg:h-100 transition duration-175 ease-in-out hover:scale-101 rounded-xl border-4 border-black outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#FFD700]" src={pakka.image} alt="kortin kuva"/>
            <div class="flex flex-col justify-between">
                <p class="text:sm sm:text-md md:text-lg text-white">{pakka.description}</p>
                <div class="flex mr-[250px] mt-5 flex-col items-center mb-6">
                    <button class="w-30 px-4  py-2 text-[#FFD700] bg-[#000000] hover:bg-[#222222] rounded ring-2 ring-[#FFD700]" onclick={sulje}>
                        sulje
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
>>>>>>> Modal
