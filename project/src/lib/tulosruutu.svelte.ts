class Ruutu {
	public booleani: boolean = $state(false); //Säätää etusivulla tapahtuvaa sivunvaihtoa
	public maara: number = $state(1); //Säätää nostettujen korttien määrää

	get nVaihto() {
		return this.booleani;
	} // Käytetty bugikorjauksessa

	vaihda() {
		this.booleani = !this.booleani;
	} //Vaihtaa booleanin tilaa
}

const fiftyFifty = new Ruutu();
export { fiftyFifty };
