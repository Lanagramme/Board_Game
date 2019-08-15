var gri = getClass('section');

function creer() {
    $('#btn-create').html('New Layout!');
    let act = "", pos = 0, dex = [];
    prow = getID("row");
    pcol = getID("col");
    let row = Number(prow.value);
    let col = Number(pcol.value);
    
    if (isNaN(col) || isNaN(row)) {alert("Veuillez entrer des valeurs numériques.");}
    else if (col == 0 || row == 0) {alert("Veuillez entrer des valeurs positives.")}
    else {
            prow.setAttribute("disabled", "");
            pcol.setAttribute("disabled", "");
            generate()
    }
}

function generate(){
    let act = "", pos = 0, dex = [];
    let row = Number(prow.value);
    let col = Number(pcol.value);
        
    let max = col - 1,  min = 0;
    act += "<table>"; 

    for (i = 0; i < row; i++) {
        act += "<tr>";
        for (j = 0; j < col; j++) {
            act += "<td class='section' onclick='zi(" + pos + ")'></td>";
            dex.push([min, max]);
            pos++;
        } act += "</tr>"; max += col; min += col;
    } act += "</table>";

    getID('board').innerHTML = act;
    localStorage.setItem("index", JSON.stringify(dex));

    if (row >5 && col >1){
        vst = repartition();
        let pion = getID('pion');
        let pieces = getClass('section');
        
        for (let r = 0; r < vst.length; r++) {
            let q =vst[r];
            let cln = pion.cloneNode(true);
            
            pieces[q].appendChild(cln);
            pieces[q].children[0].style.display = 'block';
            pieces[q].children[0].id = 'pion'+r;
            $('#pion'+r).addClass('rouge');
            $('#pion'+r).parent().css("border-color","#ED5565");
        }
        
        vst = repartition();
        p = 0;
        
        for (i = pieces.length - 1; i >= 0; i--) {
            r = 0;
            for (z = 0; z <vst.length; z++){
                if (p == vst[z]){
                    
                    let cln = pion.cloneNode(true);
                    pieces[i].appendChild(cln);
                    pieces[i].children[0].style.display = 'block';
                    pieces[i].children[0].id = 'pion'+(r+4);
                    $('#pion'+(r+4)).addClass('bleu');
                }
                r++;
            }
            p++;
        }
    }    
}

function a(pos) {
    f("range");
	addClass(pos, 'active');

    let dex = JSON.parse(localStorage.getItem("index"));
    let col = Number(getID("col").value);
    let row = Number(getID("row").value);
    let tot = (col * row) - 1, min = dex[pos][0], max = dex[pos][1];
    
	addClass(pos, 'range');
    
    aoe(pos, col, min, max, tot);
    
} //dessine une portée de 1 autour de la case active

function b(pos) {
    for (let k = 0; k < gri.length; k++) {gri[k].classList.remove('range');}
    f("range");
	addClass(pos, 'active');

    let dex = JSON.parse(localStorage.getItem("index"));
    let col = Number(getID("col").value);
    let row = Number(getID("row").value);
    let tot = (col * row) - 1, min = dex[pos][0], max = dex[pos][1];
	

	
	addClass(pos, 'range');
    
    range(pos, col, min, max, tot);
    
    range(pos - 1, col, min, max, tot);
    range(pos + 1, col, min, max, tot);
    range(pos - col, col, min - col, max - col, tot);
    range(pos + col, col, min + col, max + col, tot);
    
    
} //dessine une portée de 2 autour de la case active

function b2(pos) {
    for (let k = 0; k < gri.length; k++) {gri[k].classList.remove('range');}
    f("range");
	addClass(pos, 'active');

    let dex = JSON.parse(localStorage.getItem("index"));
    let col = Number(getID("col").value);
    let row = Number(getID("row").value);
    let tot = (col * row) - 1, min = dex[pos][0], max = dex[pos][1];
	

	
	addClass(pos, 'range');
    
    range(pos, col, min, max, tot);
    
    range(pos - 1, col, min, max, tot);
    range(pos + 1, col, min, max, tot);
    range(pos - col, col, min - col, max - col, tot);
    range(pos - col - 1, col, min - col, max - col, tot);
    range(pos - col + 1, col, min - col, max - col, tot);
    range(pos + col, col, min + col, max + col, tot);
    range(pos + col - 1, col, min + col, max + col, tot);
    range(pos + col +1 , col, min + col, max + col, tot);
    
    range(pos - 2, col, min, max, tot);
    range(pos + 2, col, min, max, tot);
    range(pos - col*2, col, min - col*2, max - col*2, tot);
    range(pos + col*2, col, min + col*2, max + col*2, tot);
    
    
} //dessine une portée de 3 autour de la case active

