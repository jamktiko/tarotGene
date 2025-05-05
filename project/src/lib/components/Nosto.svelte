<!-- <script lang="ts">

import { fly, fade } from "svelte/transition";

interface Props{
text:string
image:string
onclick: () => void;

}
let {text,image, onclick}:Props =$props()
</script>
{#each nostot as kortti (kortti.name)}
<div in:fly|global={{ x: 0, y: -300 , delay: 1000, duration: 2000}} out:fade class="flex flex-col items-center gap-6 pb-14" > 
  <h1 class="font-['Rosarivo'] text-white text-2xl text-shadow-white text-shadow-sm">
    {kortti.name}
  </h1>
  <img
    onclick={() => naytaKortti(kortti)}
    class=" object-cover sm:h-45 sm:w-30 md:h-90 md:w-60 transition duration-175 ease-in-out hover:scale-101 w-75 h-100 rounded-xl border-4 border-black outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#FFD700]"
    src={kortti.image}
    alt="Kortin kuvateksti"
    
  />
</div>
{#if valittuKortti === kortti}
  <Modal pakka={kortti} sulje={() => naytaKortti(kortti)} />
{/if}
{/each}

 <h1 class="font-['Rosarivo'] text-white text-2xl text-shadow-white text-shadow-sm">
  {kortti.name}
</h1>
<img
  onclick={() => naytaKortti(kortti)}
  class=" object-cover sm:h-45 sm:w-30 md:h-90 md:w-60 transition duration-175 ease-in-out hover:scale-101 w-75 h-100 rounded-xl border-4 border-black outline-1 outline-[#FFD700] shadow-lg hover:shadow-[#FFD700]"
  src={kortti.image}
  alt="Kortin kuvateksti"
  
/> -->