import { $ } from '@core/dom';
// import { ActiveRoute } from '@core/routes/ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('No router selectors');
    }

    this.$placeholder = $(selector);
    this.routes = routes;
    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler() {
    const Page = this.routes.excel;
    const page = new Page();

    this.$placeholder.append(page.getRoot());

    page.afterRender();
  }
  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
