import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { isCell, matrix, nextSelector, shouldRisize } from '@/components/table/table.functions';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@core/dom';
import * as actions from '@/redux/actions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);

    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
      console.log(text);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    // this.$subscribe((state) => {
    //   console.log('from table', state);
    // });
  }

  toHTML() {
    return createTable(20);
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
      console.log(data);
    } catch (e) {
      console.warn('Resize table', e.message);
    }
  }

  onMousedown(event) {
    if (shouldRisize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);

      if (event.shiftKey) {
        const target = $target.id(true);
        const current = this.selection.current.id(true);

        const $cells = matrix(target, current).map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
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
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
}
