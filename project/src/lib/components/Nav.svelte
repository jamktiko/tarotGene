<script lang="ts">
	import { page } from '$app/state';
</script>

<header class="flex flex-row justify-center">
	<nav class="grid grid-cols-2 p-4 place-items-center nav-gradient bg-transparent gap-20">
		{#key page.url.pathname}
			{#if page.url.pathname === '/'}
				<a class="text-shadow-valkoinen font-serif text-1xl sm:text-2xl items-center text-amber-50 transition duration-175 ease-in-out scale-105 rounded-full border-4 border-black px-5 py-2 outline-1 outline-[#FFD700] shadow-lg shadow-[#FFD700] bg-gray-900" href="/">Kotisivu</a>

				<a class="text-shadow-valkoinen font-serif text-1xl sm:text-2xl items-center text-amber-50 focus:text-gray-200 transition duration-175 ease-in-out hover:scale-105 rounded-full border-4 border-black px-5 py-2 outline-1 outline-[#FFD700] shadow-md hover:shadow-[#FFD700] active:bg-gray-900" href="/gallery">Galleria</a> 
			{/if}

			{#if page.url.pathname === '/gallery'}
				<a class="text-shadow-valkoinen font-serif text-1xl sm:text-2xl items-center text-amber-50 transition duration-175 ease-in-out hover:scale-105 rounded-full border-4 border-black px-5 py-2 outline-1 outline-[#FFD700] shadow-md hover:shadow-[#FFD700] active:bg-gray-900" href="/">Kotisivu</a>

				<a class="text-shadow-valkoinen font-serif text-1xl sm:text-2xl items-center text-amber-50 focus:text-gray-200 transition duration-175 ease-in-out scale-105 rounded-full border-4 border-black px-5 py-2 outline-1 outline-[#FFD700] shadow-lg shadow-[#FFD700] bg-gray-900" href="/gallery">Galleria</a> 
			{/if}
		{/key}
	</nav>
</header>
