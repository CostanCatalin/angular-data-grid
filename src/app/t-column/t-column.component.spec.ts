import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SortEvent } from '../common';

import { TColumnComponent } from './t-column.component';

describe('TColumnComponent', () => {
  let component: TColumnComponent;
  let fixture: ComponentFixture<TColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the expected default props', () => {
    expect(component.name).toEqual("");
    expect(component.property).toEqual("");
    expect(component.sortable).toBeFalse();
  });

  it('should emit sortChange on click if sortable', fakeAsync(() => {
    let sortEvent: SortEvent | undefined;
    component.sortable = true;
    component.name = "some name";
    component.sortChange.subscribe((pag: any) => {
      return sortEvent = pag;
    });

    expect(component.property).toEqual("");
    
    let input = fixture.debugElement.query(By.css('div'));
    let el = input.nativeElement;
    el.dispatchEvent(new Event('click'));
    tick();

    expect(component.property).toEqual("ASC");
    expect(sortEvent?.direction).toEqual("ASC");
    expect(sortEvent?.columnName).toEqual(component.name);

    el.dispatchEvent(new Event('click'));
    tick();

    expect(component.property).toEqual("DESC");
    expect(sortEvent?.direction).toEqual("DESC");
    expect(sortEvent?.columnName).toEqual(component.name);
  }));

  it('should NOT emit sortChange on click if not sortable', fakeAsync(() => {
    let sortEvent: SortEvent | undefined;
    component.sortable = false;
    component.name = "some name";
    component.sortChange.subscribe((pag: any) => {
      return sortEvent = pag;
    });
    
    expect(component.property).toEqual("");
    
    let input = fixture.debugElement.query(By.css('div'));
    let el = input.nativeElement;
    el.dispatchEvent(new Event('click'));
    tick();

    expect(component.property).toEqual("");
    expect(sortEvent).toEqual(undefined);

    el.dispatchEvent(new Event('click'));
    tick();

    expect(component.property).toEqual("");
    expect(sortEvent).toEqual(undefined);
  }));

});
