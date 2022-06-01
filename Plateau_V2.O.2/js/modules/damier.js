import { Pion, Equipe} from './pions.js'
import { Sorts } from './skill.js'
import { names } from './names.js'

const cl = console.log

export default class Damier {
	constructor(){
		this.ligne_max = 0
		this.colone_max = 0
		this.pion_actif = null
		this.pions = []
		this.equipes = {}
		this.sort_actif = null
	}

	set_up_teams(noms_equipes, couleurs_equipes){
		this.equipes = {
			equipe1 : new Equipe(noms_equipes[0], ('lin-' + couleurs_equipes[0])),
			equipe2 : new Equipe(noms_equipes[1], ('lin-' + couleurs_equipes[1]))
		}
	}
	
	//------ informations du plateau ------
	coordonnees_to_querySelector(coordonnees) { return `.x${coordonnees.x}.y${coordonnees.y}` }
	coordonnees_from_classes(classes) { return { x: Number(classes[1].split('x')[1]) , y: Number(classes[2].split('y')[1]) } }
	coordonnees_aleatoires() { return { x : RNG(this.colone_max-1) + 1, y : RNG(this.ligne_max-1) + 1 } }
	_distance(depart, arrivee){
		return Math.abs(depart.x - arrivee.x) + Math.abs(depart.y - arrivee.y)
	}

	//------ nouvelle partie ------
	reset_damier(a,b){
		$('#info, .panel .teams').html("")
		;[ this.ligne_max,this.colone_max ] = [ a,b ]

		this.set_up_teams(this._pick_random_names(), this._pick_random_colors())
		this._create_teams(3)
		this._draw_board()
		this._spawn_pieces()
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
	_draw_board(){
		$('#grille').html("")
		for (let i = 0; i < this.ligne_max; i++){
			$('#grille').append(`<div class="ligne_${i}"></div>`)
			for (let j =  0; j < this.colone_max; j++){
				$('.ligne_' + i).append(`<div class="case x${j} y${i}"></div>`);
			}
		}
	}

 //------ manipulation des pions ------
	_spawn_pieces(){ //place chaque pion dans une case vide aléatoire
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
						<p class="m-0 p-2">${	Sorts[sort].name}</p>
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
									<span id="lifebar" class="lifebar bg-secondary border">
										<span id="life-${pion.id}" class="bg-success d-grid centered" style="height: 100%; position: relative;">
											<div class="info-pv"> <span id="pv-${pion.id}">${pion.pv}</span> / ${pion.pv_max} </div>
										</span>
									</span>
									<span id="aura" class="aura d-flex border"></span>
								</div>	
							</div>
						</div>
					</div>
				</div>
			`)

			$('.sort').click((event)=>{
				let sort = null
				if(!Array.from(event.target.classList).includes('sort')) sort = event.target.parentNode.id
				else sort = event.target.id
				this.sort_actif = Sorts[sort]
			})

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
		$('.case').removeClass('active movement attack')
		$('.pion').removeClass('animate__bounce')
		$('*[id^="local_"]').removeClass('red')
		if(this.pion_actif !== null) $(`#info-${this.pion_actif.id}`).hide()
		this.pion_actif = null
	}
	change_active_piece(Case, piece_id){
			this.clear_board_classes()
			this.pion_actif = this.pions.find(x => x.id === piece_id)
			Case.classList.add('active')
	}

	// ------ Event Listeners ------
	_case_events(){
		const show_piece_info = (id) => {
			const life = this.pion_actif.pv / this.pion_actif.pv_max *100
			$(`#life-${id}`).css('width', `${life}%`)
			$(`#info-${id}`).show()
		}
		$('.case').click((event)=>{
			let classes = Array.from(event.target.classList)
			//s'assurer que la case est sélectionnée et pas le pion qu'elle contient
			if (!classes.includes('case')) event.target = event.target.parentNode

			//s'il n'y a pas de pion actif et que la case sélectionnée contiens un pion
			if( this.pion_actif === null && event.target.children.length && Array.from(event.target.classList).includes('tour')){
				this.change_active_piece(event.target, event.target.children[0].id)
				show_piece_info(this.pion_actif.id)
			}
			//s'il y a déja un pion actif mais que la case sélectionnée contiens un autre pion 
			else if ( this.pion_actif !== null && event.target.children.length ) {
				// s'il est à portée d'une attaque active, il subbit l'attaque
				// --lancer un sort
				if(Array.from(event.target.classList).includes('attack')){
					event.target.children[0].classList.add('animate__bounce')
					let target = this.pions.find(x => x.id === event.target.children[0].id)
					// target.pv -= this.sort_actif.damage
					cl(Sorts.fire_bolt.cost.pa)
					cl("cast func return",this.sort_actif.cast(this.pion_actif, target))
					this.clear_board_classes()
				}
				// s'il est de la même équipe celui ci devient le pion actif
				else if(Array.from(event.target.classList).includes('tour')){
					this.change_active_piece(event.target, event.target.children[0].id)
					show_piece_info(this.pion_actif.id)
				}
			}
			//s'il y a un pion actif et que la case est disponible au movent actif
			else if( this.pion_actif !== null && Array.from(event.target.classList).includes('movement')){
				// y placer le pion actif
				$(this.coordonnees_to_querySelector(this.pion_actif.coord)).removeClass('tour')
				let coordonnees_case_cible = {
					x: Number(event.target.classList[1].split('x')[1]),
					y: Number(event.target.classList[2].split('y')[1]),
				}
				let pm_depense = this._distance(this.pion_actif.coord, coordonnees_case_cible)
				this.pion_actif.pm -= pm_depense
				this._move(this.pion_actif, coordonnees_case_cible)

				event.target.classList.add('tour')
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
	}

}
