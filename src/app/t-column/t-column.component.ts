import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
}
