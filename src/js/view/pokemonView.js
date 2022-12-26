const PokemonView = class {
  _data;
  _parentElement = document.querySelector('[data-pokemon-container]');

  addLoadHanlder(handler) {
    window.addEventListener('load', function () {
      handler();
    });
  }

  render(data) {
    this._data = data;
    const markUp = this._generateMarkup();

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  _generateMarkup() {
    const root = document.querySelector(':root');
    const rootStyles = getComputedStyle(root);
    return this._data
      .map(pokemon => {
        // prettier-ignore
        return `
        <article class="pokemon" style="background-color: ${rootStyles.getPropertyValue(`--${pokemon.type}`)}">
          <a href="#" class="pokemon__icon-link">
            <svg class="icon-heart">
              <use xlink:href="src/assets/sprites.svg#icon-heart-regular"></use>
            </svg>
          </a>
          <div class="pokemon__img-wrapper mb-10">
            <img src="${pokemon.image}" alt="" class="pokemon__img" />
          </div>
          <p class="pokemon__id">#${pokemon.id.toString().padStart(3, '0')}</p>
          <p class="pokemon__name">${pokemon.name}</p>
          <p class="pokemon__type">
            <span>Type:</span>
            <span>${pokemon.type}</span>
          </p>
        </article>
      `;
      })
      .join('');
  }
};

export default new PokemonView();
