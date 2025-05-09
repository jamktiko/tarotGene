import type { Kortit } from '$lib/types/Kortit';

class Valitut {
	public nostetut: Kortit[] = $state([]); //Nostettujen korttien taulukko
	public valittuAihe: number = $state(0); //Hallitsee valittua aihetta
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
