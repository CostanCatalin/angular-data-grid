import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Direction, SortEvent } from '../common';

@Component({
  selector: 't-column',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './t-column.component.html',
  styleUrls: ['./t-column.component.scss']
})
export class TColumnComponent {
  @Input() name: string = "";

  @Input() property: string = "";

  @Input() sortable: boolean = false;
  
  @Output() sortChange = new EventEmitter<SortEvent>();

  sortByColumn() {
    if (!this.sortable) {
      return;
    }

    if (this.property == Direction.Asceding) {
      this.property = Direction.Descending;
    } else {
      this.property = Direction.Asceding;
    }

    this.sortChange.emit({
      columnName: this.name,
      direction: this.property
    });
  }
}
