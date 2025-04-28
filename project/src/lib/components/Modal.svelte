<script lang="ts">
    import type {Kortit} from '$lib/types/Kortit'
    interface Props {
        pakka: Kortit;
        sulje: () => void
    }
    let {pakka, sulje}: Props = $props()
</script>

<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" id="Backdrop">
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-4xl" id="Modal">
        <h1 class="text-2xl font-bold mb-4 ">{pakka.name}</h1>
        <div class="flex gap-6">
            <img class="w-96 h-auto" src={pakka.image} alt="kortin kuva"/>
            <div class="flex flex-col justify-between">
                <p class="text-lg">{pakka.description}</p>
                <button class="px-4 py-2 bg-orange-100 hover:bg-grey-200 rounded" onclick={sulje}>
                    sulje
                </button>
            </div>
        </div>
    </div>
</div>