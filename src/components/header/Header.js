import { ExcelComponent } from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options,
    });
  }

  toHTML() {
    return '<h1>Header</h1>';
  }
}
