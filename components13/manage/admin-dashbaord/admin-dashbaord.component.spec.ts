import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashbaordComponent } from './admin-dashbaord.component';

describe('AdminDashbaordComponent', () => {
  let component: AdminDashbaordComponent;
  let fixture: ComponentFixture<AdminDashbaordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashbaordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
