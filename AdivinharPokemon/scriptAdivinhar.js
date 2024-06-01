const questions = [
  {
    imagem: "Alakazam.jpg",
    opcao_correta: "Alakazam",
  },
  {
    imagem: "Arcanine.jpg",
    opcao_correta: "Arcanine",
  },
  {
    imagem: "Bulbasaur.jpg",
    opcao_correta: "Bulbasaur",
  },
  {
    imagem: "Cubone.jpg",
    opcao_correta: "Cubone",
  },
  {
    imagem: "Ditto.jpg",
    opcao_correta: "Ditto",
  },
  {
    imagem: "Gloom.jpg",
    opcao_correta: "Gloom",
  },
  {
    imagem: "Gyarados.jpg",
    opcao_correta: "Gyarados",
  },
  {
    imagem: "Hitmonlee.jpg",
    opcao_correta: "Hitmonlee",
  },
  {
    imagem: "Horsea.jpg",
    opcao_corretan: "Horsea",
  },
  {
    imagem: "Koffing.jpg",
    opcao_correta: "Koffing",
  },
  {
    imagem: "Mewtwo.jpg",
    opcao_correta: "Mewtwo",
  },
  {
    imagem: "Seaking.jpg",
    opcao_correta: "Seaking",
  },
  {
    imagem: "Tauros.jpg",
    opcao_correta: "Tauros",
  },
  {
    imagem: "Venonat.jpg",
    opcao_correta: "Venonat",
  },
  {
    imagem: "Victreebe.jpg",
    opcao_correta: "Victreebe",
  },
  {
    imagem: "eevee.jpg",
    opcao_correta: "Eevee",
  },
];

const opcoesArray = [
  "Alakazam",
  "Arcanine",
  "Bulbasaur",
  "Cubone",
  "Ditto",
  "Gloom",
  "Gyarados",
  "Hitmonlee",
  "Horsea",
  "Koffing",
  "Mewtwo",
  "Pikachu",
  "Seaking",
  "Tauros",
  "Venonat",
  "Victreebe",
  "eevee",
  "Ivysaur",
  "Venusaur",
  "Charmander",
  "Charmeleon",
  "Charizard",
  "Squirtle",
  "Wartortle",
  "Blastoise",
  "Caterpie",
  "Metapod",
  "Butterfree",
  "Weedle",
  "Kakuna",
  "Beedrill",
  "Pidgey",
  "Pidgeotto",
  "Pidgeot",
  "Rattata",
  "Raticate",
  "Spearow",
  "Fearow",
  "Ekans",
  "Arbok",
];
const container = document.querySelector(".container");
const gameContainer = document.querySelector(".game-container");
const comecarBotao = document.getElementById("start");
const pontosContainer = document.querySelector(".score-container");
const pontosJogador = document.getElementById("user-score");
let timer = document.getElementsByClassName("timer")[0];
let proxBtn;
let pontos, perguntaAtual, questoesFinais;
let contagem,
  contador = 11;

const gerarValorAleatorio = (array) =>
  array[Math.floor(Math.random() * array.length)];

const embaralhaAleatorio = (array) => array.sort(() => 0.5 - Math.random());


const comecarJogo = () => {
  pontosContainer.classList.add("hide");
  gameContainer.classList.remove("hide");
  questoesFinais = responder();
  pontos = 0;
  perguntaAtual = 0;
  cardGenerator(questoesFinais[perguntaAtual]);
};


const timerDisplay = () => {
  contagem = setInterval(() => {
    contador -= 1;
    timer.innerHTML = `<span>Tempo Restante: </span>${contador}s`;
    if (contador == 0) {
      clearInterval(contagem);
      proximaPergunta();
    }
  }, 1000);
};


const criaOpcao = (opcao_correta) => {
  let arr = [];
  arr.push(opcao_correta);
  let contadorOpcoes = 1;
  while (contadorOpcoes < 4) {
    let valorAleatorio = gerarValorAleatorio(opcoesArray);
    if (!arr.includes(valorAleatorio)) {
      arr.push(valorAleatorio);
      contadorOpcoes += 1;
    }
  }
  return arr;
};


const responder = () => {
  let questoesContador = 0;
  let questoesEscolhidas = [];
  let loteQuestoes = [];
 
  while (questoesContador < 5) {
    let valorAleatorio = gerarValorAleatorio(questions);
    let index = questions.indexOf(valorAleatorio);
    if (!questoesEscolhidas.includes(index)) {
      loteQuestoes.push(valorAleatorio);
      questoesEscolhidas.push(index);
      questoesContador += 1;
    }
  }
  return loteQuestoes;
};

const checker = (e) => {
  let escolhaJogador = e.target.innerText;
  let opcoes = document.querySelectorAll(".option");
  if (escolhaJogador === questoesFinais[perguntaAtual].opcao_correta) {
    e.target.classList.add("correct");
    pontos++;
  } else {
    e.target.classList.add("incorrect");
    opcoes.forEach((element) => {
      if (element.innerText == questoesFinais[perguntaAtual].opcao_correta) {
        element.classList.add("correct");
      }
    });
  }

  clearInterval(contagem);
  opcoes.forEach((element) => {
    element.disabled = true;
  });
};

const proximaPergunta = (e) => {
  perguntaAtual += 1;
  if (perguntaAtual == questoesFinais.length) {
    gameContainer.classList.add("hide");
    pontosContainer.classList.remove("hide");
    comecarBotao.innerText = `Reiniciar`;
    pontosJogador.innerHTML =
      "Sua pontuação foi " + pontos + " de " + perguntaAtual;
    clearInterval(contagem);
  } else {
    cardGenerator(questoesFinais[perguntaAtual]);
  }
};

const cardGenerator = (cardObject) => {
  const { imagem, opcao_correta } = cardObject;
  let opcoes = embaralhaAleatorio(criaOpcao(opcao_correta));
  container.innerHTML = `<div class="quiz">
  <p class="num">
  ${perguntaAtual + 1}/5
  </p>
  <div class="questions">
    <img class="pokemon-image" src="${imagem}"/>
  </div>
    <div class="options">
    <button class="option" onclick="checker(event)">${opcoes[0]}
    </button>
    <button class="option" onclick="checker(event)">${opcoes[1]}
    </button>
    <button class="option" onclick="checker(event)">${opcoes[2]}
    </button>
    <button class="option" onclick="checker(event)">${opcoes[3]}
    </button>
    </div>

    <div class="nxt-btn-div">
        <button class="next-btn" onclick="proximaPergunta(event)">Próxima</button>
    </div>

  </div>`;

  contador = 11;
  clearInterval(contagem);

  timerDisplay();
};

comecarBotao.addEventListener("click", comecarJogo);

function voltarHome(){
  window.history.back();
}