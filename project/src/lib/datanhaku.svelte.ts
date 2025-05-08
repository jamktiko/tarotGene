import type {Kortit} from '$lib/types/Kortit'

// tehdään luokka Tarot jossa on metodit korttien hakemiselle muuttujaan ja korttien palautukselle
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

// tehdään uusi instanssi Tarot luokasta ja exportataan se jotta voimme suoraan kutsua pakasta kortit tai hakea kortit pakkaan
const pakka = new Tarot
export {pakka}