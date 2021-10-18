import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TProgressComponent } from './t-progress.component';

describe('TProgressComponent', () => {
  let component: TProgressComponent;
  let fixture: ComponentFixture<TProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TProgressComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TProgressComponent);
    component = fixture.componentInstance;
    component.radius = 50;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the expected size', () => {
    expect(component).toBeTruthy();
    expect(component.circleSize).toEqual(100);
    expect(component.progress).toEqual(0);
  });

  it('should have 1 path for progress ∈ (0, 20]', fakeAsync(() => {
    const pathFor20 = "M 100 50 A 50 50, 0, 0, 1, 65 98 L 50 50 Z";
    expect(component).toBeTruthy();
    component.progress = 20;
    tick();

    expect(component.paths.length).toEqual(1);
    expect(component.paths[0]).toEqual(pathFor20);

    component.progress = 19;
    tick();

    expect(component.paths.length).toEqual(1);
    expect(component.paths[0]).not.toEqual(pathFor20);
  }));

  it('should have 2 paths for progress ∈ (20, 40]', fakeAsync(() => {
    expect(component).toBeTruthy();
    component.progress = 21;
    tick();

    expect(component.paths.length).toEqual(2);
  }));

  it('should have 3 paths for progress ∈ (40, 60]', fakeAsync(() => {
    expect(component).toBeTruthy();
    component.progress = 60;
    tick();

    expect(component.paths.length).toEqual(3);
  }));

  it('should have 4 paths for progress ∈ (60, 80]', fakeAsync(() => {
    expect(component).toBeTruthy();
    component.progress = 80;
    tick();

    expect(component.paths.length).toEqual(4);
  }));

  it('should have 5 paths for progress ∈ (80, 100]', fakeAsync(() => {
    expect(component).toBeTruthy();
    component.progress = 95;
    tick();

    expect(component.paths.length).toEqual(5);
  }));

  it('should recompute the paths on progress value change', fakeAsync(() => {
    expect(component).toBeTruthy();
    component.progress = 95;
    tick();

    expect(component.paths.length).toEqual(5);
    component.progress = 5;
    tick();

    expect(component.paths.length).toEqual(1);
  }));
});
