import { Pion, Equipe} from './pions.js'
var Sorts = require('./skill.js')

var cl = console.log
var names = ["Acid_Apple","Acid_Pain","Acid_Rain","Acid_Sky","Acid_Voice",
"Bad_Apple","Bad_Book","Bad_Actor",
"Black_Book","Black_Pain",
"Blue_Apple","Blue_Lullaby","Blue_Rain",
"Breaking_Glass","Breaking_Ground","Breaking_Point",
"Broken_Chains","Broken_Glass","Broken_Lullaby","Broken_Melody","Broken_Shield","Broken_Sky","Broken_Thread","Broken_Void",
"Crazy_Apple",
"Electric_Apple","Electric_Blue","Electric_Box","Electric_Chain","Electric_City","Electric_Cube","Electric_Doll","Electric_Dream","Electric_Epic","Electric_Feel","Electric_Fire","Electric_Light","Electric_Lullaby","Electric_Machine","Electric_Man","Electric_Message","Electric_Pain","Electric_Point","Electric_Rain","Electric_Red","Electric_Sheep","Electric_Shock","Electric_Sky","Electric_Sleep","Electric_Snow","Electric_Sound","Electric_Star","Electric_Voice","Electric_Voice","Electric_Void","Electric_Wall","Electric_Wire",
"Empty_Voice","Empty_Void",
"Fantom_Freaks","Fantom_Pain","Fantom_Rain",
"Frontier_Freaks",
"Frozen_Apple","Frozen_Chains","Frozen_Glass","Frozen_Ground","Frozen_Pain","Frozen_Point","Frozen_Rain","Frozen_Shield","Frozen_Sky","Frozen_Void",
"Glass_Chains","Glass_Shield","Glass_Sky","Glass_Wall",
"Icy_Sky",
"Iron_Chains","Iron_Shield","Iron_Sky","Iron_Thread",
"Liquid_Pain","Liquid_Sky","Liquid_Void",
"Phantom_Thread","Phantom_Void",
"Royal_Guard",
"Solid_Glass","Solid_Ground","Solid_Pain","Solid_Rain","Solid_Void",
"Stolen_Book",
"Void_Dream","Void_Sky","Void_Voice"]

export default class Damier {
	constructor(){
		this.ligne_max = 0
		this.colone_max = 0
		this.pion_actif = null
		this.pions = []
		this.equipes = {}
		this.sort_actif = null

	}
	
	//------ informations du plateau ------
	coordonnees_to_querySelector(coordonnees) { return `.x${coordonnees.x}.y${coordonnees.y}` }
	coordonnees_from_classes(classes) { return { x: Number(classes[1].split('x')[1]) , y: Number(classes[2].split('y')[1]) } }
	coordonnees_aleatoires() { return { x : RNG(this.colone_max-1) + 1, y : RNG(this.ligne_max-1) + 1 } }
	_distance(depart, arrivee){
		return Math.sqrt( Math.pow((arrivee.x - depart.x), 2) + Math.pow((arrivee.y - depart.y), 2))
	}

	//------ nouvelle partie ------
	reset_damier(a,b){
		$('#info').html("")
		$('.panel .teams').html("")
		this.ligne_max = a
		this.colone_max = b

		let couleurs_equipes = this._pick_random_colors()
		let noms_equipes = this._pick_random_names()
		this.equipes = {
			equipe1 : new Equipe(noms_equipes[0], ('lin-' + couleurs_equipes[0])),
			equipe2 : new Equipe(noms_equipes[1], ('lin-' + couleurs_equipes[1]))
		}
	
		this._create_teams(3)

		this._dessin_damier()
		this._spawn()
		this._case_events()
	}
	_pick_random_colors(){
		let colors = []
		colors[0] = RNG(6)
		do { colors[1] = RNG(6) }
		while (colors[0] === colors[1])
		return colors
	}
	_pick_random_names(){
		let teams_names = []
		teams_names[0] = names[RNG(names.length)]
		do { teams_names[1] = names[RNG(names.length)] }
		while (teams_names[0] === teams_names[1])
		return teams_names
	}
	_create_teams(taille_equipes){
		this.pions = []
		for (let equipe in this.equipes){
			$('.panel .teams').append(`<div id="${this.equipes[equipe].nom}" class="p-2 d-flex"><span class="d-flex"><p class="m-0 mb-3 align-self-end team-name">${this.equipes[equipe].nom}</p></span><div id="${this.equipes[equipe].nom}-pions"><div></div>`)
			for (let i = taille_equipes; i>0; i--){
				this.pions.push(new Pion(this.equipes[equipe].nom, this.equipes[equipe].couleur))
			}
		}
	}
	_dessin_damier(){
		$('#grille').html("")
		for (let i = 0; i < this.ligne_max; i++){
			$('#grille').append(`<div class="ligne_${i}"></div>`)
			for (let j =  0; j < this.colone_max; j++){
				$('.ligne_' + i).append(`<div class="case x${j} y${i}"></div>`);
			}
		}
	}

