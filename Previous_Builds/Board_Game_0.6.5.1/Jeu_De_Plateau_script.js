var gri = getClass('section');

function creer() {
    $('#btn-create').html('New Layout!');
    prow = getID("row");
    pcol = getID("col");
    let row = Number(prow.value);
    let col = Number(pcol.value);
    
    if (isNaN(col) || isNaN(row)) {alert("Veuillez entrer des valeurs numériques.");}
    else if (col == 0 || row == 0) {alert("Veuillez entrer des valeurs positives.")}
    else {
        prow.setAttribute("disabled", "");
        pcol.setAttribute("disabled", "");
        generate(row, col)
    }
}

function generate(row, col){
    let act = "", pos = 0, dex = [];
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
                } r++;
            } p++;
        }
    }    
}

function f(gris) {
    for (let k = 0; k < gri.length; k++) {gri[k].classList.remove(gris);}
}

function z (pos){
    f("active"); addClass(pos, 'active');
}

function zi (){
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
    else if($('#tour').val() == 'rouge'){
       $('.section').css("border-color", "white");
       $('.rouge').parent().css("border-color","#ED5565");
    }
}

function h(rrr, a){
    let pos = null;
    for (let i = 0; i <= gri.length - 1; i++) {
        if (gri[i].classList.contains("active")){ pos= i; break; }
    }
    
	addClass(pos, 'active');
    f("range");
    
    if (rrr > 0){
        selection('active', 'range', a);
        if (rrr > 1){
            selection('range', 'range', a);
            if (rrr > 2){
                selection('range', 'range', a);
            }
        }
    }
}

function rand(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function ifChild(a){
    if (gri[a].children.length>0) return 1;
    else return 0;
}
function addClass(a,b){
    gri[a].classList.add(b);
}
function aSupB(a,b,c,evite){
    if(evite) {if (a >= b) { if (ifChild(a)){} else {addClass(a,c);} }}
    else  {if (a >= b) {addClass(a,c);}}
}
function aInfB(a,b,c,evite){
    if(evite){if (a <= b) { if (ifChild(a)){} else {addClass(a,c);} }}
    else {if (a <= b) {addClass(a,c);}}   
}    
function getClass(a){
    return document.getElementsByClassName(a);
}
function getID(a){
    return document.getElementById(a);
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
    for(let p = 0; p<vst.length; p++) {
        let cc = 0;
        let u = rand(col.value*3);
        for(let mm = 0; mm < 4; mm++) {
            if (u == vst[mm]){p-=1; cc = 1;}
        }
        if (cc == 0){vst[p] = u;}
    }
    return vst;
}

function range(pos, a, b){
    if(typeof(gri[pos]) != 'undefined'){
        let col = Number(getID("col").value);
        let dex = JSON.parse(localStorage.getItem("index"));
        let tot = dex.length-1, min = dex[pos][0], max = dex[pos][1];
    
        if(gri[pos].classList.contains(a)||gri[pos].classList.contains('active')){
            aSupB(pos - 1  , min, a, b);
            aInfB(pos + 1  , max, a, b);
            aSupB(pos - col,   0, a, b);
            aInfB(pos + col, tot, a, b);
        }
    }
}

function selection(a, c, b){
    gri = getClass('section');
    sel = new Array();
    
    for (i=0; i<gri.length; i++){
        if (gri[i].classList.contains(a)){
            sel.push(i);
        }
    }
    for (i=0; i<gri.length; i++){ range(sel[i], c, b); }
}

function aoe(pos, col, min, max, tot){
    if(typeof(gri[pos]) != 'undefined'){
        if(gri[pos].classList.contains('aoe')||gri[pos].classList.contains('active')){
            aSupB(pos - 1  , min, 'aoe', 0);
            aInfB(pos + 1  , max, 'aoe', 0);
            aSupB(pos - col,   0, 'aoe', 0);
            aInfB(pos + col, tot, 'aoe', 0);
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

function tour(){
   if($("#tour").val() == "rouge"){
      $("#tour").val("bleu");}
   else {$("#tour").val("rouge");}
      f('active'); f('range');
   if($('#tour').val() == 'bleu' ){
      $('.section').css("border-color", "white");
      $('.bleu' ).parent().css("border-color","#4FC1E9");}
   else if($('#tour').val() == 'rouge'){
      $('.section').css("border-color", "white");
      $('.rouge').parent().css("border-color","#ED5565");
   }
}