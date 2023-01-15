import icons from 'url:../../assets/sprites.svg';
import cricleArrowLeft from 'url:../../assets/circle-arrow-left-solid.svg';
import cricleArrowRight from 'url:../../assets/circle-arrow-right-solid.svg';

const PokemonView = class {
  _data;
  _parentElement = document.querySelector('[data-pokemon-container]');
  _bookmarksArray;

  addToFavourites(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const clicked = e.target.closest('[data-heart-link]');

      if (!clicked) return;

      const id = clicked.closest('[data-pokemon-card]').dataset.pokemonCard;

      handler(+id);
    });
  }

  hideModalWindow() {
    const overlayEl = document.querySelector('[data-overlay]');
    const closeIconEL = document.querySelector('[data-close-icon]');

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
    closeIconEL.addEventListener('click', function () {
      if (overlayEl.dataset.overlay === 'visible')
        overlayEl.dataset.overlay = 'hidden';
    });
  }

  showModalWindow(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // When clicking on heart link, modal window should not be opened
      if (e.target.closest('[data-heart-link]')) return;

      const clicked = e.target.closest('[data-pokemon-card]');

      if (!clicked) return;

      const overlayEl = document.querySelector('[data-overlay]');

      // prettier-ignore
      if (overlayEl.dataset.overlay === 'hidden') overlayEl.dataset.overlay = 'visible';

      handler(+clicked.dataset.pokemonCard);
    });
  }

  renderModalWindowHeader(prevPokemon, nextPokemon) {
    const modalHeader = document.querySelector('[data-modal-header]');

    const markUp = this._generateModalWindowHeader(prevPokemon, nextPokemon);

    modalHeader.innerHTML = '';
    modalHeader.insertAdjacentHTML('afterbegin', markUp);
  }

  _generateModalWindowHeader(prevPokemon, nextPokemon) {
    console.log(nextPokemon);
    // prettier-ignore
    return `
      <h1 class="heading-1 modal-window__title">Pokedex</h1>

      <div class="modal-window__arrows">
        <div class="modal-window__arrows--prev">
          <img src="${cricleArrowLeft}" alt="" class="arrow-icon modal-window__arrow modal-window__arrow--prev" data-prev-pokemon="${prevPokemon.id}">     
          <span class="modal-window__pokemon-id-prev">${prevPokemon.id.toString().padStart(3, '0')}</span>
          <span class="modal-window__pokemon-name-prev">${prevPokemon.name.charAt(0).toUpperCase() + prevPokemon.name.slice(1)}</span>
        </div>


        ${nextPokemon.id ? `  
          <div class="modal-window__arrows--next">
              <span class="modal-window__pokemon-name-next">${nextPokemon.name.charAt(0).toUpperCase() + nextPokemon.name.slice(1)}</span>
              <span class="modal-window__pokemon-id-next">${nextPokemon.id.toString().padStart(3, '0')}</span>
              <img src="${cricleArrowRight}" alt="" class="arrow-icon modal-window__arrow modal-window__arrow--next" data-next-pokemon="${nextPokemon.id}">     
          </div>
      </div>` : ''}
        `
  }

  renderModalWindowContent(currentPokemon) {
    const modalContent = document.querySelector('[data-modal-content]');

    const markUp = this._generateModalWindowContent(currentPokemon);

    modalContent.innerHTML = '';
    modalContent.insertAdjacentHTML('afterbegin', markUp);
  }

  _generateModalWindowContent(currentPokemon) {
    // prettier-ignore
    return `
      <div class="modal-window__types">
        <h1 class="heading-1">Types</h1>
        <span class="modal-window__type modal-window__type--1">${currentPokemon.type1}</span>

        ${currentPokemon.type2 ? `<span class="modal-window__type modal-window__type--2">${currentPokemon.type2}</span>` : ''}
      </div>

      <div class="modal-window__picture">
        <span class="modal-window__pokemon-id-current">${currentPokemon.id.toString().padStart(3, '0')}</span>
        <span class="modal-window__pokemon-name-current">${currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1)}</span>
        <div class="modal-window__img-wrapper">
          <img src="${currentPokemon.image}" alt="" class="content__img">
        </div>
      </div>

      <div class="modal-window__details">
        <h1 class="heading-1">Height</h1>
        <h1 class="heading-1">Weight</h1>
        <span class="modal-window__height">${currentPokemon.height}cm</span>
        <span class="modal-window__weight">${currentPokemon.weight}kg</span>
        <h1 class="modal-window__title-habitat heading-1">Habitat</h1>
        <h1 class="modal-window__title-gender heading-1">Gender</h1>
        <span class="modal-window__habitat">Forest</span>
        <span class="modal-window__gender">m/w</span>
      </div>  
    `;
  }

  addAutoComletion(handler) {
    const headerEl = document.querySelector('[data-header]');

    headerEl.addEventListener('input', function (e) {
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

  renderPokemons(data) {
    this._data = data;
    const markUp = this._generateMarkupPokemons();

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderBookmarkIcon(data) {
    this._bookmarksArray = data;
    const bookmarkWrapperEl = document.querySelector('[data-bookmark-wrapper]');

    const markUp = this._generetaBookmarkIcon();

    bookmarkWrapperEl.innerHTML = '';
    bookmarkWrapperEl.insertAdjacentHTML('afterbegin', markUp);
  }

  _generetaBookmarkIcon() {
    return `
      <a href="#" class="header__bookmark-link">
        <span class="header__bookmarks-number">${this._bookmarksArray.length}</span>
        <svg class="bookmark-icon">
          <use
          xlink:href="${icons}#icon-bookmark-regular"
          ></use>
        </svg>
       </a>
    `;
  }

  _generateMarkupPokemons() {
    const root = document.querySelector(':root');
    const rootStyles = getComputedStyle(root);

    return this._data
      .map(pokemon => {
        // prettier-ignore
        return `
          <article class="pokemon" 
            data-pokemon-card='${pokemon.id}' 
            style="background-color: ${rootStyles.getPropertyValue(`--${pokemon.type}`)}">
          
            <a href="#" class="pokemon__icon-link" data-heart-link>
              <svg class="icon-heart">
                <use xlink:href="${icons}#icon-${pokemon.bookmarked ? 'heart' : 'heart-regular'}"></use>
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