 //------ manipulation des pions ------
	_spawn(){ //place chaque pion dans une case vide aléatoire
		let coordonnees
		for (let pion of this.pions){ 
			do { coordonnees = this.coordonnees_aleatoires()}
			while ( $( this.coordonnees_to_querySelector(coordonnees) ).html() !== "" )
			$( this.coordonnees_to_querySelector(coordonnees) ).append(pion.html) 
			pion.define_position(coordonnees) 
			
			let sorts_du_pion = ""
			for (let sort of pion.skills){
				sorts_du_pion += `
				<div id="${sort}" class="sort border p-2 d-flex flex-wrap align-items-center">
					<div class="icon"></div>
						<p class="m-0 p-2">${Sorts[sort].name}</p>
				</div>
				`
			}
			$(`#${pion.equipe}-pions`).append(`
				<div id="local_${pion.id}" class="p-1 d-flex">
					<span class="circle ${pion.couleur} mr-2"></span>
				</div>
			`)
			$(`#info`).append(`
				<div id="info-${pion.id}">
					<div class="info border border-rounded p-2">
						<div class="sorts">${sorts_du_pion}</div>
				
						<div class="d-flex">
							<div class="info-main px-4 pb-3 pt-1">
								<div id="portrait" class="border rounded-circle portrait ${pion.couleur}">
									<div class="rounded-circle border border-success outer">
										<div class="rounded-circle bg-success">
											<div id="pm-${pion.id}" class="pion-pm white">${pion.pm}</div>
											<div class="label">PM</div>
										</div>
									</div>
									<div class="rounded-circle border border-danger outer">
										<div class="rounded-circle bg-danger">
											<div id="pa" class="pion-pa white">${pion.pa}</div>
											<div class="label">PA</div>
										</div>
									</div>
								</div>
							</div>
							
							<div class="info-second">
								<div class="d-flex py-1">
										<div class="btn m-2 btn-primary deplacement">Move</div>
										<div class="btn m-2 btn-success clearBoard">Clear</div>
										<div class="btn m-2 btn-danger attack">Attack</div>
								</div>
								<div class="bars">
									<span id="lifebar" class="lifebar border d-grid centered">
										<span id="info-pv"> <span id="pv-${pion.id}">${pion.pv}</span> / ${pion.pv_max} </span>
									</span>
									<span id="aura" class="aura d-flex border"></span>
								</div>	
							</div>
						</div>
					</div>
				</div>
			`)
			$(`#info-${pion.id}`).hide()

		}
	}
	_move(pion, position_cible){ //supprime le pion de sa case actuelle et l'ajoute à sa nouvelle case
		let nouvelles_coordonnees = this.coordonnees_to_querySelector(position_cible)
		if ($( nouvelles_coordonnees ).html() === ""){
			$( this.coordonnees_to_querySelector(pion.coord)).html("")
			$( nouvelles_coordonnees ).append( pion.html )
			pion.define_position(position_cible)
			$(`#coord-${pion.id}`).html(`x${pion.coord.x} : y${pion.coord.y}`)
		}
		this._identifiers()
	}
	_get_area(origin, aire){
		let area = []
		let horizontal=(i)=>{ return [ { x: i.x+1, y: i.y }, { x: i.x-1, y: i.y } ]}
		let vertical  =(i)=>{ return [ { x: i.x, y: i.y+1 }, { x: i.x, y: i.y-1 } ]}
		let cardinal=(i)=>{ return horizontal(i).concat(vertical(i))}
		area.push(origin)

		switch(aire.type){
			case 'cercle':
				for (let j=0; j<aire.portee; j++){
					let foo = area.length
					for (let i = 0; i<foo; i++){
						let directions = cardinal(area[i])
						for (let k = 0; k < directions.length; k++) {
							const element = directions[k];
							if(!aire.vue){
								area.push(element)
							}
							else if(aire.vue && $(this.coordonnees_to_querySelector(element)).html() === "")
								area.push(element)
						}
						area = Array.from(new Set(area))
					}
				}
				break;
			case 'ligne':
				area = area.concat(cardinal(origin))
				for (let j= 0; j<aire.portee-1; j++){
					let foo = area.length
					for (let i = 0; i<foo; i++){
						if (area[i].y === origin.y){ area = area.concat(horizontal(area[i])) }
						else  { area = area.concat(vertical(area[i])) }
					}
					area = Array.from(new Set(area))
				}
				break;
			case '':
				break;
		}
		return area
	}
	draw_area(classe, aire){
		$('.case').removeClass('attack')
		$('.case').removeClass('movement')
		let portee
		if (classe === 'attack'){
			portee = this._get_area(this.coordonnees_from_classes($('.active')[0].classList), aire)
		}
		else {
			portee = this._get_area(this.coordonnees_from_classes($('.active')[0].classList), aire)
		}
		for (let i of portee){
			$(this.coordonnees_to_querySelector(i)).addClass(classe)
		}
	}
	clear_board_classes(){
		$('.case').removeClass('active').removeClass('movement').removeClass('attack').removeClass('attack')
		$('.pion').removeClass('animate__bounce')
		$('*[id^="local_"]').removeClass('red')
		if(this.pion_actif !== null) $(`#info-${this.pion_actif.id}`).hide()
		this.pion_actif = null
	}

