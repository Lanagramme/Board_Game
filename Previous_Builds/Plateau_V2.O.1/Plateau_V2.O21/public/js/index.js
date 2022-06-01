import Damier from './modules/damier.js'
import * as Sorts from './modules/skill.js'
// var Sorts = require('./skill.js')

// ---------------- Variables ----------------
var index = 1
// ---------------- Fonctions ---------------- 
function setup_game(){
	plateau = new Damier()
	if ($('#compte_ligne').val() < 5 || $('#compte_colone').val() < 5) {
		alert('valeur incorectes')
		return
	}
	
	plateau.reset_damier($('#compte_ligne').val(), $('#compte_colone').val())
	$('.all').hide()
	$('.deplacement').click(()=>{
		if($('.active')) {plateau.draw_area('movement', { type:'cercle', portee: plateau.pion_actif.pm, vue: 1 }) }
	})
	$('.attack').click(()=>{
		if(plateau.pion_actif != null)
		if($('.active')) {plateau.draw_area('attack', plateau.sort_actif.aire) }
		// if($('.active')) {plateau.draw_area('attack', 0, 'ligne')}
	})
	$('.clearBoard').click(()=>{
		plateau.clear_board_classes()
	})

	begin_tour()
}
function begin_tour(){
	//definir l'équipe active
	let nom_equipe_active = plateau.equipes["equipe" + index].nom
	let equipe_active = plateau.pions.filter( x => x.equipe == nom_equipe_active)
	for (let pion of equipe_active){
		pion.pm = pion.pm_max
	}
	$('#pa').html(0)
	$('#pm').html(0) 

	//changer le nom de l'équipe active
	$('#tour').html(nom_equipe_active)
	
	//mettre la classe tour à toutes les cases parent des pions de l'équipe
	cl(equipe_active)
	for(let i = 0; i<equipe_active.length; i++){
		if (equipe_active[i].pv>0)
			$(plateau.coordonnees_to_querySelector(equipe_active[i].coord)).addClass('tour')
	}
	//Verfier apres chaque clic si le tour est fini
}
function end_tour(){
	if (index == 1) index = 2
	else index = 1
	$('.case').removeClass('tour')
	if ($('div[class^=lin]:not(.portrait)')) document.getElementById('portrait').classList.remove(document.getElementById('portrait').classList[document.getElementById('portrait').classList.length-1])
	$('#pa').html(0)
	$('#pm').html(0) 

	plateau.clear_board_classes()
	//verifier s'il y a un vaincquer 
	//si oui afficher un modal pour terminer la partie
	//sinon lancer begin_tour avec l'index de l'autre equipe
	begin_tour(plateau.equipes)
}

// ---------------- Events ----------------
$('form').submit(function (event) {
	event.preventDefault();
	setup_game()
})

$('.fin').click(()=>{
	end_tour()
})


let sort = `
<div class="sort border p-2 d-flex flex-wrap">
	<div class="icon"></div>
	<div class="text d-flex ">
		<p class="align-self-center m-0 p-2">Nom du skill</p>
	</div>
</div>
`
// class Stats{
// 	constructor(pv, pa, pm){
// 		this.point_vie = pv
// 		this.pm = pm
// 		this.pa = pa
// 	}	

// }

// class Classe{
// 	constructor(stats){
// 		this.stats = stats
// 		this.competences = []
// 	}

// }
// class Personnage{
// 	constructor(classe){
// 		this.classe = classe
// 	}


// 	stats_editor(){
// 		this.point_de_vie = this.espece.point_de_vie + this.classe.point_de_vie * this.specialisation.point_de_vie
// 		this.force = this.espece.force + this.classe.force / this.specialisation.force
// 		this.agilite = this.espece.agilite + this.classe.agilite / this.specialisation.agilite
// 	}
// }













//----------------------------------------------------
/*

class Espece{
	constructor(stats){
		this.stats = stats
		this.traits = []
	}
}

class Specialisation{
	constructor(stats){
		this.stats = stats
		this.benedictions = []
	}
}



humain =  new Espece({pv : 4, force:6, agilite:8}, [traits,traits,traits,traits])
gnome =  new Espece({pv : 4, force:6, agilite:8}, [traits,traits,traits,traits])
vampire =  new Espece({pv : 4, force:6, agilite:8}, [traits,traits,traits,traits])

paladin = new Classe({pv : 4, force:6, agilite:8}, [competance,competance,competance,competance])
archer = new Classe({pv : 4, force:6, agilite:8}, [competance,competance,competance,competance])
suceur_de_dang = new Classe({pv : 4, force:6, agilite:8}, [competance,competance,competance,competance])
chauve_souris = new Classe({pv : 4, force:6, agilite:8}, [competance,competance,competance,competance])
bandit = new Classe({pv : 4, force:6, agilite:8}, [competance,competance,competance,competance])
petite_merde = new Classe({pv : 4, force:6, agilite:8}, [competance,competance,competance,competance])


spe1 = new Classe({pv : 4, force:6, agilite:8}, [benediction,benediction,benediction,benediction])
spe2 = new Classe({pv : 4, force:6, agilite:8}, [benediction,benediction,benediction,benediction])
spe3 = new Classe({pv : 4, force:6, agilite:8}, [benediction,benediction,benediction,benediction])
spe4 = new Classe({pv : 4, force:6, agilite:8}, [benediction,benediction,benediction,benediction])

maitre_splinter = new Personnage(paladin, gnome, petite_merde)

*/
