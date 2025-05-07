class Ruutu {
	public booleani: boolean = $state(false);
	public maara: number = $state(0);

	public intro: boolean = $state(true);

	get nVaihto() {
		return this.booleani;
	}

	vaihda() {
		this.booleani = !this.booleani;
	}

	aloita() {
		this.intro = !this.intro;
	}
}

const fiftyFifty = new Ruutu();
export { fiftyFifty };
