import { createToolbar } from '@/components/toolbar/toolbar.template';
import { $ } from '@core/dom';
import { ExcelStateComponent } from '@core/ExcelStateComponent';
import { defaultStyles } from '@/constatnts';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  toHTML() {
    return this.template;
  }

  get template() {
    return createToolbar(this.state);
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);

      // const key = Object.keys(value)[0];
      // this.setState({ [key]: value[key] });
    }
  }
}
