import icons from 'url:../../assets/sprites.svg';

const PokemonView = class {
  _data;
  _parentElement = document.querySelector('[data-pokemon-container]');
  _searchForm = document.querySelector('[data-form]');

  addToFavourites() {}

  hideModalWindow() {
    const overlayEl = document.querySelector('[data-overlay]');
    const closeIcon = document.querySelector('[data-close-icon]');

    // close modal window when clicking on overlay
    overlayEl.addEventListener('click', function (e) {
      if (e.target.closest('[data-modal-window]')) return;

      if (overlayEl.dataset.overlay === 'visible')
        overlayEl.dataset.overlay = 'hidden';
    });

    // close modal window when pressing esc key
    window.addEventListener('keyup', function (e) {
      if (e.key === 'Escape') {
        if (overlayEl.dataset.overlay === 'visible')
          overlayEl.dataset.overlay = 'hidden';
      }
    });

    // close modal window when clicking on close icon
    closeIcon.addEventListener('click', function () {
      if (overlayEl.dataset.overlay === 'visible')
        overlayEl.dataset.overlay = 'hidden';
    });
  }

  showModalWindow() {
    this._parentElement.addEventListener('click', function (e) {
      // When clicking on heart symbol, modal window should not be opened
      if (e.target.closest('[data-heart-link]')) return;

      const clicked = e.target.closest('[data-pokemon-card]');

      if (!clicked) return;

      const overlayEl = document.querySelector('[data-overlay]');

      if (overlayEl.dataset.overlay === 'hidden')
        overlayEl.dataset.overlay = 'visible';
    });
  }

  addAutoComletion(handler) {
    this._searchForm.addEventListener('input', function (e) {
      e.preventDefault();
      const searchBar = document.querySelector('[data-search-bar]');
      handler(searchBar.value);
    });
  }

  addMouseEvent() {
    ['mouseover', 'mouseout'].forEach(event => {
      this._parentElement.addEventListener(event, function (e) {
        const hovered = e.target.closest('[data-pokemon-card]');
        if (!hovered) return;

        const pokemons = hovered
          .closest('[data-pokemon-container]')
          .querySelectorAll('[data-pokemon-card]');

        if (event === 'mouseover') {
          pokemons.forEach(pokemon => {
            if (pokemon !== hovered) pokemon.style.opacity = 0.5;
          });
        } else {
          pokemons.forEach(pokemon => {
            if (pokemon !== hovered) pokemon.style.opacity = 1;
          });
        }
      });
    });
  }

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
          <article class="pokemon" 
            data-pokemon-card 
            style="background-color: ${rootStyles.getPropertyValue(`--${pokemon.type}`)}">
          
            <a href="#" class="pokemon__icon-link" data-heart-link>
              <svg class="icon-heart">
                <use xlink:href="${icons}#icon-heart-regular"></use>
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