	// ------ Event Listeners ------
	_case_events(){
		$('.case').click((event)=>{
			cl(this.pion_actif)
			let classes = Array.from(event.target.classList)
			//s'assurer que la case est sélectionnée et pas le pion qu'elle contient
			if (!classes.includes('case')) event.target = event.target.parentNode
			//s'il n'y a pas de pion actif et que la case sélectionnée contiens un pion
			//Faire du pion qu'elle contiens le pion actif et de cette case la case active
			if( this.pion_actif === null && event.target.children.length && Array.from(event.target.classList).includes('tour')){
				this.clear_board_classes()
				this.pion_actif = this.pions.find(x => x.id === event.target.children[0].id)
				$(this.coordonnees_to_querySelector(this.pion_actif.coord)).addClass('active')

				
				//===================================================
				$('#portrait').addClass(this.pion_actif.couleur)
				$('#pa').html(this.pion_actif.pa)
				$('#pm').html(this.pion_actif.pm)
				$('#pv').html(this.pion_actif.pv)
				$('#pv-max').html(this.pion_actif.pv_max)
				$(`#info-${this.pion_actif.id}`).show()
				//===================================================

				
			}
			else if( this.pion_actif !== null && event.target.children.length && Array.from(event.target.classList).includes('attack')){
				event.target.children[0].classList.add('animate__bounce')
				let target = this.pions.find(x => x.id === event.target.children[0].id)
				// target.pv -= this.sort_actif.damage
				cl(Sorts.fire_bolt.cost.pa)
				cl("cast func return",this.sort_actif.cast(this.pion_actif, target))
				this.clear_board_classes()
			}
			//s'il y a déja un pion actif mais que la case sélectionnée contiens un autre pion 
			//celui ci devient le pion actif
			else if( this.pion_actif !== null && event.target.children.length && Array.from(event.target.classList).includes('tour')){
				this.clear_board_classes()
				this.pion_actif = this.pions.find(x => x.id === event.target.children[0].id)
				$(this.coordonnees_to_querySelector(this.pion_actif.coord)).addClass('active')


				//===================================================
				$('#portrait').addClass(this.pion_actif.couleur)
				$('#pa').html(this.pion_actif.pa)
				$('#pm').html(this.pion_actif.pm)
				$('#pv').html(this.pion_actif.pv)
				$('#pv-max').html(this.pion_actif.pv_max)
				$(`#info-${this.pion_actif.id}`).show()
				//===================================================
				 
				
			}
			//s'il y a un pion actif et que la case est vide
			//y déplacer le pion actif
			else if( this.pion_actif !== null && Array.from(event.target.classList).includes('movement')){
				$(this.coordonnees_to_querySelector(this.pion_actif.coord)).removeClass('tour')
				let coordonnees_case_cible = {
					x: Number(Array.from(event.target.classList)[1].split('x')[1]),
					y: Number(Array.from(event.target.classList)[2].split('y')[1]),
				}
				let pm_depense =  Math.abs(this.pion_actif.coord.x - coordonnees_case_cible.x) + Math.abs(this.pion_actif.coord.y - coordonnees_case_cible.y)
				this.pion_actif.pm -= pm_depense
				this._move(this.pion_actif, coordonnees_case_cible)

				$(this.coordonnees_to_querySelector(coordonnees_case_cible)).addClass('tour')
				this.clear_board_classes()
			}
			else{
				this.clear_board_classes()
			}

			$('*[id^="local_"]').removeClass('red')
			if (this.pion_actif !== null){
				$(`#local_${this.pion_actif.id}`).addClass('red')
			}
		})
		this._identifiers()



	}
	_identifiers(){

		$('.pion').hover((event) => {
			$(`#local_${event.target.id}`).css('background','cyan')
		})

		$('.pion').mouseout((event) => {
			$(`#local_${event.target.id}`).css('background','transparent')
		})
		$('.sort').click((event)=>{
			let sort = null
			if(!Array.from(event.target.classList).includes('sort')) sort = event.target.parentNode.id
			else sort = event.target.id
			this.sort_actif = Sorts[sort]
		})

	}

}