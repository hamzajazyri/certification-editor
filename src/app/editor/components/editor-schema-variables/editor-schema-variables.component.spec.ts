import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorSchemaVariablesComponent } from './editor-schema-variables.component';

describe('EditorSchemaVariablesComponent', () => {
  let component: EditorSchemaVariablesComponent;
  let fixture: ComponentFixture<EditorSchemaVariablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EditorSchemaVariablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorSchemaVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
