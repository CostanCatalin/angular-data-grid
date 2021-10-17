import { Component, OnInit } from '@angular/core';
import { ColumnOption } from './column-option';
import { DataProviderService } from './data-provider.service';
import { Person } from './person.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'data-grid';

  columnDefinition: Array<ColumnOption>;

  progress = 10;
  progressRadius = 50;
  page = 2;
  pageSize = 20;
  interval: any;
  myData: Person[];

  constructor (
    dataProviderService: DataProviderService
  ) {
    this.myData = dataProviderService.getPeople(this.page, this.pageSize);
    this.columnDefinition = Object.keys(this.myData[0]).map(p => {
      return {
        name: p.substr(0, 1).toUpperCase() + p.substr(1),
        property: null,
        sortable: true
      }
    });
  }

  ngOnInit(): void {
    this.interval = setInterval(this.updatePercentage.bind(this), 250);
  }


  performFetch(event: unknown) {
    console.log(event);
  }

  updatePercentage() {
    if (this.progress >= 100 && this.interval !== undefined) {
      clearInterval(this.interval);
      return;
    }

    this.progress = this.progress + Math.floor(Math.random() * 10);
  }
}
