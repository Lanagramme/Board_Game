class Pion {
	constructor(equipe, couleur, plateau){
		this.id = this.uuidv4()
		this.equipe = equipe
		this.couleur = couleur
		
		this.pv_max = 10
		this._pv = this.pv_max
		this.pa_max = 6
		this.pa = this.pa_max
		this.pm_max = 3
		this._pm = this.pm_max
		this.skills = [ "fire_bolt", "heal" ]
	}

	get pv() {return this._pv}
	get pm() {return this._pm}
	get html() {return `<div class='pion animate__animated ${this.couleur}' id='${this.id}'></div>`}

	set pv(x){
		this._pv = x
		$(`#pv-${this.id}`).html(this.pv)
		$(`#pv`).html(this.pv)
		if (!this.pv > 0){
			this.define_position({x:-1, y:-1})
			console.log($('#' + this.id))
			$('#' + this.id).fadeOut(600, function() { $(this).remove(); })
			// .then(()=>{
			// 	$('#local_' + this.id).css('background','grey')
			// })
			$('#' + this.id).parent().removeClass('tour')
			cl('#local_' + this.id)
		}
	}
	set pm(x){
		this._pm = x
		$(`#pm-${this.id}`).html(this.pm)
		$(`#pm`).html(this.pm)
	}

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