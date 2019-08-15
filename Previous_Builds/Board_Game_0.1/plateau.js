var gri = document.getElementsByClassName('section');

function creer() {

    let act = "";
    let pos = 0;
    let dex = [];

    let col = Number(document.getElementById("col").value);
    let row = Number(document.getElementById("row").value);

    let max = col - 1;
    let min = 0;
    let tot = (col * row) - 1;

    for (i = 0; i < row; i++) {
        for (j = 0; j < col; j++) {
            act += "<div class='section' onclick='a(" + pos + ", " + col + ", " + tot + ", " + min + ", " + max + ")'></div>"; //onmouseout='f()';
            dex.push([min, max]);
            pos++;
        }
        act += "<div class='section-end'></div>";
        max += col;
        min += col;
    }
    document.getElementById('board').innerHTML = act;
    localStorage.setItem("index", JSON.stringify(dex));
    console.log(dex[tot][0]);
}

function a(pos, col, tot, min, max) {
    f();

    gri[pos].style.backgroundColor = 'red';
    gri[pos].className += " active";

    if (pos - 1 >= min) { gri[pos - 1].style.backgroundColor = 'red'; }

    if (pos + 1 <= max) { gri[pos + 1].style.backgroundColor = 'red'; }

    if (pos - col >= 0) { gri[pos - col].style.backgroundColor = 'red'; }

    if (pos + col <= tot) { gri[pos + col].style.backgroundColor = 'red'; }
}

function f() {
    for (k = 0; k < gri.length; k++) {
        gri[k].style.backgroundColor = '#f1f3f5';
        gri[k].className = 'section';
    }
}

document.addEventListener('keydown', function (event) {

    let col1 = Number(document.getElementById("col").value);
    let row1 = Number(document.getElementById("row").value);

    let dex = JSON.parse(localStorage.getItem("index"));
    let tot = (col1 * row1) - 1;
    let pos = 0;

    if (event.keyCode === 37) {
        for (let i = 0; i <= gri.length - 1; i++) {
            if (gri[i].classList.contains("active")) {
                pos = i;
                if (pos > dex[pos][0]) {
                    f();
                    a(pos - 1, col1, tot, dex[pos][0], dex[pos][1]);
                }
                break;
            }
        }
    } else if (event.keyCode === 39) {
        for (let i = 0; i <= gri.length - 1; i++) {
            if (gri[i].classList.contains("active")) {
                pos = i;
                if (pos < dex[pos][1]) {
                    f();
                    a(pos + 1, col1, tot, dex[pos][0], dex[pos][1]);
                }
                break;
            }
        }
    } else if (event.keyCode === 38) {
        for (let i = 0; i <= gri.length - 1; i++) {
            if (gri[i].classList.contains("active")) {
                pos = i;
                if (pos - col1 >= 0) {
                    f();
                    a(pos - col1, col1, tot, dex[pos][0] - col1, dex[pos][1] - col1);
                }
                break;
            }
        }
    } else if (event.keyCode === 40) {
        for (let i = 0; i <= gri.length - 1; i++) {
            if (gri[i].classList.contains("active")) {
                pos = i;
                if (pos + col1 <= tot) {
                    f();
                    a(pos + col1, col1, tot, dex[pos][0] + col1, dex[pos][1] + col1);
                }
                break;
            }
        }
    }
});