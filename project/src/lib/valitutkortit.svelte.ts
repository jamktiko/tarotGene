import type { Kortit } from '$lib/types/Kortit';

class Valitut {
	public nostetut: Kortit[] = $state([]);
	public valittuAihe: string = $state('description');
	get nNostetut() {
		return this.nostetut;
	} //Käytetty bugikorjauksessa

	tyhjenna() {
		this.nostetut = [];
	} // Tyhjentää nostetut taulukon

	tyonna(kortti: Kortit) {
		this.nostetut.push(kortti);
	} //työntää nostetun kortin nostetut pakkaan

	
}

const nostetut = new Valitut();
export { nostetut };
