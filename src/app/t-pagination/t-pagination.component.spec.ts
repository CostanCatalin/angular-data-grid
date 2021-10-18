import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PaginationEvent } from '../common';

import { TPaginationComponent } from './t-pagination.component';

describe('TPaginationComponent', () => {
  let component: TPaginationComponent;
  let fixture: ComponentFixture<TPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TPaginationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the expected default props', () => {
    expect(component.currentPage).toEqual(0);
    expect(component.numberOfPages).toEqual(0);
    expect(component.hasPreviousPage).toBeFalse();
    expect(component.hasNextPage).toBeFalse();
  });

  it('should have the props initiallized as expected for 10 pages', fakeAsync(() => {
    component.numberOfPages = 10;
    fixture.detectChanges();
    tick();
    expect(component.currentPage).toEqual(0);
    expect(component.hasPreviousPage).toBeFalse();
    expect(component.hasNextPage).toBeTrue();
  }));

  it('should have the props initiallized as expected for 10 pages and not on the first page', fakeAsync(() => {
    component.numberOfPages = 10;
    component.currentPage = 2;
    fixture.detectChanges();
    tick();
    expect(component.hasPreviousPage).toBeTrue();
    expect(component.hasNextPage).toBeTrue();
  }));

  it('should be able to go to the next page', fakeAsync(() => {
    component.numberOfPages = 10;
    component.currentPage = 2;
    tick();
    component.goToNextPage();
    tick();
    expect(component.hasPreviousPage).toBeTrue();
    expect(component.hasNextPage).toBeTrue();
    expect(component.currentPage).toEqual(3);
  }));

  it('should be able to go to the prev page', fakeAsync(() => {
    component.numberOfPages = 10;
    component.currentPage = 2;
    tick();
    component.goToPreviousPage();
    tick();
    expect(component.hasPreviousPage).toBeFalse();
    expect(component.hasNextPage).toBeTrue();
    expect(component.currentPage).toEqual(1);
  }));

  it('should be able to change page size', fakeAsync(() => {
    let paginationEvent: PaginationEvent | undefined;
    component.paginationChange.subscribe((pag: any) => {
      return paginationEvent = pag;
    });

    component.numberOfPages = 30;
    component.currentPage = 2;
    let input = fixture.debugElement.query(By.css('input'));
    let el = input.nativeElement;

    expect(el.value).toBeFalsy();

    el.value = '20';
    el.dispatchEvent(new Event('focusout'));
    tick();

    expect(paginationEvent!.pageSize).toEqual(20);
    expect(paginationEvent!.currentPage).toEqual(2);
  }));
});
