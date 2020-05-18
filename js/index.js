window.addEventListener("load", () => {
    var board = document.querySelector("#quadro");
    var jogadas = 0;
    var quadro = [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"]
    ];
    var colunas = [
        [quadro[0][0], quadro[1][0], quadro[2][0]],
        [quadro[0][1], quadro[1][1], quadro[2][1]],
        [quadro[0][2], quadro[1][2], quadro[2][2]]
    ];
    var diagonais = [
        [quadro[0][0], quadro[1][1], quadro[2][2]],
        [quadro[0][2], quadro[1][1], quadro[2][0]]
    ];
    var botoes = document.querySelectorAll("button");
    var btnsDisponiveis = [];
    botoes.forEach(botao => {
        botao.addEventListener("click", btnPress);
        if (botao.innerHTML == "-") {
            btnsDisponiveis.push(botao);
        }
    });
    function btnPress(btn) {
        if (btn.target.innerHTML == "-" && btn.target.innerHTML != "o") {
            btn.target.classList.add("activo");
            btn.target.innerHTML = "x";
            jogadas++;
            updateQuadro();
            setTimeout(() => {
                if (ganhouOuPerdeu()) {
                    alert("ganhou");
                    reset();
                } else if (ganhouOuPerdeu("o")) {
                    alert("perdeu");
                    reset();
                } else if (jogadas == 9) {
                    alert("empate");
                    reset();
                }
            }, 100);

            if (jogadas < 9) {
                board.classList.add("scale");
                setTimeout(() => {
                    board.classList.remove("scale");
                }, 500);
                jogar();
            }
        }
    }
    function updateQuadro() {
        botoes.forEach((botao, pos) => {
            if (pos > 5) {
                quadro[2][pos - 6] = botao.innerHTML;
            } else if (pos > 2) {
                quadro[1][pos - 3] = botao.innerHTML;
            } else {
                quadro[0][pos] = botao.innerHTML;
            }

            if (botao.innerHTML != "-") {
                btnsDisponiveis[pos] = null;
            }
        });

        colunas = [
            [quadro[0][0], quadro[1][0], quadro[2][0]],
            [quadro[0][1], quadro[1][1], quadro[2][1]],
            [quadro[0][2], quadro[1][2], quadro[2][2]]
        ];

        diagonais = [
            [quadro[0][0], quadro[1][1], quadro[2][2]],
            [quadro[0][2], quadro[1][1], quadro[2][0]]
        ];
        debug();
    }
    function ganhouOuPerdeu(c = "x") {
        for (let i = 0; i < quadro.length; i++) {
            let col = quadro[i];
            if (col.every(x => x == c)) {
                return true;
            }
        }
        for (let i = 0; i < colunas.length; i++) {
            let col = colunas[i];
            if (col.every(x => x == c)) {
                return true;
            }
        }
        for (let i = 0; i < diagonais.length; i++) {
            let col = diagonais[i];
            if (col.every(x => x == c)) {
                return true;
            }
        }
        return false;
    }
    function jogar() {
        let disponiveis = btnsDisponiveis.filter(x => x != null);
        let btn = disponiveis[randInt(0, disponiveis.length - 1)];
        console.log(btnsDisponiveis);
        btn.innerHTML = "o";
        jogadas++;
        btn.classList.add("comp");
        updateQuadro();
    }
    function reset() {
        jogadas = 0;
        quadro = [
            ["-", "-", "-"],
            ["-", "-", "-"],
            ["-", "-", "-"]
        ];
        btnsDisponiveis = [];
        botoes.forEach(botao => {
            botao.innerHTML = "-";
            botao.classList.remove("activo", "comp");
            if (botao.innerHTML == "-") {
                btnsDisponiveis.push(botao);
            }
        });
        updateQuadro();
    }
    function randInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function debug() {
        console.clear();
        console.log("Quadro");
        for (let i = 0; i < quadro.length; i++) {
            console.log(quadro[i]);
        }
        console.log("colunas");
        for (let i = 0; i < colunas.length; i++) {
            console.log(colunas[i]);
        }
        console.log("diagonais");
        for (let i = 0; i < diagonais.length; i++) {
            console.log(diagonais[i]);
        }
    }
});
