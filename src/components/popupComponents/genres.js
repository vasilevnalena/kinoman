import { createElement } from "../../utils/render.js";
import AbstractComponent from "../abstract-component.js";

const createGenreTemplate = (genre) => {
    return `<span class="film-details__genre">${genre}</span>`;
}

export default class GenreTemplateComponent extends AbstractComponent {
    constructor(genre) {
      super();
      this._genre = genre;
      this._element = null;
    }
  
    getTemplate() {
      return createGenreTemplate(this._genre);
    }
  
    // getElement() {
    //   if (!this._element) {
    //     this._element = createElement(this.getTemplate());
    //   }
    //   return this._element;
    // }
  
    // removeElement() {
    //   this._element = null;
    // }
  };
  