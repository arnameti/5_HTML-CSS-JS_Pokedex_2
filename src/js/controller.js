import * as model from './model';
import pokemonView from './view/pokemonView';

const controlPokemons = async function () {
  try {
    await model.loadPokemons();

    model.fetchBookmarks();

    pokemonView.render(model.state.pokemons);
  } catch (error) {
    console.error(error);
  }
};

const controlAutoCompletion = function (query) {
  pokemonView.render(model.searchPokemon(query));
};

const controlFavourites = function (id) {
  model.bookmarkPokemon(id);
  pokemonView.render(model.state.pokemons);
};

const init = function () {
  pokemonView.addLoadHanlder(controlPokemons);
  pokemonView.addMouseEvent();
  pokemonView.addAutoComletion(controlAutoCompletion);
  pokemonView.showModalWindow();
  pokemonView.hideModalWindow();
  pokemonView.addToFavourites(controlFavourites);
};

init();
