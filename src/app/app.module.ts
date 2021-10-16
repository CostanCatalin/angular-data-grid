import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TGridComponent } from './t-grid/t-grid.component';
import { TColumnComponent } from './t-column/t-column.component';
import { TProgressComponent } from './t-progress/t-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    TGridComponent,
    TColumnComponent,
    TProgressComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
