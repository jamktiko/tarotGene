class Ruutu {
	public booleani: boolean = $state(false);
	public maara: number = $state(0);

	get nVaihto() {
		return this.booleani;
	}

	vaihda() {
		this.booleani = !this.booleani;
	}
}

const fiftyFifty = new Ruutu();
export { fiftyFifty };
