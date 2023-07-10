import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationEditorComponent } from './certification-editor.component';

describe('CertificationEditorComponent', () => {
  let component: CertificationEditorComponent;
  let fixture: ComponentFixture<CertificationEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CertificationEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
