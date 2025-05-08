class Ruutu {
	public booleani: boolean = $state(false);
	public maara: number = $state(1);

	get nVaihto() {
		return this.booleani;
	}

	vaihda() {
		this.booleani = !this.booleani;
	}
}

const fiftyFifty = new Ruutu();
export { fiftyFifty };
