import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TGridComponent } from './t-grid/t-grid.component';
import { TColumnComponent } from './t-column/t-column.component';
import { TProgressComponent } from './t-progress/t-progress.component';
import { TPaginationComponent } from './t-pagination/t-pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    TGridComponent,
    TColumnComponent,
    TProgressComponent,
    TPaginationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
