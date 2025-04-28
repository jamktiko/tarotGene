<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Nav.svelte';
	let { children } = $props();
</script>

<Header></Header>

{@render children()}
