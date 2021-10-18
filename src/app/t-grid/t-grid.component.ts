import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationEvent } from '../common';

const default_page_number = 1;

@Component({
  selector: 't-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './t-grid.component.html',
  styleUrls: ['./t-grid.component.scss']
})
export class TGridComponent {
  currentPage = default_page_number;

  @Input() data: Array<any> = [];
  @Input() pageSize: number | null = null;
  @Input() sortable: boolean = false;

  @Output() paginationChange = new EventEmitter<PaginationEvent>();

  get numberOfPages() {
    if (this.pageSize !== null) {
      return Math.ceil(this.data.length / this.pageSize);
    }

    return default_page_number;
  }

  get viewModel() {
    if (this.pageSize == null) {
      return this.data;
    }

    return this.data.slice((this.currentPage - 1)* this.pageSize, this.currentPage * this.pageSize);
  }

  generateArray(obj: any) : Array<any> {
    return Object.keys(obj).map((key)=>{ return obj[key]});
  }

  paginationChangeFromComponent(event: PaginationEvent) {
    if (event.currentPage !== this.currentPage) {
      this.currentPage = event.currentPage;
    }

    if (event.pageSize !== this.pageSize) {
      this.pageSize = event.pageSize;

      if (this.pageSize !== null && this.currentPage * this.pageSize > this.data.length) {
        this.currentPage = this.numberOfPages;
      }
    }

    if (this.pageSize === 0) {
      this.pageSize = null;
    }

    // I needed the number of pages so I could fetch data I don't already have in the Grid,
    // and since that's not an Input, I decided to handle it all inside t-grid
    this.paginationChange.emit(event);
  }
}
