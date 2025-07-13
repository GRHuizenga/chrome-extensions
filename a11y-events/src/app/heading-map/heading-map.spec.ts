import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingMap } from './heading-map';

describe('HeadingMap', () => {
  let component: HeadingMap;
  let fixture: ComponentFixture<HeadingMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadingMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadingMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
