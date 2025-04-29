<script lang="ts">
	import { page } from '$app/state';
</script>

<header>
	<nav class="grid grid-cols-2 bg-black p-4 place-items-center">
		{#key page.url.pathname}
			<a class="text-shadow-valkoinen items-center font-['Rosarivo'] text-amber-50" href="/">Kotisivu</a>
			<a class="text-shadow-valkoinen items-center font-['Rosarivo'] text-amber-50" href="/gallery">Galleria</a>
		{/key}
	</nav>
</header>
