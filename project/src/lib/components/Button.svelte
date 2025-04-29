<script lang="ts">
	interface Props {
		text: string;
		onclick: () => void;
		disabled?: boolean;
	}

	let { text, onclick, disabled = false }: Props = $props();
</script>

<button class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black outline outline-amber-400" {onclick} {disabled}>

  <img src={text} alt="">
</button>

