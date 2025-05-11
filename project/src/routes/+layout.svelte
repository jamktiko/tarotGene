<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
	
</script>
<div class=" min-h-screen overflow-x-hidden overscroll-none flex flex-col">
	<Header></Header>
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer></Footer>
</div>
