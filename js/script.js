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
        etiqueta.id = "etiqueta";
        etiqueta.className = (this.aluno.pegarSituacao() == "Aprovado" ? "verde" : 
                            this.aluno.pegarSituacao() == "Recuperação" ? "amarelo" : "vermelho");
        nome.innerHTML = "Nome do aluno: " + this.aluno.pegarNome();
        nome.appendChild(etiqueta);
        notas.innerText = "Notas: " + this.aluno.pegarNotas();
        media.innerText = "Média: " + this.aluno.pegarMedia();
        situacao.innerText = "Situação: " + this.aluno.pegarSituacao();

        div.appendChild(nome);
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
    }else if(nota1 == "" || nota1 == NaN){
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
    alert("Aluno cadastrado!");

    document.getElementById("nome").value = "";
    document.getElementById("nota1").value = "";
    document.getElementById("nota2").value = "";
    document.getElementById("nota3").value = "";
    document.getElementById("nota4").value = "";
}

function mediasAbaixo(){
    let soma = 0;

    alunos.forEach(aluno => {
        soma += aluno.pegarMedia();
    });

    let mediaTurma = soma / alunos.length;

    document.getElementById("media-turma").innerText += ": " + mediaTurma.toFixed(2);
    alunos.forEach(aluno => {
        if(aluno.pegarMedia() < mediaTurma){
            let ulAlunos = document.getElementById("alunos-abaixo-media");
            let liAluno = document.createElement("li");

            liAluno.innerText = `${aluno.pegarNome()}: ${aluno.pegarMedia()}`
            
            ulAlunos.appendChild(liAluno);
        }
    });
}

function mudarAba(aba){
    let abaCadastrar = document.getElementById("abaCadastrar");
    let abaVerNotas = document.getElementById("abaVerNotas");
    let cardsAlunos = document.getElementById("cards-alunos");
    let mediaTurma = document.getElementById("media-turma");

    let buttonCadastrar = document.getElementById("button-cadastrar");
    let buttonExibir = document.getElementById("button-exibir");

    if(aba == "cadastrar"){
        buttonExibir.style.background = "#7d8187";
        buttonExibir.style.borderColor = "#7D8187";

        buttonCadastrar.style.background = "#2DC7ED";
        buttonCadastrar.style.borderColor = "#2DC7ED";

        abaCadastrar.style.display = "flex";
        abaVerNotas.style.display = "none";
        cardsAlunos.innerText = "";
        mediaTurma.innerText = "";
    } else {
        buttonCadastrar.style.background = "#7d8187";
        buttonCadastrar.style.borderColor = "#7d8187";

        buttonExibir.style.background = "#2DC7ED";
        buttonExibir.style.borderColor = "#2DC7ED";

        abaCadastrar.style.display = "none";
        abaVerNotas.style.display = "block";
        cardsAlunos.innerText = "";
        mediaTurma.innerText = "";

        alunos.forEach(aluno => {
            let card = new Card(aluno);

            card.mostrarCard();
        });

        mediasAbaixo();
    }
}