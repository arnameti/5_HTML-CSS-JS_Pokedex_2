import * as model from './model';
import pokemonView from './view/pokemonView';

const controlPokemons = async function () {
  try {
    await model.loadPokemons();

    pokemonView.render(model.state.pokemons);
  } catch (error) {
    console.error(error);
  }
};

const controlAutoCompletion = function (query) {
  pokemonView.render(model.searchPokemon(query));
};

const init = function () {
  pokemonView.addLoadHanlder(controlPokemons);
  pokemonView.addMouseEvent();
  pokemonView.addAutoComletion(controlAutoCompletion);
  pokemonView.showModalWindow();
  pokemonView.hideModalWindow();
};

init();
