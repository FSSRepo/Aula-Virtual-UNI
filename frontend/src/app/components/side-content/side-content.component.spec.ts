import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SideContentComponent } from './side-content.component';

describe('SideContentComponent', () => {
  let component: SideContentComponent;
  let fixture: ComponentFixture<SideContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SideContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
