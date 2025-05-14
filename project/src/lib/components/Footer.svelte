<script lang="ts">
	import { page } from '$app/state';

	
</script>

<footer class="grid grid-cols-1 sm:grid-cols-2 gap-2 place-items-center bg-black p-2">
    {#key page.url.pathname}
        <a
            class="text-shadow-valkoinen items-center rounded-xl border-4 border-black font-['Rosarivo'] text-amber-50 shadow-lg outline-1 outline-[#FFD700] transition duration-175 ease-in-out hover:scale-101 hover:shadow-[#e2e2e2] text-sm sm:text-base px-2 py-1"
            href="https://github.com/jamktiko/tarotGene">Github Repo</a
        >
    {/key}
    <div
        class="text-shadow-valkoinen px-2 py-1 grid grid-cols-2 gap-1 items-center rounded-xl border-4 border-black font-['Rosarivo'] text-amber-50 shadow-lg outline-1 outline-[#FFD700] text-center"
    >
        <h1 class="col-span-full text-sm sm:text-base mb-1">Tekijät:</h1>
        <h2 class="text-xs sm:text-sm">Thomas Vainikainen</h2>
        <h2 class="text-xs sm:text-sm">Eetu Auvinen</h2>
        <h2 class="text-xs sm:text-sm">Anjam Joonathan</h2>
    </div>
</footer>