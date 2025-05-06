import type { Kortit } from '$lib/types/Kortit';

class Valitut {
	public nostetut: Kortit[] = $state([]);
	public valittuAihe: number = $state(0);
	get nNostetut() {
		return this.nostetut;
	}

	tyhjenna() {
		this.nostetut = [];
	}

	tyonna(kortti: Kortit) {
		this.nostetut.push(kortti);
	}
}

const nostetut = new Valitut();
export { nostetut };
