import * as model from './model';
import pokemonView from './view/pokemonView';

const controlPokemons = async function () {
  try {
    await model.loadPokemons();

    model.fetchBookmarks();

    pokemonView.renderBookmarkIcon(model.state.bookmarks);

    pokemonView.renderPokemons(model.state.pokemons);
  } catch (error) {
    console.error(error);
  }
};

const controlAutoCompletion = function (query) {
  pokemonView.renderPokemons(model.searchPokemon(query));
};

const controlFavourites = function (id) {
  model.bookmarkPokemon(id);
  model.fetchBookmarks();
  pokemonView.renderBookmarkIcon(model.state.bookmarks);
  pokemonView.renderPokemons(model.state.pokemons);
};

const controlModalWindow = function (id) {
  const currentPokemon = model.findPokemon(id);
  pokemonView.renderModalWindowContent(currentPokemon);

  const prevPokemon = model.findPrevPokemon(id);
  const nextPokemon = model.findNextPokemon(id);
  pokemonView.renderModalWindowHeader(prevPokemon, nextPokemon);
};

const init = function () {
  pokemonView.addLoadHanlder(controlPokemons);
  pokemonView.addMouseEvent();
  pokemonView.addAutoComletion(controlAutoCompletion);
  pokemonView.showModalWindow(controlModalWindow);
  pokemonView.hideModalWindow();
  pokemonView.addToFavourites(controlFavourites);
};

init();
