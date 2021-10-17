import { Component, OnInit } from '@angular/core';
import { ColumnOption } from './column-option';
import { DataProviderService } from './data-provider.service';
import { Person } from './person.model';
import { EASING_FUNCTIONS } from "./easing-functions";

const animation_duration = 2500; //ms

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'data-grid';

  columnDefinition: Array<ColumnOption>;

  progress = 90;
  progressRadius = 50;
  page = 2;
  pageSize = 20;
  start: any;
  myData: Person[];
  easeFunc: Function;

  constructor (
    dataProviderService: DataProviderService
  ) {
    this.myData = dataProviderService.getPeople(this.page, this.pageSize);
    this.easeFunc = EASING_FUNCTIONS[Math.floor(Math.random() * EASING_FUNCTIONS.length)];

    this.columnDefinition = Object.keys(this.myData[0]).map(p => {
      return {
        name: p.substr(0, 1).toUpperCase() + p.substr(1),
        property: null,
        sortable: true
      }
    });
  }
  
  get viewModel(): Array<Person> {
    return this.myData;
  }

  performFetch(event: unknown) {
    console.log(event);
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
}
