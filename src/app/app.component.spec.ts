import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { TGridComponent } from './t-grid/t-grid.component';
import { TColumnComponent } from './t-column/t-column.component';
import { TProgressComponent } from './t-progress/t-progress.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent, TGridComponent, TColumnComponent, TProgressComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
    expect(fixture.debugElement.query(By.css('svg'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('table'))).toBeTruthy();
  });

  it(`should have as title 'data-grid'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('data-grid');
  });

  it(`should have the grid data`, async() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    await fixture.whenStable();

    expect(app.columnDefinition.length).toEqual(4);
    expect(app.myData.length).toEqual(106);
    expect(app.viewModel).toEqual(app.myData);
  });
});
