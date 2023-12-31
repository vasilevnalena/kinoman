import AbstractComponent from "./abstract-component.js";

const createMenuMarkup = (menu) => {
  const { title, count } = menu;

  return `<a href="#${title}" class="main-navigation__item" id="${title}">${title} <span class="main-navigation__item-count">${count}</span></a>`;
};

const createMenuTemplate = (menuButtons) => {
  const menuMarkup = menuButtons
    .map((it) =>
      createMenuMarkup(it)).join(`\n`);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" id="all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${menuMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class MenuComponent extends AbstractComponent{
  constructor(menuButtons) {
    super();
    this._menuButtons = menuButtons;
  }

  getTemplate() {
    return createMenuTemplate(this._menuButtons);
  }
};
