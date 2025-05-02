<script lang="ts">
	import { page } from '$app/state';
</script>

<footer class="grid grid-cols-2 place-items-center bg-black p-4">
	{#key page.url.pathname}
		<a
			class="text-shadow-valkoinen items-center rounded-xl border-4 border-black font-['Rosarivo'] text-amber-50 shadow-lg outline-1 outline-[#FFD700] transition duration-175 ease-in-out hover:scale-101 hover:shadow-[#e2e2e2]"
			href="https://github.com/jamktiko/tarotGene">Github Repo</a
		>
	{/key}
	<div
		class=" text-shadow-valkoinen padding-4 grid grid-cols-2 items-center rounded-xl border-4 border-black font-['Rosarivo'] text-amber-50 shadow-lg outline-1 outline-[#FFD700]"
	>
		<h1>Tekijät:</h1>
		<h2>Thomas Vainikainen</h2>
		<h2>Eetu Auvinen</h2>
		<h2>Anjam Joonathan</h2>
	</div>

	<!-- <div
		class="text-shadow-valkoinen items-center rounded-xl border-4 border-black font-['Rosarivo'] text-amber-50 shadow-lg outline-1 outline-[#FFD700]"
	></div> -->
</footer>
