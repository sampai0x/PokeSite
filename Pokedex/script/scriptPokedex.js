const pokemonNome = document.querySelector('.pokemon__name');
const pokemonNumero = document.querySelector('.pokemon__number');
const pokemonImagem = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonAnt = document.querySelector('.btn-prev');
const buttonProx = document.querySelector('.btn-next');

let pesquisaPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIresposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIresposta.status === 200) {
    const data = await APIresposta.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonNome.innerHTML = 'Loading...';
  pokemonNumero.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImagem.style.display = 'block';
    pokemonNome.innerHTML = data.name;
    pokemonNumero.innerHTML = data.id;
    pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    pesquisaPokemon = data.id;
  } else {
    pokemonImagem.style.display = 'none';
    pokemonNome.innerHTML = 'Não encontrado :c';
    pokemonNumero.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonAnt.addEventListener('click', () => {
  if (pesquisaPokemon > 1) {
    pesquisaPokemon -= 1;
    renderPokemon(pesquisaPokemon);
  }
});

buttonProx.addEventListener('click', () => {
  pesquisaPokemon += 1;
  renderPokemon(pesquisaPokemon);
});

renderPokemon(pesquisaPokemon);