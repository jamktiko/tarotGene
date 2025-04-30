<script lang="ts">
	import { page } from '$app/state';
</script>

<header>
	<nav class="grid grid-cols-2 bg-black p-4 place-items-center">
		{#key page.url.pathname}
			<a class="text-shadow-valkoinen items-center font-['Rosarivo'] text-amber-50 transition duration-175 ease-in-out hover:scale-101 rounded-xl border-4 border-black outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#e2e2e2]" href="/">Kotisivu</a>
			<a class="text-shadow-valkoinen items-center font-['Rosarivo'] text-amber-50 transition duration-175 ease-in-out hover:scale-101 rounded-xl border-4 border-black outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#e2e2e2]" href="/gallery">Galleria</a>
		{/key}
	</nav>
</header>
