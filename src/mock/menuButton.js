import { generateFilms } from "./cardFilm.js";
import { render, RenderPosition } from "../utils/render.js";
import CardFilmComponent from "../components/cardFilm.js";
import FilmsListComponent from "../components/filmsList.js";
import ShowMoreButtonComponent from "../components/showMoreButton.js";
import ControlsComponent from "../components/controls.js";
import NoDataFilmsTemplate from "../components/no-data.js";

let SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
export let currentMenuButton = "all";

export const renderFilms = (siteMainElement, idButton, FILMS_LIST) => {

  const films = generateFilms(FILMS_LIST);
  const showMoreButton = new ShowMoreButtonComponent();
  let countFilmsList = FILMS_LIST.length;
  currentMenuButton = idButton;
  SHOWING_FILMS_COUNT_ON_START = 5;

  const filmsContainer = siteMainElement.querySelector(".films");
  let filmsList = filmsContainer.querySelector(".films-list");
  filmsList.remove();

  render(filmsContainer, new FilmsListComponent(), RenderPosition.AFTERBEGIN);

  filmsList = filmsContainer.querySelector(".films-list");

  const filmsListContainer = filmsContainer.querySelector(
    ".films-list__container"
  );

  if (FILMS_LIST.length === 0) {
    render(filmsListContainer, new NoDataFilmsTemplate(), RenderPosition.BEFOREEND);
  } else {
    if (countFilmsList <= SHOWING_FILMS_COUNT_ON_START) {
      SHOWING_FILMS_COUNT_ON_START = countFilmsList;
    }

    for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
      const cardFilmComponent = new CardFilmComponent(films[i]);
      cardFilmComponent.setCardFilmClickHandler();

      render(filmsListContainer, cardFilmComponent, RenderPosition.BEFOREEND);
    }
    const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
    controlsCardFilm.forEach((film) =>
      render(film, new ControlsComponent(), RenderPosition.BEFOREEND)
    );

    // button "Show more"
    render(filmsList, showMoreButton, RenderPosition.BEFOREEND);
    showMoreButtonElement(showMoreButton, filmsListContainer, films);

    if (countFilmsList <= SHOWING_FILMS_COUNT_ON_START) {
      showMoreButton.getElement().remove();
    }
  }
}

export const menuButtonElement = (siteMainElement, idButton, FILMS_LIST) => {
  const nameButton = document.getElementById(idButton);

  nameButton.addEventListener(`click`, () => {
    renderFilms(siteMainElement, idButton, FILMS_LIST);
    currentMenuButton = idButton;
  });
};

const showMoreButtonElement = (showMoreButton, filmsListContainer, films) => {
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  let cardFilmsCount = films.length;
  let showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON;

  showMoreButton.setShowMoreButtonClickHandler(() => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + showingFilmsCountByButton;
    films
      .slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) => {
        const cardFilmComponent = new CardFilmComponent(film);
        render(filmsListContainer, cardFilmComponent, RenderPosition.BEFOREEND);
        cardFilmComponent.setCardFilmClickHandler();
      }
      );

    const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
    controlsCardFilm.forEach((film) =>
      render(film, new ControlsComponent(), RenderPosition.BEFOREEND)
    );

    if (showingFilmsCount >= cardFilmsCount) {
      showMoreButton.getElement().remove();
    }
  });
};