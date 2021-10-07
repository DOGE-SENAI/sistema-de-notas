var alunos = [];

class Aluno {
    constructor(nome, notas){
        this.nome = nome;
        this.notas = notas;
    }

    pegarNome(){
        return this.nome;
    }

    pegarNotas(){
        return this.notas;
    }

    pegarMedia(){
        let soma = 0;

        for(let x in this.notas){
            soma += this.notas[x];
        }

        let media = soma / 4;

        return media;
    }

    pegarSituacao(){
        let media = this.pegarMedia();

        return media >= 70 ? "Aprovado" : media >= 50 ? "Recuperação" : "Reprovado";
    }
}

class Card {

    constructor(aluno){
        this.aluno = aluno;
    }

    mostrarCard(){
        let div = document.createElement("div");
        let nome = document.createElement("h4");
        let etiqueta = document.createElement("span");
        let notas = document.createElement("h5");
        let media = document.createElement("h5");
        let situacao = document.createElement("h5");

        div.className = "info-aluno";
        nome.innerText = "Nome do aluno: " + this.aluno.pegarNome();
        etiqueta.id = "etiqueta";
        notas.innerText = "Notas: " + this.aluno.pegarNotas();
        media.innerText = "Média: " + this.aluno.pegarMedia();
        situacao.innerText = "Situação: " + this.aluno.pegarSituacao();

        div.appendChild(nome);
        div.appendChild(etiqueta);
        div.appendChild(notas);
        div.appendChild(media);
        div.appendChild(situacao);

        let cardsAlunos = document.getElementById("cards-alunos");

        cardsAlunos.appendChild(div);
    }
}

function verificar(){
    let nome = document.getElementById("nome").value;
    let nota1 = document.getElementById("nota1").value;
    let nota2 = document.getElementById("nota2").value;
    let nota3 = document.getElementById("nota3").value;
    let nota4 = document.getElementById("nota4").value;

    if(nome == ""){
        alert("O nome não pode ser vazio!");
    }

    if(nota1 == "" || nota1 == NaN){
        alert("A nota do primeiro bimestre é inválida!");
    }else if(nota2 == "" || nota2 == NaN){
        alert("A nota do segundo bimestre é inválida!");
    }else if(nota3 == "" || nota3 == NaN){
        alert("A nota do terceiro bimestre é inválida!");
    }else if(nota4 == "" || nota4 == NaN){
        alert("A nota do quarto bimestre é inválida!");
    }else{
        nota1 = Number.parseFloat(nota1);
        nota2 = Number.parseFloat(nota2);
        nota3 = Number.parseFloat(nota3);
        nota4 = Number.parseFloat(nota4);

        const notas = [nota1, nota2, nota3, nota4];
        cadastrar(nome, notas);
    }
}

function cadastrar(nome, notas){
    alunos.push(new Aluno(nome, notas));
}

function mudarAba(aba){
    let abaCadastrar = document.getElementById("abaCadastrar");
    let abaVerNotas = document.getElementById("abaVerNotas");
    let cardsAlunos = document.getElementById("cards-alunos");

    if(aba == "cadastrar"){
        abaCadastrar.style.display = "block";
        abaVerNotas.style.display = "none";
        cardsAlunos.innerText = "";
    } else {
        abaCadastrar.style.display = "none";
        abaVerNotas.style.display = "block";
        cardsAlunos.innerText = "";

        alunos.forEach(aluno => {
            let card = new Card(aluno);

            card.mostrarCard();
        })
    }
}