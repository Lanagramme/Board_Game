

var gri = document.getElementsByClassName('section'); //variable globale qui contient le code html de toutes les cellules du tableau

function creer() { //crée le plateau

    let act = "", pos = 0, dex = []; 
    //act est la variable strig qui contient l'innerHTML du plateau
    //pos stoque de manière transitoire les indice de chaque case du plateau à sa création
    //dex est une variable tableau qui contiendra les indices, les min et les max (définis plus loin) de chaque case
    let col = Number(document.getElementById("col").value); //nombre de collones recu dans le form
    let row = Number(document.getElementById("row").value); //nombre de lignes recu dans le form

    if (isNaN(col) || isNaN(row)) {alert("Veuillez entrer des valeurs numériques.");} //protection anti idiots
    else {
        let max = col - 1,  min = 0; //min et max sont les valeur de la première et de la dernière case de la ligne active
        act += "<table>"; 

        for (i = 0; i < row; i++) { //Cette boucle cree les rangées
            act += "<tr>";
            for (j = 0; j < col; j++) { //cette boucle ajoute les colones
                act += "<td class='section' onclick='zi(" + pos + ")'></td>"; // pos est l'indice de la case
                dex.push([min, max]); //on ajoute le min et le max de la case actuelle à dans une nouvelle case du tableau
                pos++;//on augmente la valeur de pos de 1 afin que la case suivante aie l'indice suivant
            } //au sortir ce cette boucle on passe à la ligne suivante
            act += "</tr>";
            max += col; //on augmente les valeurs de min et max pour qu'il correspondent a la premire et à la derni_re case de la ligne suivante
            min += col;
        }
        act += "</table>";

        document.getElementById('board').innerHTML = act; //on ajoute le code HTML stocké dans act à la page pour déssiner le tableau
        localStorage.setItem("index", JSON.stringify(dex)); //on stock dex dans la mémoire du navigateur pour pouvoir l'appeler plus tard dans le code. à chaque fois que la fonction est utilsiée on écrase le dex précédemment contenu dans le navigateur
    }
    if (row >5 && col >1){
        let vst = ['','','',''];
        
        for (let p = 0; p<vst.length; p++) 
        {
            let cc = 0;
            let u = rand((row*3)-1);
            for (let mm = 0; mm < 4; mm++){
                if (u == vst[mm]){ p-=1; cc = 1;}
            }
            if (cc == 0) {vst[p] = u;}
        }
        
        let pion = document.getElementById('pion');
        let pieces = document.getElementsByClassName('section');
        for (let r = 0; r < vst.length; r++) { 
            let q =vst[r];
            let cln = pion.cloneNode(true);
            pieces[q].appendChild(cln);
            pieces[q].children[0].style.display = 'block';
            pieces[q].children[0].id = 'pion'+r;
        }
    }
}

function a(pos) {
    f("range");
    let gri = document.getElementsByClassName('section');
	AddClass(pos, 'active');

    let dex = JSON.parse(localStorage.getItem("index"));
    let col = Number(document.getElementById("col").value);
    let row = Number(document.getElementById("row").value);
    let tot = (col * row) - 1, min = dex[pos][0], max = dex[pos][1];
    
	AddClass(pos, 'range');
	aSupB(pos - 1, min, 'range');
	aInfB(pos + 1, max, 'range');
	aSupB(pos - col, 0, 'range');
	aInfB(pos + col, tot, 'range');
    
} //dessine une portée de 1 autour de la case active

function b(pos) {
    for (let k = 0; k < gri.length; k++) {gri[k].classList.remove('range');}
    f("range");
	AddClass(pos, 'active');

    let dex = JSON.parse(localStorage.getItem("index"));
    let col = Number(document.getElementById("col").value);
    let row = Number(document.getElementById("row").value);
    let tot = (col * row) - 1, min = dex[pos][0], max = dex[pos][1];
	

	
	AddClass(pos, 'range');
	
	aSupB(pos - 1, min, 'range');
	aSupB(pos - 2, min, 'range');
	aInfB(pos + 1, max, 'range');
	aInfB(pos + 2, max, 'range');
	aSupB(pos - col, 0, 'range');
	aSupB(pos - col*2, 0, 'range');
	aInfB(pos + col, tot, 'range');
    aInfB(pos + col*2, tot, 'range');
	if (pos+1-col <= max-col) {aSupB(pos+1-col, 0, 'range');}
	if (pos+1+col <= max+col) {aInfB(pos+1+col, tot, 'range');}
	if (pos-1-col >= min-col) {aSupB(pos-1-col, 0, 'range');}
	if (pos-1+col >= min+col) {aInfB(pos-1+col, tot, 'range');}
} //dessine une portée de 2 autour de la case active

function f(gris) {
   pos= null;
    for (let k = 0; k < gri.length; k++) {gri[k].classList.remove(gris);}
}

function z (pos){
    f("active");
    AddClass(pos, 'active');
}

function zi (pos){
    if(event.currentTarget.children.length>0) 
    {
        pion = event.currentTarget.children[0];
        f('active'); f('range');
        event.currentTarget.classList += ' active';
    }
    else if (event.currentTarget.classList.contains('range'))
    {
        event.currentTarget.appendChild(pion);
        f('active'); f('range');
    }
}

function g(a, b, c){ //pas important
//fonctionnement des onglets du menu
    let tabi = document.getElementsByClassName(b);
    let taba = document.getElementsByClassName(c);
    for (i=0; i<tabi.length; i++){
        tabi[i].style.border = '1px solid gray';
        tabi[i].style.borderBottom = '2px solid black';
    }
    for (i=0; i<taba.length; i++){
        if (i == a){taba[i].style.display = "block";}
        else {taba[i].style.display = "none";}
        
    }
    tabi[a].style.border = '2px solid black';
    tabi[a].style.borderBottom = '2px solid white';
}

function h(rrr){
    for (let i = 0; i <= gri.length - 1; i++) {
        if (gri[i].classList.contains("active")) {
           pos= i;
            break;
        }
    }
    switch (rrr){
        case 1:
        a(pos);
        break;
        case 2:
        b(pos);
        break;
    }
}

function rand(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function ifChild(a)
{
    if (gri[a].children.length>0) return 1;
    else return 0;
}
function AddClass(a,b)
{
    gri[a].classList.add(b);
}
function aSupB(a,b,c,d)
{
    if (a >= b) { if (ifChild(a)){} else {AddClass(a,c);} }
}
function aInfB(a,b,c,d)
{
    if (a <= b) { if (ifChild(a)){} else {AddClass(a,c);} }
}