function f(gris) {
   pos= null;
    for (let k = 0; k < gri.length; k++) {gri[k].classList.remove(gris);}
}

function z (pos){
    f("active"); addClass(pos, 'active');
}

function zi (pos){
    if(event.currentTarget.children.length>0) {
        if (event.currentTarget.firstElementChild.classList.contains('rouge')){
            if($('#tour').val() == 'rouge'){
                pion = event.currentTarget.children[0];
                f('active'); f('range');
                event.currentTarget.classList += ' active';
            }
        }
            else if(event.currentTarget.firstElementChild.classList.contains('bleu')){
                if($('#tour').val() == 'bleu'){
                pion = event.currentTarget.children[0];
                f('active'); f('range');
                event.currentTarget.classList += ' active';
                }
        }  
    }
    else if (event.currentTarget.classList.contains('range')) {
        event.currentTarget.appendChild(pion);
        f('active'); f('range');
    }
    if($('#tour').val() == 'bleu' ){
       $('.section').css("border-color", "white");
       $('.bleu' ).parent().css("border-color","#4FC1E9");}
    if($('#tour').val() == 'rouge'){
       $('.section').css("border-color", "white");
       $('.rouge').parent().css("border-color","#ED5565");
    }
}

function g(a, b, c){ //pas important
//fonctionnement des onglets du menu
    let tabi = getClass(b);
    let taba = getClass(c);
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
        case 3:
        b2(pos);
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
function addClass(a,b)
{
    gri[a].classList.add(b);
}
function aSupB(a,b,c,d)
{
    if (a >= b) { if (ifChild(a)){} else {addClass(a,c);} }
}
function aInfB(a,b,c,d)
{
    if (a <= b) { if (ifChild(a)){} else {addClass(a,c);} }
}

function tour()
{
    if ($("#tour").val() == "rouge") 
        {$("#tour").val("bleu");}
    else {$("#tour").val("rouge");}
    f('active'); f('range');
}

    
function Joueur(a,b,c,d) {
    this.pion1 = a,
    this.pion2 = b,
    this.pion3 = c,
    this.pion4 = d
}

function Pion(a){
    this.pv = 10,
    this.pm = 3,
    this.id = a
}
    
function repartition(){
    let vst = [-1,-1,-1,-1];
    for (let p = 0; p<vst.length; p++) 
    {
        let cc = 0;
        let u = rand(col.value*3);
        for (let mm = 0; mm < 4; mm++)
        {
            if (u == vst[mm]){ p-=1; cc = 1;}
        }
        if (cc == 0) {vst[p] = u;}
    }
    return vst;
}
    
function getClass(a){
    return document.getElementsByClassName(a);
}    

function getID(a){
    return document.getElementById(a);
}

function range(pos, col, min, max, tot){
    if(typeof(gri[pos]) != 'undefined'){
        if(gri[pos].classList.contains('range')||gri[pos].classList.contains('active')){
            aSupB(pos - 1, min, 'range');
            aInfB(pos + 1, max, 'range');
            aSupB(pos - col, 0, 'range');
            aInfB(pos + col, tot, 'range');
        }
    }
}

function aoe(pos, col, min, max, tot){
    if(typeof(gri[pos]) != 'undefined'){
        if(gri[pos].classList.contains('aoe')||gri[pos].classList.contains('active')){
            aSupB(pos - 1, min, 'aoe');
            aInfB(pos + 1, max, 'aoe');
            aSupB(pos - col, 0, 'aoe');
            aInfB(pos + col, tot, 'aoe');
        }
    }
}

function resetBoard(){
    $('#btn-create').html('Generate');
    prow = getID("row");
    prow.removeAttribute("disabled");
    prow.value = 0;
    pcol = getID("col");
    pcol.removeAttribute("disabled");
    pcol.value = 0;
    generate();  
}