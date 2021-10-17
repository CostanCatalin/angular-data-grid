import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationEvent } from '../common';

@Component({
  selector: 't-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './t-pagination.component.html',
  styleUrls: ['./t-pagination.component.scss']
})
export class TPaginationComponent {
  @Input() numberOfPages = 0;
  @Input() currentPage = 0;
  @Input() pageSize: number | null = null;

  @Output() paginationChange = new EventEmitter<PaginationEvent>();

  get hasPreviousPage() {
    return this.currentPage > 1;
  }

  get hasNextPage() {
    return this.currentPage < this.numberOfPages;
  }

  private emitPaginationChange() {
    this.paginationChange.emit({
      currentPage: this.currentPage,
      pageSize: this.pageSize
    });
  }

  goToPreviousPage() {
    if (this.hasPreviousPage) {
      this.currentPage -= 1;
      this.emitPaginationChange();
    }
  }

  goToNextPage() {
    if (this.hasNextPage) {
      this.currentPage += 1;
      this.emitPaginationChange();
    }
  }

  newPageSize(event: FocusEvent) {
    let newPageSize = parseInt((<HTMLInputElement>event.currentTarget)?.value, 10);
    this.paginationChange.emit({
      currentPage: this.currentPage,
      pageSize: newPageSize
    });
  }
}
