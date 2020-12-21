class Pion {
	constructor(equipe, couleur, plateau){
		this.id = this.uuidv4()
		this.equipe = equipe
		this.couleur = couleur
		// this.plateau = plateau
		this.pv_max = 10
		this._pv = this.pv_max
	}

	get pv() {return this._pv}

	set pv(x){
		this._pv = x
		$(`#pv-${this.id}`).html(this.pv)
		if (!this.pv > 0)
			$('#' + this.id).fadeOut(600, function() { $(this).remove(); })
	}
	get html() {return `<div class='pion animate__animated ${this.couleur}' id='${this.id}'></div>`}

	uuidv4() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		  return v.toString(16);
		});
	}
	define_position(coordonnees) {	this.coord = { x : coordonnees.x, y : coordonnees.y }	}
}

class Equipe {
	constructor(nom, couleur){
		this.nom = nom
		this.couleur = couleur
	}
}

export {Pion, Equipe}