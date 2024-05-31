const tipoCor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };
  const url = " https://pokeapi.co/api/v2/pokemon/";
  const card = document.getElementById("card");
  const btn = document.getElementById("btn");
  
  let getAPI = () => {
    let id = Math.floor(Math.random() * 150) + 1;
    const finalUrl = url + id;
    fetch(finalUrl)
      .then((response) => response.json())
      .then((data) => {
        gerarCard(data);
      });
  };

  
  let gerarCard = (data) => {
    console.log(data);
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeNome = data.name[0].toUpperCase() + data.name.slice(1);
    const statAtaque = data.stats[1].base_stat;
    const statDefesa = data.stats[2].base_stat;
    const statVelocidade = data.stats[5].base_stat;
  
    const fundoCor = tipoCor[data.types[0].type.name];
    console.log(fundoCor);
    card.innerHTML = `
          <p class="hp">
            <span>HP</span>
              ${hp}
          </p>
          <img src=${imgSrc} />
          <h2 class="poke-name">${pokeNome}</h2>
          <div class="types">
           
          </div>
          <div class="stats">
            <div>
              <h3>${statAtaque}</h3>
              <p>Ataque</p>
            </div>
            <div>
              <h3>${statDefesa}</h3>
              <p>Defesa</p>
            </div>
            <div>
              <h3>${statVelocidade}</h3>
              <p>Velocidade</p>
            </div>
          </div>
    `;
    tipos(data.types);
    estiloCard(fundoCor);
  };
  let tipos = (types) => {
    types.forEach((item) => {
      let span = document.createElement("SPAN");
      span.textContent = item.type.name;
      document.querySelector(".types").appendChild(span);
    });
  };
  let estiloCard = (color) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
    card.querySelectorAll(".types span").forEach((tipoCor) => {
      tipoCor.style.backgroundColor = color;
    });
  };
  
  btn.addEventListener("click", getAPI);
  window.addEventListener("load", getAPI);