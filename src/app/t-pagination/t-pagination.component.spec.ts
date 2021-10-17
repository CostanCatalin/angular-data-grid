import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TPaginationComponent } from './t-pagination.component';

describe('TPaginationComponent', () => {
  let component: TPaginationComponent;
  let fixture: ComponentFixture<TPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TPaginationComponent ]
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
});
