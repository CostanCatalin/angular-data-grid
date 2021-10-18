import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TGridComponent } from './t-grid.component';
import { TPaginationComponent } from '../t-pagination/t-pagination.component';
import { PEOPLE } from "../mock-people";
import { By } from '@angular/platform-browser';
import { Person } from '../person.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const default_page_size = 20;

describe('TGridComponent', () => {
  let component: TGridComponent;
  let fixture: ComponentFixture<TGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TGridComponent, TPaginationComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TGridComponent);
    component = fixture.componentInstance;
    component.data = PEOPLE;
    component.pageSize = default_page_size;
    component.sortable = true;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all pageSize number of row, populated with data', () => {
    let rows = fixture.debugElement.queryAll(By.css('table tbody tr'));
    let pagination = fixture.debugElement.query(By.css('.pagination'));

    let rowText = rows[0].nativeElement.innerText;
    let person = <Person>component.viewModel[0];

    expect(rows.length).toEqual(default_page_size);
    expect(rowText).toContain(person.id);
    expect(rowText).toContain(person.firstName);
    expect(rowText).toContain(person.lastName);
    expect(rowText).toContain(person.age);

    expect(component.currentPage).toEqual(1);
    expect(component.numberOfPages).toEqual(6);
    expect(pagination.nativeElement.innerText).toContain("page 1 of 6");
  });

  it('should be able to change page', fakeAsync(() => {
    component.currentPage = 2;
    tick();

    let personFromData = <Person>component.data[20];
    let personFromViewModel = <Person>component.viewModel[0];

    expect(personFromData).toEqual(personFromViewModel);
    expect(component.currentPage).toEqual(2);
    expect(component.numberOfPages).toEqual(6);
  }));
});
