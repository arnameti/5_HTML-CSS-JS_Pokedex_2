export const state = {
  pokemons: [],
};

export const loadPokemons = async function () {
  const res = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=450&offset=0'
  );

  if (!res.ok) throw new Error(`${res.status}: API not found`);

  const data = await res.json();

  const pokemons = data.results.map(async r => await fetch(r.url));

  const resPokemons = await Promise.all(pokemons);

  resPokemons.forEach(r => {
    if (!r.ok) throw new Error(`${r.status}: Pokemon not found`);
  });

  const dataPokemons = await Promise.all(resPokemons.map(r => r.json()));

  state.pokemons = dataPokemons.map(pokemon => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other.home.front_default,
      bookmarked: false,
      type: pokemon.types[0].type.name,
    };
  });
};

export const searchPokemon = function (query) {
  return state.pokemons.filter(pokemon => {
    if (pokemon.name.startsWith(query.toLowerCase())) return pokemon;
  });
};
