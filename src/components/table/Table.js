import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import {isCell, matrix, nextSelector, shouldRisize} from '@/components/table/table.functions';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown'],
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');

    this.selection.select($cell);
  }

  toHTML() {
    return createTable(20);
  }

  onMousedown(event) {
    if (shouldRisize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);

      if (event.shiftKey) {
        const target = $target.id(true);
        const current = this.selection.current.id(true);

        const $cells = matrix(target, current).map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const { col, row } = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, col, row));
      this.selection.select($next);
    }
  }
}
