<script lang="ts">
	interface Props {
		text: string;
		onclick: () => void;
		disabled?: boolean;
	}

	let { text, onclick, disabled = false }: Props = $props();
</script>

<button class="cursor-pointer mx-auto flex h-15 w-15 md:h-20 md:w-20 items-center justify-center rounded-full bg-black outline transition duration-175 ease-in-out hover:scale-103 hover:shadow-[#FFD770] active:outline active:outline-yellow-500 shadow-md" {onclick} {disabled}>

  <img src={text} alt="">
</button>

