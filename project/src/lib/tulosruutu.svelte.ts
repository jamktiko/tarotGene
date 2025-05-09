class Ruutu {
	public booleani: boolean = $state(false); //Säätää etusivulla tapahtuvaa sivunvaihtoa
	public maara: number = $state(1); //Säätää nostettujen korttien määrää
	public aihetimer: boolean = $state(false);

	public intro: boolean = $state(true);

	get nVaihto() {
		return this.booleani;
	} // Käytetty bugikorjauksessa

	vaihda() {
		this.booleani = !this.booleani;
	} //Vaihtaa booleanin tilaa

	aloita() {
		this.intro = !this.intro;
		this.aihetimer = !this.aihetimer;
	}
}

const fiftyFifty = new Ruutu();
export { fiftyFifty };
