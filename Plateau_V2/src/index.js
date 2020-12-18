import Damier from './damier.js'
import { Pion, Equipe} from './pions.js'

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

// ---------------- Fonctions ---------------- 
function RNG(max) { return Math.floor(Math.random() * Math.floor(max)); }
function create_teams(taille_equipe, equipes){
	let pions = []
	$('.panel .teams').html("")
	for (let team in equipes){
		$('.panel .teams').append(`<div id="${equipes[team].nom}" class="p-2"></div>`)
		$(`#${equipes[team].nom}`).append(`
			<h2>${equipes[team].nom}</h2>
		`)
		for (let i = taille_equipe; i>0; i--){
			pions.push(new Pion(equipes[team].nom, equipes[team].couleur))
		}
	}
	return pions
}
function pick_randoom_colors(){
	let couleur = []
	couleur[0] = RNG(6)
	do { couleur[1] = RNG(6) }
	while (couleur[0] == couleur[1])
	return couleur
}
function get_team_member(equipe){
	return pions.filter(x => x.equipe == equipes[equipe].nom)
}
function distance(depart, arrivee){
	return Math.sqrt( Math.pow((arrivee.x - depart.x), 2) + Math.pow((arrivee.y - depart.y), 2))
}
// ---------------- Variables ----------------
let couleurs_equipes = pick_randoom_colors() //choisir deux couleurs différentes au hazard
let equipes = {
	equipe1 : new Equipe(names[RNG(names.length)], ('lin-' + couleurs_equipes[0])),
	equipe2 : new Equipe(names[RNG(names.length)], ('lin-' + couleurs_equipes[1]))
}
let pions = create_teams(3, equipes) //créer deux équipes de trois joueurs et stoque chaque pion dans le tableau
let plateau = new Damier(5,5, pions)
// ---------------- Events ----------------
$('form').submit(function (event) {
	event.preventDefault();
	couleurs_equipes = pick_randoom_colors()
	equipes = {
		equipe1 : new Equipe(names[RNG(names.length)], ('lin-' + couleurs_equipes[0])),
		equipe2 : new Equipe(names[RNG(names.length)], ('lin-' + couleurs_equipes[1]))
	}
	plateau.pions = create_teams(3, equipes)
	plateau.reset_damier($('#compte_ligne').val(), $('#compte_colone').val())
	$('.all').hide()
})

plateau.dessin_damier()
plateau.spawn()
plateau.case_event()


$('.deplacement').click(()=>{
	if(plateau.pion_actif != null)
		if($('.active')) {plateau.draw_move_area()}
})
$('.attack').click(()=>{
	if(plateau.pion_actif != null)
		if($('.active')) {plateau.draw_attack_area()}
})

$('.clearBoard').click(()=>{
	plateau.clear_board_classes()
})





































//----------------------------------------------------
/*
class Stats{
	constructor(pv,force, agilite){
		this.point_vie = pv
		this.force = force 
		this.agilite = agilite
	}	

}

class Espece{
	constructor(stats){
		this.stats = stats
		this.traits = []
	}
}

class Classe{
	constructor(stats){
		this.stats = stats
		this.competences = []
	}

}

class Specialisation{
	constructor(stats){
		this.stats = stats
		this.benedictions = []
	}
}

class Personnage{
	constructor(classe, espece, specialisation){
		this.classe = classe
		this.espece =espece
		this.specialisation = specialisation
	}

	get force() { return this.espece.force + this.classe.force / this.specialisation.force
	}

	stats_editor(){
		this.point_de_vie = this.espece.point_de_vie + this.classe.point_de_vie * this.specialisation.point_de_vie
		this.force = this.espece.force + this.classe.force / this.specialisation.force
		this.agilite = this.espece.agilite + this.classe.agilite / this.specialisation.agilite
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