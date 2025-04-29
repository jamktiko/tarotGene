<script lang="ts">
	interface Props {
		text: string;
		onclick: () => void;
		disabled?: boolean;
		
	}

	let { text, onclick, disabled = false }: Props = $props();
</script>

<div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black outline outline-amber-400">
<button {onclick} {disabled}>{text}</button>
</div>
