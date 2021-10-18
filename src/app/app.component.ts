import { Component, OnInit } from '@angular/core';
import { ColumnOption } from './column-option';
import { DataProviderService } from './data-provider.service';
import { Person } from './person.model';
import { EASING_FUNCTIONS, Direction, SortEvent, PaginationEvent } from "./common";

const animation_duration = 2500; //ms

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'data-grid';
  columnDefinition: Array<ColumnOption>;

  sortable = true;
  progress = 90;
  progressRadius = 50;
  pageSize = 20;
  start: any;
  myData: Person[];
  viewModel: Person[];
  easeFunc: (x: number) => number;

  constructor (
    dataProviderService: DataProviderService
  ) {
    this.myData = dataProviderService.getPeople();
    this.viewModel = this.myData;
    this.columnDefinition = Object.keys(this.myData[0]).map(p => {
      return {
        name: p.substr(0, 1).toUpperCase() + p.substr(1),
        property: p == "id" ? Direction.Asceding : Direction.None,
        sortable: this.sortable
      }
    });
    this.easeFunc = EASING_FUNCTIONS[Math.floor(Math.random() * EASING_FUNCTIONS.length)];
  }

  performFetch(event: PaginationEvent) {
    // throw Error("can't fetch, only data loaded by the grid");
  }

  ngOnInit(): void {
    window.requestAnimationFrame(this.updatePercentageStep.bind(this));
  }

  updatePercentageStep(timestamp: DOMHighResTimeStamp) {
    if (this.start === undefined) {
      this.start = timestamp;
    }
    let previousTimeStamp;

    const elapsed = timestamp - this.start;
    if (previousTimeStamp !== timestamp) {
      let newProgress = Math.min(this.easeFunc(elapsed / animation_duration) * 100, 100);
      this.progress = newProgress;
    }

    if (elapsed < animation_duration) {
      previousTimeStamp = timestamp;
      window.requestAnimationFrame(this.updatePercentageStep.bind(this));
    }
  }

  sortByColumn(event: SortEvent) {
    for (let i = 0; i < this.columnDefinition.length; i++) {
      const column = this.columnDefinition[i];
      column.property = column.name == event.columnName ? event.direction : Direction.None;
    }

    this.updateViewModel();
  }

  updateViewModel() {
    let columnToSortBy = this.columnDefinition.find(c => {
      return c.property != Direction.None;
    });

    if (!columnToSortBy) {
      throw Error("Column not found");
    }

    let propToSortBy = columnToSortBy?.name.substr(0, 1).toLowerCase() + columnToSortBy?.name.substr(1);
    let newViewModel: any[] = (this.viewModel as Array<any>).slice();
    
    newViewModel.sort((a, b) => {
      if (columnToSortBy?.property == Direction.Asceding) {
        return (a[propToSortBy] > b[propToSortBy]) ? 1 : ((b[propToSortBy] > a[propToSortBy]) ? -1 : 0);
      } else {
        return (a[propToSortBy] > b[propToSortBy]) ? -1 : ((b[propToSortBy] > a[propToSortBy]) ? 1 : 0);
      }
    });

    this.viewModel = newViewModel;
  }
}
