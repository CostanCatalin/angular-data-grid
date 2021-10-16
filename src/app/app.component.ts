import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'data-grid';

  firstColumn = "First Name";
  firstName = "Catalin";
  secondColumn = "Last Name";
  lastName = "Costan";

  progress = 10;
  progressRadius = 50;
  interval: any;

  ngOnInit(): void {
    this.interval = setInterval(this.updatePercentage.bind(this), 250);
  }

  myData = ["Catalin", "Costan"]

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
