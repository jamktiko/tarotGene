<script lang="ts">
	interface Props {
		text: string;
		onclick: () => void;
		disabled?: boolean;
	}

	let { text, onclick, disabled = false }: Props = $props();
</script>

<button class="text-custom-valkoinen mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black outline transition duration-175 ease-in-out hover:scale-101 hover:shadow-[#FFD770] active:outline active:outline-yellow-500 shadow-md" {onclick} {disabled}>

  <img src={text} alt="">
</button>

