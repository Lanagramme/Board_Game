var cl = console.log

export default class Damier {
	constructor(ligne_max, colone_max, pions){
		this.ligne_max = ligne_max
		this.colone_max = colone_max
		this.pion_actif = null
		this.case_movement = []
		this.case_portee = []
		this.pions = pions
	}

	coordonnees_to_querySelector(coordonnees) { return `.x${coordonnees.x}.y${coordonnees.y}` }
	coordonnees_from_classes(classes) { return { x: Number(classes[1].split('x')[1]) , y: Number(classes[2].split('y')[1]) } }
	reset_damier(a,b){
		this.ligne_max = a
		this.colone_max = b
		this.dessin_damier()
		this.spawn()
		this.case_event()
	}
	dessin_damier(){
		$('#grille').html("")
		for (let i = 0; i < this.ligne_max; i++){
			$('#grille').append(`<div class="ligne_${i}"></div>`)
			for (let j =  0; j < this.colone_max; j++){
				$('.ligne_' + i).append(`<div class="case x${j} y${i}"></div>`);
			}
		}
	}
	coordonnees_aleatoires(){ 
		return { 
			x : this._RNG(this.colone_max-1)+1, 
			y : this._RNG(this.ligne_max-1)+1
		}
	}
	_RNG(max) { return Math.floor(Math.random() * Math.floor(max)); }


	spawn(){ //place chaque pion dans une case vide aléatoire
		let coordonnees
		for (let pion of this.pions){ 
			do { coordonnees = this.coordonnees_aleatoires()}
			while ( $( this.coordonnees_to_querySelector(coordonnees) ).html() != "" )
			$( this.coordonnees_to_querySelector(coordonnees) ).append(pion.html) 
			pion.define_position(coordonnees) 
			$(`#${pion.equipe}`).append(`
				<div id="info_${pion.id}" class="p-1 d-flex">
					<span class="circle ${pion.couleur} mr-2"></span>
					<span id="coord-${pion.id}">x${pion.coord.x} : y${pion.coord.y}</span>
					<span class="ml-2"> [ <span id="pv-${pion.id}">${pion.pv}</span> / ${pion.pv_max} ]<span/>
				</div>
			`)

		}
	}
	move(pion, position_cible){ //supprime le pion de sa case actuelle et l'ajoute à sa nouvelle case
		let nouvelles_coordonnees = this.coordonnees_to_querySelector(position_cible)
		if ($( nouvelles_coordonnees ).html() == ""){
			$( this.coordonnees_to_querySelector(pion.coord)).html("")
			$( nouvelles_coordonnees ).append( pion.html )
			pion.define_position(position_cible)
			$(`#coord-${pion.id}`).html(`x${pion.coord.x} : y${pion.coord.y}`)
		}
	}

	get_move_area(origin, portee){
		let area = []
		area.push(origin)
		for (let j=0; j<portee-1; j++){
			for (let i of area){
				if($(this.coordonnees_to_querySelector({ x: i.x+1, y: i.y })).html() == "")
					area.push({ x: i.x+1, y: i.y })
				if($(this.coordonnees_to_querySelector({ x: i.x-1, y: i.y })).html() == "")
					area.push({ x: i.x-1, y: i.y })
				if($(this.coordonnees_to_querySelector({ x: i.x, y: i.y+1 })).html() == "")
					area.push({ x: i.x, y: i.y+1 })
				if($(this.coordonnees_to_querySelector({ x: i.x, y: i.y-1 })).html() == "")
					area.push({ x: i.x, y: i.y-1 })
				area = Array.from(new Set(area))
			}
		}
		return area
	}
	get_attack_area(origin, portee){
		let area = []
		area.push(origin)
		for (let j=0; j<portee-1; j++){
			for (let i of area){
					area.push({ x: i.x+1, y: i.y })
					area.push({ x: i.x-1, y: i.y })
					area.push({ x: i.x, y: i.y+1 })
					area.push({ x: i.x, y: i.y-1 })
				area = Array.from(new Set(area))
			}
		}
		return area
	}
	draw_move_area(){
		$('.case').removeClass('attack')
		let portee = this.get_move_area(this.coordonnees_from_classes($('.active')[0].classList), 3)
		for (let i of portee){
			$(this.coordonnees_to_querySelector(i)).addClass('movement')
		}
	}
	draw_attack_area(){
		$('.case').removeClass('movement')
		let portee = this.get_attack_area(this.coordonnees_from_classes($('.active')[0].classList), 3)
		for (let i of portee){
			$(this.coordonnees_to_querySelector(i)).addClass('attack')
		}

	}

	clear_board_classes(){
		$('.case').removeClass('active').removeClass('movement').removeClass('attack').removeClass('attack')
		$('.pion').removeClass('animate__bounce')
		$('*[id^="info_"]').removeClass('red')
		this.pion_actif = null
	}

	case_event(){
		$('.case').click((event)=>{
			// cl(pions)
			let classes = Array.from(event.target.classList)
			//s'assurer que la case est sélectionnée et pas le pion qu'elle contient
			if (!classes.includes('case')) event.target = event.target.parentNode
			//s'il n'y a pas de pion actif et que la case sélectionnée contiens un pion
			//Faire du pion qu'elle contiens le pion actif et de cette case la case active
			if( this.pion_actif == null && event.target.children.length && Array.from(event.target.classList).includes('tour')){
				this.clear_board_classes()
				cl(event.target.children[0].id)
				this.pion_actif = this.pions.find(x => x.id == event.target.children[0].id)
				$(this.coordonnees_to_querySelector(this.pion_actif.coord)).addClass('active')
			}
			else if( this.pion_actif != null && event.target.children.length && Array.from(event.target.classList).includes('attack')){
				this.clear_board_classes()
				event.target.children[0].classList.add('animate__bounce')
				cl(event.target.children[0].id)
				let target = this.pions.find(x => x.id == event.target.children[0].id)
				target.pv -= 5
			}
			//s'il y a déja un pion actif mais que la case sélectionnée contiens un autre pion 
			//celui ci devient le pion actif
			else if( this.pion_actif != null && event.target.children.length && Array.from(event.target.classList).includes('tour')){
				this.clear_board_classes()
				this.pion_actif = this.pions.find(x => x.id == event.target.children[0].id)
				$(this.coordonnees_to_querySelector(this.pion_actif.coord)).addClass('active')
				
			}
			//s'il y a un pion actif et que la case est vide
			//y déplacer le pion actif
			else if( this.pion_actif != null && Array.from(event.target.classList).includes('movement')){
				$(this.coordonnees_to_querySelector(this.pion_actif.coord)).removeClass('tour')
				let coordonnees_case_cible = {
					x: Number(Array.from(event.target.classList)[1].split('x')[1]),
					y: Number(Array.from(event.target.classList)[2].split('y')[1]),
				}
				this.move(this.pion_actif, coordonnees_case_cible)
				$(this.coordonnees_to_querySelector(coordonnees_case_cible)).addClass('tour')
				this.clear_board_classes()
			}
			else{
				this.clear_board_classes()
			}

			$('*[id^="info_"]').removeClass('red')
			if (this.pion_actif != null){
				console.log({id : this.pion_actif.id, coord: this.pion_actif.coord})
				$(`#info_${this.pion_actif.id}`).addClass('red')
			}
		})
	}
}