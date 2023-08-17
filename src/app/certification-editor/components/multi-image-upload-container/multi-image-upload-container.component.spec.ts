import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiImageUploadContainerComponent } from './multi-image-upload-container.component';

describe('MultiImageUploadContainerComponent', () => {
  let component: MultiImageUploadContainerComponent;
  let fixture: ComponentFixture<MultiImageUploadContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MultiImageUploadContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiImageUploadContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
