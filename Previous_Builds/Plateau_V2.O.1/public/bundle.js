(()=>{var t={577:t=>{class e{constructor(t,e,i,s,a,r){this.aire=e,this.cost=i,this.element=s,this.effet=r,this.name=t,this.damage=a}cast(t,e){if(t.pa<this.cost.pa)return"pa";if(t.pm<this.cost.pm)return"pm";if(t.pv<this.cost.pv)return"pv";switch(t.pa-=this.cost.pa,t.pm-=this.cost.pm,t.pv-=this.cost.pv,((t=10)=>{let e=RNG(20);switch(e>=t&&(e=RNG(20)),!0){case 1==e:return"critical echec";case e<=t:return"echec";case 20==e:return"critical success";default:return"success"}})()){case"critical echec":return"miss"}return e.pv-=this.damage,"success"}}class i{constructor(t,e,i,s){this.pa=t,this.pm=e,this.pv=i,this.token={fire:s[0],water:s[1],earth:s[2],total(){return this.fire+this.water+this.earth}}}}let s={fire_bolt:new e("Trait de feu",{type:"ligne",portee:6,vue:0},new i(2,0,0,[0,0,0]),"feu",5,[]),heal:new e("Soin",{type:"cercle",portee:4,vue:0},new i(4,0,0,[0,0,0]),"terre",-4,[]),frost:new e("frost",{type:"cone",portee:3,vue:0},new i(3,0,0,[0,0,0]),"eau",3,[])};cl("test func total token",s.fire_bolt.cost.token.total()),infeste=new class{constructor(t){this.nom=t}}("Infesté"),infeste.activate=(t,e)=>{t.aura.push([e,2])},t.exports=s}},e={};function i(s){if(e[s])return e[s].exports;var a=e[s]={exports:{}};return t[s](a,a.exports,i),a.exports}(()=>{"use strict";class t{constructor(t,e,i){this.id=this.uuidv4(),this.equipe=t,this.couleur=e,this.pv_max=10,this._pv=this.pv_max,this.pa_max=6,this.pa=this.pa_max,this.pm_max=3,this._pm=this.pm_max,this.skills=["fire_bolt","heal"]}get pv(){return this._pv}get pm(){return this._pm}get html(){return`<div class='pion animate__animated ${this.couleur}' id='${this.id}'></div>`}set pv(t){this._pv=t,$(`#pv-${this.id}`).html(this.pv),$("#pv").html(this.pv),!this.pv>0&&(this.define_position({x:-1,y:-1}),console.log($("#"+this.id)),$("#"+this.id).fadeOut(600,(function(){$(this).remove()})),$("#"+this.id).parent().removeClass("tour"),cl("#local_"+this.id))}set pm(t){this._pm=t,$(`#pm-${this.id}`).html(this.pm),$("#pm").html(this.pm)}uuidv4(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)}))}define_position(t){this.coord={x:t.x,y:t.y}}}class e{constructor(t,e){this.nom=t,this.couleur=e}}var s=i(577),a=console.log,r=["Acid_Apple","Acid_Pain","Acid_Rain","Acid_Sky","Acid_Voice","Bad_Apple","Bad_Book","Bad_Actor","Black_Book","Black_Pain","Blue_Apple","Blue_Lullaby","Blue_Rain","Breaking_Glass","Breaking_Ground","Breaking_Point","Broken_Chains","Broken_Glass","Broken_Lullaby","Broken_Melody","Broken_Shield","Broken_Sky","Broken_Thread","Broken_Void","Crazy_Apple","Electric_Apple","Electric_Blue","Electric_Box","Electric_Chain","Electric_City","Electric_Cube","Electric_Doll","Electric_Dream","Electric_Epic","Electric_Feel","Electric_Fire","Electric_Light","Electric_Lullaby","Electric_Machine","Electric_Man","Electric_Message","Electric_Pain","Electric_Point","Electric_Rain","Electric_Red","Electric_Sheep","Electric_Shock","Electric_Sky","Electric_Sleep","Electric_Snow","Electric_Sound","Electric_Star","Electric_Voice","Electric_Voice","Electric_Void","Electric_Wall","Electric_Wire","Empty_Voice","Empty_Void","Fantom_Freaks","Fantom_Pain","Fantom_Rain","Frontier_Freaks","Frozen_Apple","Frozen_Chains","Frozen_Glass","Frozen_Ground","Frozen_Pain","Frozen_Point","Frozen_Rain","Frozen_Shield","Frozen_Sky","Frozen_Void","Glass_Chains","Glass_Shield","Glass_Sky","Glass_Wall","Icy_Sky","Iron_Chains","Iron_Shield","Iron_Sky","Iron_Thread","Liquid_Pain","Liquid_Sky","Liquid_Void","Phantom_Thread","Phantom_Void","Royal_Guard","Solid_Glass","Solid_Ground","Solid_Pain","Solid_Rain","Solid_Void","Stolen_Book","Void_Dream","Void_Sky","Void_Voice"];class o{constructor(){this.ligne_max=0,this.colone_max=0,this.pion_actif=null,this.pions=[],this.equipes={},this.sort_actif=null}coordonnees_to_querySelector(t){return`.x${t.x}.y${t.y}`}coordonnees_from_classes(t){return{x:Number(t[1].split("x")[1]),y:Number(t[2].split("y")[1])}}coordonnees_aleatoires(){return{x:RNG(this.colone_max-1)+1,y:RNG(this.ligne_max-1)+1}}_distance(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}reset_damier(t,i){$("#info").html(""),$(".panel .teams").html(""),this.ligne_max=t,this.colone_max=i;let s=this._pick_random_colors(),a=this._pick_random_names();this.equipes={equipe1:new e(a[0],"lin-"+s[0]),equipe2:new e(a[1],"lin-"+s[1])},this._create_teams(3),this._dessin_damier(),this._spawn(),this._case_events()}_pick_random_colors(){let t=[];t[0]=RNG(6);do{t[1]=RNG(6)}while(t[0]===t[1]);return t}_pick_random_names(){let t=[];t[0]=r[RNG(r.length)];do{t[1]=r[RNG(r.length)]}while(t[0]===t[1]);return t}_create_teams(e){this.pions=[];for(let i in this.equipes){$(".panel .teams").append(`<div id="${this.equipes[i].nom}" class="p-2 d-flex"><span class="d-flex"><p class="m-0 mb-3 align-self-end team-name">${this.equipes[i].nom}</p></span><div id="${this.equipes[i].nom}-pions"><div></div>`);for(let s=e;s>0;s--)this.pions.push(new t(this.equipes[i].nom,this.equipes[i].couleur))}}_dessin_damier(){$("#grille").html("");for(let t=0;t<this.ligne_max;t++){$("#grille").append(`<div class="ligne_${t}"></div>`);for(let e=0;e<this.colone_max;e++)$(".ligne_"+t).append(`<div class="case x${e} y${t}"></div>`)}}_spawn(){let t;for(let e of this.pions){do{t=this.coordonnees_aleatoires()}while(""!==$(this.coordonnees_to_querySelector(t)).html());$(this.coordonnees_to_querySelector(t)).append(e.html),e.define_position(t);let i="";for(let t of e.skills)i+=`\n\t\t\t\t<div id="${t}" class="sort border p-2 d-flex flex-wrap align-items-center">\n\t\t\t\t\t<div class="icon"></div>\n\t\t\t\t\t\t<p class="m-0 p-2">${s[t].name}</p>\n\t\t\t\t</div>\n\t\t\t\t`;$(`#${e.equipe}-pions`).append(`\n\t\t\t\t<div id="local_${e.id}" class="p-1 d-flex">\n\t\t\t\t\t<span class="circle ${e.couleur} mr-2"></span>\n\t\t\t\t</div>\n\t\t\t`),$("#info").append(`\n\t\t\t\t<div id="info-${e.id}">\n\t\t\t\t\t<div class="info border border-rounded p-2">\n\t\t\t\t\t\t<div class="sorts">${i}</div>\n\t\t\t\t\n\t\t\t\t\t\t<div class="d-flex">\n\t\t\t\t\t\t\t<div class="info-main px-4 pb-3 pt-1">\n\t\t\t\t\t\t\t\t<div id="portrait" class="border rounded-circle portrait ${e.couleur}">\n\t\t\t\t\t\t\t\t\t<div class="rounded-circle border border-success outer">\n\t\t\t\t\t\t\t\t\t\t<div class="rounded-circle bg-success">\n\t\t\t\t\t\t\t\t\t\t\t<div id="pm-${e.id}" class="pion-pm white">${e.pm}</div>\n\t\t\t\t\t\t\t\t\t\t\t<div class="label">PM</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="rounded-circle border border-danger outer">\n\t\t\t\t\t\t\t\t\t\t<div class="rounded-circle bg-danger">\n\t\t\t\t\t\t\t\t\t\t\t<div id="pa" class="pion-pa white">${e.pa}</div>\n\t\t\t\t\t\t\t\t\t\t\t<div class="label">PA</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class="info-second">\n\t\t\t\t\t\t\t\t<div class="d-flex py-1">\n\t\t\t\t\t\t\t\t\t\t<div class="btn m-2 btn-primary deplacement">Move</div>\n\t\t\t\t\t\t\t\t\t\t<div class="btn m-2 btn-success clearBoard">Clear</div>\n\t\t\t\t\t\t\t\t\t\t<div class="btn m-2 btn-danger attack">Attack</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="bars">\n\t\t\t\t\t\t\t\t\t<span id="lifebar" class="lifebar bg-secondary border">\n\t\t\t\t\t\t\t\t\t\t<span id="life-${e.id}" class="bg-success d-grid centered" style="height: 100%; position: relative;">\n\t\t\t\t\t\t\t\t\t\t\t<div class="info-pv"> <span id="pv-${e.id}">${e.pv}</span> / ${e.pv_max} </div>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t<span id="aura" class="aura d-flex border"></span>\n\t\t\t\t\t\t\t\t</div>\t\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t`),$(`#info-${e.id}`).hide()}}_move(t,e){let i=this.coordonnees_to_querySelector(e);""===$(i).html()&&($(this.coordonnees_to_querySelector(t.coord)).html(""),$(i).append(t.html),t.define_position(e),$(`#coord-${t.id}`).html(`x${t.coord.x} : y${t.coord.y}`)),this._identifiers()}_get_area(t,e){let i=[],s=t=>[{x:t.x+1,y:t.y},{x:t.x-1,y:t.y}],a=t=>[{x:t.x,y:t.y+1},{x:t.x,y:t.y-1}],r=t=>s(t).concat(a(t));switch(i.push(t),e.type){case"cercle":for(let t=0;t<e.portee;t++){let t=i.length;for(let s=0;s<t;s++){let t=r(i[s]);for(let s=0;s<t.length;s++){const a=t[s];e.vue?e.vue&&""===$(this.coordonnees_to_querySelector(a)).html()&&i.push(a):i.push(a)}i=Array.from(new Set(i))}}break;case"ligne":i=i.concat(r(t));for(let r=0;r<e.portee-1;r++){let e=i.length;for(let r=0;r<e;r++)i=i[r].y===t.y?i.concat(s(i[r])):i.concat(a(i[r]));i=Array.from(new Set(i))}}return i}draw_area(t,e){let i;$(".case").removeClass("attack"),$(".case").removeClass("movement"),i=this._get_area(this.coordonnees_from_classes($(".active")[0].classList),e);for(let e of i)$(this.coordonnees_to_querySelector(e)).addClass(t)}clear_board_classes(){$(".case").removeClass("active").removeClass("movement").removeClass("attack").removeClass("attack"),$(".pion").removeClass("animate__bounce"),$('*[id^="local_"]').removeClass("red"),null!==this.pion_actif&&$(`#info-${this.pion_actif.id}`).hide(),this.pion_actif=null}_case_events(){let t=0;$(".case").click((e=>{if(a(this.pion_actif),Array.from(e.target.classList).includes("case")||(e.target=e.target.parentNode),null===this.pion_actif&&e.target.children.length&&Array.from(e.target.classList).includes("tour"))this.clear_board_classes(),this.pion_actif=this.pions.find((t=>t.id===e.target.children[0].id)),$(this.coordonnees_to_querySelector(this.pion_actif.coord)).addClass("active"),t=this.pion_actif.pv/this.pion_actif.pv_max*100,$(`#life-${this.pion_actif.id}`).css("width",`${t}%`),$(`#info-${this.pion_actif.id}`).show();else if(null!==this.pion_actif&&e.target.children.length&&Array.from(e.target.classList).includes("attack")){e.target.children[0].classList.add("animate__bounce");let t=this.pions.find((t=>t.id===e.target.children[0].id));a(s.fire_bolt.cost.pa),a("cast func return",this.sort_actif.cast(this.pion_actif,t)),this.clear_board_classes()}else if(null!==this.pion_actif&&e.target.children.length&&Array.from(e.target.classList).includes("tour"))this.clear_board_classes(),this.pion_actif=this.pions.find((t=>t.id===e.target.children[0].id)),$(this.coordonnees_to_querySelector(this.pion_actif.coord)).addClass("active"),t=this.pion_actif.pv/this.pion_actif.pv_max*100,$(`#life-${this.pion_actif.id}`).css("width",`${t}%`),$(`#info-${this.pion_actif.id}`).show();else if(null!==this.pion_actif&&Array.from(e.target.classList).includes("movement")){$(this.coordonnees_to_querySelector(this.pion_actif.coord)).removeClass("tour");let t={x:Number(Array.from(e.target.classList)[1].split("x")[1]),y:Number(Array.from(e.target.classList)[2].split("y")[1])},i=Math.abs(this.pion_actif.coord.x-t.x)+Math.abs(this.pion_actif.coord.y-t.y);this.pion_actif.pm-=i,this._move(this.pion_actif,t),$(this.coordonnees_to_querySelector(t)).addClass("tour"),this.clear_board_classes()}else this.clear_board_classes();$('*[id^="local_"]').removeClass("red"),null!==this.pion_actif&&$(`#local_${this.pion_actif.id}`).addClass("red")})),this._identifiers()}_identifiers(){$(".pion").hover((t=>{$(`#local_${t.target.id}`).css("background","cyan")})),$(".pion").mouseout((t=>{$(`#local_${t.target.id}`).css("background","transparent")})),$(".sort").click((t=>{let e=null;e=Array.from(t.target.classList).includes("sort")?t.target.id:t.target.parentNode.id,this.sort_actif=s[e]}))}}i(577);var n=1;function c(){let t=plateau.equipes["equipe"+n].nom,e=plateau.pions.filter((e=>e.equipe==t));for(let t of e)t.pm=t.pm_max;$("#pa").html(0),$("#pm").html(0),$("#tour").html(t),cl(e);for(let t=0;t<e.length;t++)e[t].pv>0&&$(plateau.coordonnees_to_querySelector(e[t].coord)).addClass("tour")}$("form").submit((function(t){t.preventDefault(),plateau=new o,$("#compte_ligne").val()+$("#compte_colone").val()<6?alert("valeur incorectes"):(plateau.reset_damier($("#compte_ligne").val(),$("#compte_colone").val()),$(".all").hide(),$(".deplacement").click((()=>{$(".active")&&plateau.draw_area("movement",{type:"cercle",portee:plateau.pion_actif.pm,vue:1})})),$(".attack").click((()=>{null!=plateau.pion_actif&&$(".active")&&plateau.draw_area("attack",plateau.sort_actif.aire)})),$(".clearBoard").click((()=>{plateau.clear_board_classes()})),c())})),$(".fin").click((()=>{n=1==n?2:1,$(".case").removeClass("tour"),$("div[class^=lin]:not(.portrait)")&&document.getElementById("portrait").classList.remove(document.getElementById("portrait").classList[document.getElementById("portrait").classList.length-1]),$("#pa").html(0),$("#pm").html(0),plateau.clear_board_classes(),c(plateau.equipes)}))})()})();