<script lang="ts">
	import { page } from '$app/state';
</script>

<header>
	<nav class="grid grid-cols-2 bg-black  p-4 place-items-center nav-gradient">
		{#key page.url.pathname}
			<a class="text-shadow-valkoinen text-2xl items-center font-['Rosarivo'] text-amber-50 transition duration-175 ease-in-out hover:scale-101 rounded-full border-4 border-black px-5 py-2 focus:outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#FFD700] active:bg-gray-900" href="/">
        Kotisivu</a>
			<a class="text-shadow-valkoinen text-2xl items-center font-['Rosarivo'] text-amber-50 transition duration-175 ease-in-out hover:scale-101 rounded-full border-4 border-black px-5 py-2 focus:outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#FFD700] active:bg-gray-900" href="/gallery">
        Galleria</a>
		{/key}
	</nav>
</header>
