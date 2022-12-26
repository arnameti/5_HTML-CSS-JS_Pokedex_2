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

const init = function () {
  pokemonView.addLoadHanlder(controlPokemons);
};

init();
