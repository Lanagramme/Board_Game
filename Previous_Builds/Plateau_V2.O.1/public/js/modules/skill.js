let Dice = (n = 10) => {
	let jet = RNG(20)
	if (jet >= n) jet = RNG(20)
	switch (true) {
		case (jet == 1 ): return "critical echec";
		case (jet <= n ): return "echec";
		case (jet == 20): return "critical success";
		default:          return "success";
	}
}

class Skills {
	constructor(name, aire, cost, element, damage, effet){
		this.aire = aire //{type, portee, vue}
		this.cost = cost
		this.element = element
		this.effet = effet
		this.name = name
		this.damage = damage
	}
	cast(caster, cible, /*infeste_arr*/){
		// vérifie si le joueur peut payer le cout du sort
		// if(!Array.isArray(infeste_arr)) infeste_arr = [];
		if(caster.pa < this.cost.pa ) return "pa";
		if(caster.pm < this.cost.pm ) return "pm";
		if(caster.pv < this.cost.pv ) return "pv";
		// if( caster.cost.token.fire < this.cost.token.fire && caster.token.water < this.cost.token.water && caster.token.earth < this.cost.token.earth ) return "token";
		
		caster.pa -= this.cost.pa
		caster.pm -= this.cost.pm
		caster.pv -= this.cost.pv

		let jet = Dice()

		switch (jet) {
			case "critical echec"   || "echec"  : return "miss";
			case "critical success" || "success": break;
		}
		
		cible.pv -= this.damage
		// for (item of infeste_arr) {
		//   infeste.activate(cible, item)
		// }
		return "success"
	}
}

class Effets {
	constructor(nom){
		this.nom = nom
	}
}

class Status {
	constructor(nom, type, duree = 0){
		this.nom = nom
		this.type = type //instantané, retardement, duree
		this.duree = duree
	}
}
	//====================================================================================================
	//              Modification par D.TISSOT
	//====================================================================================================

class Costs {
	constructor(pa, pm, pv, token){
		this.pa = pa
		this.pm = pm
		this.pv = pv
		this.token = {
			fire:  token[0],
			water: token[1],
			earth: token[2],
			total(){
				// return Object.values(this).reduce((a, b) => a + b);
				return this.fire + this.water + this.earth;
			}
		}
	}
}

//---------- Skills

export const Sorts = {
	//====================================================================================================
	//              Modification par D.TISSOT
	//====================================================================================================
	fire_bolt : new Skills ('Trait de feu', { type:'ligne', portee: 6, vue: 0 },  new Costs(2,0,0,[0,0,0]), 'feu', 5, [] ),
	heal      : new Skills ('Soin' , {type: 'cercle', portee: 4, vue: 0}, new Costs(4,0,0,[0,0,0]), 'terre', -4, []) ,
	// frost     : new Skills ('frost', {type: 'cone'  , portee: 3, vue: 0}, new Costs(3,0,0,[0,0,0]), 'eau'  , 03, [])

}

cl('test func total token',Sorts.fire_bolt.cost.token.total());
//---------- Effets
const infeste = new Effets ( 'Infesté')
infeste.activate = (cible, element) =>{
	cible.aura.push([element,2])
}

//---------- Status

// module.exports = Sorts
