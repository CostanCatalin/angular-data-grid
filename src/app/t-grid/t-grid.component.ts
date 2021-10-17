import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 't-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './t-grid.component.html',
  styleUrls: ['./t-grid.component.scss']
})
export class TGridComponent {
  @Input() data: Array<any> = [];

  @Input() sortable: boolean = false;

  @Input() paginationChange: any;

  generateArray(obj: any) : Array<any> {
    return Object.keys(obj).map((key)=>{ return obj[key]});
  }
}
