import { ExcelComponent } from '@core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      ...options,
    });
  }

  toHTML() {
    return '<h1>Toolbar</h1>';
  }
}
