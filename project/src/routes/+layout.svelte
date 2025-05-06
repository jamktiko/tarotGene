<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
	
</script>
<div class="overflow-x-hidden overscroll-none">
	<Header></Header>

	{@render children()}

	<Footer></Footer>
</div>