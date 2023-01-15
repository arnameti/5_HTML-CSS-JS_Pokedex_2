export const state = {
  pokemons: [],
  bookmarks: [],
};

export const loadPokemons = async function () {
  const res = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0'
  );

  if (!res.ok) throw new Error(`${res.status}: API not found`);

  const data = await res.json();

  const pokemons = data.results.map(async r => await fetch(r.url));

  const resPokemons = await Promise.all(pokemons);

  resPokemons.forEach(r => {
    if (!r.ok) throw new Error(`${r.status}: Pokemon not found`);
  });

  const dataPokemons = await Promise.all(resPokemons.map(r => r.json()));

  console.log(dataPokemons);

  state.pokemons = dataPokemons.map(pokemon => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other.home.front_default,
      bookmarked: false,
      type: pokemon.types[0].type.name,
      height: pokemon.height * 10,
      weight: pokemon.weight / 10,

      type1: pokemon.types[0].type.name,
      type2: pokemon.types[1]?.type.name,
    };
  });

  console.log(state.pokemons);
};

export const searchPokemon = function (query) {
  return state.pokemons.filter(pokemon => {
    if (pokemon.name.startsWith(query.toLowerCase())) return pokemon;
  });
};

const pushOrDeleteBookmark = function (pokemon, id) {
  if (pokemon.bookmarked) {
    state.bookmarks.push(pokemon);
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
  } else {
    const index = state.bookmarks.findIndex(pokemon => pokemon.id === id);
    state.bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
  }
};

export const bookmarkPokemon = function (id) {
  const pokemon = state.pokemons.find(pokemon => pokemon.id === id);

  pokemon.bookmarked = pokemon.bookmarked ? false : true;

  pushOrDeleteBookmark(pokemon, id);
};

export const fetchBookmarks = function () {
  if (localStorage.getItem('bookmarks'))
    state.bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  if (state.bookmarks.length !== 0) {
    state.bookmarks.forEach(bookmark => {
      // prettier-ignore
      const pokemon = state.pokemons.find(pokemon => pokemon.id === bookmark.id);

      pokemon.bookmarked = true;
    });
  }
};

export const findPokemon = function (id) {
  return state.pokemons.find(pokemon => pokemon.id === id);
};

export const findPrevPokemon = function (id) {
  const prevPokemon = state.pokemons.find(pokemon => pokemon.id === id - 1);
  console.log(prevPokemon);
  return prevPokemon;
};

export const findNextPokemon = function (id) {
  const nextPokemon = state.pokemons.find(pokemon => pokemon.id === id + 1);
  console.log(nextPokemon);
  return nextPokemon;
};
