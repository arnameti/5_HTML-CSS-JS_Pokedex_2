import * as model from './model';
import pokemonView from './view/pokemonView';

const controlPokemons = async function () {
  try {
    await model.loadPokemons();
  } catch (error) {
    console.error(error);
  }
};

const init = function () {
  pokemonView.addLoadHandler(controlPokemons);
};

init();
