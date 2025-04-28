<script lang="ts">
	import { page } from '$app/state';
</script>

<header>
	<nav>
		{#key page.url.pathname}
			<a href="/">Kotisivu</a>
			<a href="/gallery">Galleria</a>
		{/key}
	</nav>
</header>
