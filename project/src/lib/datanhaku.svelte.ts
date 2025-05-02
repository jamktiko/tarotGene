import type {Kortit} from '$lib/types/Kortit'

class Tarot{
    private pakka: Kortit[] = $state([])

    get tKortit(){
        return this.pakka
    }

    async hKortit(){
        const response = await fetch('/json/Tarot.json');
		if (response.ok) {
			this.pakka = await response.json();
		} else {
			console.error('Failed to fetch cards:', response.statusText);
        }
    }
}

const pakka = new Tarot
export {pakka}