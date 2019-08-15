var gri = document.getElementsByClassName('section'); //variable globale qui contient le code html de toutes les cellules du tableau

function creer() { //crée le plateau

    let act = "", pos = 0, dex = []; 
    //act est la variable strig qui contient l'innerHTML du tableau
    //pos stoque de manière transitoire les indice de chaque case du tableau à sa création
    //dex est une variable tableau qui contiendra les indices, les min et les max (définis plus loin) de chaque case
    let col = Number(document.getElementById("col").value); //nombre de collones recu dans le form
    let row = Number(document.getElementById("row").value); //nombre de lignes recu dans le form

    if (isNaN(col) || isNaN(row)) {alert("Veuillez entrer des valeurs numériques.");} //protection anti idiots
    else {
        let max = col - 1,  min = 0; //min et max sont les valeur de la première et de la dernière case de la ligne active
        //mac = col - 1 car les valeur du tableau sont contenues dans une tableau Javascript dont la première case possède l'indice 0
        act += "<table>"; 

        for (i = 0; i < row; i++) { //à chaque tour de la boucle on ajoute une case au tableau en ajoutant <tr><td class='section' onclick='z(" + pos + ")'></td></tr> à la variable act pour chaque case
            act += "<tr>";
            for (j = 0; j < col; j++) {
                act += "<td class='section' onclick='zi(" + pos + ")'></td>"; // pos est l'indice de la case, il augmente à chaque tour. L'indice de la première case est 0
                dex.push([min, max]); //on ajoute le min et le max de la case actuelle à dans une nouvelle case du tableau
                pos++;//on augmente la valeur de pos de 1 afin que la case suivante aie l'indice suivant
            } //au sortir ce cette boucle on passe à la ligne suivante
            act += "</tr>";
            max += col; //on augmente les valeurs de min et max pour qu'il correspondent a la premire et à la derni_re case de la ligne suivante
            min += col;
        }
        act += "</table>"; //une fois toutes les lignes construites on ferma la <table> qui les contient

        document.getElementById('board').innerHTML = act; //on ajoute le code HTML stocké dans act à la page pour déssiner le tableau
        localStorage.setItem("index", JSON.stringify(dex)); //on stock dex dans la mémoire du navigateur pour pouvoir l'appeler plus tard dans le code. à chaque fois que la fonction est utilsiée on écrase le dex précédemment contenu dans le navigateur
    }
}

function a(pos) {
    for (let k = 0; k < gri.length; k++) {gri[k].classList.remove("range");}
    f("range");
    gri[pos].classList.add("active");

    let col = Number(document.getElementById("col").value);
    let row = Number(document.getElementById("row").value);
    let dex = JSON.parse(localStorage.getItem("index"));
    let tot = (col * row) - 1, min = dex[pos][0], max = dex[pos][1];

    gri[pos].classList.add("range");

    if (pos - 1 >= min) { gri[pos - 1].classList.add("range"); }
    if (pos + 1 <= max) { gri[pos + 1].classList.add("range"); }
    if (pos - col >= 0) { gri[pos - col].classList.add("range"); }
    if (pos + col <= tot) { gri[pos + col].classList.add("range"); }
} //dessine une portée de 1 autour de la case active

function b(pos) {
    for (let k = 0; k < gri.length; k++) {gri[k].classList.remove('range');}
    f("range");
    gri[pos].classList.add("active");

    let col = Number(document.getElementById("col").value);
    let row = Number(document.getElementById("row").value);
    let dex = JSON.parse(localStorage.getItem("index"));
    let tot = (col * row) - 1, min = dex[pos][0], max = dex[pos][1];

    gri[pos].classList.add("range");

    if (pos - 1 >= min) { gri[pos - 1].classList.add("range"); }
    if (pos - 2 >= min) { gri[pos - 2].classList.add("range"); }
    if (pos-1-col >= min-col && pos-1-col >= 0) { gri[pos-1-col].classList.add("range"); }
    if (pos-1+col >= min+col && pos-1+col <tot) { gri[pos-1+col].classList.add("range"); }

    if (pos + 1 <= max) { gri[pos + 1].classList.add("range"); }
    if (pos + 2 <= max) { gri[pos + 2].classList.add("range"); }
    if (pos+1-col <= max-col && pos+1-col >= 0) { gri[pos+1-col].classList.add("range"); }
    if (pos+1+col <= max+col && pos+1+col <=tot) { gri[pos+1+col].classList.add("range"); }

    if (pos - col >= 0) { gri[pos - col].classList.add("range"); }
    if (pos - col*2 >= 0) { gri[pos - col*2].classList.add("range"); }

    if (pos + col <= tot) { gri[pos + col].classList.add("range"); }
    if (pos + col*2 <= tot) { gri[pos + col*2].classList.add("range"); }
} //dessine une portée de 2 autour de la case active

function f(gris) {
    pos = null;
    for (let k = 0; k < gri.length; k++) {gri[k].classList.remove(gris);}
}

function z (pos){
    f("active");
    gri[pos].classList.add("active");
}

function zi (pos){
    f("active");
    f("range");
    gri[pos].classList.add("active");
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
            pos = i;
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

document.addEventListener('keydown', function (event) { //des qu'une touche est pressée

    let col = Number(document.getElementById("col").value);
    let row1 = Number(document.getElementById("row").value);
    let dex = JSON.parse(localStorage.getItem("index"));
    let tot = (col * row1) - 1, pos = 0; //tu connais déja tout ca

    if (event.keyCode === 37) { //si la touche flèche gauche est pressée
        for (let i = 0; i <= gri.length - 1; i++) { //on parcourt le tableau...
            if (gri[i].classList.contains("active")) { //...pour trouver la case active
                pos = i; //on donne à pos la valeur de la case active
                if (gri[pos - 1].classList.contains("range") && pos > dex[pos][0]) { //on vérifie le min de la case active et si la case précédente est bien dans la même ligne
                    z(pos - 1); //on envoie la nouvelle position de pos à la fonction qui la définiera comme case active
                }
                break;
            }
        }
    } else if (event.keyCode === 39) { //pareil pour la touche droite
        for (let i = 0; i <= gri.length - 1; i++) {
            if (gri[i].classList.contains("active")) {
                pos = i;
                if (gri[pos + 1].classList.contains("range") && pos < dex[pos][1]) {
                    z(pos + 1);
                }
                break;
            }
        }
    } else if (event.keyCode === 38) { //haut
        for (let i = 0; i <= gri.length - 1; i++) {
            if (gri[i].classList.contains("active")) {
                pos = i;
                if (pos - col >= 0) {
                    if (gri[pos - col].classList.contains("range")) {z(pos - col);}
                }
                break;
            }
        }
    } else if (event.keyCode === 40) { //et bas
        for (let i = 0; i <= gri.length - 1; i++) {
            if (gri[i].classList.contains("active")) {
                pos = i;
                if (pos + col <= tot) {
                    if (gri[pos + col].classList.contains("range")) {z(pos + col);}
                }
                break;
            }
        }
    } else if (event.keyCode === 70) {
        f('range');
    }
});
